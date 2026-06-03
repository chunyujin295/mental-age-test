import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🧠</div>
          <h1 className="text-[2.25rem] font-bold text-white mb-3 tracking-tight leading-tight">
            测测你的<br />心理年龄
          </h1>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
            不是测你有多"老"，<br />
            而是看你如何思考、感受和面对生活
          </p>
        </div>

        {/* Instruction callout */}
        <div className="bg-white/8 border border-white/15 rounded-2xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0 mt-0.5">💡</span>
            <div>
              <p className="text-white/80 text-sm font-medium mb-2">答题小提示</p>
              <ul className="text-white/45 text-xs space-y-1.5 leading-relaxed">
                <li>· 凭<strong className="text-white/60">第一直觉</strong>作答，不要反复斟酌</li>
                <li>· 选择最像<strong className="text-white/60">真实的自己</strong>的选项，而不是"应该"选的</li>
                <li>· 没有标准答案，<strong className="text-white/60">诚实面对自己</strong>才能得到有意义的结果</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={() => navigate('/quiz')}
          className="w-full bg-white text-[#5b4ae0] font-bold text-lg py-3.5 rounded-2xl hover:bg-white/95 hover:shadow-xl active:scale-[0.98] transition-all cursor-pointer shadow-[0_4px_24px_rgba(255,255,255,0.15)]"
        >
          开始测试
        </button>

        <p className="text-white/25 text-xs text-center mt-5">
          无需填写任何个人信息 · 完成测试后揭晓结果
        </p>

        {/* Footer */}
        <p className="text-white/20 text-xs text-center mt-10 leading-relaxed">
          基于心理学研究设计 · 仅供参考娱乐
        </p>
      </div>
    </div>
  );
}
