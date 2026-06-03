# 🧠 测测你的心理年龄

一个基于心理学学术研究的趣味性心理年龄自测网站。从认知、情感、社交、生活态度四个维度，科学评估你的心理成熟度。

## ✨ 功能

- **32 道精选题目** — 四个维度各 8 题，每题 5 级选项，约 3-5 分钟完成
- **无干扰答题** — 首页直接开始，不做任何年龄预设，消除启动效应
- **两阶段结果揭示** — 先展示绝对心理年龄，输入实际年龄后解锁深度对比分析
- **四维雷达图** — Recharts 绘制的可视化结果分析
- **逐题动画** — 流畅的淡入过渡和结果页数字弹跳动画
- **可展开维度卡片** — 每个维度包含分析、优势识别和提升建议
- **科学知识卡片** — 引用心理学研究发现（"吸引力年龄"等）
- **响应式设计** — 移动端优先，适配所有屏幕尺寸
- **纯静态部署** — 构建产物仅 3 个文件，部署到任意 Web 服务器

## 🛠 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 19 + TypeScript |
| 构建 | Vite |
| 样式 | Tailwind CSS v4 |
| 图表 | Recharts |
| 路由 | React Router v7 |
| 状态 | React Context + useReducer |
| 生产服务 | serve（静态文件服务器） |

## 🚀 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（端口 5173）
npm run dev
```

---

## 📦 部署指南

### 架构总览

```
用户浏览器 (公网)
    │
    │  https://your-domain.com/mental-age
    ▼
┌──────────────────────────────────┐
│        云服务器 (有公网IP)         │
│  ┌────────────────────────────┐  │
│  │  Nginx                      │  │
│  │  - SSL/TLS 终止              │  │
│  │  - /mental-age              │  │
│  │    反向代理到 frps 本地端口    │  │
│  └───────────┬────────────────┘  │
│              │                   │
│  ┌───────────▼────────────────┐  │
│  │  frps (frp server)          │  │
│  │  - 监听 frp 端口 (7000)      │  │
│  │  - 接收来自 frpc 的隧道       │  │
│  └───────────┬────────────────┘  │
└──────────────┼───────────────────┘
               │  frp 隧道
               │  穿透 NAT
┌──────────────┼───────────────────┐
│      物理机 (内网 Linux)          │
│  ┌───────────▼────────────────┐  │
│  │  frpc (frp client)          │  │
│  │  - 连接到 frps               │  │
│  │  - 映射本地 5005 端口         │  │
│  └───────────┬────────────────┘  │
│              │                   │
│  ┌───────────▼────────────────┐  │
│  │  serve                      │  │
│  │  - 监听 0.0.0.0:5005        │  │
│  │  - 服务 dist/ 静态文件       │  │
│  │  - systemctl 管理，开机自启   │  │
│  └───────────┬────────────────┘  │
│              │                   │
│  ┌───────────▼────────────────┐  │
│  │  dist/                      │  │
│  │  ├── index.html             │  │
│  │  └── assets/                │  │
│  │      ├── index-*.css        │  │
│  │      └── index-*.js         │  │
│  └────────────────────────────┘  │
└──────────────────────────────────┘
```

### 1. 物理机：克隆项目 & 构建

```bash
# 克隆项目到你的代码目录
cd /home/yj/code
git clone git@github.com:chunyujin295/mental-age-test.git mental-age-test
cd mental-age-test

# 安装依赖
npm install

# 构建生产版本
npm run build

# 产物在 dist/ 目录中
```

### 2. 物理机：配置 systemctl 开机自启

创建 systemd 服务文件：

```bash
sudo vim /etc/systemd/system/mental-age-test.service
```

写入以下内容：

```ini
[Unit]
Description=Mental Age Test - Static Site Server
After=network.target

[Service]
Type=simple
User=yj
WorkingDirectory=/home/yj/code/mental-age-test
ExecStart=/usr/bin/npm run start
Restart=always
RestartSec=3
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

