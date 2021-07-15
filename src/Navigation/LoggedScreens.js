import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';
import { MenuProvider } from 'react-native-popup-menu';
import { useFonts } from 'expo-font';

import Main from '../Screens/Main/Main';
import Controller from '../Screens/Controller/Controller';

import { ControladoresProvider } from '../Contexts/Controladores';
import { EquipamentosProvider } from '../Contexts/Equipamentos';
import { AppProvider } from '../Contexts/App';
import SegoeUi from '../../assets/fonts/segoe-ui.otf';

const Stack = createStackNavigator();

export default function Index() {
  const [loaded] = useFonts({
    segoe: SegoeUi,
  });

  if (!loaded) {
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
              initialRouteName="Main"
            >
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
