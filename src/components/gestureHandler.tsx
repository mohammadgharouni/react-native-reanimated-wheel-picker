import React from 'react';
import {StyleSheet} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  SharedValue,
  useAnimatedGestureHandler,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {snapPoint} from 'react-native-redash';

export interface GestureHandlerProps {
  translateY: SharedValue<number>;
  snapPoints: number[];
  onChange?: (index: number) => void;
  itemHeight: number;
}

const GestureHandler = ({
  translateY,
  snapPoints,
  onChange,
  itemHeight,
}: GestureHandlerProps) => {
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (e, ctx: any) => {
      ctx.startY = e.translationY + translateY.value;
    },
    onActive: (event, ctx: any) => {
      const top = event.translationY + ctx.startY;
      translateY.value = withSpring(top, {
        velocity: event.velocityY,
      });
    },
    onEnd: (event, ctx: any) => {
      const top = event.translationY + ctx.startY;
      const closest = snapPoints.reduce(function (prev, curr) {
        return Math.abs(curr - top) < Math.abs(prev - top) ? curr : prev;
      });

      const snapPointY = snapPoint(
        translateY.value,
        event.velocityY,
        snapPoints,
      );
      const index = Math.abs(snapPointY / itemHeight);

      translateY.value = withTiming(closest, {
        duration: 500,
        easing: Easing.bezier(0.35, 1, 0.36, 1),
      });
      onChange && runOnJS(onChange)(index);
    },
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={StyleSheet.absoluteFill} />
    </PanGestureHandler>
  );
};

export default GestureHandler;
