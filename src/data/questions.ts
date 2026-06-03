import type { Question, Dimension, DimensionBranch } from '../types';

// ============================================================
// 题库：80 题（每维度 20 题）
//   4 基准 + 8 高分分支 + 8 低分分支
// 每维度 4 个子主题，每个子主题在每分支池有 2 题
// 分支时每子主题随机选 1 题，保证覆盖面
// ============================================================

// 子主题标签
const Cog = { flex: '认知灵活性', verif: '信息验证', refl: '自我反思', curio: '求知开放' } as const;
const Emo = { regul: '情绪调节', empat: '共情能力', aware: '自我觉察', resil: '心理韧性' } as const;
const Soc = { resp: '责任担当', confl: '冲突处理', gene: '代际关怀', bound: '关系边界' } as const;
const Lif = { plan: '未来规划', heal: '健康管理', risk: '风险评估', grow: '终身成长' } as const;

const questionDefs: Question[] = [

  // ═══════════════════════════════════════════════════
  // 🧠 认知年龄 — 基准题 4 题
  // ═══════════════════════════════════════════════════
  {
    id: 'cog-1', dimension: 'cognitive', subtopic: Cog.flex,
    text: '你正在处理一件棘手的事，试了几种方法都没成功，这时你通常会？',
    options: [
      { score: 1, text: '感到沮丧，先放下去做别的', emoji: '😤' },
      { score: 2, text: '向同事或朋友求助', emoji: '🙋' },
      { score: 3, text: '休息一会儿换换脑子再回来', emoji: '☕' },
      { score: 4, text: '回头分析每一步，找出哪里出了问题', emoji: '🔍' },
      { score: 5, text: '排查问题之外，还思考是否有更根本的解决思路', emoji: '💡' },
    ],
  },
  {
    id: 'cog-2', dimension: 'cognitive', subtopic: Cog.verif,
    text: '在网上看到一则令人惊讶的说法时，你通常会？',
    options: [
      { score: 1, text: '觉得有道理就转发分享', emoji: '📤' },
      { score: 2, text: '和自己的想法一致就相信', emoji: '👍' },
      { score: 3, text: '先看看评论区其他人怎么说', emoji: '💬' },
      { score: 4, text: '查一下原始出处或数据来源', emoji: '🔎' },
      { score: 5, text: '交叉对比多个来源，确认事实后再形成判断', emoji: '📊' },
    ],
  },
  {
    id: 'cog-3', dimension: 'cognitive', subtopic: Cog.refl,
    text: '回顾过去自己做错的一个决定，你现在的感受更接近？',
    options: [
      { score: 1, text: '不太愿意回想，过去就过去了', emoji: '🙈' },
      { score: 2, text: '觉得自己当时太傻，有点尴尬', emoji: '😅' },
      { score: 3, text: '能说出当时为什么做了那个选择', emoji: '🤷' },
      { score: 4, text: '清楚分析出当时判断失误的原因', emoji: '📝' },
      { score: 5, text: '从中总结出了至今受用的教训', emoji: '🌱' },
    ],
  },
  {
    id: 'cog-4', dimension: 'cognitive', subtopic: Cog.curio,
    text: '你需要学习一项全新技能来完成工作，你通常如何入手？',
    options: [
      { score: 1, text: '直接上手试，遇到问题再说', emoji: '🚀' },
      { score: 2, text: '找一个视频教程跟着做', emoji: '📺' },
      { score: 3, text: '先看几个不同教程，选一个适合自己风格的', emoji: '🗂️' },
      { score: 4, text: '先了解整体框架和核心概念，再循序渐进', emoji: '📐' },
      { score: 5, text: '先明确学习目标和评估标准，制定计划再行动', emoji: '🎯' },
    ],
  },

  // ── 认知高分分支 8 题（flex/2, verif/2, refl/2, curio/2）──
  {
    id: 'cog-h1', dimension: 'cognitive', subtopic: Cog.verif,
    text: '你的观点在会议上被多数人反对，但你坚信自己是对的，你会？',
    options: [
      { score: 1, text: '坚持己见，争论到底', emoji: '🥊' },
      { score: 2, text: '保留意见，但也不再坚持', emoji: '🤐' },
      { score: 3, text: '请反对者逐一说明理由，逐一回应', emoji: '🗣️' },
      { score: 4, text: '会后补充数据和论据，用书面形式再次提出', emoji: '📄' },
      { score: 5, text: '先反思自己的论证是否有漏洞，完善后再重新沟通', emoji: '🔬' },
    ],
  },
  {
    id: 'cog-h2', dimension: 'cognitive', subtopic: Cog.flex,
    text: '面对一个"没有标准答案"的复杂社会问题，你的思考习惯是？',
    options: [
      { score: 1, text: '凭直觉站队，支持听起来有道理的一方', emoji: '👂' },
      { score: 2, text: '选一个与自己价值观最一致的观点', emoji: '🧭' },
      { score: 3, text: '了解双方的核心论据后再做判断', emoji: '⚖️' },
      { score: 4, text: '梳理问题的多个层面，承认不同层面可能有不同结论', emoji: '🗺️' },
      { score: 5, text: '愿意持续修正自己的观点，不急于得出"最终答案"', emoji: '🌊' },
    ],
  },
  {
    id: 'cog-h3', dimension: 'cognitive', subtopic: Cog.refl,
    text: '你做了个决策结果不好，你觉得主要是运气差，这时有人指出你决策本身有逻辑漏洞，你会？',
    options: [
      { score: 1, text: '觉得对方不了解情况，不太想听', emoji: '🙉' },
      { score: 2, text: '听对方说完，但内心不太认同', emoji: '😐' },
      { score: 3, text: '让对方具体指出漏洞在哪里', emoji: '🔍' },
      { score: 4, text: '认真考虑对方的意见，判断是否有道理', emoji: '🤔' },
      { score: 5, text: '感谢对方，把"运气差"和"自己可能有问题"分开审视', emoji: '🪞' },
    ],
  },
  {
    id: 'cog-h4', dimension: 'cognitive', subtopic: Cog.curio,
    text: '两个你信任的专家对同一件事给出了截然相反的建议，你会？',
    options: [
      { score: 1, text: '选那个听起来更顺耳的', emoji: '👂' },
      { score: 2, text: '看哪个专家更权威就信哪个', emoji: '🎓' },
      { score: 3, text: '自己查一下相关资料再做决定', emoji: '📚' },
      { score: 4, text: '分析他们分歧的根源——是事实认定不同，还是价值观不同', emoji: '🔬' },
      { score: 5, text: '综合双方的观点，形成自己的独立判断', emoji: '🧩' },
    ],
  },
  // ── 认知高分分支 新增 4 题 ──
  {
    id: 'cog-h5', dimension: 'cognitive', subtopic: Cog.verif,
    text: '你看到一个热搜话题引发了激烈争吵，两条对立观点都有大量支持者，你会？',
    options: [
      { score: 1, text: '站自己第一感觉认同的一边', emoji: '👆' },
      { score: 2, text: '读几篇支持自己看法的文章来确认', emoji: '📖' },
      { score: 3, text: '有意识地阅读双方的论证再形成看法', emoji: '⚖️' },
      { score: 4, text: '先寻找双方都认可的基础事实，再看分歧在哪', emoji: '🔍' },
      { score: 5, text: '在没有充分信息前，可以保持"暂不下结论"的状态', emoji: '⏸️' },
    ],
  },
  {
    id: 'cog-h6', dimension: 'cognitive', subtopic: Cog.flex,
    text: '你一直用某种方法做某件事，效果还行。有人建议你换一种完全不同的方式，你会？',
    options: [
      { score: 1, text: '"我一直都这么做，挺好的"', emoji: '🙅' },
      { score: 2, text: '礼貌听听，但不太可能真的去改', emoji: '👂' },
      { score: 3, text: '先在小范围试试新方法，看效果如何', emoji: '🧪' },
      { score: 4, text: '认真比较新旧方法的优劣再做决定', emoji: '📊' },
      { score: 5, text: '乐于尝试新方法，习惯本身不是目的、效果才是', emoji: '⚡' },
    ],
  },
  {
    id: 'cog-h7', dimension: 'cognitive', subtopic: Cog.refl,
    text: '完成一个大项目后，团队成员都在庆祝，你通常会？',
    options: [
      { score: 1, text: '全心庆祝，不要想工作的事', emoji: '🎉' },
      { score: 2, text: '庆祝为主，但也隐约想想哪里还能更好', emoji: '🤔' },
      { score: 3, text: '庆祝之后找时间自己回顾一下得失', emoji: '📝' },
      { score: 4, text: '组织团队一起做一次正式的项目复盘', emoji: '📋' },
      { score: 5, text: '复盘之后将经验提炼为团队可复用的流程改进', emoji: '🔄' },
    ],
  },
  {
    id: 'cog-h8', dimension: 'cognitive', subtopic: Cog.curio,
    text: '一次偶然的交谈中，你发现自己的某个"常识"其实是错的，你的感受是？',
    options: [
      { score: 1, text: '有点尴尬，下意识想岔开话题', emoji: '😅' },
      { score: 2, text: '承认错了但不太深究原因', emoji: '🤷' },
      { score: 3, text: '追问对方这个正确信息的来源', emoji: '❓' },
      { score: 4, text: '回去后自己去查证，纠正自己的认知', emoji: '🔍' },
      { score: 5, text: '觉得兴奋——发现自己的盲区是扩展认知边界的好机会', emoji: '🌟' },
    ],
  },

  // ── 认知低分分支 8 题（flex/2, verif/2, refl/2, curio/2）──
  {
    id: 'cog-l1', dimension: 'cognitive', subtopic: Cog.curio,
    text: '有人推荐你读一本和你观点完全相反的书，你会？',
    options: [
      { score: 1, text: '不感兴趣，不想浪费时间', emoji: '🙅' },
      { score: 2, text: '礼貌答应但大概率不会真的去读', emoji: '😅' },
      { score: 3, text: '翻一下目录和摘要，大概了解一下', emoji: '📖' },
      { score: 4, text: '认真读一下，看看对方的论证有没有道理', emoji: '🤔' },
      { score: 5, text: '读完还会找相关资料，深入了解这个不同的视角', emoji: '🔍' },
    ],
  },
  {
    id: 'cog-l2', dimension: 'cognitive', subtopic: Cog.verif,
    text: '有人用一个你从没听过的概念反驳你的观点，你的反应是？',
    options: [
      { score: 1, text: '跳过这个概念，继续坚持自己的观点', emoji: '⏭️' },
      { score: 2, text: '让对方解释一下是什么', emoji: '👂' },
      { score: 3, text: '当场用手机搜一下这个概念', emoji: '📱' },
      { score: 4, text: '记下来，回去自己研究一下再回应', emoji: '📝' },
      { score: 5, text: '先搞清楚概念，再用它来检验自己的观点是否站得住脚', emoji: '🔬' },
    ],
  },
  {
    id: 'cog-l3', dimension: 'cognitive', subtopic: Cog.refl,
    text: '做完一件重要的事之后，你会花时间复盘吗？',
    options: [
      { score: 1, text: '几乎不复盘，做完就完了', emoji: '🏁' },
      { score: 2, text: '只有结果不好才会回头想一下', emoji: '🔙' },
      { score: 3, text: '偶尔会想想哪里做得好哪里不好', emoji: '🤔' },
      { score: 4, text: '有复盘的习惯，会系统性地回顾关键节点', emoji: '📋' },
      { score: 5, text: '把复盘结论记下来，形成自己可复用的经验法则', emoji: '📖' },
    ],
  },
  {
    id: 'cog-l4', dimension: 'cognitive', subtopic: Cog.flex,
    text: '别人指出你某个习惯性的思维方式有问题，你会？',
    options: [
      { score: 1, text: '"我一直这么想的，没什么问题"', emoji: '🤷' },
      { score: 2, text: '表面接受，心里不太在意', emoji: '😐' },
      { score: 3, text: '问对方具体是哪个思维习惯有问题', emoji: '❓' },
      { score: 4, text: '回去后自己观察一下是不是真的存在这个问题', emoji: '🔍' },
      { score: 5, text: '有意识地尝试用不同的思维方式来看同一个问题', emoji: '🔄' },
    ],
  },
  // ── 认知低分分支 新增 4 题 ──
  {
    id: 'cog-l5', dimension: 'cognitive', subtopic: Cog.curio,
    text: '你发现了一个自己完全不了解的新领域（比如区块链、基因编辑），你的反应是？',
    options: [
      { score: 1, text: '离我太远，不需要了解', emoji: '🏃' },
      { score: 2, text: '看个科普视频了解一下大概', emoji: '📺' },
      { score: 3, text: '对这个领域产生了好奇，会多找几篇资料看看', emoji: '🔍' },
      { score: 4, text: '尝试理解它的核心原理而非只是记住结论', emoji: '🧩' },
      { score: 5, text: '思考这个领域的思维方式是否可以迁移到自己所在的领域', emoji: '🔗' },
    ],
  },
  {
    id: 'cog-l6', dimension: 'cognitive', subtopic: Cog.verif,
    text: '一个朋友转发了条消息说"某食品致癌"，你会怎么反应？',
    options: [
      { score: 1, text: '宁可信其有，马上转发提醒家人', emoji: '⚠️' },
      { score: 2, text: '心里有点慌，但等等看有没有更多人讨论', emoji: '😟' },
      { score: 3, text: '问转发的人这个说法的来源', emoji: '❓' },
      { score: 4, text: '自己去查权威机构（比如 WHO、疾控中心）的说法', emoji: '🔬' },
      { score: 5, text: '查询原始研究，分辨"相关"和"因果"的区别', emoji: '📊' },
    ],
  },
  {
    id: 'cog-l7', dimension: 'cognitive', subtopic: Cog.refl,
    text: '你花了很多时间做了一个决定，回头看其实可以有更好的选择，你的心态是？',
    options: [
      { score: 1, text: '后悔也没用，不要想太多', emoji: '🤷' },
      { score: 2, text: '觉得自己当时太傻了', emoji: '😅' },
      { score: 3, text: '接受"没有人能永远做出最优选择"', emoji: '☮️' },
      { score: 4, text: '分析自己当时忽略了哪些信息，下次避免', emoji: '📝' },
      { score: 5, text: '把每次"次优选择"当作优化自己决策系统的一次迭代', emoji: '🔄' },
    ],
  },
  {
    id: 'cog-l8', dimension: 'cognitive', subtopic: Cog.flex,
    text: '你有机会参加一个和你专业完全无关的讲座，你会？',
    options: [
      { score: 1, text: '不感兴趣，不去了', emoji: '🙅' },
      { score: 2, text: '如果有朋友一起去就去', emoji: '👥' },
      { score: 3, text: '去看看也无妨，说不定有收获', emoji: '🤷' },
      { score: 4, text: '觉得跨界也许有意外启发，主动参加', emoji: '💡' },
      { score: 5, text: '经常主动接触不同领域——创新的突破点往往在学科交叉处', emoji: '🌐' },
    ],
  },

  // ═══════════════════════════════════════════════════
  // 💙 情感年龄 — 基准题 4 题
  // ═══════════════════════════════════════════════════
  {
    id: 'emo-1', dimension: 'emotional', subtopic: Emo.regul,
    text: '发生了一件让你非常生气的事，在情绪最强烈的那一刻，你通常会？',
    options: [
      { score: 1, text: '直接发泄出来，喊出来或摔东西', emoji: '💢' },
      { score: 2, text: '忍着不发作，但整个人明显状态很差', emoji: '😤' },
      { score: 3, text: '先离开现场，给自己冷静的空间', emoji: '🚶' },
      { score: 4, text: '在心里告诉自己"先别急，冷静下来再处理"', emoji: '🧘' },
      { score: 5, text: '觉察到愤怒在身体里的感觉，有意识地让情绪平复后再回应', emoji: '🌊' },
    ],
  },
  {
    id: 'emo-2', dimension: 'emotional', subtopic: Emo.empat,
    text: '有人对你说了一句让你心里很不舒服的话，事后你通常会？',
    options: [
      { score: 1, text: '反复回想那句话，越想越气', emoji: '🔄' },
      { score: 2, text: '跟朋友吐槽，获取安慰', emoji: '💬' },
      { score: 3, text: '试着想"可能对方不是针对我"', emoji: '🤔' },
      { score: 4, text: '分析对方当时的情境和可能的动机', emoji: '🔍' },
      { score: 5, text: '能从对方的角度理解那句话的来由，即使不赞同也能放下', emoji: '☮️' },
    ],
  },
  {
    id: 'emo-3', dimension: 'emotional', subtopic: Emo.aware,
    text: '多种负面情绪（焦虑、烦躁、沮丧）同时涌上来时，你的状态是？',
    options: [
      { score: 1, text: '被情绪淹没，大脑一片混乱', emoji: '🌪️' },
      { score: 2, text: '只知道"心情很差"，说不清具体是什么感受', emoji: '☁️' },
      { score: 3, text: '能分清楚主要是哪几种情绪在影响自己', emoji: '📋' },
      { score: 4, text: '不但能分辨情绪，还能找到每种情绪对应的原因', emoji: '🗺️' },
      { score: 5, text: '清晰给每种情绪"命名"，并有针对性地逐一应对', emoji: '🎯' },
    ],
  },
  {
    id: 'emo-4', dimension: 'emotional', subtopic: Emo.resil,
    text: '朋友在你面前崩溃大哭，诉说困境，你的反应更接近？',
    options: [
      { score: 1, text: '坐立不安，不知道该怎么办', emoji: '😰' },
      { score: 2, text: '急于给出建议，想让对方快点好起来', emoji: '💊' },
      { score: 3, text: '安静地听对方说完，偶尔点头回应', emoji: '👂' },
      { score: 4, text: '先接纳对方的情绪，再慢慢了解情况', emoji: '🤲' },
      { score: 5, text: '陪对方梳理感受和处境，但不替他做决定', emoji: '🫂' },
    ],
  },

  // ── 情感高分分支 8 题（regul/2, empat/2, aware/2, resil/2）──
  {
    id: 'emo-h1', dimension: 'emotional', subtopic: Emo.resil,
    text: '你花了很多心思准备的方案被直接否决了，你的心态是？',
    options: [
      { score: 1, text: '情绪崩溃，觉得自己的努力被否定了', emoji: '😭' },
      { score: 2, text: '心里很不服气，觉得评判不公', emoji: '😒' },
      { score: 3, text: '失望但能接受，告诉自己下次再来', emoji: '😔' },
      { score: 4, text: '主动询问具体反馈意见，了解什么地方可以改进', emoji: '📝' },
      { score: 5, text: '将反馈纳入下一次方案，同时反思"被否定不等于被否定整个人"', emoji: '🌱' },
    ],
  },
  {
    id: 'emo-h2', dimension: 'emotional', subtopic: Emo.regul,
    text: '你和伴侣/好友因为一件小事产生了冷战，已经两天没说话了，你会？',
    options: [
      { score: 1, text: '等对方先开口，自己绝不先示弱', emoji: '🧱' },
      { score: 2, text: '心里想和好，但不知道怎么开口', emoji: '😶' },
      { score: 3, text: '发个轻松的消息试探一下对方的态度', emoji: '📱' },
      { score: 4, text: '主动说"我们聊聊吧"，把各自的感受摊开来说', emoji: '💬' },
      { score: 5, text: '先反思自己在冲突中的责任，再开诚布公地沟通', emoji: '🪞' },
    ],
  },
  {
    id: 'emo-h3', dimension: 'emotional', subtopic: Emo.empat,
    text: '你正在专注工作，旁边的人不断催促打扰，你通常会？',
    options: [
      { score: 1, text: '直接发火："能不能别催了！"', emoji: '🔥' },
      { score: 2, text: '虽然不说，但变得急躁、效率反而下降', emoji: '😤' },
      { score: 3, text: '戴上耳机或换个地方，减少干扰', emoji: '🎧' },
      { score: 4, text: '平静告知对方你需要专注，协商一个时间线', emoji: '🤝' },
      { score: 5, text: '理解对方催促的原因，调整节奏同时让对方安心', emoji: '☯️' },
    ],
  },
  {
    id: 'emo-h4', dimension: 'emotional', subtopic: Emo.aware,
    text: '等待一个重要结果（体检、面试、考核）的那几天，你通常？',
    options: [
      { score: 1, text: '焦虑难安，反复检查手机和邮箱', emoji: '📱' },
      { score: 2, text: '心里七上八下，做什么事都走神', emoji: '🎢' },
      { score: 3, text: '有点担心，但该做的事还是照常进行', emoji: '🚶' },
      { score: 4, text: '告诉自己"担心改变不了结果"，主动找事做转移注意力', emoji: '🧘' },
      { score: 5, text: '接受不确定性是生活的一部分，做好两手准备坦然等待', emoji: '☮️' },
    ],
  },
  // ── 情感高分分支 新增 4 题 ──
  {
    id: 'emo-h5', dimension: 'emotional', subtopic: Emo.resil,
    text: '你为一个人付出了很多，对方却似乎并不领情，你会？',
    options: [
      { score: 1, text: '觉得自己被利用了，非常愤怒', emoji: '😡' },
      { score: 2, text: '很受伤，以后不再对这个人好了', emoji: '💔' },
      { score: 3, text: '和对方沟通一下自己的感受', emoji: '💬' },
      { score: 4, text: '反思自己的付出是否确实是对方需要的', emoji: '🤔' },
      { score: 5, text: '调整自己的付出方式——不求回报但也要保护自己不内耗', emoji: '⚖️' },
    ],
  },
  {
    id: 'emo-h6', dimension: 'emotional', subtopic: Emo.regul,
    text: '你突然收到一个让自己非常失望的消息，而接下来还有一个重要会议需要你发言，你会？',
    options: [
      { score: 1, text: '完全无法集中注意力，会议表现大幅下降', emoji: '😞' },
      { score: 2, text: '勉强撑过去，但全程心不在焉', emoji: '😐' },
      { score: 3, text: '给自己 5 分钟消化情绪，然后切换回工作状态', emoji: '⏱️' },
      { score: 4, text: '把失望暂时"存"起来，告诉自己"先处理好眼前的事再来想这件事"', emoji: '📦' },
      { score: 5, text: '接受当下的双重状态——可以同时感到失望和保持专业', emoji: '☯️' },
    ],
  },
  {
    id: 'emo-h7', dimension: 'emotional', subtopic: Emo.empat,
    text: '一个同事最近工作状态明显下滑、经常出错，你会？',
    options: [
      { score: 1, text: '觉得他不认真，应该被提醒', emoji: '😤' },
      { score: 2, text: '和其他同事私下讨论他怎么了', emoji: '💬' },
      { score: 3, text: '找机会私下问他最近是不是遇到什么事了', emoji: '🤝' },
      { score: 4, text: '在了解情况后，力所能及地提供一些支持', emoji: '🫂' },
      { score: 5, text: '帮他一起找出影响工作的具体障碍，制定改进计划', emoji: '📋' },
    ],
  },
  {
    id: 'emo-h8', dimension: 'emotional', subtopic: Emo.aware,
    text: '你发现自己在某类情境下总是有过度的情绪反应（比如每次被质疑就特别激动），你会？',
    options: [
      { score: 1, text: '觉得是别人触发了你，问题在别人', emoji: '👉' },
      { score: 2, text: '知道自己有这个问题但不知道怎么改', emoji: '🤷' },
      { score: 3, text: '开始留意每次触发时的身体感受和想法', emoji: '🔍' },
      { score: 4, text: '追溯这个反应模式的源头——可能是某个早期的经历形成的', emoji: '🧭' },
      { score: 5, text: '每次触发后做情绪日记，系统性地重塑自己的反应模式', emoji: '📓' },
    ],
  },

  // ── 情感低分分支 8 题（regul/2, empat/2, aware/2, resil/2）──
  {
    id: 'emo-l1', dimension: 'emotional', subtopic: Emo.aware,
    text: '你因为一件小事发了很大的火，事后回想，你觉得？',
    options: [
      { score: 1, text: '就是对方的错，没什么好想的', emoji: '☝️' },
      { score: 2, text: '可能反应有点过，但对方也过分', emoji: '🤷' },
      { score: 3, text: '其实那件小事只是导火索，之前积累了很多情绪', emoji: '🪣' },
      { score: 4, text: '能清楚地回溯自己情绪积累的过程', emoji: '🗺️' },
      { score: 5, text: '把这当作了解自己"情绪触发点"的机会', emoji: '🔍' },
    ],
  },
  {
    id: 'emo-l2', dimension: 'emotional', subtopic: Emo.resil,
    text: '看到别人在朋友圈晒幸福，你有时会感到不舒服，你通常会？',
    options: [
      { score: 1, text: '直接划走，眼不见为净', emoji: '👆' },
      { score: 2, text: '在心里默默比较，觉得自己过得不够好', emoji: '😞' },
      { score: 3, text: '提醒自己"别人也只在晒好的一面"', emoji: '💭' },
      { score: 4, text: '承认自己确实有羡慕，但不让它影响对自己的评价', emoji: '⚖️' },
      { score: 5, text: '把注意力转回自己的生活，盘点自己拥有的好东西', emoji: '🙏' },
    ],
  },
  {
    id: 'emo-l3', dimension: 'emotional', subtopic: Emo.regul,
    text: '有人在你很累的时候提了一个不太合理的要求，你会？',
    options: [
      { score: 1, text: '直接拒绝，态度可能不太好', emoji: '🙅' },
      { score: 2, text: '勉强答应了，但心里很不舒服', emoji: '😮‍💨' },
      { score: 3, text: '解释自己现在状态不好，让对方理解', emoji: '💬' },
      { score: 4, text: '拒绝要求但不拒绝对方，给出一个替代方案', emoji: '🤝' },
      { score: 5, text: '既保护自己的边界，又不让对方觉得被冷落', emoji: '⚖️' },
    ],
  },
  {
    id: 'emo-l4', dimension: 'emotional', subtopic: Emo.empat,
    text: '回想最近一次与人发生摩擦，你对当时的自己有怎样的认识？',
    options: [
      { score: 1, text: '全是对方的错，我没什么问题', emoji: '☝️' },
      { score: 2, text: '对方问题大一些，但我也可能有小问题', emoji: '🤏' },
      { score: 3, text: '双方各有一些责任', emoji: '⚖️' },
      { score: 4, text: '能说出自己当时哪些反应是不够成熟的', emoji: '🪞' },
      { score: 5, text: '清楚自己的情绪触发点，并有意识地避免重复同样的模式', emoji: '🌱' },
    ],
  },
  // ── 情感低分分支 新增 4 题 ──
  {
    id: 'emo-l5', dimension: 'emotional', subtopic: Emo.aware,
    text: '当有人问你"你现在是什么感觉"时，你通常能？',
    options: [
      { score: 1, text: '说不太清楚，就是"好"或"不好"', emoji: '🤷' },
      { score: 2, text: '能说出大概是开心、难过、生气这种大类', emoji: '😊' },
      { score: 3, text: '能描述出比较具体的感受，比如"有点失落但不是很难过"', emoji: '🗣️' },
      { score: 4, text: '能区分相似但不同的情绪，比如"失望"和"灰心"', emoji: '🔬' },
      { score: 5, text: '能用丰富的词汇精确描述自己的情绪状态及其强度', emoji: '🎨' },
    ],
  },
  {
    id: 'emo-l6', dimension: 'emotional', subtopic: Emo.resil,
    text: '你期待已久的一件事情（比如旅行、演唱会）临时取消了，你会？',
    options: [
      { score: 1, text: '非常沮丧，一整天心情都被毁了', emoji: '😫' },
      { score: 2, text: '失望，但过几个小时就好了', emoji: '😔' },
      { score: 3, text: '马上想有什么替代方案可以填补这段时间', emoji: '💡' },
      { score: 4, text: '接受意外，用这段时间做一件平时没时间做的事', emoji: '🎁' },
      { score: 5, text: '明白失望是暂时的，主动调整心态去寻找意外的"机会窗口"', emoji: '🌟' },
    ],
  },
  {
    id: 'emo-l7', dimension: 'emotional', subtopic: Emo.regul,
    text: '你看到一则令人揪心的社会新闻，情绪受到了很大冲击，你会？',
    options: [
      { score: 1, text: '忍不住一直刷相关消息，越看越难受', emoji: '📱' },
      { score: 2, text: '心情沉重但不知道能做什么', emoji: '😟' },
      { score: 3, text: '和身边的人聊聊自己的感受', emoji: '💬' },
      { score: 4, text: '主动停止刷消息，给自己设置"信息消化时间"', emoji: '⏸️' },
      { score: 5, text: '承认世界的复杂性，在共情和自我保护之间找到平衡', emoji: '☯️' },
    ],
  },
  {
    id: 'emo-l8', dimension: 'emotional', subtopic: Emo.empat,
    text: '你的朋友做了一个你认为很蠢的决定，他来跟你倾诉后果，你会？',
    options: [
      { score: 1, text: '"我早就跟你说了吧"', emoji: '☝️' },
      { score: 2, text: '虽然不说"早就告诉过你"，但心里这么想', emoji: '😐' },
      { score: 3, text: '先听完他的感受，不急着给评价', emoji: '👂' },
      { score: 4, text: '理解他做那个决定时的处境，帮他从后果中提取教训', emoji: '🤲' },
      { score: 5, text: '陪伴他面对后果，同时让他感受到不管怎样都有人支持', emoji: '🫂' },
    ],
  },

  // ═══════════════════════════════════════════════════
  // 🤝 社会年龄 — 基准题 4 题
  // ═══════════════════════════════════════════════════
  {
    id: 'soc-1', dimension: 'social', subtopic: Soc.resp,
    text: '答应了帮朋友一个忙，临近时发现自己那天特别累，你会？',
    options: [
      { score: 1, text: '找个借口推掉，反正朋友应该能理解', emoji: '🙈' },
      { score: 2, text: '心里很挣扎，最后还是去了但不太情愿', emoji: '😮‍💨' },
      { score: 3, text: '既然答应了就一定会去，哪怕累一点', emoji: '💪' },
      { score: 4, text: '去了之后认真帮忙把事情解决好', emoji: '🤝' },
      { score: 5, text: '不但去帮忙，还会主动提醒对方之后需要注意的事项', emoji: '🌟' },
    ],
  },
  {
    id: 'soc-2', dimension: 'social', subtopic: Soc.confl,
    text: '你和一位同事/同学对某件事的处理方式有严重分歧，你通常会？',
    options: [
      { score: 1, text: '坚持按自己的方式来，不想妥协', emoji: '🙅' },
      { score: 2, text: '各做各的，互不干涉', emoji: '↔️' },
      { score: 3, text: '双方坐下来把各自的理由说清楚', emoji: '🗣️' },
      { score: 4, text: '找出双方方案中各自合理的部分，尝试融合', emoji: '🧩' },
      { score: 5, text: '先确立共同目标，再基于目标反推谁的方法更合适', emoji: '🎯' },
    ],
  },
  {
    id: 'soc-3', dimension: 'social', subtopic: Soc.gene,
    text: '身边有一个比你年轻很多的人在重要事情上犯了错，你的态度是？',
    options: [
      { score: 1, text: '"这都不会？" 不太想管', emoji: '🙄' },
      { score: 2, text: '告诉他哪里错了，让他自己去改', emoji: '👉' },
      { score: 3, text: '帮他分析错误的原因，示范正确的做法', emoji: '👨‍🏫' },
      { score: 4, text: '不仅教方法，还分享自己当年犯过类似错误的经历', emoji: '📖' },
      { score: 5, text: '借此机会帮他建立工作方法论，持续关注他的成长', emoji: '🌱' },
    ],
  },
  {
    id: 'soc-4', dimension: 'social', subtopic: Soc.bound,
    text: '你同时承担着多个角色（工作、家庭、朋友），它们出现时间冲突时，你通常？',
    options: [
      { score: 1, text: '谁催得急就先应付谁', emoji: '🔥' },
      { score: 2, text: '优先处理工作/学业，其他先放放', emoji: '💼' },
      { score: 3, text: '临时协调，尽量各方都照顾到', emoji: '🤹' },
      { score: 4, text: '根据事情的重要性和紧急性来判断优先级', emoji: '📊' },
      { score: 5, text: '提前规划各角色的时间，冲突时坦诚沟通给出替代方案', emoji: '📅' },
    ],
  },

  // ── 社会高分分支 8 题（resp/2, confl/2, gene/2, bound/2）──
  {
    id: 'soc-h1', dimension: 'social', subtopic: Soc.resp,
    text: '你所在的社区出现了一个公共问题（如垃圾乱放、停车纠纷），你的反应是？',
    options: [
      { score: 1, text: '这不关我的事，总有人会处理', emoji: '🤷' },
      { score: 2, text: '私下抱怨，但不采取行动', emoji: '😤' },
      { score: 3, text: '有人在群里发起讨论就参与一下', emoji: '💬' },
      { score: 4, text: '主动在群里提出讨论，推动形成解决方案', emoji: '📢' },
      { score: 5, text: '联络相关方、组织协商、推动问题从根源上解决', emoji: '🏗️' },
    ],
  },
  {
    id: 'soc-h2', dimension: 'social', subtopic: Soc.bound,
    text: '一个朋友总是在你这倾诉烦恼，但你需要倾诉时他却没什么耐心，你会？',
    options: [
      { score: 1, text: '直接疏远，不再联系', emoji: '👋' },
      { score: 2, text: '心里不舒服但继续当他的"情绪垃圾桶"', emoji: '😞' },
      { score: 3, text: '下次他找你时，暗示自己也需要被倾听', emoji: '💭' },
      { score: 4, text: '坦诚地和对方聊这段关系的不平衡', emoji: '💬' },
      { score: 5, text: '设置边界的同时给对方调整的机会——有些人不自知而不是不愿', emoji: '⚖️' },
    ],
  },
  {
    id: 'soc-h3', dimension: 'social', subtopic: Soc.confl,
    text: '一个团队项目中，有成员明显在"搭便车"不干活，你会？',
    options: [
      { score: 1, text: '直接向上级或老师举报', emoji: '📢' },
      { score: 2, text: '和其他成员私下抱怨', emoji: '😤' },
      { score: 3, text: '在群聊中委婉提醒所有人进度', emoji: '💬' },
      { score: 4, text: '私下找对方了解情况——也许有我们不知道的原因', emoji: '🤝' },
      { score: 5, text: '了解情况后，和团队一起制定明确的责任分配和检查机制', emoji: '📋' },
    ],
  },
  {
    id: 'soc-h4', dimension: 'social', subtopic: Soc.gene,
    text: '过年回家，长辈说了你完全不认同的观点，你会？',
    options: [
      { score: 1, text: '直接反驳，争论起来', emoji: '⚔️' },
      { score: 2, text: '低头吃饭不说话，心里不认同', emoji: '🍚' },
      { score: 3, text: '"嗯嗯"敷衍过去，岔开话题', emoji: '🔄' },
      { score: 4, text: '试着了解他为什么这么想，背后有什么经历', emoji: '👂' },
      { score: 5, text: '在不伤和气的范围内表达自己的看法，同时尊重对方持有不同观点的权利', emoji: '🤝' },
    ],
  },
  // ── 社会高分分支 新增 4 题 ──
  {
    id: 'soc-h5', dimension: 'social', subtopic: Soc.resp,
    text: '你在一个志愿者组织中承担了一项任务，但后来发现这件事比预期难得多，你会？',
    options: [
      { score: 1, text: '说明原因后退出', emoji: '🏃' },
      { score: 2, text: '勉强做完这次，下次不再接了', emoji: '😮‍💨' },
      { score: 3, text: '坚持做完，但降低标准', emoji: '⚖️' },
      { score: 4, text: '提前和团队沟通困难，协商调整目标或争取资源', emoji: '💬' },
      { score: 5, text: '信守承诺但总结教训，下次接任务前更审慎评估自己的能力边界', emoji: '📋' },
    ],
  },
  {
    id: 'soc-h6', dimension: 'social', subtopic: Soc.bound,
    text: '一个同事经常在下班后给你发工作消息，你感到私人时间被占用，你会？',
    options: [
      { score: 1, text: '忽略消息，上班再回', emoji: '📵' },
      { score: 2, text: '看到了就回，但心里不舒服', emoji: '😤' },
      { score: 3, text: '延迟回复——让对方逐渐习惯你不会即时响应', emoji: '⏰' },
      { score: 4, text: '在合适的时机坦诚表达："非紧急的事我们上班聊"', emoji: '💬' },
      { score: 5, text: '在保护自己边界的同时，了解对方的需求模式，找到双方都能接受的沟通规则', emoji: '🤝' },
    ],
  },
  {
    id: 'soc-h7', dimension: 'social', subtopic: Soc.confl,
    text: '两个你都很在意的朋友之间发生了矛盾，各自来找你评理，你会？',
    options: [
      { score: 1, text: '站自己更亲近的那一方', emoji: '👈' },
      { score: 2, text: '两边都安慰，但不表态', emoji: '🤲' },
      { score: 3, text: '分别听两边的说法，尝试理解各自的视角', emoji: '👂' },
      { score: 4, text: '帮他们找到误解的关键点，鼓励直接沟通', emoji: '🔑' },
      { score: 5, text: '不替任何一方做判断，但为双方创造理解对方视角的机会', emoji: '🌉' },
    ],
  },
  {
    id: 'soc-h8', dimension: 'social', subtopic: Soc.gene,
    text: '你手头有一个可以传授给新人的方法论，但整理出来需要花不少时间，你会？',
    options: [
      { score: 1, text: '太花时间了，算了', emoji: '🤷' },
      { score: 2, text: '口头跟他们讲一下要点', emoji: '🗣️' },
      { score: 3, text: '抽时间写一份简洁的指南', emoji: '📝' },
      { score: 4, text: '系统整理成可复用的文档，方便后来的新人', emoji: '📚' },
      { score: 5, text: '不仅整理方法，还会解释背后的思考逻辑，让对方知其然也知其所以然', emoji: '🧠' },
    ],
  },

  // ── 社会低分分支 8 题（resp/2, confl/2, gene/2, bound/2）──
  {
    id: 'soc-l1', dimension: 'social', subtopic: Soc.bound,
    text: '你和一位老朋友因为生活轨迹不同，联系越来越少了，你通常会？',
    options: [
      { score: 1, text: '顺其自然，淡了就淡了', emoji: '🍂' },
      { score: 2, text: '偶尔看到对方朋友圈点个赞', emoji: '👍' },
      { score: 3, text: '过节时主动发个问候', emoji: '💌' },
      { score: 4, text: '隔段时间约出来见一面，主动维系关系', emoji: '☕' },
      { score: 5, text: '理解人生阶段不同，但刻意留出时间维护真正重要的关系', emoji: '💎' },
    ],
  },
  {
    id: 'soc-l2', dimension: 'social', subtopic: Soc.confl,
    text: '你在一个聚会上遇到一群你不认识的人，你会？',
    options: [
      { score: 1, text: '找角落待着，玩手机', emoji: '📱' },
      { score: 2, text: '只和认识的人说话', emoji: '👋' },
      { score: 3, text: '有人主动搭话就聊，自己不主动', emoji: '😊' },
      { score: 4, text: '找一个看起来也好相处的人主动聊几句', emoji: '💬' },
      { score: 5, text: '自然地自我介绍，尝试了解不同人的故事', emoji: '🌟' },
    ],
  },
  {
    id: 'soc-l3', dimension: 'social', subtopic: Soc.gene,
    text: '朋友约你周末一起做一件你不太感兴趣的事，你会？',
    options: [
      { score: 1, text: '直接说不去，找别的借口', emoji: '🙅' },
      { score: 2, text: '勉强去了但全程不太投入', emoji: '😐' },
      { score: 3, text: '去了，尽量参与其中', emoji: '🤝' },
      { score: 4, text: '去了并试着发现其中的乐趣', emoji: '🔍' },
      { score: 5, text: '理解朋友的需求——有时候陪伴本身就是意义所在', emoji: '💙' },
    ],
  },
  {
    id: 'soc-l4', dimension: 'social', subtopic: Soc.resp,
    text: '有人请你帮忙做一件你不太会的事情，你会？',
    options: [
      { score: 1, text: '直接说不会，推荐他找别人', emoji: '👈' },
      { score: 2, text: '勉强答应，自己私下着急学', emoji: '😰' },
      { score: 3, text: '坦诚说"我不太会但可以试试"', emoji: '🤷' },
      { score: 4, text: '接下任务，把它当作学习新东西的机会', emoji: '💡' },
      { score: 5, text: '评估自己的能力边界后给一个诚实的回应，需要时主动帮对方找到替代资源', emoji: '🎯' },
    ],
  },
  // ── 社会低分分支 新增 4 题 ──
  {
    id: 'soc-l5', dimension: 'social', subtopic: Soc.bound,
    text: '有人向你借钱，但你觉得对方可能不太容易还，你会？',
    options: [
      { score: 1, text: '直接说没钱，拒绝', emoji: '🙅' },
      { score: 2, text: '借了，但做好收不回来的心理准备', emoji: '💸' },
      { score: 3, text: '问清楚用途和还款计划后再决定', emoji: '📋' },
      { score: 4, text: '如果金额不大且能承受损失就借，金额较大则坦诚说明顾虑', emoji: '⚖️' },
      { score: 5, text: '在帮对方的善意和保护双方关系之间找到平衡——有时候不借钱反而是对关系负责', emoji: '🎯' },
    ],
  },
  {
    id: 'soc-l6', dimension: 'social', subtopic: Soc.confl,
    text: '有人在公开场合对你的工作成果提出了尖锐批评，你会？',
    options: [
      { score: 1, text: '当场反驳，维护自己的面子', emoji: '🛡️' },
      { score: 2, text: '表面不说什么，心里很不舒服', emoji: '😤' },
      { score: 3, text: '感谢对方的反馈，说会考虑', emoji: '🙏' },
      { score: 4, text: '请对方具体说说哪里可以改进', emoji: '🔍' },
      { score: 5, text: '区分"对方的态度"和"对方说的内容"——前者可以不计较，后者认真对待', emoji: '⚖️' },
    ],
  },
  {
    id: 'soc-l7', dimension: 'social', subtopic: Soc.gene,
    text: '你发现你的经验和知识对身边一些人有帮助，但主动分享可能显得"好为人师"，你会？',
    options: [
      { score: 1, text: '不说，省得被人嫌', emoji: '🤐' },
      { score: 2, text: '如果有人问就说，没人问就不提', emoji: '🤷' },
      { score: 3, text: '在合适的场合自然地分享自己的经验', emoji: '🗣️' },
      { score: 4, text: '用提问的方式引导对方思考，而不是直接给答案', emoji: '❓' },
      { score: 5, text: '创造一个轻松的交流氛围，让分享变成双向的对话而非单向的教导', emoji: '🔄' },
    ],
  },
  {
    id: 'soc-l8', dimension: 'social', subtopic: Soc.resp,
    text: '你承接了一件不属于你职责范围但确实需要有人做的事，你通常会？',
    options: [
      { score: 1, text: '能不接就不接，多一事不如少一事', emoji: '🙅' },
      { score: 2, text: '迫于压力接下，但心里不情愿', emoji: '😮‍💨' },
      { score: 3, text: '接下并尽力做好', emoji: '💪' },
      { score: 4, text: '接下后，把事情做得比预期的更好', emoji: '⭐' },
      { score: 5, text: '不仅做好，还在过程中建立流程避免下次再出现"没人负责"的情况', emoji: '🔄' },
    ],
  },

  // ═══════════════════════════════════════════════════
  // 🌿 生活态度年龄 — 基准题 4 题
  // ═══════════════════════════════════════════════════
  {
    id: 'lif-1', dimension: 'lifestyle', subtopic: Lif.plan,
    text: '发了一笔意料之外的奖金（比如 5000 元），你的第一反应是？',
    options: [
      { score: 1, text: '马上买那个一直想要的东西犒劳自己', emoji: '🛍️' },
      { score: 2, text: '拿出一部分消费，剩下的存起来', emoji: '💳' },
      { score: 3, text: '大部分存起来，小部分用来改善生活', emoji: '💰' },
      { score: 4, text: '按自己的财务计划分配：储蓄、投资、消费各一部分', emoji: '📊' },
      { score: 5, text: '纳入长期规划，考虑投资增值或用于自我提升', emoji: '📈' },
    ],
  },
  {
    id: 'lif-2', dimension: 'lifestyle', subtopic: Lif.heal,
    text: '身体发出了疲劳信号（头痛、失眠、精力下降），你通常会？',
    options: [
      { score: 1, text: '扛一扛就过去了，年轻无所谓', emoji: '💪' },
      { score: 2, text: '吃点药缓解症状，继续干', emoji: '💊' },
      { score: 3, text: '意识到该休息了，调整一两天', emoji: '😴' },
      { score: 4, text: '认真审视自己的作息和工作量，做出具体调整', emoji: '📋' },
      { score: 5, text: '将身体健康视为不可透支的本钱，建立长期可持续的作息和锻炼习惯', emoji: '🌿' },
    ],
  },
  {
    id: 'lif-3', dimension: 'lifestyle', subtopic: Lif.risk,
    text: '面临"高风险可能高回报"和"低风险但收益稳定"的选择，你倾向于？',
    options: [
      { score: 1, text: '毫不犹豫选高风险，富贵险中求', emoji: '🎲' },
      { score: 2, text: '倾向高风险，但设一个自己能承受的损失底线', emoji: '⚡' },
      { score: 3, text: '大部分选稳妥的，小部分去博高收益', emoji: '⚖️' },
      { score: 4, text: '仔细评估风险概率和自己承受能力后再决定', emoji: '🔬' },
      { score: 5, text: '优先考虑最坏情况能否承受，确保安全垫后再谈收益', emoji: '🛡️' },
    ],
  },
  {
    id: 'lif-4', dimension: 'lifestyle', subtopic: Lif.grow,
    text: '对于"保持学习新东西"这件事，你的真实状态是？',
    options: [
      { score: 1, text: '除非被迫（如工作要求）否则不太主动学', emoji: '😴' },
      { score: 2, text: '偶尔心血来潮学点感兴趣的，但三分钟热度', emoji: '🔥' },
      { score: 3, text: '有一两个长期坚持的兴趣爱好', emoji: '🎯' },
      { score: 4, text: '有意识地每年学一两项新技能', emoji: '📚' },
      { score: 5, text: '将终身学习视为一种生活方式，不断拓展认知边界', emoji: '🌱' },
    ],
  },

  // ── 生活态度高分分支 8 题（plan/2, heal/2, risk/2, grow/2）──
  {
    id: 'lif-h1', dimension: 'lifestyle', subtopic: Lif.plan,
    text: '你做了一个重要决定，一段时间后回头看结果不太好，你会？',
    options: [
      { score: 1, text: '后悔当初的决定，但也没办法', emoji: '😞' },
      { score: 2, text: '告诉自己"谁能想到会这样呢"', emoji: '🤷' },
      { score: 3, text: '想想当初的决策过程哪里出了问题', emoji: '🤔' },
      { score: 4, text: '系统复盘当时的决策逻辑和信息完整度', emoji: '📝' },
      { score: 5, text: '将复盘结论记录下来，形成自己未来决策的原则', emoji: '📖' },
    ],
  },
  {
    id: 'lif-h2', dimension: 'lifestyle', subtopic: Lif.heal,
    text: '你的生活空间（房间/办公桌/电脑桌面）通常是？',
    options: [
      { score: 1, text: '东西随手放，找东西经常要翻半天', emoji: '🌪️' },
      { score: 2, text: '偶尔整理一次，很快又恢复原样', emoji: '🔄' },
      { score: 3, text: '大体有序，常用的东西有固定位置', emoji: '📦' },
      { score: 4, text: '定期整理保持整洁，很少需要刻意找东西', emoji: '✨' },
      { score: 5, text: '有一套自己的组织系统，空间利用高效且舒适', emoji: '🏠' },
    ],
  },
  {
    id: 'lif-h3', dimension: 'lifestyle', subtopic: Lif.risk,
    text: '设想你 70 岁时的生活，你的心态更接近？',
    options: [
      { score: 1, text: '没想过那么远', emoji: '🤷' },
      { score: 2, text: '偶尔闪过模糊的念头，但觉得太遥远', emoji: '🌫️' },
      { score: 3, text: '大概想过，希望那时候身体健康、有人陪伴', emoji: '💭' },
      { score: 4, text: '认真思考过，现在的一些选择（储蓄、锻炼）就是为那时候准备的', emoji: '🌳' },
      { score: 5, text: '有清晰的老年生活愿景，且当前的生活方式就在为长期目标服务', emoji: '🗺️' },
    ],
  },
  {
    id: 'lif-h4', dimension: 'lifestyle', subtopic: Lif.grow,
    text: '你每天的生活节奏更接近？',
    options: [
      { score: 1, text: '完全没有固定节奏，每天看心情', emoji: '🎢' },
      { score: 2, text: '有大概的作息，但容易被意外打乱', emoji: '🌊' },
      { score: 3, text: '工作日的节奏比较固定，周末灵活一些', emoji: '📅' },
      { score: 4, text: '有意识地保持规律作息，重要事项嵌入每日固定日程', emoji: '⏰' },
      { score: 5, text: '长期保持稳定的生活节奏，形成习惯后几乎不需要意志力来维持', emoji: '🔄' },
    ],
  },
  // ── 生活态度高分分支 新增 4 题 ──
  {
    id: 'lif-h5', dimension: 'lifestyle', subtopic: Lif.plan,
    text: '你有一些长期目标（如买房、创业、FIRE），你目前的进展是？',
    options: [
      { score: 1, text: '只有大概的想法，还没开始行动', emoji: '💭' },
      { score: 2, text: '断断续续在努力，但进展很慢', emoji: '🐢' },
      { score: 3, text: '有明确计划，按部就班推进中', emoji: '📋' },
      { score: 4, text: '定期检查进度，根据实际情况动态调整计划', emoji: '📊' },
      { score: 5, text: '目标已在按规划推进，同时保持灵活性应对变化', emoji: '🧭' },
    ],
  },
  {
    id: 'lif-h6', dimension: 'lifestyle', subtopic: Lif.heal,
    text: '谈到"锻炼身体"，下列描述最接近你的是？',
    options: [
      { score: 1, text: '知道该锻炼但一直没开始', emoji: '🛋️' },
      { score: 2, text: '偶尔心血来潮运动一下', emoji: '🤸' },
      { score: 3, text: '每周有固定的运动时间', emoji: '📅' },
      { score: 4, text: '有具体的运动计划，包含有氧、力量、柔韧性等不同维度', emoji: '🏋️' },
      { score: 5, text: '锻炼已成为生活不可或缺的一部分，不是"坚持"而是"享受"', emoji: '🏃' },
    ],
  },
  {
    id: 'lif-h7', dimension: 'lifestyle', subtopic: Lif.risk,
    text: '你有一个朋友邀请你一起投资一个"听起来很不错"的项目，你会？',
    options: [
      { score: 1, text: '朋友推荐的应该没问题，跟着投', emoji: '🤝' },
      { score: 2, text: '投一小笔试试水', emoji: '💧' },
      { score: 3, text: '先了解项目的具体情况再决定', emoji: '🔍' },
      { score: 4, text: '独立做尽职调查，不被朋友关系影响判断', emoji: '📊' },
      { score: 5, text: '用自己能承受全部损失的金额参与，权当学习和支持朋友', emoji: '⚖️' },
    ],
  },
  {
    id: 'lif-h8', dimension: 'lifestyle', subtopic: Lif.grow,
    text: '你参加了一次培训或读了一本好书之后，接下来通常会？',
    options: [
      { score: 1, text: '感觉学到了很多，但很快就忘了', emoji: '💨' },
      { score: 2, text: '记了一些笔记，偶尔翻看', emoji: '📝' },
      { score: 3, text: '把学到的一两个方法应用在实际中', emoji: '🔧' },
      { score: 4, text: '系统整理知识要点，形成自己的理解框架', emoji: '🧩' },
      { score: 5, text: '将新知识和已有的知识体系连接，输出成自己的方法论或教给别人', emoji: '🔗' },
    ],
  },

  // ── 生活态度低分分支 8 题（plan/2, heal/2, risk/2, grow/2）──
  {
    id: 'lif-l1', dimension: 'lifestyle', subtopic: Lif.risk,
    text: '你对"生活需要一些不确定性和冒险"这句话的看法是？',
    options: [
      { score: 1, text: '完全同意！不确定性让生活有趣', emoji: '🎲' },
      { score: 2, text: '基本同意，但别太冒险就行', emoji: '👍' },
      { score: 3, text: '看情况，小冒险可以大冒险不行', emoji: '⚖️' },
      { score: 4, text: '稳定比刺激更重要，但偶尔冒险也不错', emoji: '🏠' },
      { score: 5, text: '可预见的生活更有安全感，对冒险不感兴趣', emoji: '🛡️' },
    ],
  },
  {
    id: 'lif-l2', dimension: 'lifestyle', subtopic: Lif.plan,
    text: '到了一个新城市，你有一天空闲时间，你更想？',
    options: [
      { score: 1, text: '不做计划，走到哪算哪', emoji: '🚶' },
      { score: 2, text: '大概有个方向，边走边探索', emoji: '🧭' },
      { score: 3, text: '提前查好几个想去的地方', emoji: '📋' },
      { score: 4, text: '查好路线和时间，高效打卡', emoji: '🗺️' },
      { score: 5, text: '提前做好详细攻略，按计划精准执行', emoji: '📐' },
    ],
  },
  {
    id: 'lif-l3', dimension: 'lifestyle', subtopic: Lif.grow,
    text: '你有一个自己很喜欢的旧习惯，但有人建议你换一种更高效的方式，你会？',
    options: [
      { score: 1, text: '不想改，习惯了的就是最好的', emoji: '🙅' },
      { score: 2, text: '听听就算了，不一定真去改', emoji: '👂' },
      { score: 3, text: '先试试新方式，不好用再换回来', emoji: '🔄' },
      { score: 4, text: '比较新旧两种方式的实际效果再做决定', emoji: '📊' },
      { score: 5, text: '乐意接受能提升效率的改变，习惯本身不是目的', emoji: '⚡' },
    ],
  },
  {
    id: 'lif-l4', dimension: 'lifestyle', subtopic: Lif.heal,
    text: '马上要发工资了，你这个月还剩一些钱，你会？',
    options: [
      { score: 1, text: '刚好用完，不剩就不剩', emoji: '🤷' },
      { score: 2, text: '剩了就当意外之喜，花掉庆祝一下', emoji: '🎉' },
      { score: 3, text: '剩多少存多少', emoji: '💰' },
      { score: 4, text: '按计划存起来，和下个月的钱一起规划', emoji: '📊' },
      { score: 5, text: '自动归入储蓄/投资计划，让钱在不知不觉中积累', emoji: '🏦' },
    ],
  },
  // ── 生活态度低分分支 新增 4 题 ──
  {
    id: 'lif-l5', dimension: 'lifestyle', subtopic: Lif.risk,
    text: '一个朋友提议来一场"说走就走的旅行"——明天出发、目的地随机，你的反应是？',
    options: [
      { score: 1, text: '太刺激了！立刻收拾行李', emoji: '🧳' },
      { score: 2, text: '有点心动，但担心准备不充分', emoji: '🤔' },
      { score: 3, text: '可以接受，但至少查一下天气和住宿', emoji: '🔍' },
      { score: 4, text: '喜欢有准备的旅行，建议把时间推迟几天做些规划', emoji: '📋' },
      { score: 5, text: '只有提前安排好的旅行才能让自己真正放松享受', emoji: '🧘' },
    ],
  },
  {
    id: 'lif-l6', dimension: 'lifestyle', subtopic: Lif.plan,
    text: '你的手机相册通常是？',
    options: [
      { score: 1, text: '几千张照片，从来没整理过', emoji: '🌪️' },
      { score: 2, text: '偶尔删一些重复的，清清空间', emoji: '🗑️' },
      { score: 3, text: '会定期翻看，删除不需要的', emoji: '📂' },
      { score: 4, text: '有分类整理的习惯，重要照片都有备份', emoji: '☁️' },
      { score: 5, text: '有完整的整理和备份体系，任何一张照片都能快速找到', emoji: '📊' },
    ],
  },
  {
    id: 'lif-l7', dimension: 'lifestyle', subtopic: Lif.grow,
    text: '如果有人告诉你"你说话的方式容易让人误会"，你通常的反应是？',
    options: [
      { score: 1, text: '"我说话就这样，误会是别人的问题"', emoji: '🤷' },
      { score: 2, text: '有点在意但不会刻意改变', emoji: '😐' },
      { score: 3, text: '问对方具体是什么表达让人误会了', emoji: '❓' },
      { score: 4, text: '尝试调整自己的表达方式，观察对方反应的变化', emoji: '🔄' },
      { score: 5, text: '把这视为沟通能力提升的契机，主动学习更有效的表达方式', emoji: '📚' },
    ],
  },
  {
    id: 'lif-l8', dimension: 'lifestyle', subtopic: Lif.heal,
    text: '关于"睡眠"，下列描述最接近你的是？',
    options: [
      { score: 1, text: '经常熬夜，困了就睡，不困就不睡', emoji: '🌙' },
      { score: 2, text: '知道熬夜不好但很难改', emoji: '😴' },
      { score: 3, text: '大多数时候能保证 7 小时左右的睡眠', emoji: '⏰' },
      { score: 4, text: '有固定的入睡和起床时间，很少打破', emoji: '📅' },
      { score: 5, text: '将优质睡眠视为高效生活的基础，有完整的睡前仪式和睡眠环境优化', emoji: '🛏️' },
    ],
  },

  // ═══════════════════════════════════════════════════
  // 反向计分题（8题，打破"成熟=高分"的模式）
  // 选项得分：5=年轻特质，1=成熟特质；通过 reverse 标记翻转
  // ═══════════════════════════════════════════════════
  {
    id: 'cog-r1', dimension: 'cognitive', subtopic: Cog.flex, reverse: true,
    text: '有人告诉你"这件事没有标准流程"，让你自己摸索，你的感受是？',
    options: [
      { score: 1, text: '不安，希望至少有个框架或参考', emoji: '😟' },
      { score: 2, text: '有点茫然，但可以试一试', emoji: '🤔' },
      { score: 3, text: '无所谓，有指引没指引都行', emoji: '😐' },
      { score: 4, text: '挺有意思的，我喜欢自己探索', emoji: '🔍' },
      { score: 5, text: '太好了！自由发挥正是我擅长的', emoji: '🚀' },
    ],
  },
  {
    id: 'cog-r2', dimension: 'cognitive', subtopic: Cog.curio, reverse: true,
    text: '你对"凭直觉做决策"这件事怎么看？',
    options: [
      { score: 1, text: '直觉不可靠，每次都应该系统分析', emoji: '📊' },
      { score: 2, text: '重要的事还是要分析，小事可以凭直觉', emoji: '⚖️' },
      { score: 3, text: '有时候直觉比分析更准', emoji: '🤔' },
      { score: 4, text: '经常凭直觉做决定，大部分时候都不错', emoji: '💫' },
      { score: 5, text: '我相信直觉是自己经验的内化，是一种高级智慧', emoji: '🧠' },
    ],
  },
  {
    id: 'emo-r1', dimension: 'emotional', subtopic: Emo.regul, reverse: true,
    text: '看了一部非常感人的电影，你在影院/屏幕前哭了，你会？',
    options: [
      { score: 1, text: '觉得不好意思，迅速擦干眼泪', emoji: '😳' },
      { score: 2, text: '偷偷哭，不让旁边的人发现', emoji: '🤫' },
      { score: 3, text: '自然地哭，不刻意掩饰', emoji: '😢' },
      { score: 4, text: '哭就哭了，被感动是人之常情', emoji: '💧' },
      { score: 5, text: '尽情沉浸其中——能被打动的能力本身就值得珍惜', emoji: '🎭' },
    ],
  },
  {
    id: 'emo-r2', dimension: 'emotional', subtopic: Emo.aware, reverse: true,
    text: '有人对你说"你太敏感了"，你的内心反应是？',
    options: [
      { score: 1, text: '觉得被冒犯了，敏感是缺点', emoji: '😤' },
      { score: 2, text: '以后尽量表现得"不那么敏感"', emoji: '😐' },
      { score: 3, text: '敏感有好有坏，看情况', emoji: '🤷' },
      { score: 4, text: '敏感让我更细腻，是优势不是缺点', emoji: '💪' },
      { score: 5, text: '敏感是我感知世界的方式——它让我成为我', emoji: '🌟' },
    ],
  },
  {
    id: 'soc-r1', dimension: 'social', subtopic: Soc.bound, reverse: true,
    text: '一个陌生人（比如同航班邻座、咖啡馆同桌）向你搭话聊天，你的自然反应是？',
    options: [
      { score: 1, text: '礼貌回应一句就戴上耳机', emoji: '🎧' },
      { score: 2, text: '简单聊几句但不会深入', emoji: '👋' },
      { score: 3, text: '看对方是什么样的人再决定聊不聊', emoji: '👀' },
      { score: 4, text: '觉得萍水相逢的闲聊挺有意思的', emoji: '😊' },
      { score: 5, text: '很享受和陌生人随机碰撞出的对话', emoji: '🌟' },
    ],
  },
  {
    id: 'soc-r2', dimension: 'social', subtopic: Soc.gene, reverse: true,
    text: '听到一群年轻人在热烈讨论你不了解的新文化现象（比如某个梗/综艺/游戏），你的反应是？',
    options: [
      { score: 1, text: '觉得跟我没关系，不关注', emoji: '🤷' },
      { score: 2, text: '听听他们在说什么但不去了解', emoji: '👂' },
      { score: 3, text: '如果有机会就顺便了解一下', emoji: '📱' },
      { score: 4, text: '觉得挺有趣的，会主动问问他们在聊什么', emoji: '❓' },
      { score: 5, text: '喜欢了解年轻一代关心什么——保持和时代连接很重要', emoji: '🔗' },
    ],
  },
  {
    id: 'lif-r1', dimension: 'lifestyle', subtopic: Lif.risk, reverse: true,
    text: '周末早上醒来，发现一整天没有任何安排，你的心情是？',
    options: [
      { score: 1, text: '有点焦虑，不知道该干什么', emoji: '😟' },
      { score: 2, text: '还行，随便找点事做', emoji: '🤷' },
      { score: 3, text: '自由的感觉，慢慢想做什么', emoji: '😊' },
      { score: 4, text: '兴奋！空白的一天充满可能', emoji: '🎨' },
      { score: 5, text: '太好了！就喜欢这种即兴探索的快乐', emoji: '🌟' },
    ],
  },
  {
    id: 'lif-r2', dimension: 'lifestyle', subtopic: Lif.grow, reverse: true,
    text: '你发现自己花了一整个下午做了一件"没用但有趣"的事，你的感受是？',
    options: [
      { score: 1, text: '懊悔，觉得自己浪费了时间', emoji: '😞' },
      { score: 2, text: '有点愧疚，但已经做了就算了', emoji: '😅' },
      { score: 3, text: '偶尔放松一下也挺好', emoji: '😊' },
      { score: 4, text: '不觉得浪费——快乐本身就是有用的', emoji: '💫' },
      { score: 5, text: '最好的时光往往就藏在那些"没用"的事里', emoji: '🌿' },
    ],
  },
];

