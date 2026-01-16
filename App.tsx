import React, { useState } from 'react';
import Layout from './components/Layout';
import Questionnaire from './components/Questionnaire';
import RoadmapView from './components/RoadmapView';
import { AppView, UserResponses, RoadmapData } from './types';
import { generateRoadmap } from './geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleComplete = async (responses: UserResponses) => {
    setView(AppView.GENERATING);
    setLoading(true);
    setError(null);
    try {
      // The service now handles the lack of an API key internally by providing a fallback blueprint.
      const data = await generateRoadmap(responses);
      setRoadmap(data);
      setView(AppView.ROADMAP);
    } catch (err: any) {
      console.error("Roadmap generation failed:", err);
      setError(err.message || "An unexpected error occurred while generating your strategy.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setView(AppView.LANDING);
    setRoadmap(null);
  };

  return (
    <Layout>
      {error && (
        <div className="max-w-md mx-auto py-20 text-center animate-in fade-in zoom-in duration-300">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">⚠️</div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Strategy Generation Failed</h2>
          <p className="text-sm text-slate-500 mb-8 leading-relaxed">
            {error}
          </p>
          <button 
            onClick={reset}
            className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest text-xs"
          >
            Return to Start
          </button>
        </div>
      )}

      {!error && view === AppView.LANDING && (
        <div className="max-w-2xl mx-auto py-20 text-center animate-in fade-in slide-in-from-top-4 duration-1000">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
            SolopreneurAI
          </h1>
          <p className="text-xl text-slate-500 mb-12 leading-relaxed max-w-lg mx-auto">
            A high-substance, tactical roadmap to help you integrate AI tools into your business operations with professional clarity. Stop the guesswork and get a structured, 30-day implementation plan tailored to your specific workflow.
          </p>
          <button 
            onClick={() => setView(AppView.QUESTIONNAIRE)}
            className="px-12 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all active:scale-95 shadow-2xl shadow-slate-200 uppercase tracking-widest text-xs"
          >
            Generate Roadmap
          </button>
        </div>
      )}

      {!error && view === AppView.QUESTIONNAIRE && (
        <Questionnaire onComplete={handleComplete} />
      )}

      {!error && view === AppView.GENERATING && (
        <div className="flex-grow flex flex-col items-center justify-center py-24 text-center">
          <div className="relative w-16 h-16 mb-8">
            <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Compiling Strategy</h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] animate-pulse">
            Analyzing operational gaps & tactical outlook...
          </p>
        </div>
      )}

      {!error && view === AppView.ROADMAP && roadmap && (
        <RoadmapView data={roadmap} />
      )}
    </Layout>
  );
};

export default App;