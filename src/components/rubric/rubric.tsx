import React, {useCallback, useMemo} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useQuizContext} from '../../context/quizContext';

export function getValueFromRange(result: number) {
  const ranges = [
    {
      min: 22,
      max: 26,
      value: 'RPM Seafood',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-t-YZGFYjKQDFTRrQfvEt301UAqOyJm8i8A&usqp=CAU',
    },
    {
      min: 17,
      max: 21,
      value: 'Hub 51',
      url: 'https://storage.googleapis.com/hub51chicago_bucket/wp-content/themes/lettuce/images/logo.png',
    },
    {
      min: 11,
      max: 16,
      value: 'Beatrix',
      url: 'https://storage.googleapis.com/beatrixrestaurants_bucket/wp-content/uploads/beatrix-restaurants-light.png',
    },
    {
      min: 6,
      max: 10,
      value: 'Tallboy',
      url: 'https://images.squarespace-cdn.com/content/v1/5c6b610dfb18201758b98d91/1550865544161-R7CF8UPVGFWNKINIJ6GX/tb+icon1.png?format=1500w',
    },
  ];

  const matchedRange = ranges.find(
    range => result >= range.min && result <= range.max,
  ) as (typeof ranges)[0];
  return {value: matchedRange?.value ?? '', url: matchedRange?.url ?? ''};
}

const Rubric: React.FC<any> = React.memo(({navigation}) => {
  const {state, dispatch} = useQuizContext();
  const suggestionBasedOnTotal = useMemo(
    () => state.selectedAnswers.reduce((acc, val) => acc + val.point, 0),
    [state],
  );

  const {value, url} = useMemo(
    () => getValueFromRange(suggestionBasedOnTotal),
    [suggestionBasedOnTotal],
  );

  const styles = useMemo(() => createStyles(), []);

  const handleStartOver = useCallback(() => {
    dispatch({type: 'UPDATE_SELECTION'});
    navigation.navigate('LandingScreen');
  }, [dispatch, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {url && (
          <Image
            source={{uri: url, scale: 1}}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        <Text
          testID={value}
          style={styles.suggestionText}>{`Your suggestion is: ${
          value ?? 'Unknown'
        }`}</Text>
      </View>
      <TouchableOpacity
        onPress={handleStartOver}
        style={styles.startOverButton}>
        <Text style={styles.startOverButtonText}>Start Over</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
});

export default Rubric;

const createStyles = () => {
  return StyleSheet.create({
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
};
