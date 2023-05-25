import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import Rubric from '../rubric';
import {getValueFromRange} from '../rubric';

describe('Rubric', () => {
  test('displays the correct suggestion based on the total points', async () => {
    const mockNavigation = {navigate: jest.fn()};
    const {queryByText} = render(<Rubric navigation={mockNavigation} />);
    let total: any;

    const checkSuggestionText = async () => {
      const suggestionText = queryByText(
        `Your suggestion is: ${getValueFromRange(total).value ?? 'Unknown'}`,
      );
      if (suggestionText) {
        return suggestionText;
      }
      throw new Error('Suggestion text not found');
    };

    total = await checkSuggestionText();

    const suggestionText = await waitFor(checkSuggestionText, {interval: 1500});
    expect(suggestionText).toBeTruthy();
  });

  test('navigates to the LandingScreen on "Start Over" button press', () => {
    const mockNavigation = {navigate: jest.fn()};
    const {getByText} = render(<Rubric navigation={mockNavigation} />);
    const startOverButton = getByText('Start Over');
    fireEvent.press(startOverButton);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('LandingScreen');
  });
});
