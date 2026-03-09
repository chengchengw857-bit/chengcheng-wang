import { motion } from 'motion/react';
import { herbs } from '../../data/herbs';
import { useTranslation } from 'react-i18next';

export default function HerbLibrary() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'zh' | 'en' | 'pt';

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">{t('herb_library')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {herbs.map((herb) => (
          <motion.div 
            key={herb.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <img src={herb.image} alt={herb.name[lang]} className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4">{herb.name[lang]}</h2>
              <div className="space-y-3 text-sm">
                <p><span className="font-semibold text-slate-600">性味：</span>{herb.properties.nature}</p>
                <p><span className="font-semibold text-slate-600">归经：</span>{herb.properties.meridians.join(', ')}</p>
                <p><span className="font-semibold text-slate-600">功效：</span>{herb.properties.functions.join(', ')}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
