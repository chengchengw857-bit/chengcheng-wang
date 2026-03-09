import { motion } from 'motion/react';
import { ScanLine, Users, History, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  const stats = [
    { title: t('total_recognitions'), value: '12,450', change: '+12.5%', isUp: true, icon: ScanLine, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: t('today_recognitions'), value: '342', change: '+5.2%', isUp: true, icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { title: t('active_users'), value: '1,204', change: '-2.1%', isUp: false, icon: Users, color: 'text-amber-600', bg: 'bg-amber-100' },
    { title: t('model_accuracy'), value: '96.8%', change: '+0.4%', isUp: true, icon: History, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('welcome_admin')}</h1>
        <p className="text-sm text-slate-500 mt-1">{t('system_overview')}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${stat.isUp ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.isUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
        >
          <h2 className="text-lg font-bold text-slate-800 mb-6">{t('quick_actions')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/dashboard/recognize" className="group p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 transition-all flex flex-col items-center justify-center gap-3 text-center">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <ScanLine className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800 group-hover:text-emerald-700">{t('start_recognize')}</h3>
                <p className="text-xs text-slate-500 mt-1">{t('recognize_desc')}</p>
              </div>
            </Link>
            <Link to="/dashboard/history" className="group p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-all flex flex-col items-center justify-center gap-3 text-center">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <History className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800 group-hover:text-blue-700">{t('view_history')}</h3>
                <p className="text-xs text-slate-500 mt-1">{t('history_desc')}</p>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* System Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
        >
          <h2 className="text-lg font-bold text-slate-800 mb-6">{t('system_status')}</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600 font-medium">{t('model_service')}</span>
                <span className="text-emerald-600 font-medium">{t('running')}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600 font-medium">{t('db_connection')}</span>
                <span className="text-emerald-600 font-medium">{t('normal')}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600 font-medium">{t('storage_usage')}</span>
                <span className="text-amber-600 font-medium">68%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
