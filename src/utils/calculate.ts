import type { Dimension, DimensionResult, BaseResult, AgeComparison } from '../types';
import { DIMENSION_LABELS, DIMENSION_ICONS } from '../types';
import { getDimensionTotalScore } from '../data/questions';

// ============================================================
// 维度科学背景
// ============================================================
const DIM_CONTEXTS: Record<Dimension, string> = {
  cognitive:
    '认知年龄衡量的是你处理信息、面对新知识和复杂问题时的思维模式。它关注求知方式、思维灵活度以及反思习惯，而非智力高低。',
  emotional:
    '情感年龄基于 Gross 情绪调节过程模型，衡量你觉察、理解和管理情绪的能力——从情绪产生的那一刻到你的行为反应。',
  social:
    '社会年龄参考 Erikson 心理社会发展理论中成年期的核心任务，衡量你在人际和社群中的角色承担方式与责任意识。',
  lifestyle:
    '生活态度年龄基于社会情绪选择理论（Carstensen, SST），衡量你规划未来、管理风险以及对待健康与成长的方式。',
};

// ============================================================
// 年龄映射
// ============================================================
function mapToAge(rawScore: number): number {
  return Math.round(15 + ((rawScore - 8) / (40 - 8)) * (60 - 15));
}

function mapToPercentage(rawScore: number): number {
  return Math.round(((rawScore - 8) / (40 - 8)) * 100);
}

// ============================================================
// 阶段一：基础结果（不需要实际年龄）
// ============================================================

