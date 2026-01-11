
import React from 'react';
import { LeaderboardEntry } from '../types';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  onBack: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries, onBack }) => {
  // Campaign Logic: 30-day window
  const campaignStartDate = new Date('2025-05-01'); // Mock start date
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - campaignStartDate.getTime());
  const daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const daysRemaining = Math.max(0, 30 - (daysPassed % 30));

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-sky-100">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-brand font-bold text-slate-800 flex items-center gap-3">
              Hall of Fame 🏆
            </h2>
            <p className="text-slate-500">Daily Highest Scores</p>
          </div>
          <button 
            onClick={onBack}
            className="bg-sky-100 text-sky-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-sky-200 transition-all"
          >
            Back to Quiz
          </button>
        </div>

        {/* Campaign Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl p-6 text-white shadow-lg mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20 transform rotate-12">
            <span className="text-8xl">🎁</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">30-Day Challenge</span>
              <span className="font-bold text-amber-900 text-sm">Days Left: {daysRemaining}</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Win a Dorakid Gift Hamper! 🎒</h3>
            <p className="text-orange-50 text-sm leading-relaxed max-w-md">
              The top 3 high score achievers at the end of every 30-day period will win an 
              exclusive Dorakid Gift Hamper filled with treats and school supplies!
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {entries.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <span className="text-4xl block mb-2">🐢</span>
              No scores yet. Be the first!
            </div>
          ) : (
            entries.slice(0, 10).map((entry, index) => {
              const isTop3 = index < 3;
              const medals = ['🥇', '🥈', '🥉'];
              
              return (
                <div 
                  key={entry.id}
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
                    entry.isUser ? 'ring-2 ring-orange-400 bg-orange-50' : 'bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-8 text-center font-bold ${isTop3 ? 'text-2xl' : 'text-slate-400'}`}>
                      {isTop3 ? medals[index] : index + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-800 flex items-center gap-2">
                        {entry.name} 
                        {entry.isUser && <span className="bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded uppercase">You</span>}
                      </h4>
                      <p className="text-xs text-slate-500">{entry.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-sky-700">{entry.score}/{entry.total}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-tighter">
                      {new Date(entry.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="bg-sky-600 rounded-3xl p-6 text-white flex gap-4 items-center shadow-md">
        <div className="text-3xl">💡</div>
        <p className="text-sm font-medium">
          Want to reach the top? Dorakid multivitamin helps improve your concentration 
          so you can answer faster and more accurately!
        </p>
      </div>
    </div>
  );
};

export default Leaderboard;
