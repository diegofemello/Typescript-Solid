import React from 'react';
import { StyleSheet, Animated, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    flex: 0,
    zIndex: 2,
    height: '100%',
    width: '100%',
  },
  imageBackground: {
    height: '100%',
    width: '100%',
  },
});

const ImageBackground = ({ animationRange, background }) => {
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
      outputRange: [1, 1, 0],
    }),
  };

  return (
    <Animated.View
      style={[styles.imageContainer, animateHeader, animateOpacity]}
    >
      <LinearGradient colors={['#A7518A', '#A7518A', '#B9E2F3']}>
        <Image source={background} style={styles.imageBackground} />
      </LinearGradient>
    </Animated.View>
  );
};

export default ImageBackground;
