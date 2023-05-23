import {Quiz} from './types';

const reducer = (state: Quiz.QuizState, action: any) => {
  switch (action.type) {
    case 'SET_SELECTION':
      return {
        ...state,
        currentScore: action.payload,
      };
    case 'UPDATE_SCORE':
      return {
        ...state,
        score: [
          ...state.QuizContent.questions,
          ...action.payload.QuizContent.questions,
        ],
      };
    default:
      return state;
  }
};

export default reducer;
