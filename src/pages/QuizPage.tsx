import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { questions, TOTAL_QUESTIONS } from '../data/questions';
import { calculateBaseResult } from '../utils/calculate';
import { DIMENSION_LABELS, DIMENSION_ICONS } from '../types';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';

export default function QuizPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();

  const currentQuestion = questions[state.currentQuestionIndex];
  const currentAnswer = state.answers[currentQuestion.id];
  const isFirst = state.currentQuestionIndex === 0;
  const isLast = state.currentQuestionIndex === TOTAL_QUESTIONS - 1;
  const progress = ((state.currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100;

  const handleSelect = (score: number) => {
    dispatch({
      type: 'ANSWER_QUESTION',
      payload: { questionId: currentQuestion.id, score },
    });

    if (!isLast) {
      setTimeout(() => {
        dispatch({
          type: 'GO_TO_QUESTION',
          payload: state.currentQuestionIndex + 1,
        });
      }, 300);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      dispatch({ type: 'GO_TO_QUESTION', payload: state.currentQuestionIndex - 1 });
    }
  };

  const handleNext = () => {
    if (!isLast) {
      dispatch({ type: 'GO_TO_QUESTION', payload: state.currentQuestionIndex + 1 });
    }
  };

  const handleSubmit = () => {
    const allAnswered = questions.every((q) => state.answers[q.id] !== undefined);
    if (!allAnswered) return;

    const baseResult = calculateBaseResult(state.answers);
    dispatch({ type: 'SET_BASE_RESULT', payload: baseResult });
    navigate('/result');
  };

  const isAllAnswered = questions.every((q) => state.answers[q.id] !== undefined);

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
            {state.currentQuestionIndex + 1} / {TOTAL_QUESTIONS}
          </span>
        </div>

        {/* Progress bar */}
        <ProgressBar progress={progress} />

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
            disabled={isFirst}
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
