import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import messaging from '@react-native-firebase/messaging';

const PushNotifications = () => {

    const [authorizationStatus, setAuthorizationStatus] = useState(messaging.AuthorizationStatus.NOT_DETERMINED);
    const [token, setToken] = useState('');

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      setAuthorizationStatus(authStatus);
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  const handleRequestPermissions = () => {
    requestUserPermission();
  };
  const getToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log('Token:', token);
    setToken(token);
  }
  return (
    <View style={styles.container}>
        <Text>Estado de los permisos: {authorizationStatus}</Text>
      <TouchableOpacity onPress={handleRequestPermissions} style={styles.button}>
        <Text style={styles.buttonText}>Solicitar permisos</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={getToken} style={styles.button}>
        <Text style={styles.buttonText}>Obtener token</Text>
      </TouchableOpacity>
      <Text>Token: {token}</Text>
      <Text>PushNotifications</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    button: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: 'blue',
        color: 'white'
    },
    buttonText: {
        color: 'white'
    }
});
export default PushNotifications;