// ============================================================
// 导出
// ============================================================

/** ID → Question 快速查找 */
export const questionMap: Record<string, Question> = {};
for (const q of questionDefs) {
  questionMap[q.id] = q;
}

/** 从分支池中按子主题各随机选 1 题 */
function pickFromPool(poolIds: string[], subtopicGroups: string[][]): string[] {
  // Fisher-Yates shuffle with Math.random (different each call)
  const result: string[] = [];
  for (const group of subtopicGroups) {
    const available = group.filter((id) => poolIds.includes(id));
    if (available.length > 0) {
      result.push(available[Math.floor(Math.random() * available.length)]);
    }
  }
  return result;
}

/** 每个维度的分支配置 */
export const DIMENSION_BRANCHES: Record<Dimension, DimensionBranch> = {
  cognitive: {
    baseline: ['cog-1', 'cog-2', 'cog-3', 'cog-4'],
    branchHigh: {
      questionIds: ['cog-h1','cog-h2','cog-h3','cog-h4','cog-h5','cog-h6','cog-h7','cog-h8'],
      subtopicGroups: [['cog-h1','cog-h5'], ['cog-h2','cog-h6'], ['cog-h3','cog-h7'], ['cog-h4','cog-h8']],
    },
    branchLow: {
      questionIds: ['cog-l1','cog-l2','cog-l3','cog-l4','cog-l5','cog-l6','cog-l7','cog-l8','cog-r1','cog-r2'],
      subtopicGroups: [['cog-l1','cog-l5'], ['cog-l2','cog-l6','cog-r1'], ['cog-l3','cog-l7'], ['cog-l4','cog-l8','cog-r2']],
    },
    branchThreshold: 13,
  },
  emotional: {
    baseline: ['emo-1', 'emo-2', 'emo-3', 'emo-4'],
    branchHigh: {
      questionIds: ['emo-h1','emo-h2','emo-h3','emo-h4','emo-h5','emo-h6','emo-h7','emo-h8'],
      subtopicGroups: [['emo-h1','emo-h5'], ['emo-h2','emo-h6'], ['emo-h3','emo-h7'], ['emo-h4','emo-h8']],
    },
    branchLow: {
      questionIds: ['emo-l1','emo-l2','emo-l3','emo-l4','emo-l5','emo-l6','emo-l7','emo-l8','emo-r1','emo-r2'],
      subtopicGroups: [['emo-l1','emo-l5'], ['emo-l2','emo-l6','emo-r1'], ['emo-l3','emo-l7','emo-r2'], ['emo-l4','emo-l8']],
    },
    branchThreshold: 13,
  },
  social: {
    baseline: ['soc-1', 'soc-2', 'soc-3', 'soc-4'],
    branchHigh: {
      questionIds: ['soc-h1','soc-h2','soc-h3','soc-h4','soc-h5','soc-h6','soc-h7','soc-h8'],
      subtopicGroups: [['soc-h1','soc-h5'], ['soc-h2','soc-h6'], ['soc-h3','soc-h7'], ['soc-h4','soc-h8']],
    },
    branchLow: {
      questionIds: ['soc-l1','soc-l2','soc-l3','soc-l4','soc-l5','soc-l6','soc-l7','soc-l8','soc-r1','soc-r2'],
      subtopicGroups: [['soc-l1','soc-l5','soc-r1'], ['soc-l2','soc-l6'], ['soc-l3','soc-l7','soc-r2'], ['soc-l4','soc-l8']],
    },
    branchThreshold: 13,
  },
  lifestyle: {
    baseline: ['lif-1', 'lif-2', 'lif-3', 'lif-4'],
    branchHigh: {
      questionIds: ['lif-h1','lif-h2','lif-h3','lif-h4','lif-h5','lif-h6','lif-h7','lif-h8'],
      subtopicGroups: [['lif-h1','lif-h5'], ['lif-h2','lif-h6'], ['lif-h3','lif-h7'], ['lif-h4','lif-h8']],
    },
    branchLow: {
      questionIds: ['lif-l1','lif-l2','lif-l3','lif-l4','lif-l5','lif-l6','lif-l7','lif-l8','lif-r1','lif-r2'],
      subtopicGroups: [['lif-l1','lif-l5','lif-r1'], ['lif-l2','lif-l6'], ['lif-l3','lif-l7'], ['lif-l4','lif-l8','lif-r2']],
    },
    branchThreshold: 13,
  },
};

