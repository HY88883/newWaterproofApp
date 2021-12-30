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

let Piliangbianji: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M670.6 65.1l154.2 154.2-549.9 549.9H120.7V626c0-4.3-0.1-7.9 0-11L670.6 65.1m0-65.1C654.8 0 639 6 627 18.1L74.8 570.2c-18.9 18.9-18.1 19.6-18.1 60.1 0 202.2 0.1 202.8 0.1 202.8s0.6 0.1 183.3 0.1h27.6c32.7 0 34.6-0.6 52.1-18.2l552-552c24.1-24.1 24.1-63.2 0-87.3L714.2 18.1C702.2 6 686.4 0 670.6 0z"
        fill={getIconColor(color, 0, '#6992FF')}
      />
      <Path
        d="M534.996 200.712l45.325-45.325 154.148 154.148-45.325 45.325zM935.3 826.8H670.2c-17.7 0-32.1-14.4-32.1-32.1s14.4-32.1 32.1-32.1h265.1c17.7 0 32.1 14.4 32.1 32.1s-14.4 32.1-32.1 32.1zM935.3 1024H88.7c-17.7 0-32.1-14.4-32.1-32.1s14.4-32.1 32.1-32.1h846.6c17.7 0 32.1 14.4 32.1 32.1S953 1024 935.3 1024z"
        fill={getIconColor(color, 1, '#6992FF')}
      />
    </Svg>
  );
};

Piliangbianji.defaultProps = {
  size: 18,
};

Piliangbianji = React.memo ? React.memo(Piliangbianji) : Piliangbianji;

export default Piliangbianji;
