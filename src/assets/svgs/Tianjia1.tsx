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

let Tianjia1: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M118.153846 464.738462h787.692308v94.523076H118.153846z"
        fill={getIconColor(color, 0, '#246DDE')}
      />
      <Path
        d="M464.738462 905.846154V118.153846h94.523076v787.692308z"
        fill={getIconColor(color, 1, '#246DDE')}
      />
    </Svg>
  );
};

Tianjia1.defaultProps = {
  size: 18,
};

Tianjia1 = React.memo ? React.memo(Tianjia1) : Tianjia1;

export default Tianjia1;
