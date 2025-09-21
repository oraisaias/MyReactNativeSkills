import React from 'react';
import { RealmProvider } from '@realm/react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import DataScreen from './screens/DataScreen';
const Stack = createStackNavigator();



const RealmApp = () => {
  return (
    <RealmProvider>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Data" options={{ headerBackTitle: 'Back' }} component={DataScreen} />
      </Stack.Navigator>
    </RealmProvider>
  );
};

export default RealmApp;