启动并启用开机自启：

```bash
sudo systemctl daemon-reload
sudo systemctl start mental-age-test
sudo systemctl enable mental-age-test

# 检查状态
sudo systemctl status mental-age-test

# 验证端口在监听
ss -tlnp | grep 5005
```

### 3. 物理机：测试本地访问

```bash
curl http://127.0.0.1:5005
# 应该返回 index.html 的内容
```

### 4. 物理机：添加 frpc 代理条目

在已有的 `frpc.toml` 末尾新增一个 `[[proxies]]` 块：

```toml
[[proxies]]
name = "mental-age-test"
type = "tcp"
localIP = "127.0.0.1"
localPort = 5005
remotePort = 5005
```

> **为什么用 `type = "tcp"` 而不是 `type = "http"`？**
>
> 这里 frp 只做纯传输通道，HTTP 层的工作全部由 Nginx 承担。对比：
>
> |          | `type = "tcp"`        | `type = "http"`              |
> | -------- | --------------------- | ---------------------------- |
> | 工作层   | L4，字节流转发        | L7，frps 解析 HTTP 头        |
> | 路由方式 | `remotePort` 一一对应 | 按 `customDomains` 域名路由  |
> | 适用场景 | Nginx 在前面兜底时    | frp 直接暴露 HTTP 服务到公网 |
>
> 如果走的是路径路由（如 `/mental-age`），frp 的 HTTP 代理只能按域名分流，做不到路径级别。链路是：
>
> ```
> Nginx (SSL终止 + path路由) → frps:5005 (tcp隧道) → frpc → serve:5005
>        ↑ L7                       ↑ L4                      ↑
>     HTTP 层处理               纯端口转发               静态文件服务
> ```
>
> 用 `tcp` 少了一层不必要的 HTTP 解析，更轻量。

重启 frpc：

```bash
sudo systemctl restart frpClient.service  # 根据你的实际服务名修改
sudo systemctl status frpClient.service
```

### 5. 云服务器：frps 无需额外配置

frps 只需 `bindPort` 监听，每条 proxy 的 `remotePort` 会自动生效，不需要逐个声明。

确认 frps 正常运行即可：

```bash
sudo systemctl status frpSevice.service  # 根据你的实际服务名修改
```

### 6. 云服务器：在已有 Nginx 中添加 location

目标：`https://your-domain.com/mental-age` → `http://127.0.0.1:5005`（frps 隧道的远程端口）

编辑 Nginx 站点配置：

```bash
sudo vim /etc/nginx/sites-available/your-domain
```

在已有的 `server` 块中添加两个 location：

```nginx
# 心理年龄测试（添加到 server 块中）
location = /mental-age {
    return 301 /mental-age/;
}

location /mental-age/ {
    proxy_pass http://127.0.0.1:5005/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

重载 Nginx：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 7. 验证部署

```bash
# 1. 检查物理机 serve 服务
curl http://127.0.0.1:5005

# 2. 检查云服务器 frp 隧道
curl http://127.0.0.1:5005

# 3. 检查 Nginx 反向代理
curl https://your-domain.com/mental-age/

# 4. 浏览器访问
# https://your-domain.com/mental-age/
```

### 8. 更新部署

后续有代码更新时：

```bash
cd /home/yj/code/mental-age-test
git pull
npm install        # 如有新依赖
npm run build      # 重新构建
sudo systemctl restart mental-age-test
```

---

### 常用命令速查

| 操作 | 命令 |
|------|------|
| 查看服务状态 | `sudo systemctl status mental-age-test` |
| 重启服务 | `sudo systemctl restart mental-age-test` |
| 查看服务日志 | `sudo journalctl -u mental-age-test -f` |
| 查看端口占用 | `ss -tlnp \| grep 5005` |
| 重载 Nginx | `sudo systemctl reload nginx` |
| 重新构建 | `npm run build` |

### 故障排查：Node.js 版本过低

如果部署时遇到以下报错：

```
You are using Node.js 18.19.1. Vite requires Node.js version 20.19+ or 22.12+.
Please upgrade your Node.js version.
```

原因是 Vite 8 需要 Node.js 20+，而服务器上的是 18.x。升级方法：

**方法一：NodeSource 安装（推荐，适用于 Ubuntu/Debian）**

```bash
# 查看当前版本
node -v

