import '@testing-library/jest-native/extend-expect';
import {NativeModules} from 'react-native';

// Mock any native modules used in your tests
NativeModules.YourNativeModule = {};
// Add more mocks as needed
