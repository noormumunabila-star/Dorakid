
import React from 'react';

interface HeaderProps {
  onLeaderboardClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLeaderboardClick }) => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="bg-orange-500 rounded-2xl px-3 py-1 flex items-center justify-center text-white font-brand font-bold text-lg shadow-md border-2 border-white transform -rotate-2">
          Dorakid
        </div>
        <h1 className="text-xl sm:text-2xl font-brand font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
          Smart Explorer
        </h1>
      </div>
      <div className="flex gap-2 items-center">
        <button 
          onClick={onLeaderboardClick}
          className="flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-amber-200 transition-colors shadow-sm"
        >
          <span>🏆</span>
          <span className="hidden sm:inline">Hall of Fame</span>
        </button>
        <div className="hidden md:flex gap-4 items-center">
          <span className="text-xs bg-sky-100 text-sky-700 px-3 py-1 rounded-full font-semibold uppercase tracking-wider ml-2">
            Healthy Body • Sharp Mind
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
