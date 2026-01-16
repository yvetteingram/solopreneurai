
import React, { useState, useEffect } from 'react';
// Fixed missing types import by adding them to types.ts
import { BusinessWorkbook, UserProfile } from '../types';

interface DashboardProps {
  workbook: BusinessWorkbook;
  profile: UserProfile;
  isPaid: boolean;
  isDemo?: boolean;
  onRefine: () => void;
  onStartReal?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ workbook, profile, isDemo, onRefine, onStartReal }) => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'branding' | 'marketing' | 'product' | 'emails'>('roadmap');

  const handlePrint = () => {
    window.print();
  };

  const renderRoadmap = () => (
    <div className={`space-y-8 animate-fadeIn`}>
      {workbook.roadmap.map((section, idx) => (
        <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm page-break-inside-avoid mb-6">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">{idx + 1}</span>
              {section.section}
            </h3>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Phase</span>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              {section.tasks.map((task, tidx) => (
                <li key={tidx} className="flex items-start gap-3 text-slate-600">
                  <div className="mt-1 w-4 h-4 rounded border border-slate-300 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMarketing = () => (
    <div className={`space-y-6 animate-fadeIn`}>
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
          <span className="text-2xl">🧲</span> Your Lead Magnet
        </h3>
        <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
          <h4 className="font-bold text-indigo-900 mb-2">{workbook.marketing.leadMagnet.title}</h4>
          <p className="text-indigo-700 text-sm leading-relaxed">{workbook.marketing.leadMagnet.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span>📢</span> Content Strategy
          </h3>
          <ul className="space-y-4">
            {workbook.marketing.adHooks.map((hook, i) => (
              <li key={i} className="text-sm p-3 bg-slate-50 rounded-lg border border-slate-100 text-slate-600 italic">
                "{hook}"
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span>🧩</span> Content Buckets
          </h3>
          <div className="flex flex-wrap gap-2">
            {workbook.marketing.contentBuckets.map((bucket, i) => (
              <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100">
                {bucket}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProduct = () => (
    <div className={`space-y-6 animate-fadeIn`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { type: 'Entry Level', data: workbook.productStack.downsell, color: 'slate' },
          { type: 'Core Offer', data: workbook.productStack.coreOffer, color: 'blue' },
          { type: 'High-Ticket', data: workbook.productStack.upsell, color: 'indigo' }
        ].map((item, i) => (
          <div key={i} className={`bg-white rounded-2xl border ${item.type === 'Core Offer' ? 'border-blue-500 ring-4 ring-blue-50' : 'border-slate-200'} p-6 shadow-sm`}>
            <span className={`text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2 block`}>{item.type}</span>
            <h4 className="text-lg font-bold text-slate-900 mb-1">{item.data.name}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{item.data.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 text-white">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span>⚙️</span> Recommended Tech Stack
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workbook.techStack.map((tech, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-xs">{i + 1}</div>
              <div>
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{tech.category}</p>
                <p className="text-sm font-bold text-white mb-1">{tech.tool}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{tech.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBranding = () => (
    <div className={`space-y-6 animate-fadeIn`}>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span>🎨</span> Brand Narrative
        </h3>
        <p className="text-slate-600 italic leading-relaxed text-sm bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200">
          "{workbook.branding.aboutSnippet}"
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span>🗣️</span> Voice Guidelines
          </h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold text-slate-700 mb-1">Tone: <span className="text-blue-600">{workbook.branding.voiceSheet.tone}</span></p>
              <p className="text-slate-500 text-xs">{workbook.branding.voiceSheet.notes}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-green-600 font-bold text-xs mb-2">DO'S</p>
                <ul className="space-y-1 text-slate-500">
                  {workbook.branding.voiceSheet.dos.map((d, i) => <li key={i}>• {d}</li>)}
                </ul>
              </div>
              <div>
                <p className="text-red-500 font-bold text-xs mb-2">DON'TS</p>
                <ul className="space-y-1 text-slate-500">
                  {workbook.branding.voiceSheet.donts.map((d, i) => <li key={i}>• {d}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span>📱</span> Social Profile Assets
          </h3>
          <div className="space-y-4 text-sm">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-[10px] text-slate-400 font-bold mb-1">PROFILE BIO</p>
              <p className="text-slate-600">{workbook.branding.socialBios.instagram}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-[10px] text-slate-400 font-bold mb-1">PROFESSIONAL HEADLINE</p>
              <p className="text-slate-600">{workbook.branding.socialBios.linkedin}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmails = () => (
    <div className={`space-y-6 animate-fadeIn`}>
      {workbook.emails.map((email, idx) => (
        <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm page-break-inside-avoid">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-blue-600 px-2 py-1 bg-blue-50 rounded">Script #{idx + 1}</span>
              <span className="text-xs text-slate-400 italic">{email.purpose}</span>
            </div>
            <h4 className="font-bold text-slate-800">Subject: {email.subject}</h4>
          </div>
          <div className="p-6 bg-slate-50/50">
            <pre className="whitespace-pre-wrap font-sans text-sm text-slate-600 leading-relaxed">
              {email.body}
            </pre>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex-grow bg-slate-50 pb-20">
      <div className="hidden print:block p-12 bg-white border-b-8 border-blue-600 mb-12">
        <div className="flex justify-between items-start mb-20">
          <div>
            <h1 className="text-4xl font-black text-slate-900 mb-2">Ketorah AI Guided Roadmap</h1>
            <p className="text-lg text-slate-500 font-medium">Custom Launch Strategy & Assets</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Date Generated</p>
            <p className="text-sm font-bold text-slate-900">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="p-8 bg-blue-50 rounded-3xl border-2 border-blue-100 mb-12">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">Personalized For</h2>
          <p className="text-3xl font-black text-slate-900">{profile.email}</p>
          <div className="h-px bg-blue-200 my-6" />
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="text-slate-400 font-bold mb-1 uppercase text-[10px]">Business Type</p>
              <p className="text-slate-800 font-bold">{profile.businessType}</p>
            </div>
            <div>
              <p className="text-slate-400 font-bold mb-1 uppercase text-[10px]">Core Objective</p>
              <p className="text-slate-800 font-bold">{profile.goal}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-slate-200 py-6 md:py-10 print:hidden">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">
                Informational Guide • {profile.email}
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
                {isDemo ? 'Sample Roadmap' : `Your Custom ${profile.goal} Plan`}
              </h1>
              <p className="text-slate-500 text-sm">
                Generated for <span className="font-medium text-slate-800">{profile.businessType}</span>.
              </p>
            </div>
            
            <button 
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-black rounded-xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
            >
              <span>📄</span> Export Full PDF
            </button>
          </div>
          
          <div className="flex gap-4 mt-8 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { id: 'roadmap', label: 'Roadmap', icon: '🚀' },
              { id: 'branding', label: 'Branding', icon: '🧱' },
              { id: 'marketing', label: 'Marketing', icon: '🧲' },
              { id: 'product', label: 'Strategy', icon: '⚙️' },
              { id: 'emails', label: 'Scripts', icon: '✉️' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all font-medium text-sm ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 relative">
        <div className="print:block space-y-12">
          <div className={`${activeTab === 'roadmap' ? 'block' : 'hidden print:block'}`}>
            <h2 className="hidden print:block text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">Phase 01: Launch Roadmap</h2>
            {renderRoadmap()}
          </div>

          <div className={`${activeTab === 'branding' ? 'block' : 'hidden print:block'}`}>
            <div className="print:mt-12">
              <h2 className="hidden print:block text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">Phase 02: Branding & Narrative</h2>
              {renderBranding()}
            </div>
          </div>

          <div className={`${activeTab === 'marketing' ? 'block' : 'hidden print:block'}`}>
            <div className="print:mt-12">
              <h2 className="hidden print:block text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">Phase 03: Outreach Strategy</h2>
              {renderMarketing()}
            </div>
          </div>

          <div className={`${activeTab === 'product' ? 'block' : 'hidden print:block'}`}>
            <div className="print:mt-12">
              <h2 className="hidden print:block text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">Phase 04: Product Strategy</h2>
              {renderProduct()}
            </div>
          </div>

          <div className={`${activeTab === 'emails' ? 'block' : 'hidden print:block'}`}>
            <div className="print:mt-12">
              <h2 className="hidden print:block text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">Phase 05: Messaging Scripts</h2>
              {renderEmails()}
            </div>
          </div>
          
          <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 print:bg-slate-50">
            <h3 className="font-bold text-slate-800 mb-4">Implementation Checklist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workbook.bonusTips.map((tip, idx) => (
                <div key={idx} className="flex gap-3 text-sm text-slate-500">
                  <span className="text-blue-600 font-bold">#</span>
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body { background: white !important; padding: 0 !important; margin: 0 !important; }
          .print\\:hidden { display: none !important; }
          .print\\:block { display: block !important; }
          .page-break-inside-avoid { page-break-inside: avoid; }
          pre { border: none !important; background: transparent !important; font-size: 11pt !important; }
          * { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
          .max-w-4xl { max-width: 100% !important; width: 100% !important; padding: 0 !important; }
          .bg-slate-50 { background-color: #f8fafc !important; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
