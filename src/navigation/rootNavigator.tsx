import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../components/splashScreen';
import LandingScreen from '../components/landingScreen/landingScreen';
import {NavigationContainer} from '@react-navigation/native';
import Rubric from '../components/rubric/rubric';
import React from 'react';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="RubricScreen" component={Rubric} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
