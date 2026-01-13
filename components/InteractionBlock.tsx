
import React, { useState, useRef } from 'react';
import { Interaction } from '../types.ts';

interface InteractionBlockProps {
  interaction: Interaction;
  onComplete: () => void;
  isLast: boolean;
}

const InteractionBlock: React.FC<InteractionBlockProps> = ({ interaction, onComplete }) => {
  const [selection, setSelection] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<boolean>(false);
  const blockRef = useRef<HTMLDivElement>(null);

  const handleSelect = (choice: string) => {
    if (selection) return;
    setSelection(choice);
    setRevealed(true);
    setTimeout(() => {
        onComplete();
    }, 400);
  };

  const handleRevealOnly = () => {
    setRevealed(true);
    setTimeout(() => {
        onComplete();
    }, 400);
  };

  const isCorrect = selection && interaction.correctChoice ? selection === interaction.correctChoice : null;

  const renderResponse = () => {
    if (revealed && interaction.reveal.highlightText) {
      const parts = interaction.aiResponse.split(interaction.reveal.highlightText);
      if (parts.length > 1) {
        return (
          <span className="transition-all duration-500">
            {parts[0]}
            <span className="notion-highlight relative group">
              {interaction.reveal.highlightText}
              <span className="absolute -top-7 left-0 text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-white px-1.5 py-0.5 whitespace-nowrap border border-slate-100 shadow-sm rounded">
                  {interaction.reveal.label}
              </span>
            </span>
            {parts[1]}
          </span>
        );
      }
    }
    return interaction.aiResponse;
  };

  const hasChoices = interaction.choices.length > 0;

  return (
    <section 
      ref={blockRef}
      className={`reveal-animation scroll-mt-32`}
    >
      <div className="space-y-12">
        {/* AI Response Card */}
        <div className="p-10 bg-slate-50 rounded-2xl border border-slate-100 shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all">
          <div className="flex justify-between items-center mb-6">
            <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
              AI Response
            </span>
            {interaction.label && (
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-900 bg-slate-200 px-2 py-0.5 rounded">
                {interaction.label}
              </span>
            )}
          </div>
          <p className="text-2xl md:text-3xl font-medium text-slate-800 leading-tight">
            “{renderResponse()}”
          </p>
        </div>

        {/* Prompt and Choices */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
             <div className="h-[1px] flex-grow bg-slate-100"></div>
             <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
               {interaction.prompt}
             </h3>
             <div className="h-[1px] flex-grow bg-slate-100"></div>
          </div>
          
          {hasChoices ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {interaction.choices.map((choice) => {
                const isSelected = selection === choice;
                const isChoiceCorrect = interaction.correctChoice === choice;
                
                let buttonStyles = "border-slate-200 bg-white text-slate-700 hover:border-slate-900 hover:text-slate-900 active:scale-[0.98]";
                
                if (selection) {
                  if (isSelected) {
                     if (interaction.correctChoice) {
                       buttonStyles = isCorrect 
                          ? "border-green-600 bg-green-50 text-green-700 shadow-sm ring-1 ring-green-600 ring-offset-2" 
                          : "border-red-600 bg-red-50 text-red-700 shadow-sm ring-1 ring-red-600 ring-offset-2";
                     } else {
                       buttonStyles = "border-slate-900 bg-slate-900 text-white shadow-lg scale-[1.02]";
                     }
                  } else if (isChoiceCorrect && !isCorrect) {
                    buttonStyles = "border-green-200 bg-green-50/50 text-green-800 opacity-90 cursor-default italic";
                  } else {
                    buttonStyles = "border-slate-100 bg-white text-slate-300 opacity-40 cursor-default grayscale";
                  }
                }

                return (
                  <button
                    key={choice}
                    onClick={() => handleSelect(choice)}
                    disabled={!!selection}
                    className={`p-6 text-left border rounded-xl transition-all duration-300 font-semibold text-base flex justify-between items-center uppercase tracking-widest ${buttonStyles}`}
                  >
                    {choice}
                    {selection && isSelected && interaction.correctChoice && (
                      <span className="flex-shrink-0 ml-4">
                          {isCorrect ? (
                              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                              </div>
                          ) : (
                              <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                              </div>
                          )}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex justify-center">
              {!revealed ? (
                <button
                  onClick={handleRevealOnly}
                  className="px-8 py-4 border border-slate-900 bg-white text-slate-900 rounded-xl font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all active:scale-[0.98]"
                >
                  REVEAL ANALYSIS
                </button>
              ) : (
                <div className="px-8 py-4 border border-slate-400 bg-slate-400 text-white rounded-xl font-bold uppercase tracking-widest cursor-default">
                  ANALYZED
                </div>
              )}
            </div>
          )}
        </div>

        {revealed && (
          <div className="reveal-animation space-y-10 pt-4">
            <div className={`p-8 rounded-2xl border-l-[6px] shadow-sm transition-all duration-500 ${interaction.correctChoice ? (isCorrect ? "bg-green-50/50 border-green-600" : "bg-red-50/50 border-red-600") : "bg-slate-50 border-slate-900"}`}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
                    Analysis
                </span>
                {interaction.correctChoice && (
                    <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded ${isCorrect ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
                        {isCorrect ? "Correct" : "Incorrect"}
                    </span>
                )}
              </div>

              <div className="space-y-6">
                <div>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Decisive Signal</span>
                   <p className="text-slate-900 font-bold text-xl leading-tight italic">
                     “{interaction.reveal.decisiveSignal}”
                   </p>
                </div>
                
                <p className="text-slate-700 text-lg leading-relaxed pt-2 border-t border-slate-100/50">
                  {interaction.reveal.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InteractionBlock;
