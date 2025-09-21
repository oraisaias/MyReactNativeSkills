/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Navigator from './src/navigation/Navigator';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text onPress={() => navigation.navigate('Profile', { name: 'CustomCheckbox' })}>Home</Text>
    </View>
  );
};

function App() {
  const Stack = createStackNavigator();
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