/** 选择分支题：从匹配的分支池中，按子主题各随机选 1 题 */
export function selectBranchQuestions(dimension: Dimension, isHigh: boolean): string[] {
  const branch = DIMENSION_BRANCHES[dimension];
  const pool = isHigh ? branch.branchHigh : branch.branchLow;
  return pickFromPool(pool.questionIds, pool.subtopicGroups);
}

/** 总题目数（题库大小） */
export const TOTAL_BANK_SIZE = questionDefs.length;

/** 单次测试总题数（16 基准 + 16 分支 = 32） */
export const QUESTIONS_PER_TEST = 32;

/** 获取答案的实际分值（处理反向计分） */
function getEffectiveScore(id: string, rawScore: number): number {
  const q = questionMap[id];
  if (q?.reverse) {
    return 6 - rawScore; // flip: 1↔5, 2↔4, 3 stays
  }
  return rawScore;
}

export function getDimensionTotalScore(
  answers: Record<string, number>,
  dimension: Dimension
): number {
  let total = 0;
  const branch = DIMENSION_BRANCHES[dimension];
  const allIds = [
    ...branch.baseline,
    ...branch.branchHigh.questionIds,
    ...branch.branchLow.questionIds,
  ];
  for (const id of allIds) {
    const raw = answers[id];
    if (raw !== undefined) {
      total += getEffectiveScore(id, raw);
    }
  }
  return total;
}

/** 累计每维度基准题总分（用于分支判断，也处理反向计分） */
export function getDimensionRunningScore(
  answers: Record<string, number>,
  dimension: Dimension
): number {
  const branch = DIMENSION_BRANCHES[dimension];
  let score = 0;
  for (const id of branch.baseline) {
    const raw = answers[id];
    if (raw !== undefined) {
      score += getEffectiveScore(id, raw);
    }
  }
  return score;
}

/** calculate.ts 兼容 */
export function getQuestionsByDimension(dimension: string): Question[] {
  return questionDefs.filter((q) => q.dimension === dimension);
}
