import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, ScanLine, History, Users, Bell, LogOut, Leaf, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';

export default function DashboardLayout() {
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { name: t('home'), path: '/dashboard/home', icon: LayoutDashboard },
    { name: t('recognize'), path: '/dashboard/recognize', icon: ScanLine },
    { name: t('history'), path: '/dashboard/history', icon: History },
    { name: t('herb_library'), path: '/dashboard/herb-library', icon: Leaf },
    { name: t('users'), path: '/dashboard/users', icon: Users },
    { name: t('announcements'), path: '/dashboard/announcements', icon: Bell },
  ];

  // Simple breadcrumb logic
  const currentItem = navItems.find(item => location.pathname.includes(item.path)) || navItems[1];

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-900 text-slate-300 flex flex-col shadow-xl z-20">
        <div className="h-16 flex items-center px-6 border-b border-emerald-800/50">
          <div className="flex items-center gap-2 text-white">
            <Leaf className="w-6 h-6 text-emerald-400" />
            <span className="text-lg font-bold tracking-wider">HerbVision</span>
          </div>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium text-sm',
                  isActive 
                    ? 'bg-emerald-800 text-white' 
                    : 'hover:bg-emerald-800/50 hover:text-emerald-100'
                )
              }
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-emerald-800/50">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg hover:bg-emerald-800/50 transition-colors text-sm font-medium text-emerald-200 hover:text-white">
            <LogOut className="w-5 h-5" />
            退出登录
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10">
          <div className="flex items-center text-sm text-slate-500">
            <span>{t('dashboard')}</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="font-medium text-slate-900">{currentItem?.name}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm border border-emerald-200">
              A
            </div>
            <span className="text-sm font-medium">Admin</span>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
