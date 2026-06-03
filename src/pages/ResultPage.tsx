import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { generateAgeComparison } from '../utils/calculate';
import RadarChart from '../components/RadarChart';
import MentalAgeDisplay from '../components/MentalAgeDisplay';
import DimensionBreakdown from '../components/DimensionBreakdown';

export default function ResultPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();
  const [ageInput, setAgeInput] = useState('');
  const [ageError, setAgeError] = useState('');
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    if (state.baseResult === null) {
      navigate('/', { replace: true });
    }
  }, [state.baseResult, navigate]);

  if (!state.baseResult) return null;

  const { baseResult } = state;
  const ageComparison = state.ageComparison;

  const handleAgeSubmit = () => {
    const age = parseInt(ageInput, 10);
    if (!age || age < 12 || age > 90) {
      setAgeError('请输入 12-90 岁之间的有效年龄');
      return;
    }
    setAgeError('');
    const comparison = generateAgeComparison(baseResult, age);
    dispatch({ type: 'SET_AGE_COMPARISON', payload: comparison });
    setShowComparison(true);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^\d+$/.test(val)) setAgeInput(val);
  };

  const ageAwareLookup = ageComparison
    ? new Map(ageComparison.dimensionAnalyses.map((d) => [d.dimension, d]))
    : null;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-lg mx-auto">

        {/* 1. Mental Age Number */}
        <MentalAgeDisplay
          mentalAge={baseResult.mentalAge}
          chronologicalAge={ageComparison?.chronologicalAge ?? null}
          deviation={ageComparison?.deviation ?? null}
          headline={baseResult.headline}
        />

        {/* 2. Age Input — right below the number, where users care most */}
        {!ageComparison && (
          <div className="mt-5 text-center animate-fade-in-up">
            <p className="text-white/35 text-xs mb-3">输入实际年龄，看看你的心理年龄是超前还是"逆生长"</p>
            <div className="flex items-center gap-2 max-w-[220px] mx-auto">
              <div className="relative flex-1">
                <input
                  type="text"
                  inputMode="numeric"
                  value={ageInput}
                  onChange={handleAgeChange}
                  onKeyDown={(e) => e.key === 'Enter' && handleAgeSubmit()}
                  placeholder="你的年龄"
                  maxLength={2}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white text-center text-lg placeholder-white/25 focus:outline-none focus:border-white/50 transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 text-sm">岁</span>
              </div>
              <button
                onClick={handleAgeSubmit}
                disabled={!ageInput}
                className="bg-white text-[#5b4ae0] font-bold px-5 py-2.5 rounded-xl hover:bg-white/95 active:scale-[0.98] transition-all disabled:opacity-25 cursor-pointer whitespace-nowrap text-sm"
              >
                确认
              </button>
            </div>
            {ageError && <p className="text-red-300 text-xs mt-2">{ageError}</p>}
          </div>
        )}

        {/* 3. After age entered: gap analysis + pattern insights */}
        {ageComparison && showComparison && (
          <div className="mt-5 space-y-4 animate-fade-in-up">

            {/* Fun gap */}
            <div className="bg-white/8 border border-white/10 rounded-2xl p-5">
              <p className="text-white/75 text-sm leading-relaxed">{ageComparison.funGap}</p>
            </div>

            {/* Pattern insights */}
            {ageComparison.patternInsights.length > 0 && (
              <div className="space-y-2">
                {ageComparison.patternInsights.map((p, i) => (
                  <div key={i} className="bg-white/5 border border-white/8 rounded-xl p-4 flex items-start gap-2.5">
                    <span className="text-sm mt-0.5 flex-shrink-0">{['🎯', '🔍', '💭'][i]}</span>
                    <p className="text-white/60 text-xs leading-relaxed">{p}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. Radar Chart */}
        <div className="mt-8 bg-white/6 border border-white/10 rounded-2xl p-5">
          <h2 className="text-white/60 text-xs font-medium text-center mb-3 tracking-wide">四维度一览</h2>
          <RadarChart dimensions={baseResult.dimensions} />
        </div>

        {/* 5. Dimension Breakdown */}
        <div className="mt-6 space-y-3">
          <h2 className="text-white/45 text-xs font-medium tracking-wider px-1">各维度详解（点击展开）</h2>
          {baseResult.dimensions.map((dim) => (
            <DimensionBreakdown
              key={dim.dimension}
              dimension={dim}
              ageAware={ageAwareLookup?.get(dim.dimension) ?? null}
            />
          ))}
        </div>

        {/* 6. Deeper analysis (after age comparison) */}
        {ageComparison && showComparison && (
          <div className="mt-6 space-y-4 animate-fade-in-up">
            {/* Cross-dimension analysis */}
            <div className="bg-white/6 border border-white/10 rounded-2xl p-5">
              <h2 className="text-white/60 text-xs font-medium mb-3 tracking-wide">维度对比</h2>
              <p className="text-white/60 text-xs leading-relaxed">{ageComparison.detailedAnalysis}</p>
            </div>

            {/* Scientific insight */}
            <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
              <h2 className="text-white/40 text-xs font-medium mb-2 tracking-wide">科学研究视角</h2>
              <p className="text-white/45 text-xs leading-relaxed">{ageComparison.insight}</p>
            </div>

            {/* Advice */}
            <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
              <h2 className="text-white/40 text-xs font-medium mb-2 tracking-wide">给你的建议</h2>
              <p className="text-white/50 text-xs leading-relaxed">{ageComparison.advice}</p>
            </div>
          </div>
        )}

        {/* Retry */}
        <button
          onClick={() => { dispatch({ type: 'RESET' }); navigate('/'); }}
          className="w-full mt-8 bg-white text-[#5b4ae0] font-bold py-3 rounded-2xl hover:bg-white/95 active:scale-[0.98] transition-all cursor-pointer"
        >
          重新测试
        </button>

        <p className="text-white/15 text-xs text-center mt-8">
          基于心理学研究设计 · 仅供参考娱乐 · 心理年龄偏差是普遍现象
        </p>
      </div>
    </div>
  );
}
