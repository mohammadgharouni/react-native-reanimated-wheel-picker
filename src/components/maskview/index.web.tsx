import React, {ReactNode} from 'react';
import {View} from 'react-native';

export const MaskView = ({
  maskElement,
}: {
  maskElement: React.ReactElement;
  children?: ReactNode;
}) => {
  return <View>{maskElement}</View>;
};
