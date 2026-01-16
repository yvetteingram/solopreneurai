import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 w-8 h-8 rounded flex items-center justify-center text-white font-bold">K</div>
            <div className="flex flex-col">
              <span className="text-xs font-black tracking-[0.2em] text-slate-900 uppercase leading-none">Ketorah Digital</span>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Business Strategy</span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Guided Solution Finder</span>
        </div>
      </header>
      <main className="flex-grow flex flex-col max-w-4xl mx-auto w-full px-6 py-8">
        {children}
      </main>
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs text-slate-400 font-medium tracking-tight">
            Ketorah Digital provides practical AI implementation strategy. This is an informational consulting tool.
          </p>
          <div className="mt-4 text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} KETORAH DIGITAL. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;