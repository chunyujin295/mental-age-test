import type { Question, Dimension, DimensionBranch } from '../types';

// ============================================================
// 所有题目以 ID → Question 的 Map 形式存储
// 每维度结构：4 基准题 + 4 高分分支题 + 4 低分分支题
// 评分：1=偏年轻/冲动/直觉, 5=偏成熟/克制/系统
// ============================================================

const questionDefs: Question[] = [

  // ═══════════════════════════════════════════════════════
  // 维度一：认知年龄 — 基准题（4 题，所有人回答）
  // ═══════════════════════════════════════════════════════
  {
    id: 'cog-1',
    dimension: 'cognitive',
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
    id: 'cog-2',
    dimension: 'cognitive',
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
    id: 'cog-3',
    dimension: 'cognitive',
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
    id: 'cog-4',
    dimension: 'cognitive',
    text: '你需要学习一项全新技能来完成工作，你通常如何入手？',
    options: [
      { score: 1, text: '直接上手试，遇到问题再说', emoji: '🚀' },
      { score: 2, text: '找一个视频教程跟着做', emoji: '📺' },
      { score: 3, text: '先看几个不同教程，选一个适合自己风格的', emoji: '🗂️' },
      { score: 4, text: '先了解整体框架和核心概念，再循序渐进', emoji: '📐' },
      { score: 5, text: '先明确学习目标和评估标准，制定计划再行动', emoji: '🎯' },
    ],
  },

  // 认知年龄 — 高分分支题（基准总分 ≥ 13 时使用，深入考察系统性思维）
  {
    id: 'cog-h1',
    dimension: 'cognitive',
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
    id: 'cog-h2',
    dimension: 'cognitive',
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
    id: 'cog-h3',
    dimension: 'cognitive',
    text: '你做了一个决策，结果不好，你觉得主要原因是运气差，这时有人指出你决策本身有逻辑漏洞，你会？',
    options: [
      { score: 1, text: '觉得对方不了解情况，不太想听', emoji: '🙉' },
      { score: 2, text: '听对方说完，但内心不太认同', emoji: '😐' },
      { score: 3, text: '让对方具体指出漏洞在哪里', emoji: '🔍' },
      { score: 4, text: '认真考虑对方的意见，判断是否有道理', emoji: '🤔' },
      { score: 5, text: '感谢对方，把"运气差"和"自己可能有问题"分开审视', emoji: '🪞' },
    ],
  },
  {
    id: 'cog-h4',
    dimension: 'cognitive',
    text: '两个你信任的专家对同一件事给出了截然相反的建议，你会？',
    options: [
      { score: 1, text: '选那个听起来更顺耳的', emoji: '👂' },
      { score: 2, text: '看哪个专家更权威就信哪个', emoji: '🎓' },
      { score: 3, text: '自己查一下相关资料再做决定', emoji: '📚' },
      { score: 4, text: '分析他们分歧的根源——是事实认定不同，还是价值观不同', emoji: '🔬' },
      { score: 5, text: '综合双方的观点，形成自己的独立判断', emoji: '🧩' },
    ],
  },

  // 认知年龄 — 低分分支题（基准总分 < 13 时使用，鼓励反思和深度思考）
  {
    id: 'cog-l1',
    dimension: 'cognitive',
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
    id: 'cog-l2',
    dimension: 'cognitive',
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
    id: 'cog-l3',
    dimension: 'cognitive',
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
    id: 'cog-l4',
    dimension: 'cognitive',
    text: '别人指出你某个习惯性的思维方式有问题，你会？',
    options: [
      { score: 1, text: '"我一直这么想的，没什么问题"', emoji: '🤷' },
      { score: 2, text: '表面接受，心里不太在意', emoji: '😐' },
      { score: 3, text: '问对方具体是哪个思维习惯有问题', emoji: '❓' },
      { score: 4, text: '回去后自己观察一下是不是真的存在这个问题', emoji: '🔍' },
      { score: 5, text: '有意识地尝试用不同的思维方式来看同一个问题', emoji: '🔄' },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // 维度二：情感年龄 — 基准题（4 题）
  // ═══════════════════════════════════════════════════════
  {
    id: 'emo-1',
    dimension: 'emotional',
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
    id: 'emo-2',
    dimension: 'emotional',
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
    id: 'emo-3',
    dimension: 'emotional',
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
    id: 'emo-4',
    dimension: 'emotional',
    text: '朋友在你面前崩溃大哭，诉说困境，你的反应更接近？',
    options: [
      { score: 1, text: '坐立不安，不知道该怎么办', emoji: '😰' },
      { score: 2, text: '急于给出建议，想让对方快点好起来', emoji: '💊' },
      { score: 3, text: '安静地听对方说完，偶尔点头回应', emoji: '👂' },
      { score: 4, text: '先接纳对方的情绪，再慢慢了解情况', emoji: '🤲' },
      { score: 5, text: '陪对方梳理感受和处境，但不替他做决定', emoji: '🫂' },
    ],
  },

  // 情感年龄 — 高分分支题（深入考察情绪调节策略）
  {
    id: 'emo-h1',
    dimension: 'emotional',
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
    id: 'emo-h2',
    dimension: 'emotional',
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
    id: 'emo-h3',
    dimension: 'emotional',
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
    id: 'emo-h4',
    dimension: 'emotional',
    text: '等待一个重要结果（体检、面试、考核）的那几天，你通常？',
    options: [
      { score: 1, text: '焦虑难安，反复检查手机和邮箱', emoji: '📱' },
      { score: 2, text: '心里七上八下，做什么事都走神', emoji: '🎢' },
      { score: 3, text: '有点担心，但该做的事还是照常进行', emoji: '🚶' },
      { score: 4, text: '告诉自己"担心改变不了结果"，主动找事做转移注意力', emoji: '🧘' },
      { score: 5, text: '接受不确定性是生活的一部分，做好两手准备坦然等待', emoji: '☮️' },
    ],
  },

  // 情感年龄 — 低分分支题（引导情绪觉察）
  {
    id: 'emo-l1',
    dimension: 'emotional',
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
    id: 'emo-l2',
    dimension: 'emotional',
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
    id: 'emo-l3',
    dimension: 'emotional',
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
    id: 'emo-l4',
    dimension: 'emotional',
    text: '回想最近一次与人发生摩擦，你对当时的自己有怎样的认识？',
    options: [
      { score: 1, text: '全是对方的错，我没什么问题', emoji: '☝️' },
      { score: 2, text: '对方问题大一些，但我也可能有小问题', emoji: '🤏' },
      { score: 3, text: '双方各有一些责任', emoji: '⚖️' },
      { score: 4, text: '能说出自己当时哪些反应是不够成熟的', emoji: '🪞' },
      { score: 5, text: '清楚自己的情绪触发点，并有意识地避免重复同样的模式', emoji: '🌱' },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // 维度三：社会年龄 — 基准题（4 题）
  // ═══════════════════════════════════════════════════════
  {
    id: 'soc-1',
    dimension: 'social',
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
    id: 'soc-2',
    dimension: 'social',
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
    id: 'soc-3',
    dimension: 'social',
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
    id: 'soc-4',
    dimension: 'social',
    text: '你同时承担着多个角色（工作、家庭、朋友），它们出现时间冲突时，你通常？',
    options: [
      { score: 1, text: '谁催得急就先应付谁', emoji: '🔥' },
      { score: 2, text: '优先处理工作/学业，其他先放放', emoji: '💼' },
      { score: 3, text: '临时协调，尽量各方都照顾到', emoji: '🤹' },
      { score: 4, text: '根据事情的重要性和紧急性来判断优先级', emoji: '📊' },
      { score: 5, text: '提前规划各角色的时间，冲突时坦诚沟通给出替代方案', emoji: '📅' },
    ],
  },

  // 社会年龄 — 高分分支题
  {
    id: 'soc-h1',
    dimension: 'social',
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
    id: 'soc-h2',
    dimension: 'social',
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
    id: 'soc-h3',
    dimension: 'social',
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
    id: 'soc-h4',
    dimension: 'social',
    text: '过年回家，长辈说了你完全不认同的观点，你会？',
    options: [
      { score: 1, text: '直接反驳，争论起来', emoji: '⚔️' },
      { score: 2, text: '低头吃饭不说话，心里不认同', emoji: '🍚' },
      { score: 3, text: '"嗯嗯"敷衍过去，岔开话题', emoji: '🔄' },
      { score: 4, text: '试着了解他为什么这么想，背后有什么经历', emoji: '👂' },
      { score: 5, text: '在不伤和气的范围内表达自己的看法，同时尊重对方持有不同观点的权利', emoji: '🤝' },
    ],
  },

  // 社会年龄 — 低分分支题
  {
    id: 'soc-l1',
    dimension: 'social',
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
    id: 'soc-l2',
    dimension: 'social',
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
    id: 'soc-l3',
    dimension: 'social',
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
    id: 'soc-l4',
    dimension: 'social',
    text: '有人请你帮忙做一件你不太会的事情，你会？',
    options: [
      { score: 1, text: '直接说不会，推荐他找别人', emoji: '👈' },
      { score: 2, text: '勉强答应，自己私下着急学', emoji: '😰' },
      { score: 3, text: '坦诚说"我不太会但可以试试"', emoji: '🤷' },
      { score: 4, text: '接下任务，把它当作学习新东西的机会', emoji: '💡' },
      { score: 5, text: '评估自己的能力边界后给一个诚实的回应，需要时主动帮对方找到替代资源', emoji: '🎯' },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // 维度四：生活态度年龄 — 基准题（4 题）
  // ═══════════════════════════════════════════════════════
  {
    id: 'lif-1',
    dimension: 'lifestyle',
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
    id: 'lif-2',
    dimension: 'lifestyle',
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
    id: 'lif-3',
    dimension: 'lifestyle',
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
    id: 'lif-4',
    dimension: 'lifestyle',
    text: '对于"保持学习新东西"这件事，你的真实状态是？',
    options: [
      { score: 1, text: '除非被迫（如工作要求）否则不太主动学', emoji: '😴' },
      { score: 2, text: '偶尔心血来潮学点感兴趣的，但三分钟热度', emoji: '🔥' },
      { score: 3, text: '有一两个长期坚持的兴趣爱好', emoji: '🎯' },
      { score: 4, text: '有意识地每年学一两项新技能', emoji: '📚' },
      { score: 5, text: '将终身学习视为一种生活方式，不断拓展认知边界', emoji: '🌱' },
    ],
  },

  // 生活态度年龄 — 高分分支题
  {
    id: 'lif-h1',
    dimension: 'lifestyle',
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
    id: 'lif-h2',
    dimension: 'lifestyle',
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
    id: 'lif-h3',
    dimension: 'lifestyle',
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
    id: 'lif-h4',
    dimension: 'lifestyle',
    text: '你每天的生活节奏更接近？',
    options: [
      { score: 1, text: '完全没有固定节奏，每天看心情', emoji: '🎢' },
      { score: 2, text: '有大概的作息，但容易被意外打乱', emoji: '🌊' },
      { score: 3, text: '工作日的节奏比较固定，周末灵活一些', emoji: '📅' },
      { score: 4, text: '有意识地保持规律作息，重要事项嵌入每日固定日程', emoji: '⏰' },
      { score: 5, text: '长期保持稳定的生活节奏，形成习惯后几乎不需要意志力来维持', emoji: '🔄' },
    ],
  },

  // 生活态度年龄 — 低分分支题
  {
    id: 'lif-l1',
    dimension: 'lifestyle',
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
    id: 'lif-l2',
    dimension: 'lifestyle',
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
    id: 'lif-l3',
    dimension: 'lifestyle',
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
    id: 'lif-l4',
    dimension: 'lifestyle',
    text: '马上要发工资了，你这个月还剩一些钱，你会？',
    options: [
      { score: 1, text: '刚好用完，不剩就不剩', emoji: '🤷' },
      { score: 2, text: '剩了就当意外之喜，花掉庆祝一下', emoji: '🎉' },
      { score: 3, text: '剩多少存多少', emoji: '💰' },
      { score: 4, text: '按计划存起来，和下个月的钱一起规划', emoji: '📊' },
      { score: 5, text: '自动归入储蓄/投资计划，让钱在不知不觉中积累', emoji: '🏦' },
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

/** 所有题目数量（题库总量，非单次测试量） */
export const TOTAL_QUESTIONS = questionDefs.length;

/** 每个维度的分支配置 */
export const DIMENSION_BRANCHES: Record<Dimension, DimensionBranch> = {
  cognitive: {
    baseline: ['cog-1', 'cog-2', 'cog-3', 'cog-4'],
    branchHigh: ['cog-h1', 'cog-h2', 'cog-h3', 'cog-h4'],
    branchLow: ['cog-l1', 'cog-l2', 'cog-l3', 'cog-l4'],
    branchThreshold: 13, // 基准题总分 ≥ 13 走高分分支
  },
  emotional: {
    baseline: ['emo-1', 'emo-2', 'emo-3', 'emo-4'],
    branchHigh: ['emo-h1', 'emo-h2', 'emo-h3', 'emo-h4'],
    branchLow: ['emo-l1', 'emo-l2', 'emo-l3', 'emo-l4'],
    branchThreshold: 13,
  },
  social: {
    baseline: ['soc-1', 'soc-2', 'soc-3', 'soc-4'],
    branchHigh: ['soc-h1', 'soc-h2', 'soc-h3', 'soc-h4'],
    branchLow: ['soc-l1', 'soc-l2', 'soc-l3', 'soc-l4'],
    branchThreshold: 13,
  },
  lifestyle: {
    baseline: ['lif-1', 'lif-2', 'lif-3', 'lif-4'],
    branchHigh: ['lif-h1', 'lif-h2', 'lif-h3', 'lif-h4'],
    branchLow: ['lif-l1', 'lif-l2', 'lif-l3', 'lif-l4'],
    branchThreshold: 13,
  },
};

/** 累计每维度总分（仅用于计算分支，不是最终分数） */
export function getDimensionRunningScore(
  answers: Record<string, number>,
  dimension: Dimension
): number {
  const branch = DIMENSION_BRANCHES[dimension];
  let score = 0;
  for (const id of branch.baseline) {
    score += answers[id] ?? 0;
  }
  return score;
}

/** 计算一个维度的总分（基准 + 分支） */
export function getDimensionTotalScore(
  answers: Record<string, number>,
  dimension: Dimension
): number {
  let total = 0;
  const branch = DIMENSION_BRANCHES[dimension];
  const allIds = [...branch.baseline, ...branch.branchHigh, ...branch.branchLow];
  for (const id of allIds) {
    total += answers[id] ?? 0;
  }
  return total;
}

/** 用于 calculate.ts 的兼容接口 */
export function getQuestionsByDimension(dimension: string): Question[] {
  return questionDefs.filter((q) => q.dimension === dimension);
}

/** 单次测试总题数（16 基准 + 16 分支 = 32） */
export const QUESTIONS_PER_TEST =
  Object.values(DIMENSION_BRANCHES).reduce(
    (sum, b) => sum + b.baseline.length + b.branchHigh.length,
    0
  );
