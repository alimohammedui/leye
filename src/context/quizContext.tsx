import React, {createContext, useContext, useReducer} from 'react';
import {Quiz} from './types';
import reducer, {AppAction} from './reducer';
import quizData from '../../config/questions.json';

export const initialState: Quiz.QuizState = {
  quizData,
  selectedAnswers: [],
  setSelectedAnswers: (val: Quiz.Selections) => {},
};

const QuizContext = createContext<{
  state: Quiz.QuizState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const useQuizContext = (): {
  state: Quiz.QuizState;
  dispatch: React.Dispatch<AppAction>;
} => {
  const {state, dispatch} = useContext(QuizContext);
  return {state, dispatch};
};

export const QuizContextProvider = ({children}: Quiz.QuizContextProvider) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <QuizContext.Provider value={{state, dispatch}}>
      {children}
    </QuizContext.Provider>
  );
};
