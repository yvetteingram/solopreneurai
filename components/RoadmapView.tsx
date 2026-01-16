import React, { useState, useRef } from 'react';
import { RoadmapData } from '../types';
import StrategyMap from './StrategyMap';

interface RoadmapViewProps {
  data: RoadmapData;
}

const RoadmapView: React.FC<RoadmapViewProps> = ({ data }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const roadmapRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!roadmapRef.current) return;
    
    const html2pdf = (window as any).html2pdf;
    if (!html2pdf) {
      alert("PDF library failed to load. Please refresh the page.");
      return;
    }

    setIsExporting(true);
    setExportProgress(10);

    const element = roadmapRef.current;
    const opt = {
      margin: [10, 10, 10, 10],
      filename: `KetorahDigital_AI_Roadmap_${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        letterRendering: true, 
        logging: false,
        backgroundColor: '#ffffff'
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
      setExportProgress(40);
      const worker = html2pdf().set(opt).from(element);
      setExportProgress(70);
      await worker.save();
      setExportProgress(100);
      
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
      }, 500);
    } catch (error) {
      console.error("PDF Export failed:", error);
      alert("Direct PDF download failed. Attempting system print as fallback.");
      window.print();
      setIsExporting(false);
    }
  };

  const renderContentPair = (preview: string | string[], comprehensive: string | string[], type: 'list' | 'numbered' = 'list') => {
    const isNumbered = type === 'numbered';
    
    const renderList = (items: string | string[], style: 'summary' | 'tactical') => {
      if (!Array.isArray(items)) return <p className={`mt-2 ${style === 'summary' ? 'text-slate-900 font-medium' : 'text-slate-600'} text-sm leading-relaxed`}>{items}</p>;
      
      return (
        <ul className={`space-y-3 mt-4 ${style === 'tactical' ? 'border-l-2 border-slate-100 pl-6 ml-1' : ''}`}>
          {items.map((item, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed">
              {style === 'summary' ? (
                <span className="text-slate-900 font-black">→</span>
              ) : (
                <span className="text-slate-300">•</span>
              )}
              <span className={style === 'summary' ? 'text-slate-900 font-semibold' : 'text-slate-600'}>{item}</span>
            </li>
          ))}
        </ul>
      );
    };

    const renderNumbered = (items: string | string[], style: 'summary' | 'tactical') => {
      if (!Array.isArray(items)) return renderList(items, style);
      
      return (
        <div className={`space-y-6 mt-4 ${style === 'tactical' ? 'border-l-2 border-slate-100 pl-6 ml-1' : ''}`}>
          {items.map((item, i) => {
            const parts = item.split(':');
            const title = parts.length > 1 ? parts[0] : `Priority ${i + 1}`;
            const desc = parts.length > 1 ? parts.slice(1).join(':') : item;
            return (
              <div key={i} className="flex gap-4">
                {style === 'summary' && (
                  <span className="flex-shrink-0 w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center text-[10px] font-black text-white">{i + 1}</span>
                )}
                <div>
                  <h4 className={`text-sm font-bold ${style === 'summary' ? 'text-slate-900' : 'text-slate-500'} mb-1`}>{title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      );
    };

    return (
      <div className="space-y-8">
        <div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Executive Summary</span>
          {isNumbered ? renderNumbered(preview, 'summary') : renderList(preview, 'summary')}
        </div>
        <div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Tactical Implementation</span>
          {isNumbered ? renderNumbered(comprehensive, 'tactical') : renderList(comprehensive, 'tactical')}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      {isExporting && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-md print:hidden">
          <div className="text-center p-8 max-w-sm scale-110">
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-black text-slate-900">
                {exportProgress}%
              </div>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Ketorah Digital Strategy</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Formatting your premium AI strategy brief. Compiling high-resolution tactical layers...</p>
          </div>
        </div>
      )}

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 animate-in fade-in slide-in-from-top-4 print:hidden">
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Ketorah Digital Strategy Brief</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Tiered Overview & Tactical Depth</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            disabled={isExporting}
            onClick={handleExportPDF}
            className="group relative overflow-hidden flex items-center gap-2 px-8 py-4 bg-slate-900 text-white text-xs font-black rounded-xl hover:bg-slate-800 transition-all shadow-xl active:scale-95 disabled:opacity-90 uppercase tracking-widest"
          >
            <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download Professional PDF</span>
          </button>
        </div>
      </div>

      <div ref={roadmapRef} className="bg-white border border-slate-200 rounded-[3rem] shadow-sm overflow-hidden print:border-none print:shadow-none print:rounded-none">
        {/* Header */}
        <div className="bg-slate-900 p-10 md:p-16 text-white relative overflow-hidden print:p-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[100px] rounded-full print:hidden"></div>
          
          <div className="flex items-center gap-3 mb-12 opacity-80 print:opacity-100">
            <div className="w-10 h-10 rounded bg-white text-slate-900 flex items-center justify-center font-black text-lg">K</div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] leading-none">Ketorah Digital</span>
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-1">AI Business Strategy</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight leading-[0.9]">
            Strategic AI <br /> Roadmap.
          </h1>
          <p className="text-slate-400 text-sm font-medium tracking-wide max-w-lg print:text-slate-300">
            A comprehensive implementation brief by Ketorah Digital, featuring executive strategy and tactical depth for solopreneur operations.
          </p>
        </div>

        {/* Overview */}
        <div className="px-8 md:px-16 pt-12 pb-6 border-b border-slate-100 print:pt-8 print:pb-4">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 text-center">Strategic Framework</div>
          <StrategyMap />
        </div>

        {/* Sections */}
        <div className="p-8 md:p-16 space-y-24 relative print:p-12 print:space-y-16">
          
          <section className="page-break-inside-avoid">
            <div className="roadmap-label">Phase 01: The Landscape</div>
            {renderContentPair(data.situation.preview, data.situation.comprehensive)}
          </section>

          <section className="bg-slate-50 -mx-8 md:-mx-16 px-8 md:px-16 py-16 border-y border-slate-100 page-break-inside-avoid print:bg-slate-50">
            <div className="roadmap-label">Phase 02: High-Impact Focus</div>
            {renderContentPair(data.focus.preview, data.focus.comprehensive, 'numbered')}
          </section>

          <section className="page-break-inside-avoid">
            <div className="roadmap-label">Phase 03: Operational Clarity</div>
            {renderContentPair(data.ignore.preview, data.ignore.comprehensive)}
          </section>

          <section className="bg-slate-900 -mx-8 md:-mx-16 px-8 md:px-16 py-16 text-white relative rounded-[3rem] page-break-inside-avoid print:bg-slate-900 print:rounded-3xl">
            <div className="roadmap-label text-slate-500">Phase 04: The First Wedge</div>
            <div className="mt-8 grid md:grid-cols-2 gap-10">
              <div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4">Strategic Logic</span>
                <p className="text-lg font-medium leading-relaxed text-white">{data.oneStep.preview}</p>
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4">Tactical Execution</span>
                <p className="text-sm leading-relaxed text-slate-400">{data.oneStep.comprehensive}</p>
              </div>
            </div>
          </section>

          <section>
            <div className="roadmap-label mb-12">Phase 05: 30-Day Outlook</div>
            <div className="space-y-6">
              {([1, 2, 3, 4] as const).map((num) => {
                const week = data.next30Days[`week${num}`];
                return (
                  <div key={num} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 page-break-inside-avoid print:bg-white print:border-slate-200">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-32 flex-shrink-0">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Week 0{num}</span>
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">Focus</span>
                      </div>
                      <div className="flex-grow space-y-4">
                        <p className="text-slate-900 font-bold text-sm">{week.preview}</p>
                        <p className="text-slate-500 text-sm leading-relaxed italic border-l-2 border-slate-200 pl-4">
                          {week.comprehensive}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="pt-12 border-t border-slate-100 page-break-inside-avoid print:border-t-slate-200">
            <div className="roadmap-label">Phase 06: Immediate Momentum</div>
            <div className="mt-8 p-10 bg-slate-900 text-white rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 print:bg-slate-50 print:text-slate-900 print:rounded-2xl">
              <div className="text-center md:text-left flex-grow">
                <p className="text-lg font-bold mb-2">{data.nextStep.preview}</p>
                <p className="text-sm text-slate-400 print:text-slate-600">{data.nextStep.comprehensive}</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-white text-slate-900 flex items-center justify-center text-2xl font-black print:bg-slate-900 print:text-white">
                →
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="mt-12 text-center pb-20">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] print:text-slate-400">
          &copy; {new Date().getFullYear()} KETORAH DIGITAL • CONFIDENTIAL BUSINESS STRATEGY
        </p>
      </div>

      <style>{`
        .roadmap-label {
          font-size: 10px;
          font-weight: 900;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          margin-bottom: 1.5rem;
          display: block;
        }
        @media print {
          .print\\:hidden { display: none !important; }
          .print\\:border-none { border: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:rounded-none { border-radius: 0 !important; }
          body { background: white !important; padding: 0 !important; margin: 0 !important; }
          .max-w-4xl { max-width: 100% !important; width: 100% !important; padding: 0 !important; margin: 0 !important; }
          .page-break-inside-avoid { page-break-inside: avoid; }
          * { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
          @page { margin: 1.5cm; }
          .bg-slate-900 { background-color: #0f172a !important; color: white !important; }
          .bg-slate-50 { background-color: #f8fafc !important; }
          .print\\:border-t-slate-200 { border-top: 1px solid #e2e8f0 !important; }
        }
      `}</style>
    </div>
  );
};

export default RoadmapView;