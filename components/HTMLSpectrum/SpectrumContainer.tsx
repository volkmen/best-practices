import React from 'react';
import './HTMLSpectrum.scss';
import Text, { TextColor, TextSize } from '../Text';

export const SpectrumContainer = () => (
  <div className='spectrum' style={{ marginLeft: '40px' }}>
    <Text color={TextColor.HalfLight} size={TextSize.Sm}>
      Press CTRL + use MOUSEWHEEL for spectrum zoom
    </Text>
    <Text color={TextColor.HalfLight} size={TextSize.Sm}>
      Drag spectrum left/right for navigation
    </Text>
    <Text color={TextColor.HalfLight} size={TextSize.Sm}>
      Use clicking on map for quick navigation
    </Text>
  </div>
);

export default React.memo(SpectrumContainer);
