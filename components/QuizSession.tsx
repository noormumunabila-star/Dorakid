
import React, { useState, useEffect } from 'react';
import { Category, AgeRange, QuizQuestion } from '../types';
import { generateQuizQuestions } from '../services/geminiService';

interface QuizSessionProps {
  category: Category;
  ageRange: AgeRange;
  onFinish: (score: number, total: number) => void;
}

const QuizSession: React.FC<QuizSessionProps> = ({ category, ageRange, onFinish }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setLoading(true);
        const data = await generateQuizQuestions(category, ageRange);
        setQuestions(data);
      } catch (err) {
        setError("Oops! Our robots got lost. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, ageRange]);

  const handleOptionSelect = (option: string) => {
    if (showExplanation) return;
    setSelectedOption(option);
    setShowExplanation(true);
    if (option === questions[currentIndex].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      onFinish(score, questions.length);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-pulse text-center">
        <div className="relative mb-8">
           <div className="w-24 h-24 bg-orange-500 rounded-3xl rotate-12 flex items-center justify-center text-white font-brand font-bold text-sm shadow-xl border-4 border-white">
             Dorakid
           </div>
           <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-sky-400 rounded-full flex items-center justify-center text-xl animate-bounce shadow-lg">
             🤔
           </div>
        </div>
        <h2 className="text-2xl font-brand font-bold text-slate-700">Loading your adventure...</h2>
        <p className="text-slate-500 mt-2">Gemini is preparing the smartest questions for you!</p>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="text-center py-20">
        <span className="text-6xl mb-6 block">😢</span>
        <h2 className="text-2xl font-bold text-slate-800">{error || "No questions found."}</h2>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 bg-sky-600 text-white px-8 py-3 rounded-xl font-bold"
        >
          Try Again
        </button>
      </div>
    );
  }

  const q = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-bold text-sky-700 uppercase tracking-widest">Question {currentIndex + 1} of {questions.length}</span>
          <span className="text-sm font-bold text-orange-600">Score: {score}</span>
        </div>
        <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
          <div 
            className="bg-orange-400 h-full transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-sky-50">
        <h3 className="text-2xl font-brand font-bold text-slate-800 mb-8 leading-tight">
          {q.question}
        </h3>

        <div className="space-y-4">
          {q.options.map((option, idx) => {
            let style = "bg-sky-50 border-sky-100 text-slate-700 hover:bg-sky-100 hover:border-sky-200";
            if (showExplanation) {
              if (option === q.correctAnswer) {
                style = "bg-green-100 border-green-500 text-green-800 ring-4 ring-green-100";
              } else if (option === selectedOption) {
                style = "bg-red-100 border-red-500 text-red-800";
              } else {
                style = "bg-slate-50 border-slate-200 text-slate-400 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                disabled={showExplanation}
                onClick={() => handleOptionSelect(option)}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all font-semibold flex items-center justify-between ${style}`}
              >
                <span>{option}</span>
                {showExplanation && option === q.correctAnswer && (
                  <span className="bg-green-500 text-white rounded-full p-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="mt-8 animate-in fade-in zoom-in duration-300">
            <div className={`p-6 rounded-2xl mb-6 ${selectedOption === q.correctAnswer ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              <p className="font-bold mb-2">
                {selectedOption === q.correctAnswer ? 'Correct! Well done!' : 'Not quite right!'}
              </p>
              <p className="text-sm leading-relaxed">{q.explanation}</p>
            </div>
            
            <div className="bg-amber-50 p-6 rounded-2xl border-2 border-dashed border-amber-200 mb-8">
              <span className="text-xl mr-2">💡</span>
              <span className="font-bold text-amber-900 italic">Fun Fact: </span>
              <span className="text-amber-800 text-sm">{q.funFact}</span>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg transform active:scale-95 transition-all text-lg"
            >
              {currentIndex < questions.length - 1 ? 'Next Question' : 'Show My Results! 🏆'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizSession;
