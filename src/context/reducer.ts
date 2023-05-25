import {initialState} from './quizContext';
import {Quiz} from './types';

export type AppAction =
  | {type: 'SET_SELECTION'; payload: Quiz.Selections}
  | {type: 'UPDATE_SELECTION'};

const reducer = (state: Quiz.QuizState, action: AppAction): Quiz.QuizState => {
  switch (action.type) {
    case 'SET_SELECTION':
      return {
        ...state,
        selectedAnswers: [...state.selectedAnswers.concat(action.payload)],
        quizData: {
          ...state.quizData,
          questions: state.quizData.questions.map(que => ({
            ...que,
            selections: que.selections.map(sel => ({
              ...sel,
              ...(que.question === action.payload.question && {
                isSelected: true,
              }),
            })),
          })),
        },
      };
    case 'UPDATE_SELECTION':
      return initialState;
    default:
      return state;
  }
};

export default reducer;
