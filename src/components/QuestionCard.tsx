import { useMemo } from 'react';
import type { Question, Option } from '../types';

interface QuestionCardProps {
  question: Question;
  selectedScore: number | null;
  onSelect: (score: number) => void;
}

/** Deterministic shuffle based on question ID — stable on re-render but random across questions */
function seededShuffle(arr: Option[], seed: string): Option[] {
  const shuffled = [...arr];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  }
  // Fisher-Yates with seeded random
  for (let i = shuffled.length - 1; i > 0; i--) {
    hash = ((hash << 5) - hash + i) | 0;
    const j = ((hash >>> 0) % (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function QuestionCard({ question, selectedScore, onSelect }: QuestionCardProps) {
  const shuffledOptions = useMemo(
    () => seededShuffle(question.options, question.id),
    [question.id, question.options]
  );

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
      <h2 className="text-white text-xl font-medium mb-6 leading-relaxed">
        {question.text}
      </h2>

      <div className="space-y-2">
        {shuffledOptions.map((option) => {
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
                <span className="ml-auto text-primary-500 text-lg flex-shrink-0">✓</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
