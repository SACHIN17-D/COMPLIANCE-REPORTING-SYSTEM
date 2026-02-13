import React from 'react';
import { LayoutDashboard, FileText, Settings, LogOut, UserPlus, UserCircle } from 'lucide-react';

interface SidebarProps {
  role: 'Admin' | 'Reporter' | 'Student';
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ role, activeTab, setActiveTab, onLogout }) => {
  const menuItems = {
    Admin: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'reports', label: 'Reports', icon: FileText },
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
    Reporter: [
      { id: 'submit', label: 'Submit Report', icon: UserPlus },
      { id: 'my-reports', label: 'My Reports', icon: FileText },
    ],
    Student: [
      { id: 'my-reports', label: 'My Reports', icon: FileText },
    ],
  };

  const currentMenu = menuItems[role];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-3 text-white">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">R</div>
          <span className="text-xl font-bold tracking-tight">ReportHub</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {currentMenu.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === item.id 
                ? 'bg-slate-800 text-white' 
                : 'hover:bg-slate-800/50 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export const Header: React.FC<{ title: string; userRole: string }> = ({ title, userRole }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-slate-900">User Profile</p>
          <p className="text-xs text-slate-500 capitalize">{userRole} Account</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
          <UserCircle size={24} />
        </div>
      </div>
    </header>
  );
};