/** 根据绝对心理年龄生成年龄无关的维度分析 */
function baseDimAnalysis(dimension: Dimension, mentalAge: number): {
  analysis: string;
  strength: string;
  suggestion: string;
} {
  if (mentalAge >= 50) {
    const t: Record<Dimension, { analysis: string; strength: string; suggestion: string }> = {
      cognitive: {
        analysis: '你在认知方面表现出高度的系统性和元认知能力——不仅分析问题本身，还会审视自己的分析框架是否合理。面对复杂问题时，你会从多个角度综合考量后再做判断。',
        strength: '深度思考者——你的元认知能力（对自身思维的觉察和反思）非常突出。',
        suggestion: '可以尝试通过写作或教学将自己的思维方法论分享给他人，教学相长。',
      },
      emotional: {
        analysis: '你在情绪管理方面达到了非常成熟的水平。你能清晰识别和命名自己的各种情绪，并有针对性地应对。面对压力，你善于通过"认知重评"来调节情绪反应。',
        strength: '情绪智慧大师——你拥有高情绪粒度和成熟的调节策略。',
        suggestion: '你的情绪能力可以拓展到帮助他人。在朋友情绪低落时，可以温和地帮对方梳理情绪的来源。',
      },
      social: {
        analysis: '你在社会关系中表现出高度的责任感、包容性和建设性。你乐于帮助后辈成长，善于跨越代际差异进行沟通，体现了超越自我的价值追求。',
        strength: '关系建设者——具备成熟的冲突解决能力和代际关怀意识。',
        suggestion: '考虑在工作中承担 mentor 角色，或将你的社会智慧辐射到更广的社区。',
      },
      lifestyle: {
        analysis: '你过着高度自律和有规划的生活，在健康、财务和时间管理上都有清晰的体系。你将"对未来的投资"内化为生活习惯，而非刻意的约束。',
        strength: '生活建筑师——自律已变成习惯而非负担，长期主义思维深入日常。',
        suggestion: '规律是你的力量，但偶尔的"计划外冒险"能为生活增添意想不到的色彩。',
      },
    };
    return t[dimension];
  }

  if (mentalAge >= 38) {
    const t: Record<Dimension, { analysis: string; strength: string; suggestion: string }> = {
      cognitive: {
        analysis: '你处理信息的方式偏向谨慎和系统化。面对相反观点时，你会尝试理解对方的推理过程，即使不认同也能看到其中的合理成分。',
        strength: '系统性思维——善于在复杂信息中理清脉络，做出周全的判断。',
        suggestion: '你的谨慎是优势，但可为不同类型的决策设定不同的思考时间上限，避免过度分析。',
      },
      emotional: {
        analysis: '你对自己的情绪有较好的觉察和管理能力。生气时你会先让自己冷静，面对负面事件时能有意识地进行认知重评——尝试从不同角度重新理解。',
        strength: '情绪觉察者——能在情绪升起的当下意识到它，而非被情绪裹挟。',
        suggestion: '进一步练习"情绪标签化"：用精确的词命名情绪，精确命名本身就是一种有效的调节。',
      },
      social: {
        analysis: '你重视承诺，会主动维护重要的长期关系。在冲突中你能以共同目标为导向来寻找方案，对不同观点保持尊重。',
        strength: '可靠担当——信守承诺和主动负责是你的核心社交特质。',
        suggestion: '注意关系的双向性：试着主动表达自己的需求，健康的长期关系建立在相互支持的基础上。',
      },
      lifestyle: {
        analysis: '你有比较清晰的生活规划意识，会关注身体健康，重要决定后会进行一定复盘。你倾向于先确保安全垫再考虑冒险。',
        strength: '稳健规划者——重视秩序和可预见性，在健康和财务方面有基本的规划架构。',
        suggestion: '尝试建立"个人决策原则清单"：将每次重要复盘的经验记录下来，形成自己的判断标准。',
      },
    };
    return t[dimension];
  }

  if (mentalAge >= 24) {
    const t: Record<Dimension, { analysis: string; strength: string; suggestion: string }> = {
      cognitive: {
        analysis: '你的认知风格在直觉和理性之间保持了良好平衡。日常小事凭经验快速判断，重要决策则会多角度分析。你能根据情境灵活切换思维深度。',
        strength: '认知灵活性——能根据情境需要切换不同的思维模式。',
        suggestion: '培养定期复盘的习惯：每月回顾一个重要决定，分析判断逻辑和实际结果的差距。',
      },
      emotional: {
        analysis: '你能在一定程度上管理情绪，但在面对强烈情绪或持续压力时，可能还需要更多应对策略。你有基本的共情能力，对他人情绪有一定敏感度。',
        strength: '情绪平衡者——在情绪的体验和管理之间找到了基本健康的平衡点。',
        suggestion: '建立自己的"情绪工具箱"：列出 3-5 种对你有用的调节方式，下次情绪波动时逐一试用。',
      },
      social: {
        analysis: '你在社交中基本能做到信守承诺和换位思考。面对人际冲突时，你倾向于通过沟通来寻找解决方案。在自我需求和他人需求之间维持着基本平衡。',
        strength: '社交均衡者——在关系的付出与获得之间保持着健康的平衡感。',
        suggestion: '尝试在关系中更主动：不只是回应需求，而是主动发现身边人可能需要帮助的地方。',
      },
      lifestyle: {
        analysis: '你在自律和随性之间找到了基本平衡。不会过分约束自己，也不会完全放任。对未来有大致规划，但不会把生活安排得密不透风。',
        strength: '弹性生活者——懂得在生活中保持松弛感，不被过度规划所累。',
        suggestion: '选择一两个最重要的领域（如健康或储蓄），建立简单的自动运行系统，让好习惯自己发生。',
      },
    };
    return t[dimension];
  }

  // mentalAge < 24
  const t: Record<Dimension, { analysis: string; strength: string; suggestion: string }> = {
    cognitive: {
      analysis: '你的思维灵活且开放，对新鲜事物抱有强烈好奇心。你倾向于边做边学，喜欢直接上手尝试。你的直觉和快速反应让你在变化中如鱼得水。',
      strength: '敏捷直觉派——你的思维不受条条框框限制，敢于在不确定中前行。',
      suggestion: '每次完成一件事后花 3 分钟写简短复盘（"做了什么→哪里好→哪里可改进"），这个小习惯能大幅提升从经验中学习的效果。',
    },
    emotional: {
      analysis: '你的情感体验强烈而鲜活。你能敏感地捕捉他人的情绪信号，但也容易被强烈情绪所淹没。你倾向于直接表达感受——这种情感真实性本身就是可贵的品质。',
      strength: '情感真实表达者——不伪装、不压抑，真诚是人际连接中最珍贵的资产。',
      suggestion: '练习"暂停 6 秒"：强烈情绪升起时，先默数 6 秒再做反应，在"感受"和"反应"之间建立选择权。',
    },
    social: {
      analysis: '你在社交中重视自由和真诚，不习惯被过多责任和承诺束缚。你喜欢轻松的人际关系，在亲密朋友面前非常讲义气。',
      strength: '真诚自由人——人际关系中没有伪装和算计，与你相处让人感到轻松真实。',
      suggestion: '成熟度的成长可从一件小事开始：主动承担一项需要持续跟进的责任，体验"负责任"带来的另一种满足感。',
    },
    lifestyle: {
      analysis: '你拥抱生活中的不确定性和可能性，享受当下快乐。你的生活充满即兴和惊喜。"活在当下"的能力在过度焦虑的时代其实非常珍贵。',
      strength: '当下享受者——拥有珍惜此刻、全然投入的能力，本身就是一种心理优势。',
      suggestion: '在不改变生活方式的前提下，设置"自动运行的安全网"——比如每月自动转存一小笔钱，悄无声息地为未来铺一层保护垫。',
    },
  };
  return t[dimension];
}

