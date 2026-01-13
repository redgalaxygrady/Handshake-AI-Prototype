
import React from 'react';

interface ContextDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContextDrawer: React.FC<ContextDrawerProps> = ({ isOpen, onClose }) => {
  const CHEATSHEET_URL = "https://drive.google.com/file/d/1kfbL-_5fMKBg63HYigFTJDV3ShwIrBcp/view?usp=sharing";

  return (
    <>
      {/* Backdrop for mobile - strictly for mobile/tablet where it still overlays */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/5 backdrop-blur-[1px] z-40 lg:hidden" 
          onClick={onClose}
        />
      )}
      
      <div 
        className={`fixed top-0 right-0 h-full bg-white border-l border-slate-200 transition-transform duration-300 ease-in-out z-50 overflow-y-auto shadow-2xl lg:shadow-none ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-[85vw] sm:w-80 md:w-[400px] flex flex-col`}
      >
        <div className="flex justify-between items-center px-8 py-6 border-b border-slate-50 sticky top-0 bg-white/80 backdrop-blur-md z-10">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Fellow context</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Close context drawer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="p-8 space-y-12 text-slate-600 text-sm leading-relaxed flex-grow">
          <section>
            <h3 className="text-slate-900 font-semibold mb-3">Why This Matters</h3>
            <p>Modern AI models are remarkably capable. They can reason through complex problems and synthesize information across domains. However, they are not perfect. Understanding how and why models fail is crucial for improving AI systems.</p>
          </section>

          <section>
            <h3 className="text-slate-900 font-semibold mb-3">Understanding AI Model Failures</h3>
            <p>When AI models fail, those failures generally fall into different categories. Some failures are minor, such as formatting or clarity issues. Others reveal deeper limitations in how the model thinks and processes information.</p>
          </section>

          <section>
            <h3 className="text-slate-900 font-semibold mb-3">Why Reasoning Errors Matter Most</h3>
            <p className="mb-4">Reasoning errors are the most significant type of AI failure because they:</p>
            <ul className="space-y-3">
              {[
                "Expose fundamental limitations in how models think",
                "Cannot be fixed by simply adding more factual information",
                "Indicate problems with logical processing",
                "Create especially valuable training data for improving AI systems"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1 h-1 bg-slate-300 rounded-full flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-slate-900 font-semibold mb-3">Types of AI Model Failures</h3>
            <div className="space-y-6">
              <div>
                <strong className="text-slate-800 block mb-1">Reasoning errors</strong>
                <p>The model fails to connect concepts correctly, misinterprets relationships, or breaks down during multi-step reasoning.</p>
              </div>
              <div>
                <strong className="text-slate-800 block mb-1">Recall errors</strong>
                <p>The model provides incorrect, misleading, or fabricated factual information.</p>
              </div>
              <div>
                <strong className="text-slate-800 block mb-1">Computation errors</strong>
                <p>The model makes basic calculation mistakes.</p>
              </div>
              <div>
                <strong className="text-slate-800 block mb-1">Instruction-following errors</strong>
                <p>The model misunderstands or ignores task directions.</p>
              </div>
              <div>
                <strong className="text-slate-800 block mb-1">Helpfulness errors</strong>
                <p>The response is vague, unclear, or incomplete despite being on topic.</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-slate-900 font-semibold mb-3">Key Takeaway</h3>
            <p>A model may know all the right facts but still reach the wrong conclusion due to poor reasoning. Conversely, a model may reason correctly but fail due to missing or incorrect factual knowledge.</p>
          </section>
        </div>

        <div className="p-8 border-t border-slate-100 bg-slate-50">
          <a 
            href={CHEATSHEET_URL} 
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-2 group transition-colors uppercase tracking-widest"
          >
            <svg className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Download Cheatsheet
          </a>
        </div>
      </div>
    </>
  );
};

export default ContextDrawer;
