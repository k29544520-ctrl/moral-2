import React from 'react';
import { Scores, Category, ResultType } from '../types';

interface ResultsScreenProps {
  scores: Scores;
  onRetake: () => void;
}

const MAX_SCORES = {
  [Category.Self]: 8 * 5,
  [Category.Others]: 8 * 5,
  [Category.Object]: 8 * 5,
  [Category.Situation]: 6 * 5,
};

const ResultsScreen: React.FC<ResultsScreenProps> = ({ scores, onRetake }) => {
    const resultData = [
        {
            type: ResultType.SelfObject,
            score: scores[Category.Self] + scores[Category.Object],
            maxScore: MAX_SCORES[Category.Self] + MAX_SCORES[Category.Object],
            description: "스스로의 감정과 상태를 잘 이해하며, 동물이나 사물에도 깊은 애착과 공감을 느낍니다.",
            colors: { from: 'from-blue-400', to: 'to-indigo-500' }
        },
        {
            type: ResultType.OthersObject,
            score: scores[Category.Others] + scores[Category.Object],
            maxScore: MAX_SCORES[Category.Others] + MAX_SCORES[Category.Object],
            description: "다른 사람의 감정뿐만 아니라, 주변의 동물, 식물, 사물에도 관심을 기울이고 공감하는 따뜻한 마음을 가졌습니다.",
            colors: { from: 'from-teal-400', to: 'to-cyan-500' }
        },
        {
            type: ResultType.SelfSituation,
            score: scores[Category.Self] + scores[Category.Situation],
            maxScore: MAX_SCORES[Category.Self] + MAX_SCORES[Category.Situation],
            description: "자신의 감정을 잘 파악하고, 특정 상황에 처한 다른 사람들의 감정이나 분위기를 잘 이해하고 몰입합니다.",
            colors: { from: 'from-purple-400', to: 'to-pink-500' }
        },
        {
            type: ResultType.OthersSituation,
            score: scores[Category.Others] + scores[Category.Situation],
            maxScore: MAX_SCORES[Category.Others] + MAX_SCORES[Category.Situation],
            description: "다른 사람의 감정 변화에 민감하며, 사회적 상황이나 분위기를 파악하고 이에 적절하게 공감하는 능력이 뛰어납니다.",
            colors: { from: 'from-orange-400', to: 'to-red-500' }
        },
    ];

    const highestResult = resultData.reduce(
        (max, current) => (current.score > max.score ? current : max),
        resultData[0]
    );

    const percentage = Math.round((highestResult.score / highestResult.maxScore) * 100);


  return (
    <div className="text-center p-4 md:p-8 animate-fade-in w-full">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
        나의 핵심 공감 유형은...
      </h2>
      <h1 className={`text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${highestResult.colors.from} ${highestResult.colors.to} mb-8`}>
        {highestResult.type}
      </h1>
      
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-10 max-w-lg mx-auto text-left">
          <p className="text-slate-700 dark:text-slate-200 text-lg leading-relaxed">
              {highestResult.description}
          </p>
          <div className="mt-8">
              <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-medium text-slate-800 dark:text-slate-100">공감 지수</span>
                  <span className={`text-2xl font-bold ${highestResult.colors.to.replace('to-', 'text-')}`}>{percentage}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4">
                  <div
                      className={`bg-gradient-to-r ${highestResult.colors.from} ${highestResult.colors.to} h-4 rounded-full transition-all duration-500 ease-out`}
                      style={{ width: `${percentage}%` }}
                  ></div>
              </div>
          </div>
      </div>


      <button
        onClick={onRetake}
        className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-3 px-10 rounded-full text-lg shadow-md hover:shadow-lg hover:bg-slate-300 dark:hover:bg-slate-600 transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-slate-500/50"
      >
        다시 검사하기
      </button>
    </div>
  );
};

export default ResultsScreen;
