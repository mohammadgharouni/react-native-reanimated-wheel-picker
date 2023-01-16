import MaskedView from '@react-native-masked-view/masked-view';
import type { ReactElement, ReactNode } from 'react';
import React from 'react';
export const MaskView = ({
  children,
  maskElement,
}: {
  maskElement: ReactElement;
  children: ReactNode;
}) => {
  return (
    // @ts-ignore
    <MaskedView {...{ maskElement }} androidRenderingMode="software">
      {children}
    </MaskedView>
  );
};
