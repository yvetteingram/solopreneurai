
import React from 'react';

const StrategyMap: React.FC = () => {
  return (
    <div className="w-full py-10 print:py-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 hidden md:block"></div>
        
        {[
          { label: 'Foundation', icon: '📋', step: '01' },
          { label: 'Priority', icon: '🎯', step: '02' },
          { label: 'Filter', icon: '🧹', step: '03' },
          { label: 'Action', icon: '⚡', step: '04' },
          { label: 'Execution', icon: '🗓️', step: '05' },
        ].map((node, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center group">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white border-2 border-slate-200 shadow-sm flex items-center justify-center text-xl md:text-2xl mb-3 group-hover:border-slate-900 transition-all duration-300">
              {node.icon}
            </div>
            <div className="text-center">
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Step {node.step}</span>
              <span className="block text-[11px] font-bold text-slate-900 uppercase tracking-tight">{node.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrategyMap;
