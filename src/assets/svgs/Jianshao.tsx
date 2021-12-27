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

let Jianshao: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M935 423.3H89C40.2 423.3 0.3 463.2 0.3 512c0 48.8 39.9 88.7 88.7 88.7h846c48.8 0 88.7-39.9 88.7-88.7 0-48.8-39.9-88.7-88.7-88.7z"
        fill={getIconColor(color, 0, '#D62828')}
      />
    </Svg>
  );
};

Jianshao.defaultProps = {
  size: 18,
};

Jianshao = React.memo ? React.memo(Jianshao) : Jianshao;

export default Jianshao;
