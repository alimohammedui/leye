import {useCallback, useMemo} from 'react';
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

const useRubric = ({navigation}: any) => {
  const {state, dispatch} = useQuizContext();

  const suggestionBasedOnTotal = useMemo(
    () => state.selectedAnswers.reduce((acc, val) => acc + val.point, 0),
    [state],
  );

  const {value, url} = useMemo(
    () => getValueFromRange(suggestionBasedOnTotal),
    [suggestionBasedOnTotal],
  );

  const handleStartOver = useCallback(() => {
    dispatch({type: 'UPDATE_SELECTION'});
    navigation.navigate('LandingScreen');
  }, [dispatch, navigation]);

  return {
    value,
    url,
    handleStartOver,
  };
};

export default useRubric;
