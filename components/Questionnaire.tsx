import React, { useState, useEffect } from 'react';
import { Question, Answers, AnswerValue } from '../types';
import { LIKERT_OPTIONS } from '../constants';

interface QuestionnaireProps {
  questions: Question[];
  onComplete: (answers: Answers) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [isFading, setIsFading] = useState(false);

  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex) / totalQuestions) * 100;
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestionIndex >= totalQuestions) {
      onComplete(answers);
    }
  }, [currentQuestionIndex, totalQuestions, onComplete, answers]);

  const handleAnswer = (value: AnswerValue) => {
    setIsFading(true);
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setIsFading(false);
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        setIsFading(false);
      }, 300);
    }
  };

  if (!currentQuestion) {
    return (
        <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-teal-500">계산 중...</h2>
            <p className="text-slate-600 dark:text-slate-300 mt-2">결과를 분석하고 있습니다. 잠시만 기다려 주세요.</p>
        </div>
    );
  }

  return (
    <div className="p-6 md:p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-teal-500">진행률</span>
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
            {currentQuestionIndex + 1} / {totalQuestions}
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-teal-400 to-blue-500 h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className={`transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        <p className="text-center text-slate-500 dark:text-slate-400 mb-4 text-lg">
          문항 {currentQuestionIndex + 1}
        </p>
        <h2 className="text-xl md:text-2xl font-bold text-center text-slate-800 dark:text-slate-100 min-h-[6rem] flex items-center justify-center">
          {currentQuestion.text}
        </h2>
      </div>

      {/* Answer Options */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-3">
        {LIKERT_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => handleAnswer(value)}
            disabled={isFading}
            className="w-full p-3 rounded-lg text-center font-semibold transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-teal-500
            bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-teal-100 dark:hover:bg-teal-800/50 hover:text-teal-600 dark:hover:text-teal-300
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {label}
          </button>
        ))}
      </div>
      
      {/* Navigation */}
      <div className="mt-8 flex justify-start">
        <button
          onClick={handleBack}
          disabled={currentQuestionIndex === 0 || isFading}
          className="px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ease-in-out transform hover:scale-105
          bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-200
          hover:bg-slate-300 dark:hover:bg-slate-500
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-slate-400
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          이전
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;