/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { Picker } from 'react-native-reanimated-wheel-picker';
import { days, months, years, DemoItem } from './constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 31,
  },
});

const PickerDemo = () => {
  const [selectedDay, setselectedDay] = React.useState<DemoItem>();
  const [selectedMonth, setselectedMonth] = React.useState<DemoItem>();
  const [selectedYear, setselectedYear] = React.useState<DemoItem>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What year were you born?</Text>

      <View
        style={{
          backgroundColor: 'black',
          flex: 1,
          maxHeight: 250,
          width: '100%',
          paddingVertical: 25,
          flexDirection: 'row',
        }}
      >
        <Picker
          items={days}
          onChange={(val) => setselectedDay(val)}
          value={selectedDay}
          itemHeight={40}
          labelExtractor={(item) => item.title}
          valueExtractor={(item) => item.value}
          renderItem={(item) => (
            <Text style={{ color: 'green' }}>{item.title}</Text>
          )}
          handlerStyle={{ borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
          outOfRangeColor="green"
          selectedItemColor="green"
        />
        <Picker
          items={months}
          onChange={(val) => setselectedMonth(val)}
          value={selectedMonth}
          itemHeight={40}
          labelExtractor={(item) => item.title}
          valueExtractor={(item) => item.value}
          renderItem={(item) => (
            <Text style={{ color: 'white' }}>{item.title}</Text>
          )}
          outOfRangeColor="white"
          selectedItemColor="white"
        />
        <Picker
          items={years}
          onChange={(val) => setselectedYear(val)}
          value={selectedYear}
          itemHeight={40}
          labelExtractor={(item) => item.title}
          valueExtractor={(item) => item.value}
          handlerStyle={{ borderTopRightRadius: 8, borderBottomRightRadius: 8 }}
          renderItem={(item) => (
            <Text style={{ color: 'red' }}>{item.title}</Text>
          )}
          outOfRangeColor="red"
          selectedItemColor="red"
        />
      </View>
    </View>
  );
};
export default PickerDemo;
