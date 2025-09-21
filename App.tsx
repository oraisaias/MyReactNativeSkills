/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Navigator from './src/navigation/Navigator';
import { RootStackParamList } from './src/types/navigation';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Text } from 'react-native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();
  return (
    <View>
      <Text onPress={() => navigation.navigate('Profile', { name: 'CustomCheckbox' })}>Home</Text>
    </View>
  );
};

function App() {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={Navigator} />
      </Stack.Navigator>    
    </NavigationContainer>
  );
}

export default App;
