import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Rubric from '../rubric';
import useRubric from '../useRubric';

jest.mock('../useRubric');

const mockUseClientRect = useRubric as jest.MockedFunction<typeof useRubric>;

describe('Rubric component', () => {
  it("mocks the hook's return value", () => {
    mockUseClientRect.mockReturnValue({
      value: 'Test',
      url: 'https://example.com/image.jpg',
      handleStartOver: () => {},
    });
  });

  const navigation = jest.fn().mockReturnValue({
    navigate: jest.fn(),
  });

  it('renders the provided image URL correctly', () => {
    const url = 'https://example.com/image.jpg';
    const {getByTestId} = render(<Rubric navigation={navigation} />);
    const image = getByTestId('rubric-image');
    expect(image.props.source.uri).toBe(url);
  });

  it('displays the correct suggestion text based on the value prop', () => {
    const value = 'Test';
    const {getByTestId} = render(
      <Rubric navigation={navigation} value={value} />,
    );
    const suggestionText = getByTestId(value);

    expect(suggestionText.props.children).toBe(`We Recommend: ${value}`);
  });

  it('calls the handleStartOver function when Start Over button is pressed', () => {
    const handleStartOverMock = jest.fn();
    const {getByTestId} = render(<Rubric navigation={navigation} />);
    const startOverButton = getByTestId('start-over-button');

    fireEvent.press(startOverButton);

    expect(handleStartOverMock).toBeDefined();
  });
});
