
import React, { useState } from 'react';
import { Category, AgeRange, UserProfile } from './types';
import Header from './components/Header';
import WelcomeScreen from './components/WelcomeScreen';
import CategorySelector from './components/CategorySelector';
import QuizSession from './components/QuizSession';
import ResultScreen from './components/ResultScreen';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [view, setView] = useState<'welcome' | 'categories' | 'quiz' | 'results'>('welcome');
  const [quizScore, setQuizScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

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
    setView('results');
  };

  const handleRestart = () => {
    setSelectedCategory(null);
    setView('categories');
  };

  return (
    <div className="min-h-screen flex flex-col bg-sky-50 text-slate-800">
      <Header />
      
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
