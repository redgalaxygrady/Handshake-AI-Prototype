
import React, { useState, useRef } from 'react';
import { INTERACTIONS } from './constants';
import InteractionBlock from './components/InteractionBlock';
import ContextDrawer from './components/ContextDrawer';

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
    <div className="min-h-screen bg-white selection:bg-yellow-100 pb-32 relative overflow-x-hidden" ref={containerRef}>
      {/* Persistent Toggle for Fellow Context */}
      <button 
        onClick={() => setIsDrawerOpen(true)}
        className="fixed top-6 right-6 z-40 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-md text-xs font-bold uppercase tracking-widest text-slate-600 hover:border-slate-900 hover:text-slate-900 transition-all active:scale-95 flex items-center gap-2 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-slate-900 transition-colors"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        Fellow context
      </button>

      <ContextDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* Header / Learning Goal & Success Criteria */}
      <header className="max-w-3xl mx-auto px-6 pt-24 pb-16 border-b border-slate-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white">
             <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          </div>
          <h1 className="text-sm font-bold tracking-[0.3em] text-slate-400 uppercase">Learning Goal and Outcomes</h1>
        </div>
        
        <div className="space-y-3 mb-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Learning Goal</span>
          <p className="text-3xl text-slate-900 leading-tight font-extrabold tracking-tight">
            Accurately identify whether an AI model’s failure is caused by a reasoning error or a recall error.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
                    Success Looks Like
                </h2>
                <ul className="space-y-4 text-slate-600 text-sm leading-relaxed">
                    {[
                    "Correct classification of AI failures as reasoning or recall across multiple examples.",
                    "Stable judgments even when surface features such as topic, phrasing, or complexity vary.",
                    "Recognition of cases where a model has the right information but applies it incorrectly versus cases where information is missing, incorrect, or fabricated."
                    ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <div className="mt-1 w-4 h-4 bg-white border border-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <span className="leading-tight">{item}</span>
                    </li>
                    ))}
                </ul>
            </section>

            <section className="bg-white rounded-2xl p-8 border border-slate-200 flex flex-col justify-between">
                <div>
                    <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
                        Fellow Reference
                    </h2>
                    <p className="text-sm text-slate-600 mb-6">
                        Access optional background material on why reasoning errors matter most and how to think about model failures.
                    </p>
                </div>
                <button 
                    onClick={() => setIsDrawerOpen(true)}
                    className="w-full py-3 bg-slate-900 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                    Open Fellow Context
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
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

        {/* Footer Reference Link */}
        <footer className="flex flex-col md:flex-row justify-between items-center py-20 border-t border-slate-100 gap-8">
          <p className="text-sm text-slate-400">© 2024 AI Evaluation Learning Systems</p>
          <a 
              href="#" 
              onClick={(e) => e.preventDefault()}
              className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 underline underline-offset-8 decoration-slate-200 hover:decoration-slate-900 transition-all"
          >
              Download reference PDF
          </a>
        </footer>
      </main>
    </div>
  );
};

export default App;
