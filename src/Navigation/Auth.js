import React, { useEffect, useState } from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { MenuProvider } from 'react-native-popup-menu';
import { useFonts } from 'expo-font';

import Login from '../Screens/Login/index';
import MainVideo from '../Screens/InitialVideo/index';
import ResetCode from '../Screens/ResetCode/index';
import Main from '../Screens/Main/Main';
import Controller from '../Screens/Controller/Controller';

import { ControladoresProvider } from '../Contexts/Controladores';
import { EquipamentosProvider } from '../Contexts/Equipamentos';
import { AppProvider } from '../Contexts/App';
import SegoeUi from '../../assets/fonts/segoe-ui.otf';

const Stack = createStackNavigator();

export default function Index() {
  const [render, setRender] = useState(false);
  const [initialRoute, setInititalRoute] = useState('MainVideo');
  const [loaded] = useFonts({
    segoe: SegoeUi,
  });

  useEffect(() => {
    const fetchData = async () => {
      const equipmentsPublic = await AsyncStorage.getItem(
        '@sii_universe/equipments'
      );
      // console.log(equipmentsPublic);
      if (equipmentsPublic) {
        setInititalRoute('Main');
      }
      setRender(true);
    };
    fetchData();
  });

  if (!loaded || !render) {
    return <></>;
  }
  return (
    <MenuProvider>
      <AppProvider>
        <EquipamentosProvider>
          <ControladoresProvider>
            <Stack.Navigator
              screenOptions={{
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                ...TransitionPresets.SlideFromRightIOS,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
              animation="fade"
              headerMode="float"
              initialRouteName={initialRoute}
            >
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Mainvideo"
                component={MainVideo}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Login"
                component={Login}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="ResetCode"
                component={ResetCode}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Main"
                component={Main}
              />

              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Controller"
                component={Controller}
              />
            </Stack.Navigator>
          </ControladoresProvider>
        </EquipamentosProvider>
      </AppProvider>
    </MenuProvider>
  );
}
