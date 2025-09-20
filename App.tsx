/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Navigator from './src/navigation/Navigator';

import { NavigationContainer } from '@react-navigation/native';

function App() {
  return (
    <NavigationContainer>
      <Navigator actual="CustomCheckbox" />
    </NavigationContainer>
  );
}

export default App;
