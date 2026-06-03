import type { Question } from '../types';

// ============================================================
// 评分说明（统一方向）
// 分数 1 → 该维度上表现出偏向年轻/不成熟的模式
// 分数 5 → 该维度上表现出偏向成熟/年长的模式
//
// 理论依据：
// - 认知维度：认知灵活性理论 + 成人认知发展阶段
// - 情感维度：Gross 情绪调节过程模型
// - 社会维度：Erikson 心理社会发展理论（成年期）
// - 生活态度维度：Carstensen 社会情绪选择理论(SST)
// ============================================================

export const questions: Question[] = [

  // ============================================================
  // 维度一：认知年龄 — 8 题
  // 核心构念：认知灵活性、求知动机、元认知、信息加工方式
  // 分值方向：1=直觉冲动/回避复杂思考  →  5=反思系统/享受深度思考
  // ============================================================

  {
    id: 'cog-1',
    dimension: 'cognitive',
    text: '你正在处理一件棘手的工作，试了几种方法都没成功，这时你通常会？',
    options: [
      { score: 1, text: '感到沮丧，放下这件事去做别的', emoji: '😤' },
      { score: 2, text: '向同事或朋友求助，请别人帮忙解决', emoji: '🙋' },
      { score: 3, text: '休息一会儿，换换脑子再回来试', emoji: '☕' },
      { score: 4, text: '回头检查之前的步骤，分析哪里出了问题', emoji: '🔍' },
      { score: 5, text: '不但排查问题，还会思考是否有更根本的解决思路', emoji: '💡' },
    ],
  },
  {
    id: 'cog-2',
    dimension: 'cognitive',
    text: '你常用的 App 突然大改版，界面布局和操作方式都变了，你的第一反应是？',
    options: [
      { score: 1, text: '烦躁抱怨："改来改去干什么！"', emoji: '😫' },
      { score: 2, text: '很不适应，花了不少时间才找到常用功能', emoji: '🤨' },
      { score: 3, text: '花几分钟摸索一下，适应得还算快', emoji: '🔍' },
      { score: 4, text: '好奇新版本有什么功能改进', emoji: '🤔' },
      { score: 5, text: '主动探索新布局背后的设计逻辑', emoji: '🧐' },
    ],
  },
  {
    id: 'cog-3',
    dimension: 'cognitive',
    text: '在网上看到一则令人惊讶的说法时，你通常会？',
    options: [
      { score: 1, text: '觉得有道理就转发分享', emoji: '📤' },
      { score: 2, text: '如果和自己的想法一致就相信', emoji: '👍' },
      { score: 3, text: '看看评论区其他人怎么说', emoji: '💬' },
      { score: 4, text: '查一下原始出处或数据来源', emoji: '🔎' },
      { score: 5, text: '交叉对比多个来源，确认事实后再形成判断', emoji: '📊' },
    ],
  },
  {
    id: 'cog-4',
    dimension: 'cognitive',
    text: '回顾自己过去做错的一个决定，你现在的感受更接近？',
    options: [
      { score: 1, text: '不太愿意回想，过去了就过去了', emoji: '🙈' },
      { score: 2, text: '觉得自己当时太傻，有点尴尬', emoji: '😅' },
      { score: 3, text: '能说出当时为什么做了那个选择', emoji: '🤷' },
      { score: 4, text: '清楚分析出当时判断失误的原因', emoji: '📝' },
      { score: 5, text: '从那次经历中总结出了至今受用的教训', emoji: '🌱' },
    ],
  },
  {
    id: 'cog-5',
    dimension: 'cognitive',
    text: '遇到一个与你已有认知完全相反的观点时，你的反应更接近？',
    options: [
      { score: 1, text: '直接排斥，觉得对方肯定错了', emoji: '🚫' },
      { score: 2, text: '不以为然，但懒得争论', emoji: '😏' },
      { score: 3, text: '听听对方怎么说，但内心持保留态度', emoji: '👂' },
      { score: 4, text: '认真听完后，试着理解对方为什么这么看', emoji: '🤔' },
      { score: 5, text: '会主动追问对方的推理过程，即使最终不认同也能看到其中的合理成分', emoji: '🌟' },
    ],
  },
  {
    id: 'cog-6',
    dimension: 'cognitive',
    text: '你需要学习一项全新的技能来完成某项任务，你通常如何入手？',
    options: [
      { score: 1, text: '直接上手试，遇到问题再说', emoji: '🚀' },
      { score: 2, text: '找一个视频教程跟着做', emoji: '📺' },
      { score: 3, text: '先看几个不同类型的教程，选一种适合自己的方法', emoji: '🗂️' },
      { score: 4, text: '先了解整体框架和核心概念，再循序渐进地学', emoji: '📐' },
      { score: 5, text: '先明确学习目标和评估标准，再制定学习计划', emoji: '🎯' },
    ],
  },
  {
    id: 'cog-7',
    dimension: 'cognitive',
    text: '当你对一个问题有了初步判断后，又收到了新的信息，你通常会？',
    options: [
      { score: 1, text: '坚持最初的判断，不太关注新信息', emoji: '🔒' },
      { score: 2, text: '注意到新信息了，但倾向于找理由维持原判', emoji: '🤔' },
      { score: 3, text: '会考虑新信息，视情况决定是否调整判断', emoji: '⚖️' },
      { score: 4, text: '主动用新信息来检验自己之前的判断', emoji: '🔬' },
      { score: 5, text: '把调整判断视为认知升级的机会，乐于被新证据"纠正"', emoji: '✨' },
    ],
  },
  {
    id: 'cog-8',
    dimension: 'cognitive',
    text: '面对一件复杂的事情，你的思考习惯更接近？',
    options: [
      { score: 1, text: '凭经验和直觉快速做出判断', emoji: '⚡' },
      { score: 2, text: '考虑一两个关键因素后就做决定', emoji: '📋' },
      { score: 3, text: '会列出主要利弊，但不会过度分析', emoji: '📊' },
      { score: 4, text: '系统性地从多个角度分析，再综合判断', emoji: '🧩' },
      { score: 5, text: '不仅多角度分析，还会反思自己的分析框架是否合理', emoji: '🔬' },
    ],
  },

  // ============================================================
  // 维度二：情感年龄 — 8 题
  // 核心构念：情绪觉察、认知重评、冲动控制、共情
  // 理论依据：Gross (1998, 2015) 情绪调节过程模型
  //   - 情境选择 → 注意部署 → 认知重评 → 反应调节
  // 分值方向：1=情绪驱动/冲动反应  →  5=情绪觉察/策略性调节
  // ============================================================

  {
    id: 'emo-1',
    dimension: 'emotional',
    text: '发生了一件让你非常生气的事，在情绪最强烈的那一刻，你通常会？',
    options: [
      { score: 1, text: '直接发泄出来，喊出来或摔东西', emoji: '💢' },
      { score: 2, text: '忍着不发作，但整个人明显状态很差', emoji: '😤' },
      { score: 3, text: '先离开现场，给自己冷静的空间', emoji: '🚶' },
      { score: 4, text: '在心里告诉自己"先别急，冷静下来再处理"', emoji: '🧘' },
      { score: 5, text: '能觉察到愤怒在身体里的感觉，有意识地让情绪平复后再回应', emoji: '🌊' },
    ],
  },
  {
    id: 'emo-2',
    dimension: 'emotional',
    text: '有人对你说了一句让你心里很不舒服的话，事后你通常会？',
    options: [
      { score: 1, text: '反复回想那句话，越想越气', emoji: '🔄' },
      { score: 2, text: '跟朋友吐槽，获取安慰', emoji: '💬' },
      { score: 3, text: '试着想"对方可能不是针对我"', emoji: '🤔' },
      { score: 4, text: '分析对方当时的情境和可能的动机', emoji: '🔍' },
      { score: 5, text: '能从对方的角度理解那句话的来由，即使不赞同也能放下不纠结', emoji: '☮️' },
    ],
  },
  {
    id: 'emo-3',
    dimension: 'emotional',
    text: '当多种负面情绪（焦虑、烦躁、沮丧）同时涌上来时，你的状态是？',
    options: [
      { score: 1, text: '被情绪淹没，大脑一片混乱', emoji: '🌪️' },
      { score: 2, text: '只知道"心情很差"，说不清具体是什么感受', emoji: '☁️' },
      { score: 3, text: '能分清楚主要是哪几种情绪在影响自己', emoji: '📋' },
      { score: 4, text: '不但能分辨情绪，还能找到每种情绪对应的原因', emoji: '🗺️' },
      { score: 5, text: '能清晰地给每种情绪"命名"，并有针对性地逐一应对', emoji: '🎯' },
    ],
  },
  {
    id: 'emo-4',
    dimension: 'emotional',
    text: '一个朋友在你面前崩溃大哭，诉说他的困境，你的反应更接近？',
    options: [
      { score: 1, text: '坐立不安，不知道该怎么办', emoji: '😰' },
      { score: 2, text: '急于给出建议，想让对方快点好起来', emoji: '💊' },
      { score: 3, text: '安静地听对方说完，偶尔点头回应', emoji: '👂' },
      { score: 4, text: '先接纳对方的情绪（"难怪你这么难过"），再慢慢了解情况', emoji: '🤲' },
      { score: 5, text: '陪伴对方的同时，帮他梳理感受和处境，但不替他做决定', emoji: '🫂' },
    ],
  },
  {
    id: 'emo-5',
    dimension: 'emotional',
    text: '辛苦准备了很久的方案被直接否决了，你的心态是？',
    options: [
      { score: 1, text: '情绪崩溃，觉得自己的努力被否定了', emoji: '😭' },
      { score: 2, text: '心里很不服气，觉得评判不公', emoji: '😒' },
      { score: 3, text: '失望但能接受，告诉自己下次再来', emoji: '😔' },
      { score: 4, text: '主动询问具体的反馈意见，了解问题在哪', emoji: '📝' },
      { score: 5, text: '将挫折视为改进的机会，把反馈融入下一次方案', emoji: '📈' },
    ],
  },
  {
    id: 'emo-6',
    dimension: 'emotional',
    text: '你正在努力完成一件事，旁边的人一直在催促或打扰你，你通常会？',
    options: [
      { score: 1, text: '直接发火："别催了！"', emoji: '🔥' },
      { score: 2, text: '虽然不说，但变得急躁、效率反而下降', emoji: '😤' },
      { score: 3, text: '戴上耳机或换个地方，尽量减少干扰', emoji: '🎧' },
      { score: 4, text: '平静地告知对方自己需要专注，协商一个时间线', emoji: '🤝' },
      { score: 5, text: '理解对方催促的原因，调整自己的节奏同时让对方安心', emoji: '☯️' },
    ],
  },
  {
    id: 'emo-7',
    dimension: 'emotional',
    text: '回想最近一次与人发生摩擦，你对当时的自己有怎样的认识？',
    options: [
      { score: 1, text: '全是对方的错，我没什么问题', emoji: '☝️' },
      { score: 2, text: '对方问题大一些，但我也可能有小问题', emoji: '🤏' },
      { score: 3, text: '双方各有一些责任', emoji: '⚖️' },
      { score: 4, text: '能说出自己当时哪些反应是不够成熟的', emoji: '🪞' },
      { score: 5, text: '清楚自己在冲突中的情绪触发点，并有意识地避免下次重复同样的模式', emoji: '🌱' },
    ],
  },
  {
    id: 'emo-8',
    dimension: 'emotional',
    text: '等待一个重要结果（体检报告、面试通知等）的那几天，你通常？',
    options: [
      { score: 1, text: '焦虑难安，反复检查手机/邮箱', emoji: '📱' },
      { score: 2, text: '心里七上八下，做别的事总走神', emoji: '🎢' },
      { score: 3, text: '有点担心，但该做的事还是照常进行', emoji: '🚶' },
      { score: 4, text: '告诉自己"担心改变不了结果"，主动找事做转移注意力', emoji: '🧘' },
      { score: 5, text: '接受不确定性是生活的一部分，做好两手准备坦然等待', emoji: '☮️' },
    ],
  },

  // ============================================================
  // 维度三：社会年龄 — 8 题
  // 核心构念：责任感、冲突解决、代际关怀、社会角色承担
  // 理论依据：Erikson 心理社会发展理论（Generativity vs Stagnation）
  // 分值方向：1=自我中心/回避责任  →  5=利他关怀/主动承担责任
  // ============================================================

  {
    id: 'soc-1',
    dimension: 'social',
    text: '你答应了帮朋友一个忙，但临近时发现自己那天特别累不想出门，你会？',
    options: [
      { score: 1, text: '找个借口推掉，反正朋友应该能理解', emoji: '🙈' },
      { score: 2, text: '心里很挣扎，最后可能还是会去但不太情愿', emoji: '😮‍💨' },
      { score: 3, text: '既然答应了就一定会去，哪怕累一点', emoji: '💪' },
      { score: 4, text: '去了之后帮朋友想办法，争取一次把事情彻底解决', emoji: '🤝' },
      { score: 5, text: '不但去帮忙，还会主动提醒朋友之后可能需要的注意事项', emoji: '🌟' },
    ],
  },
  {
    id: 'soc-2',
    dimension: 'social',
    text: '你和一位同事/同学对某件事的处理方式有严重分歧，你通常会？',
    options: [
      { score: 1, text: '坚持按自己的方式来，不想妥协', emoji: '🙅' },
      { score: 2, text: '各做各的，互不干涉', emoji: '↔️' },
      { score: 3, text: '双方坐下来把各自的理由说清楚', emoji: '🗣️' },
      { score: 4, text: '找出双方方案中各自合理的部分，尝试融合', emoji: '🧩' },
      { score: 5, text: '先确立共同目标，再基于目标反推哪种方案更合适，谁对听谁的', emoji: '🎯' },
    ],
  },
  {
    id: 'soc-3',
    dimension: 'social',
    text: '身边有一个比你年轻很多的同事/学弟学妹在工作中犯了错，你的态度更接近？',
    options: [
      { score: 1, text: '觉得"这都不会"，不太想管', emoji: '🙄' },
      { score: 2, text: '告诉他哪里错了，让他自己去改', emoji: '👉' },
      { score: 3, text: '帮他分析错误的原因，示范正确的做法', emoji: '👨‍🏫' },
      { score: 4, text: '不仅教方法，还分享自己当年犯过类似错误的经历', emoji: '📖' },
      { score: 5, text: '利用这个机会系统地帮他建立工作方法论，持续关注他的成长', emoji: '🌱' },
    ],
  },
  {
    id: 'soc-4',
    dimension: 'social',
    text: '你同时承担着工作、家庭、朋友等多重角色，当它们之间出现时间冲突时，你通常？',
    options: [
      { score: 1, text: '谁催得急就先应付谁', emoji: '🔥' },
      { score: 2, text: '优先处理工作/学业，其他先放放', emoji: '💼' },
      { score: 3, text: '临时协调，尽量各方都照顾到', emoji: '🤹' },
      { score: 4, text: '根据事情的重要性和紧急性来判断优先级', emoji: '📊' },
      { score: 5, text: '提前规划各角色的时间分配，冲突时坦诚沟通并给出替代方案', emoji: '📅' },
    ],
  },
  {
    id: 'soc-5',
    dimension: 'social',
    text: '你和一位老朋友因为生活轨迹不同，联系越来越少了，你通常会？',
    options: [
      { score: 1, text: '顺其自然，淡了就淡了', emoji: '🍂' },
      { score: 2, text: '看到对方的朋友圈会点个赞，但很少主动联系', emoji: '👍' },
      { score: 3, text: '偶尔会想起，过节时会主动发个问候', emoji: '💌' },
      { score: 4, text: '隔段时间会约出来见面，主动维系这段关系', emoji: '☕' },
      { score: 5, text: '理解人生阶段不同，但会刻意留出时间来维护那些真正重要的关系', emoji: '💎' },
    ],
  },
  {
    id: 'soc-6',
    dimension: 'social',
    text: '你所在的小区/社区出现了一个公共问题（如垃圾乱堆放、噪音扰民），你的反应是？',
    options: [
      { score: 1, text: '这不关我的事，总有人会去处理', emoji: '🤷' },
      { score: 2, text: '私下抱怨，但不会采取行动', emoji: '😤' },
      { score: 3, text: '如果有人在群里发起讨论就参与一下', emoji: '💬' },
      { score: 4, text: '主动在业主群/社区群提出讨论，推动形成解决方案', emoji: '📢' },
      { score: 5, text: '联系相关方、组织邻里协商、推动问题从根源上解决', emoji: '🏗️' },
    ],
  },
  {
    id: 'soc-7',
    dimension: 'social',
    text: '过年回家，饭桌上一位长辈说了一些你完全不认同的观点，你会？',
    options: [
      { score: 1, text: '直接反驳，争论起来', emoji: '⚔️' },
      { score: 2, text: '心里不认同，但低头吃饭不说话', emoji: '🍚' },
      { score: 3, text: '用"嗯嗯"敷衍过去，岔开话题', emoji: '🔄' },
      { score: 4, text: '试着了解他为什么这么想，背后有什么经历', emoji: '👂' },
      { score: 5, text: '在不伤和气的范围内表达自己的看法，同时尊重对方持有不同观点的权利', emoji: '🤝' },
    ],
  },
  {
    id: 'soc-8',
    dimension: 'social',
    text: '一个朋友总是找你倾诉烦恼，但当你需要倾诉时他却不太有耐心，你会？',
    options: [
      { score: 1, text: '直接疏远，不再联系', emoji: '👋' },
      { score: 2, text: '心里不舒服，但还是继续当他的"情绪垃圾桶"', emoji: '😞' },
      { score: 3, text: '下次他再找时，暗示自己也需要被倾听', emoji: '💭' },
      { score: 4, text: '坦诚地和对方聊一聊这段关系中的不平衡', emoji: '💬' },
      { score: 5, text: '设置边界的同时理解对方可能不自知，给关系一个调整的机会', emoji: '⚖️' },
    ],
  },

  // ============================================================
  // 维度四：生活态度年龄 — 8 题
  // 核心构念：未来时间观、健康行为、延迟满足、风险评估
  // 理论依据：Carstensen 社会情绪选择理论(SST)
  //   - 感知未来时间越充裕 → 偏好新奇和知识获取
  //   - 感知未来时间越有限 → 偏好情感满足和熟悉感
  // 分值方向：1=当下导向/追求刺激  →  5=未来导向/追求稳定与意义
  // ============================================================

  {
    id: 'lif-1',
    dimension: 'lifestyle',
    text: '发了一笔意料之外的奖金（比如 5000 元），你的第一反应是？',
    options: [
      { score: 1, text: '马上买那个一直想要的东西犒劳自己', emoji: '🛍️' },
      { score: 2, text: '拿出一部分消费，剩下的存起来', emoji: '💳' },
      { score: 3, text: '大部分存起来，小部分用来改善生活', emoji: '💰' },
      { score: 4, text: '按自己的财务计划分配：储蓄、投资、消费各一部分', emoji: '📊' },
      { score: 5, text: '将其纳入长期财务规划，考虑投资增值或用于自我提升', emoji: '📈' },
    ],
  },
  {
    id: 'lif-2',
    dimension: 'lifestyle',
    text: '你已经连续加班/学习了很长时间，身体发出了一些疲劳信号（头痛、失眠），你通常会？',
    options: [
      { score: 1, text: '扛一扛就过去了，年轻无所谓', emoji: '💪' },
      { score: 2, text: '吃点药缓解症状，继续干', emoji: '💊' },
      { score: 3, text: '意识到该休息了，调整一两天', emoji: '😴' },
      { score: 4, text: '认真审视自己的作息和工作量，做出具体调整', emoji: '📋' },
      { score: 5, text: '将身体健康视为不可透支的本钱，建立长期可持续的作息和锻炼习惯', emoji: '🌿' },
    ],
  },
  {
    id: 'lif-3',
    dimension: 'lifestyle',
    text: '面临一个"高风险但可能高回报"和"低风险但收益稳定"的选择，你倾向于？',
    options: [
      { score: 1, text: '毫不犹豫选高风险的，富贵险中求', emoji: '🎲' },
      { score: 2, text: '倾向高风险，但会设一个自己能承受的损失底线', emoji: '⚡' },
      { score: 3, text: '分散配置，大部分选稳妥的，小部分去博高收益', emoji: '⚖️' },
      { score: 4, text: '仔细评估风险概率和自己的承受能力后再决定', emoji: '🔬' },
      { score: 5, text: '优先考虑最坏情况能否承受，确保安全垫后再谈收益', emoji: '🛡️' },
    ],
  },
  {
    id: 'lif-4',
    dimension: 'lifestyle',
    text: '你每天的生活节奏更接近下面哪种描述？',
    options: [
      { score: 1, text: '完全没有固定节奏，每天看心情', emoji: '🎢' },
      { score: 2, text: '有大概的作息，但很容易被打乱', emoji: '🌊' },
      { score: 3, text: '工作日的节奏比较固定，周末灵活一些', emoji: '📅' },
      { score: 4, text: '有意识地保持规律作息，即使周末也不会偏差太多', emoji: '⏰' },
      { score: 5, text: '长期保持稳定的生活节奏，并将重要事项（运动、学习等）嵌入每日固定日程', emoji: '🔄' },
    ],
  },
  {
    id: 'lif-5',
    dimension: 'lifestyle',
    text: '对于"保持学习新东西"这件事，你的真实状态是？',
    options: [
      { score: 1, text: '除非被迫（如工作要求），否则不太主动学', emoji: '😴' },
      { score: 2, text: '偶尔心血来潮学点感兴趣的，但三分钟热度', emoji: '🔥' },
      { score: 3, text: '有一两个长期坚持的兴趣爱好', emoji: '🎯' },
      { score: 4, text: '有意识地每年学一两项新技能', emoji: '📚' },
      { score: 5, text: '将终身学习视为一种生活方式，不断拓展自己的认知边界', emoji: '🌱' },
    ],
  },
  {
    id: 'lif-6',
    dimension: 'lifestyle',
    text: '你做了一个重要决定（如换工作、搬家），一段时间后回头看，你通常会？',
    options: [
      { score: 1, text: '很少回头看，做了就做了', emoji: '🚶' },
      { score: 2, text: '如果结果不好才会复盘一下', emoji: '🔍' },
      { score: 3, text: '会想想当初的决策过程对不对', emoji: '🤔' },
      { score: 4, text: '系统地复盘：当时的信息、判断逻辑、执行过程分别有没有问题', emoji: '📝' },
      { score: 5, text: '将复盘结论记录下来，形成自己的决策原则，用来指导未来类似的选择', emoji: '📖' },
    ],
  },
  {
    id: 'lif-7',
    dimension: 'lifestyle',
    text: '你的生活空间（房间/办公桌/电脑桌面）通常是？',
    options: [
      { score: 1, text: '比较杂乱，东西随手放，找东西经常要翻半天', emoji: '🌪️' },
      { score: 2, text: '偶尔整理一次，但很快又恢复原样', emoji: '🔄' },
      { score: 3, text: '大体上还算有序，常用的东西都有固定位置', emoji: '📦' },
      { score: 4, text: '定期整理，保持整洁，很少需要刻意找东西', emoji: '✨' },
      { score: 5, text: '有一套自己的组织系统，空间利用高效且舒适，整理是一种习惯', emoji: '🏠' },
    ],
  },
  {
    id: 'lif-8',
    dimension: 'lifestyle',
    text: '设想你 70 岁时的生活，你的心态更接近？',
    options: [
      { score: 1, text: '没想过那么远，想那么远干嘛', emoji: '🤷' },
      { score: 2, text: '偶尔闪过一些模糊的念头，但觉得太遥远', emoji: '🌫️' },
      { score: 3, text: '大概想过，希望那时候身体健康、有人陪伴', emoji: '💭' },
      { score: 4, text: '认真思考过，现在的一些选择（储蓄、锻炼）就是为那时候做准备', emoji: '🌳' },
      { score: 5, text: '有清晰的老年生活愿景，并且当前的生活方式就是在为那个长期目标服务', emoji: '🗺️' },
    ],
  },
];

/** 获取所有题目数量 */
export const TOTAL_QUESTIONS = questions.length;

/** 按维度获取题目 */
export function getQuestionsByDimension(dimension: string): Question[] {
  return questions.filter((q) => q.dimension === dimension);
}
