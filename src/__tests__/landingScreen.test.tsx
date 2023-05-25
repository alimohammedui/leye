import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Carousel from '../components/landingScreen/landingScreen';

jest.mock('../context/quizContext', () => ({
  useQuizContext: jest.fn(() => ({
    state: {
      quizData: {
        questions: [
          {
            question: 'Pick a city you would like to jet off to',
            selections: [
              {selection: 'Tokyo', point: 2, isSelected: false},
              {selection: 'Paris', point: 4, isSelected: false},
              {selection: 'Los Angeles', point: 1, isSelected: false},
              {selection: 'Nashville', point: 3, isSelected: false},
            ],
          },
          {
            question: 'Pick a Netflix show to binge watch',
            selections: [
              {selection: 'Stranger Things', point: 2, isSelected: false},
              {selection: 'The Crown', point: 4, isSelected: false},
              {selection: 'House of Cards', point: 1, isSelected: false},
              {selection: 'Wednesday', point: 3, isSelected: false},
            ],
          },
        ],
      },
    },
    dispatch: jest.fn(),
  })),
}));

describe('Carousel', () => {
  test('renders correctly', () => {
    const {getByText, getAllByTestId} = render(<Carousel />);
    expect(getByText('Pick a city you would like to jet off to')).toBeTruthy();
    expect(getAllByTestId(/option-button/)).toHaveLength(8);
  });
});
