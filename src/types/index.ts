export type Dimension = 'cognitive' | 'emotional' | 'social' | 'lifestyle';

export const DIMENSION_LABELS: Record<Dimension, string> = {
  cognitive: '认知年龄',
  emotional: '情感年龄',
  social: '社会年龄',
  lifestyle: '生活态度年龄',
};

export const DIMENSION_ICONS: Record<Dimension, string> = {
  cognitive: '🧠',
  emotional: '💙',
  social: '🤝',
  lifestyle: '🌿',
};

export interface Question {
  id: string;
  dimension: Dimension;
  subtopic: string;        // sub-topic tag for diverse question selection
  text: string;
  options: Option[];
}

export interface Option {
  score: number; // 1-5, 1=年轻特质, 5=成熟特质
  text: string;
  emoji: string;
}

export interface DimensionResult {
  dimension: Dimension;
  label: string;
  icon: string;
  rawScore: number;       // 8-40
  mentalAge: number;      // mapped to age equivalent (15-60)
  percentage: number;     // 0-100 for radar chart
  context: string;        // scientific background
  analysis: string;       // personalized analysis
  strength: string;       // identified strength
  suggestion: string;     // practical suggestion
}

/** 不依赖实际年龄的基础结果——答题后立刻展示 */
export interface BaseResult {
  mentalAge: number;
  dimensions: DimensionResult[];
  headline: string;
  summary: string;
}

/** 用户输入实际年龄后生成的对比分析 */
export interface AgeComparison {
  chronologicalAge: number;
  deviation: number;
  funGap: string;           // 年龄差距的趣味解读
  patternInsights: string[]; // 基于答题模式的具体洞察（1-3 条）
  detailedAnalysis: string;
  insight: string;
  advice: string;
  dimensionAnalyses: {
    dimension: Dimension;
    analysis: string;
    strength: string;
    suggestion: string;
  }[];
}

/** 分支题目池：每个子主题下有 2 题，选取时随机各取 1 题 */
export interface BranchPool {
  questionIds: string[];        // 该池所有题目 ID（用于判断已选）
  subtopicGroups: string[][];   // 每组是一个子主题的候选题目，如 [["cog-h1","cog-h2"], ["cog-h3","cog-h4"]]
}

/** 每维度的分支题目结构 */
export interface DimensionBranch {
  baseline: string[];         // 基准题 ID 列表（所有人相同）
  branchHigh: BranchPool;     // 高分分支池
  branchLow: BranchPool;      // 低分分支池
  branchThreshold: number;    // 基准题总分多少以上走分支 High
}

export interface QuizState {
  answers: Record<string, number>;
  currentQuestionIndex: number;
  questionOrder: string[];  // 动态题目 ID 序列
  baseResult: BaseResult | null;
  ageComparison: AgeComparison | null;
}

export type QuizAction =
  | { type: 'ANSWER_QUESTION'; payload: { questionId: string; score: number } }
  | { type: 'GO_TO_QUESTION'; payload: number }
  | { type: 'APPEND_QUESTIONS'; payload: string[] }
  | { type: 'SET_BASE_RESULT'; payload: BaseResult }
  | { type: 'SET_AGE_COMPARISON'; payload: AgeComparison }
  | { type: 'RESET' };
