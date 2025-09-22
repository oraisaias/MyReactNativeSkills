import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import EverySingleComponent from './EverySingleComponent';
import ActivityIndicatorComponent from './components/ActivityIndicatorComponent';
import FlatListComponent from './components/FlatList/FlatList';
import { EverySingleComponentStackParamList } from '../../types/navigation';
import TextInput from './components/TextInput/TextInput';

const EverySingleComponentBeingUsed = () => {
  const Stack = createStackNavigator<EverySingleComponentStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={EverySingleComponent} />
      <Stack.Screen name="ActivityIndicator" component={ActivityIndicatorComponent} />
      <Stack.Screen name="FlatList" component={FlatListComponent} />
      <Stack.Screen name="TextInput" component={TextInput} />
    </Stack.Navigator>
  );
};

export default EverySingleComponentBeingUsed;
