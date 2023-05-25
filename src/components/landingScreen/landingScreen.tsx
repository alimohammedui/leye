import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Animated,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useQuizContext} from '../../context/quizContext';
import {Quiz} from '../../context/types';

const {width} = Dimensions.get('window');

const withDelay = (callback: any, delay = 500) => setTimeout(callback, delay);

const Carousel: React.FC<any> = ({navigation}) => {
  const styles = useMemo(() => styleCreator, []);
  const {state, dispatch} = useQuizContext();
  const carouselRef = useRef<FlatList<any>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

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
      dispatch({
        type: 'SET_SELECTION',
        payload: selection,
      });
      const nextIndex = questionIndex + 1;
      const isLastItem = questionIndex === state.quizData.questions.length - 1;
      if (isLastItem) {
        withDelay(() => {
          navigation.navigate('RubricScreen');
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
        });
      }
    },
    [],
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: Quiz.QuizSelectionContent;
    index: number;
  }) => {
    return (
      <View style={[styles.carouselItem, {backgroundColor: '#E7F0D2'}]}>
        <Text style={styles.questionText}>{item.question}</Text>
        <View style={styles.optionContainer}>
          {item.selections.map((selection, selectionIndex) => (
            <TouchableOpacity
              key={`${index}-${selectionIndex}`}
              style={[
                styles.optionButton,
                {
                  backgroundColor:
                    selectedOptions[index] === selectionIndex
                      ? '#006400'
                      : '#3d3d3d',
                },
              ]}
              testID={`option-button-${index}-${selectionIndex}`}
              onPress={() =>
                handleOptionPress(index, selectionIndex, {
                  ...selection,
                  question: item.question,
                })
              }>
              <Text style={styles.optionButtonText}>{selection.selection}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: '#E7F0D2'}]}>
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
        contentContainerStyle={{alignItems: 'center'}}
      />
    </View>
  );
};

export default Carousel;

const styleCreator = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  carouselItem: {
    width: width - 20,
    height: 250,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 8,
    elevation: 4,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
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
});
