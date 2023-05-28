import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
} from 'react-native';

interface ContainerProps {
  children: React.ReactNode;
  onPressButton: () => void;
  buttonLabel: string;
  disabled: boolean;
  styleOverrides?: ViewStyle;
}

const Wrapper: React.FC<ContainerProps> = ({
  children,
  onPressButton,
  buttonLabel,
  styleOverrides,
  disabled,
}) => {
  return (
    <>
      <View style={[styles.contentContainer, {...styleOverrides}]}>
        {children}
      </View>
      <TouchableOpacity
        disabled={disabled}
        style={styles.button}
        onPress={onPressButton}>
        <Text style={styles.buttonLabel}>{buttonLabel}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#738ea7',
    padding: 16,
    marginBottom: 48,
  },
  contentContainer: {
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    bottom: -24,
    alignSelf: 'center',
    backgroundColor: '#738ea7',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonLabel: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Wrapper;
