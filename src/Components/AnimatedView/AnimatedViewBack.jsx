import React from 'react';
import { StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const styles = StyleSheet.create({
  backIcon: {
    zIndex: 4,
    position: 'absolute',
    top: 35,
    left: 10,
  },
});

export const AnimatedViewBackDark = ({
  animationRange,
  hideBack,
  navigation,
}) => {
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

  return (
    <Animated.View style={[styles.backIcon, animateY]}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Main')}>
        <AntDesign
          size={30}
          name="left"
          color="#fff"
          onPress={() => {}}
          style={{ opacity: hideBack ? 0 : 1 }}
        />
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export const AnimatedViewBackLight = ({
  animationRange,
  hideBack,
  navigation,
}) => {
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
  const animateOpacity = {
    opacity: animationRange.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  return (
    <Animated.View style={[styles.backIcon, animateY, animateOpacity]}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Main')}>
        <AntDesign
          size={30}
          name="left"
          color="#000"
          onPress={() => {}}
          style={{ opacity: hideBack ? 0 : 1 }}
        />
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

const AnimatedViewBack = (props) => {
  const navigation = useNavigation();

  return (
    <>
      <AnimatedViewBackDark {...props} navigation={navigation} />
      <AnimatedViewBackLight {...props} navigation={navigation} />
    </>
  );
};

export default AnimatedViewBack;
