import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

interface RadioCellProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

const RadioCell: React.FC<RadioCellProps> = ({label, selected, onSelect}) => {
  return (
    <TouchableOpacity onPress={onSelect} style={styles.container}>
      <View
        style={[styles.radioButton, {borderColor: selected ? 'blue' : 'gray'}]}>
        {selected && <View style={styles.radioButtonInner} />}
      </View>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
  },
});

export default RadioCell;
