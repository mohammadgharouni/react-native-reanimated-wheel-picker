/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import { Button, StyleSheet, Text, View } from 'react-native';
import { Picker } from 'react-native-reanimated-wheel-picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 31,
  },
});
const start = 1950;
const items: { value: number; title: string }[] = [];
for (let i = 0; i < 100; i++) {
  items.push({
    value: start + i,
    title: `${start + i}`,
  });
}

const PickerDemo = () => {
  const [value, setvalue] = React.useState<any>();
  // const defaultValue = 1990 - start;

  const pickRandomFromArray = (arr: any) => {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
  };

  console.log('value', value);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What year were you born?</Text>
      <Button
        title="pick random"
        onPress={() => {
          const randomValue = pickRandomFromArray(items);
          setvalue(randomValue);
        }}
      />
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          maxHeight: 250,
          width: '100%',
          paddingVertical: 25,
          flexDirection: 'row',
        }}
      >
        <Picker
          {...{ items }}
          onChange={(val) => setvalue(val)}
          value={value}
          itemHeight={40}
          labelExtractor={(item) => item.title}
          valueExtractor={(item) => item.value}
          renderItem={(item) => (
            <Text style={{ color: 'red' }}>{item.title}</Text>
          )}
          outOfRangeColor="blue"
          handlerStyle={{ borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
        />
        <Picker
          {...{ items }}
          onChange={(val) => setvalue(val)}
          value={value}
          itemHeight={40}
          labelExtractor={(item) => item.title}
          valueExtractor={(item) => item.value}
          selectedItemColor="red"
        />
        <Picker
          {...{ items }}
          onChange={(val) => setvalue(val)}
          value={value}
          itemHeight={40}
          labelExtractor={(item) => item.title}
          valueExtractor={(item) => item.value}
          handlerStyle={{ borderTopRightRadius: 8, borderBottomRightRadius: 8 }}
        />
      </View>

      {/* <ItemPicker /> */}
    </View>
  );
};
export default PickerDemo;
