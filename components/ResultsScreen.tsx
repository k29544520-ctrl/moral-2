
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

interface ResultCardProps {
    title: string;
    description: string;
    score: number;
    maxScore: number;
    colorFrom: string;
    colorTo: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, description, score, maxScore, colorFrom, colorTo }) => {
    const percentage = Math.round((score / maxScore) * 100);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 flex flex-col">
            <h3 className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${colorFrom} ${colorTo}`}>
                {title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 flex-grow">{description}</p>
            <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">공감 점수</span>
                    <span className={`text-lg font-bold ${colorTo.replace('bg-', 'text-')}`}>{percentage}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                    <div
                        className={`bg-gradient-to-r ${colorFrom} ${colorTo} h-2.5 rounded-full`}
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
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

  return (
    <div className="text-center p-4 md:p-8 animate-fade-in w-full">
      <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-2">
        나의 공감 유형 결과
      </h1>
      <p className="text-slate-600 dark:text-slate-300 mb-8">
        각 영역에 대한 당신의 공감 점수입니다.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
        {resultData.map(data => (
            <ResultCard 
                key={data.type}
                title={data.type}
                description={data.description}
                score={data.score}
                maxScore={data.maxScore}
                colorFrom={data.colors.from}
                colorTo={data.colors.to}
            />
        ))}
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