/** 根据绝对心理年龄生成 headline */
function baseHeadline(mentalAge: number): string {
  if (mentalAge >= 52) return '你的心理年龄非常成熟，拥有岁月沉淀的智慧';
  if (mentalAge >= 42) return '你的心理年龄偏向成熟稳重';
  if (mentalAge >= 30) return '你的心理年龄处于成熟与年轻之间的平衡点';
  if (mentalAge >= 22) return '你的心理年龄偏向年轻活力';
  return '你的心理年龄非常年轻，充满青春的好奇与热情';
}

/** 根据绝对心理年龄生成 summary */
function baseSummary(mentalAge: number, dims: DimensionResult[]): string {
  const sorted = [...dims].sort((a, b) => b.mentalAge - a.mentalAge);
  const highest = sorted[0];
  const lowest = sorted[sorted.length - 1];

  let summary = `你的综合心理年龄为 ${mentalAge} 岁。`;
  if (mentalAge >= 50) {
    summary += '你在多个维度上表现出高度的成熟和系统性思维。';
  } else if (mentalAge >= 38) {
    summary += '你在认知、情感和生活中表现出较为成熟的特质。';
  } else if (mentalAge >= 30) {
    summary += '你在成熟与年轻之间保持了良好的平衡。';
  } else if (mentalAge >= 22) {
    summary += '你拥有灵活的思维和年轻的心态，充满探索精神。';
  } else {
    summary += '你拥有一颗非常年轻的心，对世界保持着旺盛的好奇和热情。';
  }
  summary += `你最成熟的维度是「${highest.label}」（${highest.mentalAge} 岁），最年轻的维度是「${lowest.label}」（${lowest.mentalAge} 岁）。`;
  return summary;
}

// ============================================================
// 阶段二：年龄对比分析（需要实际年龄）
// ============================================================

interface DimComparison {
  dimension: Dimension;
  analysis: string;
  strength: string;
  suggestion: string;
}

