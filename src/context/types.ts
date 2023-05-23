import {
  Reducer,
  ReducerAction,
  DispatchWithoutAction,
  ReactElement,
} from 'react';

export declare namespace Quiz {
  interface Content {
    questions: Array<{
      question: string;
      selections: Array<{selection: string; point: number}>;
    }>;
  }

  interface QuizState {
    QuizContent: Content;
    selectedAnswers: Record<number, string>;
  }

  interface QuizContextProvider {
    reducer: Reducer<QuizState, ReducerAction<DispatchWithoutAction>>;
    initialState: QuizState;
    children: ReactElement;
  }
}
