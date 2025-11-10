
export enum Category {
  Self = '자신',
  Others = '타인',
  Object = '대상',
  Situation = '상황',
}

export interface Question {
  id: number;
  text: string;
  category: Category;
  isReversed?: boolean;
}

export type AnswerValue = 1 | 2 | 3 | 4 | 5;

export type Answers = {
  [questionId: number]: AnswerValue;
};

export type Scores = {
  [Category.Self]: number;
  [Category.Others]: number;
  [Category.Object]: number;
  [Category.Situation]: number;
};

export enum ResultType {
    SelfObject = '자신-대상 공감',
    OthersObject = '타인-대상 공감',
    SelfSituation = '자신-상황 공감',
    OthersSituation = '타인-상황 공감',
}
