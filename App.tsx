import React from 'react';
import {QuizContextProvider} from './src/context/quizContext';
import RootNavigator from './src/navigation/rootNavigator';

function App(): JSX.Element {
  return (
    <QuizContextProvider>
      <RootNavigator />
    </QuizContextProvider>
  );
}

export default App;
