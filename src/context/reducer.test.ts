import {initialState} from './quizContext';
import reducer, {AppAction} from './reducer';
import {Quiz} from './types';

describe('reducer', () => {
  const createSelection = (
    question: string,
    point: number,
    isSelected: boolean = false,
    selection: string = '',
  ): Quiz.Selections => {
    return {question, point, isSelected, selection};
  };

  it('should handle SET_SELECTION action and update selectedAnswers array', () => {
    const state: Quiz.QuizState = {
      quizData: {} as Quiz.Content,
      setSelectedAnswers: () => {},
      selectedAnswers: [createSelection('1', 1), createSelection('2', 2)],
    };

    const payload: Quiz.Selections = createSelection('1', 3);
    const action: AppAction = {type: 'SET_SELECTION', payload};

    const newState = reducer(state, action);

    expect(newState.selectedAnswers).toEqual([
      createSelection('1', 3),
      createSelection('2', 2),
    ]);
  });

  it('should handle UPDATE_SELECTION action and return initial state', () => {
    const state: Quiz.QuizState = {
      quizData: {} as Quiz.Content,
      setSelectedAnswers: () => {},
      selectedAnswers: [createSelection('1', 1), createSelection('2', 2)],
    };

    const action: AppAction = {type: 'UPDATE_SELECTION'};

    const newState = reducer(state, action);

    expect(newState).toEqual(initialState);
  });

  it('should return the same state for unknown action types', () => {
    const state: Quiz.QuizState = {
      quizData: {} as Quiz.Content,
      setSelectedAnswers: () => {},
      selectedAnswers: [createSelection('1', 1), createSelection('2', 2)],
    };

    const action: AppAction = {type: 'UNKNOWN_ACTION' as any};

    const newState = reducer(state, action);

    expect(newState).toEqual(state);
  });
});
