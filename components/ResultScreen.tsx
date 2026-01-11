
import React from 'react';
import { Category } from '../types';

interface ResultScreenProps {
  score: number;
  total: number;
  onRestart: () => void;
  category: Category;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, total, onRestart, category }) => {
  const percentage = (score / total) * 100;
  
  let message = "Keep learning! You're getting smarter every day!";
  let emoji = "🌟";
  
  if (percentage === 100) {
    message = "Perfect Score! You're a true Smart Explorer!";
    emoji = "🏆";
  } else if (percentage >= 70) {
    message = "Great Job! You really know your stuff!";
    emoji = "👏";
  }

  return (
    <div className="max-w-xl mx-auto text-center space-y-8 animate-in fade-in scale-95 duration-700">
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-100 rounded-full opacity-50" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-sky-100 rounded-full opacity-50" />
        
        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="bg-orange-500 rounded-2xl px-4 py-1.5 text-white font-brand font-bold text-xl shadow-lg border-2 border-white transform -rotate-3">
              Dorakid
            </div>
          </div>
          
          <span className="text-7xl mb-4 block animate-bounce">{emoji}</span>
          <h2 className="text-4xl font-brand font-bold text-slate-800 mb-2">Adventure Complete!</h2>
          <p className="text-sky-600 font-bold uppercase tracking-widest text-sm mb-6">{category}</p>
          
          <div className="inline-block bg-orange-500 text-white px-8 py-4 rounded-3xl mb-6 shadow-xl">
            <span className="text-5xl font-bold">{score}</span>
            <span className="text-2xl font-bold opacity-75"> / {total}</span>
          </div>
          
          <h3 className="text-2xl font-bold text-slate-700 mb-8">{message}</h3>
          
          <div className="bg-sky-50 p-6 rounded-3xl text-left border-2 border-sky-100 mb-8">
            <h4 className="text-sky-900 font-bold mb-2 flex items-center gap-2">
              <span className="text-2xl">⚡</span> Boost Your Brain!
            </h4>
            <p className="text-slate-600 text-sm italic leading-relaxed">
              Fantastic work on the quiz! Keep your memory sharp and your body strong with <strong>Dorakid Vitamin Syrup</strong>. 
              The multivitamins and cod-liver oil are the perfect sidekick for every explorer's journey!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onRestart}
              className="flex-grow bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg transition-all"
            >
              Play Another Quiz
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-grow bg-sky-100 text-sky-700 hover:bg-sky-200 font-bold py-4 rounded-2xl transition-all"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <p className="text-slate-400 text-xs">
          Smart Explorer is a fun learning platform brought to you by Dorakid. 
          Consult your pediatrician for more information on pediatric nutrition.
        </p>
      </div>
    </div>
  );
};

export default ResultScreen;
