# react-native-reanimated-wheel-picker
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)
![IOS](https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white)
![WEB](https://img.shields.io/badge/WEb-779ece?style=for-the-badge&logo=dekstop&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


 cross-platform (android-ios-web) wheel picker with Reanimated 2 with smooth animation.


## Features
- Smooth scroll animations
- Best in class support for typescript
- Highly customizable 
- Animations built with react-native-reanimated

## Installation

```sh
npm install react-native-reanimated-wheel-picker
```
or
```sh
yarn add react-native-reanimated-wheel-picker
```
Need to install peer dependencies [`react-native-reanimated`](https://github.com/kmagiera/react-native-reanimated),  [`react-native-gesture-handler`](https://github.com/kmagiera/react-native-gesture-handler), [`@react-native-masked-view/masked-view`](https://github.com/react-native-masked-view/masked-view).

## Usage

```js
import Picker from "react-native-redanimated-wheel-picker";

// ...
// the label and value is just a default parameters   
// you can use any parameters and pass valueExtractor and labelExtractor
const DATA = [
  { label: '2022', value: 1 },
  { label: '2023', value: 2 },
  { label: '2024', value: 3 },
];
const CUSTOM_DATA = [
  { text: '2022', id: 1 },
  { text: '2023', id: 2 },
  { text: '2024', id: 3 },
];

const WheelPicker = () => {
  const [year, setYear] = useState();
  return (
    <View style={{height:200}}>
      <Picker
        pickerData={DATA}
        onChange={(item) => setYear(item)}
        value={year}
      />
      <Picker
        pickerData={DATA}
        onChange={(item) => setYear(item)}
        value={year}
        labelExtractor={item=>item.text}
        valueExtractor={item=>item.id}
      />
    </View>
  );
};
```

## Props

`Inherite ViewProps`

| Name                             | Type                 | Default                        | Description                                                                                                                                |
| -------------------------------- | -------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `items`                     | `{"label":string,"value":any}`              | **REQUIRED**                   | Data for each element "title" key display on picker item                                                                                                                    |
| `valueExtractor`                     | `(item: T) => number \| string`             | `()=>item.value`                          | Callback function to extract the unique property on each item                                                                                               |
| `labelExtractor`                     | `(item: T) => string`             | `()=>item.label`                          | Callback function to extract the label property on each item|
| `renderItem`                     | `(item: T, index: number) => ReactNode`             | -                          | Callback function to render the each row                                                                                                |
| `itemHeight`                     | `number`             | `40`                          | Height of each picker item                                                                                               |
| `visibleItems`                        | `number`             | `5`                             | Visible item on picker     
| `onChange`                        | `(item: T) => void`              | `0`                             | Callback when user select item that will return element of items array |
| `value`                        | `T \| undefined`             | `undefined`                             | Set initial selected item |
| `handlerStyle`          | `StyleProp<ViewStyle>`| `undefined`                        | Handler style  
`selectedItemColor (android and ios only)` | `string` | 'black'|color of the selected item
`outOfRangeColor  (android and ios only)` | `string`| 'grey'|color of the unselected items






## License

MIT
