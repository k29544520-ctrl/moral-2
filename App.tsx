
import React, { useState, useCallback } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Questionnaire from './components/Questionnaire';
import ResultsScreen from './components/ResultsScreen';
import { QUESTIONS } from './constants';
import { Answers, Scores, Category } from './types';

type GameState = 'welcome' | 'testing' | 'results';

function App() {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [scores, setScores] = useState<Scores | null>(null);

  const handleTestStart = useCallback(() => {
    setGameState('testing');
  }, []);

  const handleTestComplete = useCallback((finalAnswers: Answers) => {
    const newScores: Scores = {
      [Category.Self]: 0,
      [Category.Others]: 0,
      [Category.Object]: 0,
      [Category.Situation]: 0,
    };

    QUESTIONS.forEach(question => {
      const answerValue = finalAnswers[question.id];
      if (answerValue) {
        const score = question.isReversed ? 6 - answerValue : answerValue;
        newScores[question.category] += score;
      }
    });

    setScores(newScores);
    setGameState('results');
  }, []);

  const handleRetake = useCallback(() => {
    setScores(null);
    setGameState('welcome');
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case 'testing':
        return <Questionnaire questions={QUESTIONS} onComplete={handleTestComplete} />;
      case 'results':
        return scores ? <ResultsScreen scores={scores} onRetake={handleRetake} /> : null;
      case 'welcome':
      default:
        return <WelcomeScreen onStart={handleTestStart} />;
    }
  };

  return (
    <main className="bg-slate-50 dark:bg-slate-900 min-h-screen w-full flex flex-col items-center justify-center p-4 font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <div className="w-full max-w-2xl mx-auto">
        {renderContent()}
      </div>
    </main>
  );
}

export default App;
