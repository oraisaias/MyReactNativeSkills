import React from 'react';
import { RealmProvider } from '@realm/react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import DataScreen from './screens/DataScreen';
import Task from './models/Task';
import { RealmAppStackParamList } from './types/navigation';

const Stack = createStackNavigator<RealmAppStackParamList>();

const RealmApp = () => {
  return (
    <RealmProvider schema={[Task]}>
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
    </RealmProvider>
  );
};

export default RealmApp;
