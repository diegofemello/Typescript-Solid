const buildTransform = (
  animationRange,
  startX,
  startY,
  startHeight,
  startWidth,
  endX,
  endY,
  scaleTo
) => {
  const complementScaling = 1 - scaleTo;
  const verticalScalingDiff = (complementScaling * startHeight) / 2;
  return {
    transform: [
      {
        translateY: animationRange.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -(startY - endY) - verticalScalingDiff],
        }),
      },
    ],
  };
};

export default buildTransform;
