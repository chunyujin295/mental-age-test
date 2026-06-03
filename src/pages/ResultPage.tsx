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

  if (!state.baseResult) {
    return null;
  }

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

  const handleAgeKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAgeSubmit();
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^\d+$/.test(val)) {
      setAgeInput(val);
      setAgeError('');
    }
  };

  const handleRetry = () => {
    dispatch({ type: 'RESET' });
    navigate('/');
  };

  // Build dimension lookup for age-aware analysis
  const ageAwareLookup = ageComparison
    ? new Map(ageComparison.dimensionAnalyses.map((d) => [d.dimension, d]))
    : null;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-lg mx-auto">
        {/* ============================================ */}
        {/* Phase 1: Mental Age Display (always visible) */}
        {/* ============================================ */}
        <MentalAgeDisplay
          mentalAge={baseResult.mentalAge}
          chronologicalAge={ageComparison?.chronologicalAge ?? null}
          deviation={ageComparison?.deviation ?? null}
          headline={baseResult.headline}
        />

        {/* Summary */}
        <div className="mt-6 bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 animate-fade-in-up">
          <p className="text-white/85 text-sm leading-relaxed">{baseResult.summary}</p>
        </div>

        {/* Radar Chart */}
        <div className="mt-6 bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20">
          <h2 className="text-white/80 text-sm font-medium text-center mb-3">
            四维度雷达图
          </h2>
          <RadarChart dimensions={baseResult.dimensions} />
        </div>

        {/* Dimension Breakdown */}
        <div className="mt-6 space-y-3">
          <h2 className="text-white/70 text-xs font-medium uppercase tracking-wider px-1">
            各维度详细分析（点击展开）
          </h2>
          <div className="space-y-3 stagger-children">
            {baseResult.dimensions.map((dim) => (
              <DimensionBreakdown
                key={dim.dimension}
                dimension={dim}
                ageAware={ageAwareLookup?.get(dim.dimension) ?? null}
              />
            ))}
          </div>
        </div>

        {/* ============================================ */}
        {/* Phase 2: Age Comparison Section */}
        {/* ============================================ */}

        {!ageComparison && (
          <div className="mt-8 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center animate-fade-in-up">
            <div className="text-2xl mb-2">📏</div>
            <h3 className="text-white/80 text-sm font-medium mb-1">
              想知道你的心理年龄和实际年龄差多少吗？
            </h3>
            <p className="text-white/40 text-xs mb-4">
              输入你的实际年龄，解锁深度对比分析
            </p>
            <div className="flex items-center gap-2 max-w-xs mx-auto">
              <div className="relative flex-1">
                <input
                  type="text"
                  inputMode="numeric"
                  value={ageInput}
                  onChange={handleAgeChange}
                  onKeyDown={handleAgeKeyDown}
                  placeholder="你的年龄"
                  maxLength={2}
                  className="w-full bg-white/15 border border-white/20 rounded-xl px-4 py-2.5 text-white text-center placeholder-white/30 focus:outline-none focus:border-white/50 transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">
                  岁
                </span>
              </div>
              <button
                onClick={handleAgeSubmit}
                disabled={!ageInput}
                className="bg-white text-primary-600 font-bold px-5 py-2.5 rounded-xl hover:bg-white/95 active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap text-sm"
              >
                确认
              </button>
            </div>
            {ageError && (
              <p className="text-red-300 text-xs mt-2">{ageError}</p>
            )}
            <p className="text-white/20 text-xs mt-3">
              你的年龄仅用于本地计算，不会被储存
            </p>
          </div>
        )}

        {ageComparison && showComparison && (
          <div className="animate-fade-in-up">
            {/* Cross-dimension analysis */}
            <div className="mt-6 bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20">
              <h2 className="text-white/80 text-sm font-medium mb-3">
                📊 年龄对比分析
              </h2>
              <p className="text-white/75 text-xs leading-relaxed">
                {ageComparison.detailedAnalysis}
              </p>
            </div>

            {/* Scientific insight */}
            <div className="mt-4 bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
              <div className="flex items-start gap-2 mb-2">
                <span className="text-sm mt-0.5">🔬</span>
                <span className="text-white/50 text-xs font-medium uppercase tracking-wider">
                  科学研究视角
                </span>
              </div>
              <p className="text-white/60 text-xs leading-relaxed">
                {ageComparison.insight}
              </p>
            </div>

            {/* Practical advice */}
            <div className="mt-4 bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
              <div className="flex items-start gap-2 mb-2">
                <span className="text-sm mt-0.5">🌱</span>
                <span className="text-white/50 text-xs font-medium uppercase tracking-wider">
                  给你的建议
                </span>
              </div>
              <p className="text-white/65 text-xs leading-relaxed">
                {ageComparison.advice}
              </p>
            </div>
          </div>
        )}

        {/* Retry */}
        <div className="mt-8">
          <button
            onClick={handleRetry}
            className="w-full bg-white text-primary-600 font-bold py-3 rounded-xl hover:bg-white/95 hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer"
          >
            重新测试 🔄
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-white/20 text-xs text-center mt-8 leading-relaxed">
          本测试基于主观年龄心理学研究设计，仅供参考娱乐。
          <br />
          心理年龄偏差是普遍现象，并非心理健康指标。
        </p>
      </div>
    </div>
  );
}
