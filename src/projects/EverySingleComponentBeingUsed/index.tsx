import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import EverySingleComponent from './EverySingleComponent';
import ActivityIndicatorComponent from './components/ActivityIndicatorComponent';
import FlatListComponent from './components/FlatList/FlatList';
import { EverySingleComponentStackParamList } from '../../types/navigation';

const EverySingleComponentBeingUsed = () => {
  const Stack = createStackNavigator<EverySingleComponentStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={EverySingleComponent} />
      <Stack.Screen name="ActivityIndicator" component={ActivityIndicatorComponent} />
      <Stack.Screen name="FlatList" component={FlatListComponent} />
    </Stack.Navigator>
  );
};

export default EverySingleComponentBeingUsed;
