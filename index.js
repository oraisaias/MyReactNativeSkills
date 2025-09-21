/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import { onBackgroundMessage } from './src/projects/PushNotifications/NotificationshHandler';

messaging().setBackgroundMessageHandler(
    onBackgroundMessage
);
  
AppRegistry.registerComponent(appName, () => App);
