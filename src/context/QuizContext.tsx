import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { QuizState, QuizAction } from '../types';
import { DIMENSION_BRANCHES } from '../data/questions';

const dimensions = ['cognitive', 'emotional', 'social', 'lifestyle'] as const;

function buildInitialQuestionOrder(): string[] {
  const order: string[] = [];
  for (const dim of dimensions) {
    order.push(...DIMENSION_BRANCHES[dim].baseline);
  }
  return order;
}

const initialState: QuizState = {
  answers: {},
  currentQuestionIndex: 0,
  questionOrder: buildInitialQuestionOrder(),
  baseResult: null,
  ageComparison: null,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'ANSWER_QUESTION':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.score,
        },
      };

    case 'GO_TO_QUESTION':
      return {
        ...state,
        currentQuestionIndex: action.payload,
      };

    case 'APPEND_QUESTIONS':
      return {
        ...state,
        questionOrder: [...state.questionOrder, ...action.payload],
      };

    case 'SET_BASE_RESULT':
      return {
        ...state,
        baseResult: action.payload,
        ageComparison: null,
      };

    case 'SET_AGE_COMPARISON':
      return {
        ...state,
        ageComparison: action.payload,
      };

    case 'RESET':
      return {
        ...initialState,
        questionOrder: buildInitialQuestionOrder(),
      };

    default:
      return state;
  }
}

interface QuizContextType {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}

const QuizContext = createContext<QuizContextType | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz(): QuizContextType {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
