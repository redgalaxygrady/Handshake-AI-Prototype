
import React, { useState, useRef } from 'react';
import { Interaction } from '../types';

interface InteractionBlockProps {
  interaction: Interaction;
  onComplete: () => void;
  isLast: boolean;
}

const InteractionBlock: React.FC<InteractionBlockProps> = ({ interaction, onComplete }) => {
  const [selection, setSelection] = useState<string | null>(null);
  const blockRef = useRef<HTMLDivElement>(null);

  const handleSelect = (choice: string) => {
    if (selection) return;
    setSelection(choice);
    setTimeout(() => {
        onComplete();
    }, 400);
  };

  const isCorrect = selection && interaction.correctChoice ? selection === interaction.correctChoice : null;

  const renderResponse = () => {
    if (selection && interaction.reveal.highlightText) {
      const parts = interaction.aiResponse.split(interaction.reveal.highlightText);
      return (
        <span className="transition-all duration-500">
          {parts[0]}
          <span className="notion-highlight relative group">
            {interaction.reveal.highlightText}
            {interaction.reveal.label && (
                <span className="absolute -top-6 left-0 text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-white px-1 whitespace-nowrap">
                    {interaction.reveal.label}
                </span>
            )}
          </span>
          {parts[1]}
        </span>
      );
    }
    return interaction.aiResponse;
  };

  return (
    <section 
      ref={blockRef}
      className={`reveal-animation scroll-mt-32`}
    >
      <div className="space-y-12">
        {/* AI Response Card */}
        <div className="p-10 bg-slate-50 rounded-2xl border border-slate-100 shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all">
          <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-6">
            AI Response
          </span>
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
                  // Reveal the correct answer if the user got it wrong
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
                  className={`p-6 text-left border rounded-xl transition-all duration-300 font-semibold text-base flex justify-between items-center ${buttonStyles}`}
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
        </div>

        {/* Immediate Reveal / Explanation */}
        {selection && (
          <div className="reveal-animation space-y-10 pt-4">
            {interaction.reveal.definitions && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 border-y border-slate-100">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Reasoning error</span>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {interaction.reveal.definitions.reasoning}
                  </p>
                </div>
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Recall error</span>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {interaction.reveal.definitions.recall}
                  </p>
                </div>
              </div>
            )}

            <div className={`p-8 rounded-2xl border-l-[6px] shadow-sm transition-all duration-500 ${interaction.correctChoice ? (isCorrect ? "bg-green-50/50 border-green-600" : "bg-red-50/50 border-red-600") : "bg-slate-50 border-slate-900"}`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
                    Diagnostic Analysis
                </span>
                {interaction.correctChoice && (
                    <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded ${isCorrect ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
                        {isCorrect ? "Correct" : "Incorrect"}
                    </span>
                )}
              </div>
              <p className="text-slate-800 text-lg leading-relaxed">
                {interaction.reveal.explanation}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InteractionBlock;
