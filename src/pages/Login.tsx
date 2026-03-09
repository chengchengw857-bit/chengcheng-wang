import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Leaf, CheckCircle2, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 flex bg-white rounded-lg shadow-sm border border-slate-200 p-1">
        {[
          { code: 'zh', label: '中文' },
          { code: 'en', label: 'EN' },
          { code: 'pt', label: 'PT' }
        ].map((lng) => (
          <button
            key={lng.code}
            onClick={() => changeLanguage(lng.code)}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              i18n.language === lng.code ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {lng.label}
          </button>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px]"
      >
        {/* Left Side - Branding */}
        <div className="md:w-5/12 bg-emerald-800 text-white p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-600 blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-emerald-900 blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-12">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-wider uppercase text-white/90">HerbVision</span>
            </div>
            
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              {isLogin ? t('welcome') : t('create_account')}
            </h1>
            <p className="text-emerald-200 text-lg mb-12">
              {t('login_desc')}
            </p>

            <div className="space-y-6">
              {[
                '多类别精准识别',
                'ResNet50 深度学习模型',
                '实时分析与详细反馈'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-50">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative z-10 text-sm text-emerald-400/60 mt-12">
            &copy; {new Date().getFullYear()} HerbVision. All rights reserved.
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-7/12 p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              {isLogin ? t('login_title') : t('register_title')}
            </h2>
            <p className="text-slate-500 mb-8">
              {isLogin ? t('login_subtitle') : t('register_subtitle')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">{t('email')}</label>
                  <input 
                    type="email" 
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                    placeholder={t('email')}
                  />
                </div>
              )}
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">{t('username')}</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                  placeholder={t('username')}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">{t('password')}</label>
                <input 
                  type="password" 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                  placeholder={t('password')}
                />
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <a href="#" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                    {t('forgot_password')}
                  </a>
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-emerald-600 text-white py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg mt-4"
              >
                {isLogin ? t('login_btn') : t('register_btn')}
              </button>
            </form>

            <div className="mt-8 text-center text-slate-500 text-sm">
              {isLogin ? t('no_account') : t('have_account')}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-emerald-600 font-medium hover:underline"
              >
                {isLogin ? t('register_link') : t('login_link')}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
