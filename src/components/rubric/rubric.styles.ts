import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  content: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  image: {
    width: 400,
    height: 400,
    backgroundColor: 'black',
  },
  suggestionText: {
    textAlign: 'center',
    fontSize: 22,
    marginTop: 30,
    color: '#fff',
  },
  startOverButton: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 40,
    right: 40,
    borderWidth: 1,
    borderColor: 'blue',
  },
  startOverButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default styles;
