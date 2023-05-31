import React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import styles from './rubric.styles';
import useRubric from './useRubric';

const Rubric: React.FC<any> = React.memo(({navigation}) => {
  const {handleStartOver, url, value} = useRubric({navigation});

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {url && (
          <Image
            testID="rubric-image"
            source={{uri: url, scale: 1}}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        <Text testID={value} style={styles.suggestionText}>{`We Recommend: ${
          value ?? 'Unknown'
        }`}</Text>
      </View>
      <TouchableOpacity
        testID="start-over-button"
        onPress={handleStartOver}
        style={styles.startOverButton}>
        <Text style={styles.startOverButtonText}>Start Over</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
});

export default Rubric;
