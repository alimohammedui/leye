import {useCallback, useRef, useState, useMemo} from 'react';
import {useQuizContext} from '../../context/quizContext';
import {Animated, FlatList} from 'react-native';
import {Quiz} from '../../context/types';
import styleCreator from './landingScreen.styles';

const withDelay = (callback: any, delay = 500) => setTimeout(callback, delay);

const useLandingScreen = ({navigation}: any) => {
  const {state, dispatch} = useQuizContext();
  const carouselRef = useRef<FlatList<any>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextButton = useCallback(() => {
    const nextIndex = currentIndex + 1;
    const isLastItem = currentIndex === state.quizData.questions.length - 1;
    if (isLastItem) {
      withDelay(() => {
        navigation.navigate('RubricScreen');
        setCurrentIndex(0);
        setSelectedOptions([]);
        carouselRef.current?.scrollToIndex({index: 0, animated: false});
        return;
      });
    } else {
      withDelay(() => {
        carouselRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        setCurrentIndex(nextIndex);
      });
    }
  }, [currentIndex]);

  const handleOptionPress = useCallback(
    (
      questionIndex: number,
      selectionIndex: number,
      selection: Quiz.Selections,
    ) => {
      setSelectedOptions(prevSelectedOptions => {
        const updatedSelectedOptions = [...prevSelectedOptions];
        updatedSelectedOptions[questionIndex] = selectionIndex;
        return updatedSelectedOptions;
      });
      setCurrentIndex(questionIndex);
      dispatch({
        type: 'SET_SELECTION',
        payload: selection,
      });
    },
    [selectedOptions],
  );

  const getButtonLabel = useCallback(() => {
    let label = 'Next Question';
    console.log('===> currentIndex', currentIndex);
    const isLastItem = currentIndex === state.quizData.questions.length - 1;
    if (isLastItem) {
      label = 'See Recommendation';
    }
    return label;
  }, [currentIndex]);

  const styles = useMemo(() => styleCreator, []);

  return {
    styles,
    state,
    dispatch,
    scrollX,
    withDelay,
    handleNextButton,
    handleOptionPress,
    getButtonLabel,
    selectedOptions,
    currentIndex,
    carouselRef,
  };
};

export default useLandingScreen;
