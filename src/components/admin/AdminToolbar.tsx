import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldCheck, 
  FolderGit2, 
  Cpu, 
  Award, 
  Briefcase, 
  Sliders, 
  Mail, 
  LogOut, 
  User,
  Plus
} from 'lucide-react';
import { getMessages } from '../../lib/api';

interface AdminToolbarProps {
  onOpenModal: (tab?: string) => void;
}

export const AdminToolbar: React.FC<AdminToolbarProps> = ({ onOpenModal }) => {
  const { isAdmin, logout } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!isAdmin) return;
    const fetchCount = async () => {
      try {
        const msgs = await getMessages();
        setUnreadCount(msgs.filter(m => !m.isRead).length);
      } catch {
        // ignore
      }
    };
    fetchCount();
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, [isAdmin]);

  if (!isAdmin) return null;

  return (
    <aside aria-label="Admin Control Bar" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 text-white backdrop-blur-xl border border-amber-500/40 rounded-full px-4 py-2.5 shadow-2xl flex items-center gap-2 sm:gap-3">
      {/* Admin badge */}
      <div className="flex items-center gap-1.5 pr-2 border-r border-slate-700 text-amber-400 font-mono text-xs font-bold">
        <ShieldCheck className="w-4 h-4 text-amber-400" />
        <span className="hidden sm:inline">Admin Mode</span>
      </div>

      {/* Quick Access Tabs */}
      <button
        onClick={() => onOpenModal('projects')}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
        title="Manage Projects"
      >
        <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
        <span className="hidden md:inline">Projects</span>
      </button>

      <button
        onClick={() => onOpenModal('skills')}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
        title="Manage Skills"
      >
        <Cpu className="w-3.5 h-3.5 text-sky-400" />
        <span className="hidden md:inline">Skills</span>
      </button>

      <button
        onClick={() => onOpenModal('profile')}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
        title="Edit Profile"
      >
        <User className="w-3.5 h-3.5 text-purple-400" />
        <span className="hidden md:inline">Profile</span>
      </button>

      <button
        onClick={() => onOpenModal('messages')}
        className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
        title="Inquiries Inbox"
      >
        <Mail className="w-3.5 h-3.5 text-emerald-400" />
        <span className="hidden md:inline">Inbox</span>
        {unreadCount > 0 && (
          <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      <button
        onClick={() => onOpenModal('settings')}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
        title="Site Settings & Toggles"
      >
        <Sliders className="w-3.5 h-3.5 text-amber-400" />
        <span className="hidden md:inline">Settings</span>
      </button>

      {/* Logout */}
      <div className="pl-2 border-l border-slate-700">
        <button
          onClick={logout}
          className="p-1.5 rounded-full hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
          title="Exit Admin Mode"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