# 安装 NodeSource 20.x 源
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# 升级
sudo apt-get install -y nodejs

# 验证
node -v   # 应显示 v20.x.x
```

**方法二：nvm（如果你之前用 nvm 装的）**

```bash
nvm install 20
nvm use 20
nvm alias default 20
```

升级完成后重新构建部署：

```bash
cd /home/yj/code/mental-age-test
npm install
npm run build
sudo systemctl restart mental-age-test
```

---

## 📁 项目结构

```
src/
├── main.tsx                    # 入口
├── App.tsx                     # 路由配置
├── index.css                   # Tailwind + 自定义动画
├── types/
│   └── index.ts                # TypeScript 类型定义
├── data/
│   └── questions.ts            # 32 道测验题目
├── utils/
│   └── calculate.ts            # 计分算法（基础结果 + 年龄对比）
├── context/
│   └── QuizContext.tsx          # 全局测验状态管理
├── pages/
│   ├── HomePage.tsx             # 首页（直接开始，无需填年龄）
│   ├── QuizPage.tsx             # 测验页（逐题作答）
│   └── ResultPage.tsx           # 结果页（先展示心理年龄，再填年龄解锁对比分析）
└── components/
    ├── ProgressBar.tsx          # 进度条
    ├── QuestionCard.tsx         # 题目卡片
    ├── RadarChart.tsx           # 四维雷达图
    ├── MentalAgeDisplay.tsx     # 心理年龄数字展示（支持无年龄/有年龄两种模式）
    └── DimensionBreakdown.tsx   # 单维度得分条+分析（支持年龄对比模式）
```

## 📐 四个测评维度

| 维度 | 图标 | 理论基础 | 测量内容 |
|------|------|---------|----------|
| 认知年龄 | 🧠 | 认知灵活性理论 | 信息处理方式、思维灵活度、反思习惯 |
| 情感年龄 | 💙 | Gross 情绪调节过程模型 | 情绪觉察、认知重评、冲动控制、共情 |
| 社会年龄 | 🤝 | Erikson 心理社会发展理论 | 责任感、冲突解决、代际关怀、社会角色 |
| 生活态度年龄 | 🌿 | Carstensen 社会情绪选择理论 | 未来时间观、健康行为、风险评估、延迟满足 |

## 🔬 学术基础

本测试基于以下心理学研究成果设计：

- **"吸引力年龄"现象** — Rubin & Berntsen (2006) 发现约 25 岁为转折点：25 岁以下者倾向于感觉自己比实际年龄更成熟，25 岁以上者则相反
- **主观年龄四维框架** — Nascimento & Ferreira (2020) 将主观年龄操作化为感受年龄、心理年龄、身体年龄和社会年龄四个维度
- **生命历程发展观** — Pinquart & Wahl (2021) 对 294 项研究的元分析确认主观年龄偏差的生命历程模式
- **AARC 老化觉知模型** — Brothers et al. (2019) 的 2×5 维度评估框架

完整研究文档见 `心理年龄科学测评研究文档.md`。

## ⚠️ 免责声明

本测试为**趣味性自我探索工具**，并非标准化心理测量量表，也不构成任何临床诊断依据。心理年龄偏差是普遍存在的现象，其方向和幅度受多种因素影响。如有心理健康方面的担忧，请咨询专业心理咨询师或精神科医生。

## 📄 许可

MIT License
