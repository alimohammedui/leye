import {render} from '@testing-library/react-native';
import SplashScreen from '../splashScreen';
import navigation from '@react-navigation/native';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
    useRoute: () => ({
      params: {
        id: '123',
      },
    }),
  };
});

describe('Splashscreen', () => {
  it('should render Splash animation', () => {
    const {getByTestId} = render(
      <SplashScreen navigation={navigation.useNavigation()} />,
    );
    const uri = 'https://assets7.lottiefiles.com/packages/lf20_ysas4vcp.json';
    const splash = getByTestId('start-animation');
    expect(splash.props.sourceURL).toEqual(uri);
  });
});
