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

  const handleComplete = async (responses: UserResponses) => {
    setView(AppView.GENERATING);
    setLoading(true);
    try {
      const data = await generateRoadmap(responses);
      setRoadmap(data);
      setView(AppView.ROADMAP);
    } catch (error) {
      console.error("Roadmap generation failed:", error);
      setView(AppView.QUESTIONNAIRE);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {view === AppView.LANDING && (
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

      {view === AppView.QUESTIONNAIRE && (
        <Questionnaire onComplete={handleComplete} />
      )}

      {view === AppView.GENERATING && (
        <div className="flex-grow flex flex-col items-center justify-center py-24 text-center">
          <div className="relative w-16 h-16 mb-8">
            <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Preparing Your Strategy</h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] animate-pulse">
            Compiling tactical actions & professional outlook...
          </p>
        </div>
      )}

      {view === AppView.ROADMAP && roadmap && (
        <RoadmapView data={roadmap} />
      )}
    </Layout>
  );
};

export default App;