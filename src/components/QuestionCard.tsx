import type { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  selectedScore: number | null;
  onSelect: (score: number) => void;
}

export default function QuestionCard({ question, selectedScore, onSelect }: QuestionCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
      {/* Question text */}
      <h2 className="text-white text-xl font-medium mb-6 leading-relaxed">
        {question.text}
      </h2>

      {/* Options */}
      <div className="space-y-2">
        {question.options.map((option) => {
          const isSelected = selectedScore === option.score;
          return (
            <button
              key={option.score}
              onClick={() => onSelect(option.score)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-white text-primary-700 shadow-lg scale-[1.02]'
                  : 'bg-white/5 text-white/80 hover:bg-white/15 hover:text-white'
              }`}
            >
              <span className="text-xl flex-shrink-0">{option.emoji}</span>
              <span className="text-sm leading-snug">{option.text}</span>
              {isSelected && (
                <span className="ml-auto text-primary-500 text-lg flex-shrink-0">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
