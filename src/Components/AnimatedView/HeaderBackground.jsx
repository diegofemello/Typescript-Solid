import React from 'react';
import { StyleSheet, Animated } from 'react-native';

import colors from '../../Fontes/colors';

const styles = StyleSheet.create({
  headerBackground: {
    position: 'absolute',
    flex: 0,
    height: 300,
    width: '100%',
    backgroundColor: colors.backgroundHeader,
    opacity: 0,
    zIndex: 2,
    borderColor: colors.borderHeader,
  },
});

const HeaderBackground = ({ animationRange }) => {
  const animateHeader = {
    transform: [
      {
        translateY: animationRange.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -240],
        }),
      },
    ],
  };
  const animateOpacity = {
    opacity: animationRange.interpolate({
      inputRange: [0, 0.4, 1],
      outputRange: [0, 0, 1],
    }),
  };
  const animateBorder = {
    borderBottomWidth: animationRange.interpolate({
      inputRange: [0, 0.4, 1],
      outputRange: [0, 0, 1],
    }),
  };

  return (
    <Animated.View
      style={[
        styles.headerBackground,
        animateHeader,
        animateOpacity,
        animateBorder,
      ]}
    />
  );
};

export default HeaderBackground;
