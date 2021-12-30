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

let Tianjia2: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M542.24 542.72c-114.24 0-207.36-93.12-207.36-207.36S427.52 128 542.24 128s207.36 93.12 207.36 207.36-93.12 207.36-207.36 207.36z m0-366.24C454.4 176.48 383.36 248 383.36 335.36c0 87.36 71.04 158.88 158.88 158.88 87.36 0 158.88-71.04 158.88-158.88 0-87.36-71.52-158.88-158.88-158.88z"
        fill={getIconColor(color, 0, '#000000')}
      />
      <Path
        d="M189.92 894.56c-13.44 0-24.48-11.04-24.48-24.48 0-207.84 168.96-376.8 376.8-376.8 13.44 0 24.48 11.04 24.48 24.48s-11.04 24.48-24.48 24.48C361.28 542.24 214.4 689.6 214.4 870.08c-0.48 13.44-11.04 24.48-24.48 24.48zM831.2 764.96h-182.88c-13.92 0-24.96-11.04-24.96-24.96 0-13.92 11.04-24.96 24.96-24.96h182.88c13.92 0 24.96 11.04 24.96 24.96 0 13.92-11.04 24.96-24.96 24.96z"
        fill={getIconColor(color, 1, '#000000')}
      />
      <Path
        d="M714.56 831.68v-182.88c0-13.92 11.04-24.96 24.96-24.96 13.92 0 24.96 11.04 24.96 24.96v182.88c0 13.92-11.04 24.96-24.96 24.96-13.44 0-24.96-11.04-24.96-24.96z"
        fill={getIconColor(color, 2, '#000000')}
      />
    </Svg>
  );
};

Tianjia2.defaultProps = {
  size: 18,
};

Tianjia2 = React.memo ? React.memo(Tianjia2) : Tianjia2;

export default Tianjia2;
