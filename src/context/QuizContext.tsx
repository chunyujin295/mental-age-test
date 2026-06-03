import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { QuizState, QuizAction } from '../types';

const initialState: QuizState = {
  answers: {},
  currentQuestionIndex: 0,
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

    case 'SET_BASE_RESULT':
      return {
        ...state,
        baseResult: action.payload,
        ageComparison: null, // reset comparison when new base result is set
      };

    case 'SET_AGE_COMPARISON':
      return {
        ...state,
        ageComparison: action.payload,
      };

    case 'RESET':
      return initialState;

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
