import React from 'react';
import { StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  SharedValue,
  useAnimatedGestureHandler,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { snapPoint } from 'react-native-redash';

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
        damping: 15,
        stiffness: 150,
      });
      ctx.top = top;
    },
    onEnd(event, ctx: any) {
      const snapPointY = snapPoint(ctx.top, event.velocityY, snapPoints);
      translateY.value = withTiming(snapPointY, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });

      const index = Math.abs(snapPointY / itemHeight);
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
