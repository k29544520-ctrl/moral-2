
import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
        나의 공감 유형 알아보기
      </h1>
      <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
        MBTI처럼 간단한 질문을 통해 자신, 타인, 대상, 상황에 대한<br/>
        나의 공감 유형과 정도를 알아보세요.
      </p>
      <button
        onClick={onStart}
        className="bg-gradient-to-r from-teal-400 to-blue-500 text-white font-bold py-3 px-10 rounded-full text-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-teal-500/50"
      >
        검사 시작하기
      </button>
    </div>
  );
};

export default WelcomeScreen;
