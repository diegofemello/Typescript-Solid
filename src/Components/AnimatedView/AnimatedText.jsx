import React from 'react';
import { compose } from 'recompose';
import { StyleSheet, Animated } from 'react-native';

import colors from '../../Fontes/colors';
import size from '../../Fontes/sizes';

import { withSelfMeasure } from './Utils/selfMeasureBehavior';
import buildTransform from './Utils/buildTransform';

const styles = StyleSheet.create({
  text: {
    fontSize: size.large,
    color: colors.background,
    fontWeight: 'bold',
  },
});

const AnimatedText = ({
  animationRange,
  text,
  onLayoutSetMeasurements,
  elementX,
  elementY,
  elementHeight,
  elementWidth,
}) => {
  const animateText = buildTransform(
    animationRange,
    elementX,
    elementY,
    elementHeight,
    elementWidth,
    20,
    25,
    0.7
  );
  const animateColor = {
    color: animationRange.interpolate({
      inputRange: [0, 0.4, 1],
      outputRange: ['#fff', '#fff', '#000'],
    }),
  };

  return (
    <>
      <Animated.Text
        style={[styles.text, animateText, animateColor]}
        onLayout={(event) => onLayoutSetMeasurements(event)}
        useNativeDriver={false}
      >
        {text}
      </Animated.Text>
    </>
  );
};

const enhance = compose(withSelfMeasure);

export default enhance(AnimatedText);
