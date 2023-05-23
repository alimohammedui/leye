import React, {createContext, useContext, useReducer} from 'react';
import {default as initialQuizState} from '../../config/questions.json';
import {Quiz} from './types';

export const initialState: Quiz.QuizState = {
  QuizContent: initialQuizState,
  selectedAnswers: {},
};

export const QuizContext = createContext(initialState);

export const useQuizContext = (): Quiz.QuizState => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('Context must be initialized!');
  }
  return context;
};

export const QuizContextProvider = ({
  reducer,
  initialState,
  children,
}: Quiz.QuizContextProvider) => (
  //@ts-ignore
  <QuizContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </QuizContext.Provider>
);
