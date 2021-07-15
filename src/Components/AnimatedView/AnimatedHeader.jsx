import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';

import AnimatedText from './AnimatedText';
import AnimatedDescription from './AnimatedDescription';
import AnimatedViewBack from './AnimatedViewBack';
import AnimatedViewLogin from './AnimatedViewLogin';
import ImageBackground from './ImageBackground';
import HeaderBackground from './HeaderBackground';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 0,
    zIndex: 2,
    height: 300,
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const AnimatedHeader = ({ animationRange, info, hideBack }) => (
  <>
    <AnimatedViewBack animationRange={animationRange} hideBack={hideBack} />
    <AnimatedViewLogin animationRange={animationRange} />
    <View style={styles.container} pointerEvents="none">
      <ImageBackground
        animationRange={animationRange}
        background={info.background}
      />
      <HeaderBackground animationRange={animationRange} />
      <Animated.View style={styles.container} pointerEvents="none">
        <AnimatedDescription
          animationRange={animationRange}
          description={info.description}
        />
        <AnimatedText animationRange={animationRange} text={info.name} />
      </Animated.View>
    </View>
  </>
);

export default AnimatedHeader;
