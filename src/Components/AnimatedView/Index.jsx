import React from 'react';
import { View, Animated } from 'react-native';
import { compose, withState, withProps } from 'recompose';
import AnimatedHeader from './AnimatedHeader';

export const scrollRangeForAnimation = 240;
const HeaderPlaceholder = (
  <View style={{ flex: 0, height: 300, width: '100%' }} />
);

const AnimatedView = ({
  scrollY,
  animationRange,
  children,
  info,
  hideBack,
}) => {
  let _scrollView = null;

  const onScrollEndSnapToEdge = (event) => {
    const { y } = event.nativeEvent.contentOffset;
    if (y > 0 && y < scrollRangeForAnimation / 2) {
      if (_scrollView) {
        _scrollView.scrollTo({ y: 0 });
      }
    } else if (
      scrollRangeForAnimation / 2 <= y &&
      y < scrollRangeForAnimation
    ) {
      if (_scrollView) {
        _scrollView.scrollTo({ y: scrollRangeForAnimation });
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.ScrollView
        style={{ flex: 1, zIndex: 1 }}
        ref={(scrollView) => {
          _scrollView = scrollView ? scrollView._component : null;
        }}
        onScrollEndDrag={onScrollEndSnapToEdge}
        onMomentumScrollEnd={onScrollEndSnapToEdge}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          {
            useNativeDriver: false,
          }
        )}
      >
        {HeaderPlaceholder}
        {children}
      </Animated.ScrollView>
      <AnimatedHeader
        hideBack={hideBack}
        info={info}
        animationRange={animationRange}
      />
    </View>
  );
};

const enhance = compose(
  withState('scrollY', 'setScrollY', () => new Animated.Value(0)),
  withProps(({ scrollY }) => ({
    animationRange: scrollY.interpolate({
      inputRange: [0, scrollRangeForAnimation],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  }))
);

export default enhance(AnimatedView);
