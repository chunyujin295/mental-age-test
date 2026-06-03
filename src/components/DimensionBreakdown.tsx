import { useState } from 'react';
import type { DimensionResult } from '../types';

interface AgeAwareInfo {
  analysis: string;
  strength: string;
  suggestion: string;
}

interface DimensionBreakdownProps {
  dimension: DimensionResult;
  ageAware: AgeAwareInfo | null;
}

export default function DimensionBreakdown({ dimension, ageAware }: DimensionBreakdownProps) {
  const [expanded, setExpanded] = useState(false);

  const barColor =
    dimension.mentalAge > 40
      ? 'from-warm-400 to-warm-500'
      : dimension.mentalAge > 25
        ? 'from-primary-300 to-accent-400'
        : 'from-primary-300 to-primary-400';

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{dimension.icon}</span>
          <span className="text-white/80 text-sm font-medium">{dimension.label}</span>
          {/* Show age-aware badge when available */}
          {ageAware && (
            <span className="text-white/30 text-xs ml-1">（已对比）</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden hidden sm:block">
            <div
              className={`h-full bg-gradient-to-r ${barColor} rounded-full`}
              style={{ width: `${dimension.percentage}%` }}
            />
          </div>
          <span className="text-white text-lg font-bold tabular-nums min-w-[3ch] text-right">
            {dimension.mentalAge}
            <span className="text-white/40 text-xs font-normal ml-0.5">岁</span>
          </span>
          <span className="text-white/30 text-xs">{expanded ? '▲' : '▼'}</span>
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-white/5 animate-slide-in-up">
          {/* Age bar */}
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-3 mt-3">
            <div
              className={`h-full bg-gradient-to-r ${barColor} rounded-full transition-all duration-1000 ease-out`}
              style={{ width: `${dimension.percentage}%` }}
            />
          </div>

          {/* Context */}
          <p className="text-white/40 text-xs leading-relaxed mb-3 italic">
            {dimension.context}
          </p>

          {/* Age-aware comparison (when available) */}
          {ageAware && (
            <div className="bg-white/5 rounded-lg p-2.5 mb-2 border-l-2 border-primary-400/50">
              <span className="text-white/50 text-xs font-medium">📏 与同龄人对比：</span>
              <span className="text-white/75 text-xs">{ageAware.analysis}</span>
            </div>
          )}

          {/* Base analysis */}
          <p className="text-white/80 text-xs leading-relaxed mb-2">
            {dimension.analysis}
          </p>

          {/* Strength */}
          <div className="bg-white/5 rounded-lg p-2.5 mb-2">
            <span className="text-white/50 text-xs font-medium">💪 你的优势：</span>
            <span className="text-white/70 text-xs">
              {ageAware ? ageAware.strength : dimension.strength}
            </span>
          </div>

          {/* Suggestion */}
          <div className="bg-white/5 rounded-lg p-2.5">
            <span className="text-white/50 text-xs font-medium">💡 提升建议：</span>
            <span className="text-white/70 text-xs">
              {ageAware ? ageAware.suggestion : dimension.suggestion}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
