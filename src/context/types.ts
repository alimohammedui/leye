import {ReactElement} from 'react';

export declare namespace Quiz {
  interface Selections {
    selection: string;
    point: number;
    isSelected: boolean;
    question?: string;
  }

  interface QuizSelectionContent {
    question: string;
    selections: Array<Selections>;
  }

  interface Content {
    questions: Array<QuizSelectionContent>;
  }

  interface QuizState {
    quizData: Content;
    selectedAnswers: Selections[];
    setSelectedAnswers: (val: Selections) => void;
  }

  interface QuizContextProvider {
    children: ReactElement;
  }
}
