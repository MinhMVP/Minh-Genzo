
import React from 'react';
import { BookOpen, GraduationCap, Home, Languages, ClipboardList, Menu, Search, Type } from 'lucide-react';
import { View, Grade } from '../types';
import { GRADES } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  setView: (view: View) => void;
  selectedGrade: Grade;
  setGrade: (grade: Grade) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setView, selectedGrade, setGrade }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 sticky top-0 h-screen shadow-sm">
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-2 text-indigo-600 mb-8 cursor-pointer" onClick={() => setView('home')}>
            <GraduationCap size={32} />
            <h1 className="text-xl font-bold tracking-tight">EduEnglish</h1>
          </div>

          <nav className="space-y-1 flex-1">
            <NavItem icon={<Home size={20} />} label="Trang chủ" active={activeView === 'home'} onClick={() => setView('home')} />
            <NavItem icon={<BookOpen size={20} />} label="Bài học (12 Thì)" active={activeView === 'lessons' || activeView === 'grammar-detail'} onClick={() => setView('lessons')} />
            <NavItem icon={<Languages size={20} />} label="Từ vựng" active={activeView === 'vocabulary'} onClick={() => setView('vocabulary')} />
            <NavItem icon={<ClipboardList size={20} />} label="Kiểm tra" active={activeView === 'quizzes'} onClick={() => setView('quizzes')} />
            <div className="pt-4 border-t border-gray-100 mt-4">
              <h3 className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Công cụ</h3>
              <NavItem icon={<Search size={20} />} label="Dịch thuật AI" active={activeView === 'translation'} onClick={() => setView('translation')} />
            </div>
          </nav>

          <div className="mt-auto">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Chọn khối lớp</h3>
            <div className="grid grid-cols-4 gap-2">
              {GRADES.map((g) => (
                <button
                  key={g}
                  onClick={() => setGrade(g)}
                  className={`aspect-square flex items-center justify-center rounded-lg text-xs font-bold transition-all ${
                    selectedGrade === g 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Nav */}
      <header className="md:hidden bg-white border-b border-gray-200 p-4 sticky top-0 z-40 flex items-center justify-between shadow-sm">
         <div className="flex items-center gap-2 text-indigo-600" onClick={() => setView('home')}>
            <GraduationCap size={24} />
            <h1 className="text-lg font-bold">EduEnglish</h1>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-[150px]">
            <span className="text-xs text-gray-400 font-bold self-center">Lớp:</span>
            {GRADES.map(g => (
                <button 
                  key={g} 
                  onClick={() => setGrade(g)}
                  className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${selectedGrade === g ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
                >
                  {g}
                </button>
            ))}
          </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-24 md:pb-8">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>

      {/* Bottom Nav - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-3 z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <MobileNavItem icon={<Home size={20} />} active={activeView === 'home'} onClick={() => setView('home')} />
        <MobileNavItem icon={<BookOpen size={20} />} active={activeView === 'lessons'} onClick={() => setView('lessons')} />
        <MobileNavItem icon={<Languages size={20} />} active={activeView === 'vocabulary'} onClick={() => setView('vocabulary')} />
        <MobileNavItem icon={<Search size={20} />} active={activeView === 'translation'} onClick={() => setView('translation')} />
        <MobileNavItem icon={<ClipboardList size={20} />} active={activeView === 'quizzes'} onClick={() => setView('quizzes')} />
      </nav>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm' : 'text-gray-500 hover:bg-gray-50'
    }`}
  >
    {icon}
    <span className="text-sm">{label}</span>
  </button>
);

const MobileNavItem = ({ icon, active, onClick }: { icon: any, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-xl transition-all ${active ? 'text-indigo-600 bg-indigo-50 shadow-sm' : 'text-gray-400'}`}
  >
    {icon}
  </button>
);

export default Layout;
