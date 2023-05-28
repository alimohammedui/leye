import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Container from './wrapper';

interface RadioCellProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
  testID?: string;
}

const RadioCell: React.FC<RadioCellProps> = ({
  label,
  selected,
  onSelect,
  testID,
}) => {
  return (
    <TouchableOpacity
      testID={testID}
      onPress={onSelect}
      style={styles.container}>
      <View style={[styles.radioButton, {borderColor: '#738ea7'}]}>
        {selected && <View style={styles.radioButtonInner} />}
      </View>
      <Text style={{color: 'black'}}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: -50,
  },
  radioButton: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#738ea7',
  },
});

export default RadioCell;
