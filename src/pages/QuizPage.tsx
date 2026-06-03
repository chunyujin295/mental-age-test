import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import {
  questionMap,
  DIMENSION_BRANCHES,
  getDimensionRunningScore,
  QUESTIONS_PER_TEST,
} from '../data/questions';
import { calculateBaseResult } from '../utils/calculate';
import { DIMENSION_LABELS, DIMENSION_ICONS } from '../types';
import type { Dimension } from '../types';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';

const DIM_ORDER: Dimension[] = ['cognitive', 'emotional', 'social', 'lifestyle'];

/** Check if a question ID is the last baseline question of any dimension */
function getCompletedDimension(
  questionId: string,
  questionOrder: string[],
  answers: Record<string, number>
): Dimension | null {
  for (const dim of DIM_ORDER) {
    const branch = DIMENSION_BRANCHES[dim];
    const lastBaselineId = branch.baseline[branch.baseline.length - 1];
    if (questionId !== lastBaselineId) continue;

    // Make sure all baseline questions for this dim are answered
    const allBaselineAnswered = branch.baseline.every((id) => answers[id] !== undefined);
    // Make sure we haven't already appended branch questions for this dim
    const branchAlreadyAppended = branch.branchHigh.some((id) => questionOrder.includes(id)) ||
      branch.branchLow.some((id) => questionOrder.includes(id));

    if (allBaselineAnswered && !branchAlreadyAppended) {
      return dim;
    }
  }
  return null;
}

export default function QuizPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();

  const currentId = state.questionOrder[state.currentQuestionIndex];
  const currentQuestion = questionMap[currentId];
  const currentAnswer = state.answers[currentId];
  const progress = ((state.currentQuestionIndex + 1) / QUESTIONS_PER_TEST) * 100;

  // Dynamic "is last" — the final question is when we've reached the total questions per test
  const totalExpected = state.questionOrder.length;

  const handleSelect = useCallback(
    (score: number) => {
      // Record the answer
      dispatch({
        type: 'ANSWER_QUESTION',
        payload: { questionId: currentId, score },
      });

      // Check if this completes a dimension's baseline
      const completedDim = getCompletedDimension(
        currentId,
        state.questionOrder,
        { ...state.answers, [currentId]: score }
      );

      if (completedDim) {
        const branch = DIMENSION_BRANCHES[completedDim];
        const runningScore = getDimensionRunningScore(
          { ...state.answers, [currentId]: score },
          completedDim
        );
        const branchIds =
          runningScore >= branch.branchThreshold ? branch.branchHigh : branch.branchLow;

        // Append branch questions
        dispatch({ type: 'APPEND_QUESTIONS', payload: branchIds });
      }

      // Auto-advance (not on last)
      if (state.currentQuestionIndex < totalExpected - 1) {
        setTimeout(() => {
          dispatch({
            type: 'GO_TO_QUESTION',
            payload: state.currentQuestionIndex + 1,
          });
        }, 300);
      }
    },
    [currentId, state.questionOrder, state.answers, state.currentQuestionIndex, totalExpected, dispatch]
  );

  const handlePrev = () => {
    if (state.currentQuestionIndex > 0) {
      dispatch({ type: 'GO_TO_QUESTION', payload: state.currentQuestionIndex - 1 });
    }
  };

  const handleNext = () => {
    if (state.currentQuestionIndex < totalExpected - 1) {
      dispatch({ type: 'GO_TO_QUESTION', payload: state.currentQuestionIndex + 1 });
    }
  };

  const handleSubmit = () => {
    const allAnswered = state.questionOrder.every((id) => state.answers[id] !== undefined);
    if (!allAnswered) return;

    const baseResult = calculateBaseResult(state.answers);
    dispatch({ type: 'SET_BASE_RESULT', payload: baseResult });
    navigate('/result');
  };

  const isAllAnswered = state.questionOrder.every((id) => state.answers[id] !== undefined);
  const isLast = state.currentQuestionIndex >= totalExpected - 1;
  const questionNum = state.currentQuestionIndex + 1;

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-2 px-1">
          <div className="flex items-center gap-2">
            <span className="text-white/50 text-sm font-medium">
              {DIMENSION_ICONS[currentQuestion.dimension]}
            </span>
            <span className="text-white/70 text-sm">
              {DIMENSION_LABELS[currentQuestion.dimension]}
            </span>
          </div>
          <span className="text-white/50 text-sm tabular-nums">
            {questionNum} / {QUESTIONS_PER_TEST}
          </span>
        </div>

        {/* Progress bar */}
        <ProgressBar progress={Math.min(progress, 100)} />

        {/* Question Card */}
        <div className="mt-6 animate-fade-in-up" key={state.currentQuestionIndex}>
          <QuestionCard
            question={currentQuestion}
            selectedScore={currentAnswer ?? null}
            onSelect={handleSelect}
          />
        </div>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={state.currentQuestionIndex === 0}
            className="text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed text-sm font-medium transition-colors cursor-pointer"
          >
            ← 上一题
          </button>

          {isLast ? (
            <button
              onClick={handleSubmit}
              disabled={!isAllAnswered}
              className="bg-white text-primary-600 font-bold px-8 py-2.5 rounded-xl hover:bg-white/95 hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer"
            >
              查看结果 🎯
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!currentAnswer}
              className="text-white/80 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed text-sm font-medium transition-colors cursor-pointer"
            >
              下一题 →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
