import React, { useEffect } from 'react';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import Navigation from './src/Navigation/index';
import { UserProvider } from './src/Contexts/User';

export default function App() {
  useEffect(() => {
    const getPushNotificationPermissions = async () => {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        return;
      }
      console.log(finalStatus);
      console.log(await Notifications.getExpoPushTokenAsync());
    };
    getPushNotificationPermissions();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="transparent" />
      <NavigationContainer>
        <UserProvider>
          <Navigation />
        </UserProvider>
      </NavigationContainer>
    </>
  );
}
