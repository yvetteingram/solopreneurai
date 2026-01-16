
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
  onPreview: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onPreview }) => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-slate-600"></span>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">SolopreneurAI Guided Solution Finder</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
            Strategic AI Integration <br />
            <span className="text-slate-400">For Your Business.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-slate-500 mb-10 leading-relaxed">
            Get a comprehensive, non-commercial roadmap tailored to your specific business operations. Identify high-impact AI opportunities without the marketing noise.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white font-black rounded-2xl shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
            >
              Start Strategic Session
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button 
              onClick={onPreview}
              className="w-full sm:w-auto px-10 py-5 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:border-slate-300 transition-all uppercase tracking-widest text-xs"
            >
              View Methodology
            </button>
          </div>

          <div className="pt-10 border-t border-slate-100 max-w-4xl mx-auto">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Designed for professional clarity and operational efficiency</p>
          </div>
        </div>
      </section>

      {/* Value Pillars Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Core Methodology</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Our solution finder uses a structured approach to identify where AI can realistically improve your workflow today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center text-xl mb-6">
                🎯
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-tight">Priority Focus</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Determine which operations offer the highest return on AI investment for your specific business stage.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center text-xl mb-6">
                🧹
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-tight">Noise Filtering</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Identify and discard tools or trends that do not contribute directly to your immediate operational goals.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center text-xl mb-6">
                🗓️
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-tight">30-Day Outlook</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                A structured, step-by-step implementation plan designed to introduce AI capabilities without disruption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Outcome Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full"></div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 relative z-10">
            Professional Clarity <br />
            <span className="text-slate-400">At Every Step.</span>
          </h2>
          
          <p className="text-slate-400 mb-12 max-w-xl mx-auto relative z-10">
            This system is designed for small business owners and solopreneurs who need practical, actionable AI strategies without commercial upselling.
          </p>

          <button 
            onClick={onStart}
            className="px-12 py-5 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-100 transition-all active:scale-95 shadow-2xl relative z-10 uppercase tracking-widest text-xs"
          >
            Start Methodology Session
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
