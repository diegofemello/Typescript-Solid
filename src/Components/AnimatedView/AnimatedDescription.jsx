import React from 'react';
import { compose } from 'recompose';
import { StyleSheet, Animated } from 'react-native';

import colors from '../../Fontes/colors';
import size from '../../Fontes/sizes';

import { withSelfMeasure } from './Utils/selfMeasureBehavior';
import buildTransform from './Utils/buildTransform';

const styles = StyleSheet.create({
  text: {
    fontSize: size.medium_large,
    color: colors.background,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 25,
    textAlign: 'center',
  },
});

const AnimatedDescription = ({
  animationRange,
  description,
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
    70,
    0.7
  );
  const animateOpacity = {
    opacity: animationRange.interpolate({
      inputRange: [0, 0.4, 1],
      outputRange: [1, 0, 0],
    }),
  };

  return (
    <Animated.Text
      style={[styles.text, animateText, animateOpacity]}
      onLayout={(event) => onLayoutSetMeasurements(event)}
    >
      {description}
    </Animated.Text>
  );
};

const enhance = compose(withSelfMeasure);

export default enhance(AnimatedDescription);
