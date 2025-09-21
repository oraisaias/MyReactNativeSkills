/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Navigator from './src/navigation/Navigator';
import { RootStackParamList } from './src/types/navigation';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Alert, StyleSheet, View } from 'react-native';
import { Text } from 'react-native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import PushNotifications from './src/projects/PushNotifications/PushNotifications';
import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();
  return (
    <View style={styles.container}>
      
      <Text style={styles.item  } onPress={() => navigation.navigate('Profile', { name: 'CustomCheckbox' })}>CustomCheckbox</Text>
      <Text style={styles.item} onPress={() => navigation.navigate('PushNotifications')}>PushNotifications</Text>
    </View> 
  );
};

function App() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={Navigator} />
        <Stack.Screen name="PushNotifications" component={PushNotifications} />
      </Stack.Navigator>    
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item:{
    marginVertical:10,
    padding:10
  }
});

export default App;
