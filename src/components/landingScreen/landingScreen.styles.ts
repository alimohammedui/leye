import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');

const styleCreator = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  carouselItem: {
    width: width - 20,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 8,
    elevation: 4,
    borderWidth: 5,
    backgroundColor: '#fff',
    borderColor: '#738ea7',
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#010101',
    textTransform: 'uppercase',
  },
  optionContainer: {
    marginBottom: 10,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#007aff',
    borderRadius: 4,
    marginBottom: 5,
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  innerContainer: {
    marginTop: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
    margin: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    maxWidth: width / 1.5,
  },
  carouselInner: {
    height: 4,
    backgroundColor: '#738ea7',
    width: '80%',
    marginVertical: 10,
  },
});

export default styleCreator;
