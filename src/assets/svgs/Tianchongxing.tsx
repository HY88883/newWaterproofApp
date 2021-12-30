/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let Tianchongxing: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 321.6m-262.6 0a262.6 262.6 0 1 0 525.2 0 262.6 262.6 0 1 0-525.2 0Z"
        fill={getIconColor(color, 0, '#242424')}
      />
      <Path
        d="M924.3 903.6c0-0.1 0-0.1 0 0-0.1-2.1-0.3-4-0.6-5.9C901.2 690.1 725.5 528.6 512 528.6c-213.8 0-389.7 161.9-411.8 369.8-0.2 1.5-0.4 2.9-0.4 4.4 0 0.2-0.1 0.5-0.1 0.7h0.1v1.2c0 22.6 18.3 40.9 40.9 40.9h742.8c22.6 0 40.9-18.3 40.9-40.9 0-0.4-0.1-0.8-0.1-1.1z"
        fill={getIconColor(color, 1, '#242424')}
      />
    </Svg>
  );
};

Tianchongxing.defaultProps = {
  size: 18,
};

Tianchongxing = React.memo ? React.memo(Tianchongxing) : Tianchongxing;

export default Tianchongxing;
