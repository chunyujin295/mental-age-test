import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-5">🧠</div>
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
            测测你的心理年龄
          </h1>
          <p className="text-white/70 text-base leading-relaxed max-w-sm mx-auto">
            32 道精选题目，从认知、情感、社交和生活态度四个维度，
            科学评估你的心理成熟度
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {[
            { icon: '🧩', text: '四个科学维度' },
            { icon: '⏱️', text: '约 3-5 分钟' },
            { icon: '📊', text: '雷达图可视化' },
            { icon: '🔬', text: '心理学研究支撑' },
          ].map((item) => (
            <div
              key={item.text}
              className="bg-white/10 backdrop-blur-xl rounded-xl p-3 border border-white/10 text-center"
            >
              <div className="text-xl mb-1">{item.icon}</div>
              <div className="text-white/60 text-xs">{item.text}</div>
            </div>
          ))}
        </div>

        {/* Start button */}
        <button
          onClick={() => navigate('/quiz')}
          className="w-full bg-white text-primary-600 font-bold text-lg py-3.5 rounded-xl hover:bg-white/95 hover:shadow-xl active:scale-[0.98] transition-all cursor-pointer shadow-lg"
        >
          开始测试
        </button>

        <p className="text-white/30 text-xs text-center mt-6">
          无需填写任何个人信息 · 完成测试后揭晓结果
        </p>

        {/* Footer */}
        <div className="mt-10 text-center text-white/25 text-xs leading-relaxed">
          <p>本测试基于主观年龄心理学研究设计，仅供参考娱乐。</p>
          <p>如您有心理健康方面的担忧，请咨询专业心理医生。</p>
        </div>
      </div>
    </div>
  );
}
