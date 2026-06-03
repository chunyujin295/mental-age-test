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

export interface QuizState {
  answers: Record<string, number>;
  currentQuestionIndex: number;
  baseResult: BaseResult | null;
  ageComparison: AgeComparison | null;
}

export type QuizAction =
  | { type: 'ANSWER_QUESTION'; payload: { questionId: string; score: number } }
  | { type: 'GO_TO_QUESTION'; payload: number }
  | { type: 'SET_BASE_RESULT'; payload: BaseResult }
  | { type: 'SET_AGE_COMPARISON'; payload: AgeComparison }
  | { type: 'RESET' };
