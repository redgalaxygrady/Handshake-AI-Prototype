
import React, { useState, useRef } from 'react';
import { INTERACTIONS } from './constants.ts';
import InteractionBlock from './components/InteractionBlock.tsx';
import ContextDrawer from './components/ContextDrawer.tsx';

const App: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState<number>(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleComplete = (id: number) => {
    if (id === visibleCount && visibleCount < INTERACTIONS.length) {
      setVisibleCount(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-yellow-100 relative overflow-x-hidden flex" ref={containerRef}>
      {/* Main Content Area */}
      <div 
        className={`flex-grow transition-all duration-300 ease-in-out ${isDrawerOpen ? 'lg:mr-[400px]' : 'mr-0'}`}
      >
        {/* Persistent Toggle for Fellow Context (only visible when drawer is closed) */}
        {!isDrawerOpen && (
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="fixed top-6 right-6 z-40 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-md text-xs font-bold uppercase tracking-widest text-slate-600 hover:border-slate-900 hover:text-slate-900 transition-all active:scale-95 flex items-center gap-2 group animate-in fade-in duration-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-slate-900 transition-colors"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            Fellow context
          </button>
        )}

        {/* Header Area */}
        <header className="max-w-3xl mx-auto px-6 pt-24 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white">
               <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            </div>
            <h1 className="text-sm font-bold tracking-[0.3em] text-slate-400 uppercase">Understanding AI Model Failures</h1>
          </div>
          
          <div className="space-y-3 mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Primary Goal</span>
            <p className="text-3xl text-slate-900 leading-tight font-extrabold tracking-tight">
              Accurately identify whether an AI model’s failure is caused by a reasoning error or a recall error.
            </p>
          </div>

          <div className="space-y-12">
            {/* Success Criteria */}
            <section className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
                    Success Looks Like
                </h2>
                <ul className="space-y-4 text-slate-700 text-sm leading-relaxed">
                    {[
                    "Correct classification of AI failures as reasoning or recall.",
                    "Identifying exactly where reasoning or factual accuracy breaks down.",
                    "Explaining the difference between the two in plain language."
                    ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <div className="mt-1 w-4 h-4 bg-white border border-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <span className="font-medium leading-tight">{item}</span>
                    </li>
                    ))}
                </ul>
            </section>

            {/* Fellow Reference Call-out */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                    <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3">
                        Fellow Reference
                    </h2>
                    <p className="text-sm text-slate-600">
                        Access background material on reasoning errors and how to think about model failures.
                    </p>
                </div>
                <div className="flex flex-col gap-3 w-full md:w-auto">
                    <button 
                        onClick={() => setIsDrawerOpen(true)}
                        className="w-full md:w-64 px-6 py-3 bg-slate-900 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0"
                    >
                        Open Fellow Context
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </button>
                    <button 
                        onClick={(e) => { e.preventDefault(); }}
                        className="w-full md:w-64 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:border-slate-900 hover:text-slate-900 transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0"
                    >
                        Download Cheatsheet
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    </button>
                </div>
            </section>

            {/* Core Definitions Reference */}
            <section className="pt-12 border-t border-slate-100">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Reasoning Error</h3>
                    <p className="text-slate-700 text-base leading-relaxed font-medium">
                      The model has the relevant facts but connects them incorrectly, leading to a false conclusion.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Recall Error</h3>
                    <p className="text-slate-700 text-base leading-relaxed font-medium">
                      The model fails because a basic fact is missing, wrong, or fabricated.
                    </p>
                  </div>
               </div>
               <div className="mt-12 h-[1px] bg-slate-100 w-full"></div>
            </section>
          </div>
        </header>

        {/* Interaction Stream */}
        <main className="max-w-3xl mx-auto px-6 mt-16 space-y-32">
          {INTERACTIONS.slice(0, visibleCount).map((interaction, index) => (
            <InteractionBlock 
              key={interaction.id} 
              interaction={interaction} 
              isLast={index === INTERACTIONS.length - 1}
              onComplete={() => handleComplete(interaction.id)}
            />
          ))}

          {/* Persistent Next Module Link */}
          <section className="py-32 flex justify-center border-t border-slate-50">
            <button 
              onClick={(e) => e.preventDefault()}
              className="text-indigo-600 hover:text-indigo-800 font-extrabold text-2xl tracking-tight transition-all hover:translate-x-1 flex items-center gap-3 active:scale-95"
            >
              SFT vs RLHF
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </section>
        </main>
      </div>

      {/* Persistent Fellow Context Drawer */}
      <ContextDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
};

export default App;
