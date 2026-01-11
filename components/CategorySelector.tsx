
import React from 'react';
import { Category } from '../types';

interface CategorySelectorProps {
  userName: string;
  onSelect: (category: Category) => void;
}

const categories = [
  { id: Category.MATHEMATICS, icon: '➕', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { id: Category.LOGIC, icon: '🧩', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { id: Category.SCIENCE, icon: '🔬', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  { id: Category.NATURE, icon: '🦁', color: 'bg-green-100 text-green-700 border-green-200' },
  { id: Category.HEALTH, icon: '🍎', color: 'bg-red-100 text-red-700 border-red-200' },
  { id: Category.HISTORY, icon: '🏰', color: 'bg-purple-100 text-purple-700 border-purple-200' },
];

const CategorySelector: React.FC<CategorySelectorProps> = ({ userName, onSelect }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-4">
           <div className="bg-orange-500 rounded-lg px-2 py-0.5 text-white font-brand font-bold text-sm shadow-md">
             Dorakid
           </div>
        </div>
        <h2 className="text-3xl font-brand font-bold text-slate-800">
          Hi, <span className="text-orange-500">{userName}</span>!
        </h2>
        <p className="text-slate-600 mt-2">Pick a challenge to train your brain:</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`p-6 rounded-3xl border-2 transition-all hover:shadow-2xl hover:-translate-y-1 flex flex-col items-center text-center group ${cat.color} bg-white`}
          >
            <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">{cat.icon}</span>
            <span className="text-xl font-bold">{cat.id}</span>
            <span className="text-sm mt-2 opacity-80">Ready? Let's go!</span>
          </button>
        ))}
      </div>

      <div className="mt-12 p-6 bg-sky-600 rounded-3xl text-white flex flex-col sm:flex-row items-center gap-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-20 transform translate-x-4 -translate-y-4">
           <div className="bg-white rounded-xl px-4 py-2 text-sky-900 font-brand font-bold text-xl rotate-12">
             Dorakid
           </div>
        </div>
        <div className="flex-shrink-0 bg-white/20 p-4 rounded-2xl relative z-10">
           <span className="text-4xl">💪</span>
        </div>
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-1 font-brand">Dorakid Tip: Brain Power!</h3>
          <p className="text-sky-100 text-sm">
            Solving math and puzzles is like a workout for your brain! 
            Dorakid's cod-liver oil gives your brain the extra fuel it needs to stay sharp.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
