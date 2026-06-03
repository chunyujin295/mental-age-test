interface MentalAgeDisplayProps {
  mentalAge: number;
  chronologicalAge: number | null;
  deviation: number | null;
  headline: string;
}

export default function MentalAgeDisplay({
  mentalAge,
  chronologicalAge,
  deviation,
  headline,
}: MentalAgeDisplayProps) {
  const hasAge = chronologicalAge !== null && deviation !== null;

  const deviationText =
    deviation === null
      ? ''
      : deviation > 0
        ? `比实际年龄大 ${deviation} 岁`
        : deviation < 0
          ? `比实际年龄小 ${Math.abs(deviation)} 岁`
          : '与实际年龄相同';

  const deviationColor =
    deviation === null
      ? ''
      : deviation > 0
        ? 'text-warm-400'
        : deviation < 0
          ? 'text-primary-300'
          : 'text-white/60';

  return (
    <div className="text-center">
      {/* Headline */}
      <h2 className="text-white/80 text-lg font-medium mb-6">{headline}</h2>

      {/* Mental Age Number */}
      <div className="inline-flex items-baseline gap-2 animate-number-pop">
        <span className="text-7xl md:text-8xl font-bold text-white tabular-nums">
          {mentalAge}
        </span>
        <span className="text-2xl text-white/60">岁</span>
      </div>

      {/* Deviation — only shown when age comparison is available */}
      {hasAge && (
        <>
          <p className={`mt-2 text-sm font-medium ${deviationColor}`}>
            {deviationText}
          </p>
          <p className="mt-1 text-white/30 text-xs">
            实际年龄 {chronologicalAge} 岁
          </p>
        </>
      )}

      {/* Hint when no age yet */}
      {!hasAge && (
        <p className="mt-2 text-white/20 text-xs">
          输入实际年龄，查看差距分析 ↓
        </p>
      )}
    </div>
  );
}
