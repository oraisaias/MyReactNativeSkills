import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import DataScreen from './screens/DataScreen';
import { SqliteStorageStackParamList } from './types/navigation';

const Stack = createStackNavigator<SqliteStorageStackParamList>();

const SqliteStorage = () => {
  return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="TaskList" 
          component={Home}
          options={{ 
            title: 'TODO App',
            headerShown: true,
          }}
        />
        <Stack.Screen 
          name="AddTask" 
          component={DataScreen}
          options={{ 
            title: 'Nueva Tarea',
            headerBackTitle: 'Volver',
          }}
        />
        <Stack.Screen 
          name="EditTask" 
          component={DataScreen}
          options={{ 
            title: 'Editar Tarea',
            headerBackTitle: 'Volver',
          }}
        />
      </Stack.Navigator>
  );
};

export default SqliteStorage;
