import MaskedView from '@react-native-masked-view/masked-view';
import React, { ReactNode } from 'react';

export const MaskView = ({
  children,
  maskElement,
}: {
  maskElement: React.ReactElement;
  children: ReactNode;
}) => {
  return (
    <MaskedView {...{ maskElement }} androidRenderingMode="software">
      {children}
    </MaskedView>
  );
};
