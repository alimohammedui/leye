import React from 'react';
import {
  View,
  FlatList,
  Animated,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {Quiz} from '../../context/types';
import RadioCell from '../radioCell';
import Wrapper from '../wrapper';
import useLandingScreen from './useLandingScreen';

const {width} = Dimensions.get('window');

const Carousel: React.FC<any> = ({navigation}) => {
  const {
    state,
    getButtonLabel,
    handleNextButton,
    handleOptionPress,
    scrollX,
    selectedOptions,
    currentIndex,
    carouselRef,
    styles,
  } = useLandingScreen({navigation});

  const isOptionSelected = selectedOptions[currentIndex] === undefined;

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
          {item.question}
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
