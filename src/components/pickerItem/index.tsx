import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  SharedValue,
  useDerivedValue,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
export interface PickerItemProps {
  translateY: SharedValue<number>;
  itemHeight: number;
  index: number;
  visibleItems: number;
  title: string;
  textStyle?: StyleProp<TextStyle>;
  children?: ReactNode;
}
export const PickerItem = ({
  translateY,
  itemHeight,
  index,
  visibleItems,
  children,
  textStyle,
}: PickerItemProps) => {
  const y = useDerivedValue(() =>
    interpolate(
      translateY.value / -itemHeight,
      [index - visibleItems / 2, index, index + visibleItems / 2],
      [-1, 0, 1],
      Extrapolate.CLAMP
    )
  );

  const textAnimation = useAnimatedStyle(() => {
    return {
      opacity: 1 / (1 + Math.abs(y.value)),
      transform: [
        {
          scale: 1 - 0.1 * Math.abs(y.value),
        },
        {
          perspective: 500,
        },
        {
          rotateX: `${65 * y.value}deg`,
        },
      ],
    };
  });
  return (
    <View style={[styles.textContainer, { height: itemHeight }]}>
      <Animated.Text style={[textAnimation, textStyle]}>
        {children}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
