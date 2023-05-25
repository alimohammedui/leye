import React, {useEffect} from 'react';
import {View, StatusBar} from 'react-native';
import LottieView from 'lottie-react-native';
import {NavigationProp} from '@react-navigation/native';

const SplashScreen = ({navigation}: {navigation: NavigationProp<any>}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('LandingScreen');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'beige'}}>
      <StatusBar hidden />
      <LottieView
        source={{
          uri: 'https://assets7.lottiefiles.com/packages/lf20_ysas4vcp.json',
        }}
        autoPlay
        loop={false}
      />
    </View>
  );
};

export default SplashScreen;
