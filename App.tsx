
import React, { useState, useEffect } from 'react';
import { Category, AgeRange, UserProfile, LeaderboardEntry } from './types';
import Header from './components/Header';
import WelcomeScreen from './components/WelcomeScreen';
import CategorySelector from './components/CategorySelector';
import QuizSession from './components/QuizSession';
import ResultScreen from './components/ResultScreen';
import Leaderboard from './components/Leaderboard';

const STORAGE_KEY = 'dorakid_leaderboard';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [view, setView] = useState<'welcome' | 'categories' | 'quiz' | 'results' | 'leaderboard'>('welcome');
  const [quizScore, setQuizScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Load leaderboard and seed with mock data if empty
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setLeaderboard(JSON.parse(saved));
    } else {
      const mockData: LeaderboardEntry[] = [
        { id: '1', name: 'Zayan', score: 5, total: 5, category: Category.SCIENCE, date: new Date().toISOString() },
        { id: '2', name: 'Sara', score: 4, total: 5, category: Category.MATHEMATICS, date: new Date().toISOString() },
        { id: '3', name: 'Tanvir', score: 4, total: 5, category: Category.HEALTH, date: new Date().toISOString() },
      ];
      setLeaderboard(mockData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockData));
    }
  }, []);

  const handleStart = (name: string, phoneNumber: string, ageRange: AgeRange) => {
    setProfile({ name, phoneNumber, ageRange });
    setView('categories');
  };

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setView('quiz');
  };

  const handleQuizFinish = (score: number, total: number) => {
    setQuizScore(score);
    setTotalQuestions(total);
    
    // Save to leaderboard logic
    if (profile) {
      const newEntry: LeaderboardEntry = {
        id: Date.now().toString(),
        name: profile.name,
        score,
        total,
        category: selectedCategory!,
        date: new Date().toISOString(),
        isUser: true
      };
      const updated = [...leaderboard, newEntry]
        .sort((a, b) => (b.score / b.total) - (a.score / a.total) || b.score - a.score)
        .slice(0, 50); // Keep top 50
      setLeaderboard(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
    
    setView('results');
  };

  const handleRestart = () => {
    setSelectedCategory(null);
    setView('categories');
  };

  const toggleLeaderboard = () => {
    if (view === 'leaderboard') {
      setView(profile ? 'categories' : 'welcome');
    } else {
      setView('leaderboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-sky-50 text-slate-800">
      <Header onLeaderboardClick={toggleLeaderboard} />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        {view === 'welcome' && (
          <WelcomeScreen onStart={handleStart} />
        )}

        {view === 'categories' && profile && (
          <CategorySelector 
            userName={profile.name} 
            onSelect={handleSelectCategory} 
          />
        )}

        {view === 'quiz' && profile && selectedCategory && (
          <QuizSession 
            category={selectedCategory} 
            ageRange={profile.ageRange} 
            onFinish={handleQuizFinish}
          />
        )}

        {view === 'results' && (
          <ResultScreen 
            score={quizScore} 
            total={totalQuestions} 
            onRestart={handleRestart}
            category={selectedCategory!}
            onViewLeaderboard={() => setView('leaderboard')}
          />
        )}

        {view === 'leaderboard' && (
          <Leaderboard 
            entries={leaderboard} 
            onBack={() => setView(profile ? 'categories' : 'welcome')} 
          />
        )}
      </main>

      <footer className="bg-white py-6 border-t border-sky-100">
        <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} Dorakid - Growing Healthy, Thinking Smart.</p>
          <p className="mt-1 italic text-xs">Cod-liver oil & Multivitamins for strong explorers.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