function ageAwareDimAnalysis(
  dim: Dimension,
  mentalAge: number,
  chronologicalAge: number
): DimComparison {
  const diff = mentalAge - chronologicalAge;
  const absDiff = Math.abs(diff);

  if (absDiff <= 5) {
    // Close to chronological age
    const t: Record<Dimension, DimComparison> = {
      cognitive: {
        dimension: 'cognitive',
        analysis: `你的认知年龄（${mentalAge} 岁）与实际年龄非常接近。你的思维方式与同龄人的平均水平基本一致——既有好奇心，也有足够的理性判断力。`,
        strength: '与同龄人同步的认知发展节奏。',
        suggestion: '保持当前的学习和思考习惯，定期反思重要决策的判断逻辑。',
      },
      emotional: {
        dimension: 'emotional',
        analysis: `你的情感年龄（${mentalAge} 岁）与实际年龄基本吻合。你的情绪管理能力处于同龄人的典型水平。`,
        strength: '情绪发展节奏与生活阶段匹配。',
        suggestion: '可以进一步拓展你的情绪调节策略，尝试一些新的应对方式。',
      },
      social: {
        dimension: 'social',
        analysis: `你的社会年龄（${mentalAge} 岁）与实际年龄接近。你在社交和责任承担方面与同龄人处于相似的水平。`,
        strength: '社交角色与人生阶段相匹配。',
        suggestion: '尝试在某个社会角色中主动承担更多责任，体验"被需要"的成长感。',
      },
      lifestyle: {
        dimension: 'lifestyle',
        analysis: `你的生活态度年龄（${mentalAge} 岁）与实际年龄相近。你的生活规划、风险偏好和健康意识与同龄人大致相当。`,
        strength: '生活节奏与年龄阶段协调。',
        suggestion: '选择一到两个领域建立更系统的习惯，让好习惯自动运行。',
      },
    };
    return t[dim];
  }

  if (diff > 5) {
    // More mature than chronological age
    const t: Record<Dimension, DimComparison> = {
      cognitive: {
        dimension: 'cognitive',
        analysis: `你的认知年龄（${mentalAge} 岁）比实际年龄成熟 ${absDiff} 岁。你思考问题的方式比大多数同龄人更加系统化和深入，这种认知成熟度往往来自丰富的阅历或有意识的思维训练。`,
        strength: `超越同龄人的系统性思维能力。`,
        suggestion: '你的深度思考是优势，但偶尔依赖直觉做决定也能带来意想不到的收获。',
      },
      emotional: {
        dimension: 'emotional',
        analysis: `你的情感年龄（${mentalAge} 岁）比实际年龄成熟 ${absDiff} 岁。你的情绪管理能力超越了很多同龄人——这通常意味着你经历过需要你"扛住"的时刻，并从中学会了调节自己。`,
        strength: '超越同龄人的情绪觉察和调节能力。',
        suggestion: '偶尔允许自己"不那么成熟"——不需要时刻做情绪稳定的人，真实比完美更重要。',
      },
      social: {
        dimension: 'social',
        analysis: `你的社会年龄（${mentalAge} 岁）比实际年龄成熟 ${absDiff} 岁。你在责任承担和关系维护方面比同龄人更加可靠。你可能是朋友圈里那个"被依赖的人"。`,
        strength: '超越同龄人的责任感和关系建设能力。',
        suggestion: '承担他人的期待是能力的体现，但也记得给自己留出"被照顾"的空间。',
      },
      lifestyle: {
        dimension: 'lifestyle',
        analysis: `你的生活态度年龄（${mentalAge} 岁）比实际年龄成熟 ${absDiff} 岁。你在生活规划和自我管理方面走在了年龄前面，拥有超出同龄人的远见和自律。`,
        strength: '超越同龄人的规划意识和自我管理能力。',
        suggestion: '长期规划是好事，但给生活留一些"计划外的缝隙"也很重要——最好的风景有时不在计划之中。',
      },
    };
    return t[dim];
  }

  // diff < -5: younger than chronological age
  const t: Record<Dimension, DimComparison> = {
    cognitive: {
      dimension: 'cognitive',
      analysis: `你的认知年龄（${mentalAge} 岁）比实际年龄年轻 ${absDiff} 岁。你的思维保持着年轻人特有的灵活性和好奇心，不轻易被固有经验框住。这种开放心态在快速变化的时代是一种重要优势。`,
      strength: '保持了对世界的好奇心和认知灵活性。',
      suggestion: '在保持开放的同时，可以偶尔练习"慢下来"深度思考一个问题，享受思考本身的乐趣。',
    },
    emotional: {
      dimension: 'emotional',
      analysis: `你的情感年龄（${mentalAge} 岁）比实际年龄年轻 ${absDiff} 岁。你的情绪反应直接而真实，不习惯过度掩饰自己的感受。这种情感真实性让你在人际中显得真诚而有感染力。`,
      strength: '情感表达的直接性和真实性。',
      suggestion: '可以尝试增加对自己情绪的觉察练习——不改变表达方式，只是多一个"观察自己"的视角。',
    },
    social: {
      dimension: 'social',
      analysis: `你的社会年龄（${mentalAge} 岁）比实际年龄年轻 ${absDiff} 岁。你在社交中保持着轻松和自由的姿态，不受过多社会期待的束缚。这种轻盈感让你的人际关系充满了真诚而非计算。`,
      strength: '在社交中保持了难得的真诚和轻盈感。',
      suggestion: '自由是珍贵的，而偶尔承担一份持续的责任，也能为你的生活增添一种不同的深度。',
    },
    lifestyle: {
      dimension: 'lifestyle',
      analysis: `你的生活态度年龄（${mentalAge} 岁）比实际年龄年轻 ${absDiff} 岁。你拥抱不确定性的能力让很多被"过度规划"束缚的人羡慕。每一天都可能带来新的惊喜。`,
      strength: '活在当下、拥抱不确定性的能力。',
      suggestion: '在享受当下的同时，设置一个小小的"未来基金"（自动运行的那种），既不改变你的生活方式，又给未来多一个选择。',
    },
  };
  return t[dim];
}

// ============================================================
// 导出函数
// ============================================================

/** 阶段一：答题后立即计算基础结果（不需要实际年龄） */
export function calculateBaseResult(answers: Record<string, number>): BaseResult {
  const dimensions: Dimension[] = ['cognitive', 'emotional', 'social', 'lifestyle'];

  const dimensionResults: DimensionResult[] = dimensions.map((dim) => {
    const rawScore = getDimensionTotalScore(answers, dim);

    const mentalAge = mapToAge(rawScore);
    const percentage = mapToPercentage(rawScore);
    const a = baseDimAnalysis(dim, mentalAge);

    return {
      dimension: dim,
      label: DIMENSION_LABELS[dim],
      icon: DIMENSION_ICONS[dim],
      rawScore,
      mentalAge,
      percentage,
      context: DIM_CONTEXTS[dim],
      analysis: a.analysis,
      strength: a.strength,
      suggestion: a.suggestion,
    };
  });

  const mentalAge = Math.round(
    dimensionResults.reduce((sum, d) => sum + d.mentalAge, 0) / dimensions.length
  );

  return {
    mentalAge,
    dimensions: dimensionResults,
    headline: baseHeadline(mentalAge),
    summary: baseSummary(mentalAge, dimensionResults),
  };
}

