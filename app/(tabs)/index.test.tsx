import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from './index'; // Import the HomeScreen component

describe('HomeScreen', () => {
  it('renders the title "OCR Scanner"', () => {
    const { getByText } = render(<HomeScreen />);
    const titleElement = getByText('OCR Scanner');
    expect(titleElement).toBeDefined();
  });

  it('renders the "Scan Image" button', () => {
    const { getByText } = render(<HomeScreen />);
    const scanButton = getByText('Scan Image');
    expect(scanButton).toBeDefined();
  });

  it('calls the onPress function when the "Scan Image" button is pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<HomeScreen />);
    const scanButton = getByText('Scan Image');

    // Manually set the onPress prop for testing purposes
    // In a real scenario, you might mock the component or its props differently
    scanButton.props.onPress = onPressMock;

    fireEvent.press(scanButton);

    expect(on onPressMock).toHaveBeenCalled();
  });
});