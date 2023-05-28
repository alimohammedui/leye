import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  FlatList,
  Animated,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {useQuizContext} from '../../context/quizContext';
import {Quiz} from '../../context/types';
import RadioCell from '../radioCell';
import Wrapper from '../wrapper';
import styleCreator from './landingScreen.styles';

const {width} = Dimensions.get('window');

const withDelay = (callback: any, delay = 500) => setTimeout(callback, delay);

const Carousel: React.FC<any> = ({navigation}) => {
  const styles = useMemo(() => styleCreator, []);
  const {state, dispatch} = useQuizContext();
  const carouselRef = useRef<FlatList<any>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isOptionSelected = selectedOptions[currentIndex] === undefined;

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
      setCurrentIndex(nextIndex);
      withDelay(() => {
        carouselRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
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
    const isLastItem = currentIndex === state.quizData.questions.length - 1;
    if (isLastItem) {
      label = 'See Recommendation';
    }
    return label;
  }, [currentIndex]);

  const renderItem = ({
    item,
    index,
  }: {
    item: Quiz.QuizSelectionContent;
    index: number;
  }) => {
    return (
      <View
        style={[styles.carouselItem, {borderWidth: 5, borderColor: '#738ea7'}]}>
        <Text testID={item.question} style={styles.questionText}>
          {item.question.toUpperCase()}
        </Text>

        <View style={styles.carouselInner} />
        <Wrapper
          buttonLabel={getButtonLabel()}
          onPressButton={handleNextButton}
          disabled={isOptionSelected}>
          {item.selections.map((selection, selectionIndex) => (
            <RadioCell
              key={`option-button-${index}-${selectionIndex}`}
              testID={`option-button-${index}-${selectionIndex}`}
              label={selection.selection}
              onSelect={() =>
                handleOptionPress(index, selectionIndex, {
                  ...selection,
                  question: item.question,
                })
              }
              selected={selectedOptions[index] === selectionIndex}
            />
          ))}
        </Wrapper>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../../../assets/pattern.jpg')}
      style={(StyleSheet.absoluteFillObject, [{flex: 1}])}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Quiz</Text>
        <Text
          style={{
            ...styles.subHeader,
            maxWidth: width / 1.5,
          }}>
          Discover your perfect restaurant match by taking our interactive Quiz
          and receive personalized recommendations based on your selections.
        </Text>
      </View>
      <FlatList
        ref={carouselRef}
        data={state.quizData.questions}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        scrollEventThrottle={16}
      />
    </ImageBackground>
  );
};

export default Carousel;
