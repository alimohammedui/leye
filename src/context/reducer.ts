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
        selectedAnswers: updateStateAnswers(state, action.payload),
      };
    case 'UPDATE_SELECTION':
      return initialState;
    default:
      return state;
  }
};
const updateStateAnswers = (
  state: Quiz.QuizState,
  payload: Quiz.Selections,
) => {
  const updatedItems = [...state.selectedAnswers];
  const index = updatedItems.findIndex(
    item => item.question === payload.question,
  );

  if (index !== -1 && updatedItems[index].question === payload.question) {
    updatedItems.splice(index, 1, {
      ...updatedItems[index],
      point: payload.point,
    });
  } else {
    updatedItems.push(payload);
  }

  return updatedItems;
};

export default reducer;
