
import React, { useState } from 'react';
import { AgeRange } from '../types';

interface WelcomeScreenProps {
  onStart: (name: string, phoneNumber: string, ageRange: AgeRange) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [ageRange, setAgeRange] = useState<AgeRange>('8-10');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      onStart(name, phone, ageRange);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg mx-auto transform transition-all">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-orange-500 rounded-xl px-4 py-1.5 text-white font-brand font-bold text-lg shadow-lg border-2 border-white transform -rotate-3">
            Dorakid
          </div>
        </div>
        <img 
          src="https://picsum.photos/seed/dorakid-explorer/400/200" 
          alt="Explorer Hero" 
          className="rounded-2xl mx-auto mb-6 shadow-md object-cover w-full h-32"
        />
        <h2 className="text-3xl font-brand font-bold text-sky-900 mb-2">Ready for an Adventure?</h2>
        <p className="text-slate-600">Join the Dorakid explorers and test your smarts!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">What's your name?</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-sky-100 focus:border-orange-400 focus:outline-none transition-colors text-lg"
            placeholder="Explorer name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">Guardian's Phone Number</label>
          <input 
            type="tel" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-sky-100 focus:border-orange-400 focus:outline-none transition-colors text-lg"
            placeholder="01XXX-XXXXXX"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">How old are you?</label>
          <div className="grid grid-cols-3 gap-3">
            {(['5-7', '8-10', '11-12'] as AgeRange[]).map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setAgeRange(range)}
                className={`py-3 rounded-xl font-bold transition-all ${
                  ageRange === range 
                  ? 'bg-orange-500 text-white shadow-lg scale-105' 
                  : 'bg-sky-50 text-sky-700 hover:bg-sky-100'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-xl transform active:scale-95 transition-all text-xl mt-4"
        >
          Start Exploring! 🚀
        </button>
      </form>
    </div>
  );
};

export default WelcomeScreen;
