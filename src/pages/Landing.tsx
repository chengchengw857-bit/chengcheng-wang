import { Link } from 'react-router-dom';
import { Leaf, ArrowRight, CheckCircle2, Layers, Database, Cpu, Users } from 'lucide-react';
import { motion } from 'motion/react';

export default function Landing() {
  const labels = [
    '人参', '三七', '枸杞', '黄芪', '当归', '党参', '麦冬', '五味子', '金银花', '连翘',
    '板蓝根', '柴胡', '白芍', '川芎', '熟地黄', '白术', '茯苓', '甘草', '陈皮', '半夏'
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">HerbVision</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
            登录 / 注册
          </Link>
          <Link to="/dashboard" className="bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm">
            进入控制台
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Content */}
        <div className="lg:col-span-8 space-y-16">
          {/* Hero */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-5xl font-bold leading-tight text-slate-900">
              中草药图像识别系统
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl">
              基于深度学习的中草药图像识别与分类平台，提供快速、准确的药材鉴定服务。
            </p>
            <div className="flex items-center gap-4 pt-4">
              <Link to="/dashboard" className="flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-full font-medium hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg">
                马上体验
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="px-8 py-3 rounded-full font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors">
                了解更多
              </button>
            </div>
          </motion.div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: '多类别精准识别', desc: '支持数百种常见中草药的快速识别，准确率高达95%以上。', icon: CheckCircle2 },
              { title: '深度学习模型驱动', desc: '采用先进的ResNet50卷积神经网络架构，持续优化识别效果。', icon: Cpu },
              { title: '实时分析与反馈', desc: '毫秒级响应速度，提供详细的识别概率分布和药材特征说明。', icon: Layers },
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <feature.icon className="w-8 h-8 text-emerald-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Architecture */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Layers className="w-6 h-6 text-emerald-600" />
              系统架构
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: '用户层', desc: '提供直观的Web界面，支持图片上传、结果展示和历史记录查询。', icon: Users },
                { title: '业务逻辑层', desc: '处理用户请求，管理识别任务，协调模型服务与数据存储。', icon: Layers },
                { title: '模型服务层', desc: '封装TensorFlow/PyTorch模型，提供高性能的推理API接口。', icon: Cpu },
                { title: '数据存储层', desc: '安全可靠地存储用户数据、识别记录和系统配置信息。', icon: Database },
              ].map((arch, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200">
                  <arch.icon className="w-6 h-6 text-slate-400 mb-3" />
                  <h4 className="font-semibold text-sm mb-1">{arch.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{arch.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Labels */}
        <div className="lg:col-span-4">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">识别标签 (分类)</h3>
              <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-md">Total Labels</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {labels.map((label, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors cursor-default"
                >
                  {label}
                </span>
              ))}
              <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-400">
                ...
              </span>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