/** 阶段二：用户输入实际年龄后，生成对比分析 */
export function generateAgeComparison(
  baseResult: BaseResult,
  chronologicalAge: number
): AgeComparison {
  const deviation = baseResult.mentalAge - chronologicalAge;
  const absDev = Math.abs(deviation);
  const sorted = [...baseResult.dimensions].sort((a, b) => b.mentalAge - a.mentalAge);
  const highest = sorted[0];
  const lowest = sorted[sorted.length - 1];
  const spread = highest.mentalAge - lowest.mentalAge;

  // ---- detailed analysis ----
  let detailed = `对比你的实际年龄（${chronologicalAge} 岁），综合心理年龄为 ${baseResult.mentalAge} 岁，`;
  if (absDev <= 4) {
    detailed += `两者非常接近。这意味着你在认知、情感、社交和生活态度各方面的发展与同龄人平均水平基本一致。`;
  } else if (deviation < 0) {
    detailed += `比实际年龄年轻 ${absDev} 岁。心理学研究发现 25 岁以上的成年人普遍感觉自己比实际年龄年轻——这不是"不够成熟"，而是保持了珍贵的年轻心态。`;
  } else {
    detailed += `比实际年龄成熟 ${absDev} 岁。这种成熟往往来源于丰富的生活经历、深度的自我反思，或在压力环境中的成长。`;
  }

  detailed += `\n\n在各维度中，「${highest.label}」（${highest.mentalAge} 岁）与「${lowest.label}」（${lowest.mentalAge} 岁）之间相差 ${spread} 岁。`;
  if (spread >= 15) {
    detailed += `这种差异说明你在不同领域的发展节奏有所不同——这是完全正常的，反映了你投入精力较多的领域和个人天生的倾向。`;
  } else {
    detailed += `各维度之间较为均衡，你的心理发展在不同领域是协调的。`;
  }

  // ---- insight ----
  let insight: string;
  if (chronologicalAge < 25 && deviation > 0) {
    insight = '研究发现，25 岁以下的年轻人普遍感觉自己比实际年龄更成熟（Rubin & Berntsen, 2006）。这一阶段是人生中成长最快的时期，你的结果反映了你正经历的快速心理成长。';
  } else if (chronologicalAge < 25 && deviation <= 0) {
    insight = '虽然大多数 25 岁以下的人倾向于感觉自己更成熟，但你的年轻心态本身就是一种优势——对世界保持好奇和开放是创造力的源泉。';
  } else if (chronologicalAge >= 25 && deviation <= 0) {
    insight = '心理学中的"吸引力年龄"现象指出：25 岁以上的成年人普遍感觉自己比实际年龄年轻。一项涵盖 294 项研究的元分析（Pinquart & Wahl, 2021）确认了这一规律——心态年轻是成年人的常态，而非例外。';
  } else {
    insight = '虽然大多数成年人倾向于感觉自己更年轻，但你的心理年龄偏成熟。研究提示，这种成熟度往往与丰富的生活阅历和深度的自我反思有关。';
  }

  // ---- advice ----
  let advice: string;
  if (absDev <= 4) {
    advice = '你的各维度发展均衡，与年龄匹配良好。你可以重点关注得分相对较低的维度进行针对性提升，各维度卡片中的建议可以作为参考。';
  } else if (deviation < 0) {
    advice = '你的年轻心态是宝贵的资源——让你在快速变化的世界中保持适应力。如果想在某些领域（如财务或健康管理）更有秩序感，可以试着建立一些自动运行的系统，让系统帮你打理你不太感兴趣的部分，而你继续享受生活的乐趣。';
  } else {
    advice = '你的成熟和稳重让你在人群中自然地成为可靠的存在。不过，偶尔允许自己"幼稚"一下——做一些没有实际用途但纯粹有趣的事——对心理健康也有独特价值。';
  }

  // ---- dimension analyses with age comparison ----
  const dimAnalyses = baseResult.dimensions.map((d) =>
    ageAwareDimAnalysis(d.dimension, d.mentalAge, chronologicalAge)
  );

  return {
    chronologicalAge,
    deviation,
    detailedAnalysis: detailed,
    insight,
    advice,
    dimensionAnalyses: dimAnalyses,
  };
}
