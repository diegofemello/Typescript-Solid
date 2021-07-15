import React, { useContext } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Image,
  Animated,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../Contexts/User';

import colors from '../../Fontes/colors';
import size from '../../Fontes/sizes';

import UserImage from '../../../assets/user.png';

const styles = StyleSheet.create({
  buttonContainer: {
    zIndex: 4,
    position: 'absolute',
    top: 30,
    right: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: colors.backgroundHeader,
    borderRadius: 2,
  },
  titleButton: {
    fontSize: size.medium_large,
    color: colors.botao_selecionado_login,
    fontFamily: 'segoe',
  },
  loggedContainer: {
    zIndex: 5,
    position: 'absolute',
    top: 30,
    right: 30,
    backgroundColor: colors.logo,
    borderRadius: 20,
    padding: 1,
  },
  iconProfile: {
    height: 34,
    width: 34,
  },
});

const AnimatedViewLogin = ({ animationRange }) => {
  const { isLogged, LogoutUser } = useContext(UserContext);
  const navigation = useNavigation();

  const animateY = {
    transform: [
      {
        translateY: animationRange.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        }),
      },
    ],
  };
  const animateColor = {
    backgroundColor: animationRange.interpolate({
      inputRange: [0, 0.4, 1],
      outputRange: ['transparent', 'transparent', colors.logo],
    }),
  };

  if (isLogged) {
    return (
      <Animated.View style={[styles.loggedContainer, animateY, animateColor]}>
        <Menu>
          <MenuTrigger>
            <Image source={UserImage} style={styles.iconProfile} />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              style={{ height: 40, justifyContent: 'center' }}
              onSelect={() => {}}
              text="Informações"
            />
            <MenuOption
              style={{ height: 40, justifyContent: 'center' }}
              text="Sair"
              onSelect={() => LogoutUser()}
            />
          </MenuOptions>
        </Menu>
      </Animated.View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
      <Animated.View style={[styles.buttonContainer, animateY]}>
        <Text style={styles.titleButton}>Entrar</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default AnimatedViewLogin;
