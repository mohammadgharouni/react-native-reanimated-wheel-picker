/* eslint-disable react-native/no-inline-styles */
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import * as React from 'react';
import GestureHandler from './gestureHandler';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {PickerItem} from './item';
import {MaskView} from './maskview';

type Value = {label: string; value: number};

export interface PickerProps<T = any> {
  items: T[];
  onChange?: (value: T) => void;
  value?: T;
  renderItem?: (item: T, index: number) => React.ReactNode;
  itemHeight?: number;
  handlerStyle?: StyleProp<ViewStyle>;
  labelExtractor?: (item: T) => string;
  valueExtractor?: (item: T) => number;
  visibleItems?: number;
  outOfRangeColor?: string;
  selectedItemColor?: string;
}
export const Picker = <T extends Record<string, any> = Value>({
  items,
  value,
  onChange,
  renderItem,
  itemHeight = 40,
  handlerStyle,
  valueExtractor = item => item?.value,
  labelExtractor = item => item?.label,
  visibleItems = 5,
  outOfRangeColor = 'grey',
  selectedItemColor = 'black',
}: PickerProps<T>) => {
  const translateY = useSharedValue(0);

  const snapPoints = React.useMemo(
    () =>
      new Array(items.length).fill(0).map((_, i) => {
        return -i * itemHeight;
      }),
    [itemHeight, items.length],
  );

  const trxY = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  React.useEffect(() => {
    if (value) {
      const index = items.findIndex(
        item => valueExtractor(item) === valueExtractor(value),
      );
      if (index > -1) {
        translateY.value = withTiming(snapPoints[index], {
          duration: 500,
          easing: Easing.bezier(0.22, 1, 0.36, 1),
        });
      }
    }
  }, [snapPoints, translateY, value, items, valueExtractor]);

  const handleChange = (index: number) => {
    onChange && onChange(items[index]);
  };

  const maskElement = (
    <View>
      <Animated.View
        style={[
          trxY,
          {
            paddingTop: (itemHeight * visibleItems) / 2 - itemHeight / 2,
          },
        ]}>
        {items.map((item, index) => {
          return (
            <PickerItem
              key={index}
              translateY={translateY}
              index={index}
              itemHeight={itemHeight}
              visibleItems={visibleItems}
              title={labelExtractor(item)}>
              {renderItem ? (
                renderItem(item, index)
              ) : (
                <Text style={{fontSize: 16}}> {labelExtractor(item)}</Text>
              )}
            </PickerItem>
          );
        })}
      </Animated.View>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        {
          maxHeight: itemHeight * visibleItems,
        },
      ]}>
      <MaskView {...{maskElement}}>
        <View
          style={{
            height: itemHeight * Math.trunc(visibleItems / 2),
            backgroundColor: outOfRangeColor,
          }}
        />
        <View
          style={{
            height: itemHeight,
            backgroundColor: selectedItemColor,
          }}
        />
        <View
          style={{
            height: itemHeight * Math.trunc(visibleItems / 2),
            backgroundColor: outOfRangeColor,
          }}
        />
      </MaskView>
      <View style={[StyleSheet.absoluteFill]}>
        <View
          style={[
            {
              borderColor: 'grey',
              borderTopWidth: StyleSheet.hairlineWidth,
              borderBottomWidth: StyleSheet.hairlineWidth,
              backgroundColor: 'grey',
              opacity: 0.2,
              top: itemHeight * 2,
              height: itemHeight,
            },
            handlerStyle,
          ]}
        />
      </View>

      <GestureHandler
        translateY={translateY}
        snapPoints={snapPoints}
        onChange={handleChange}
        itemHeight={itemHeight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flex: 1,
  },
  label: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
