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

let WeidengluTouxiang: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M363.776 551.68a239.104 239.104 0 0 0 297.216-0.512c161.92 82.624 184.512 234.112 189.248 284.544a468.8 468.8 0 0 0 132.416-326.912 470.656 470.656 0 1 0-941.312 0.064c0 127.104 50.624 242.24 132.48 326.912 4.736-48.512 28.672-201.152 189.952-284.096zM512 177.6c102.016 0 184.96 82.944 184.96 184.896S614.016 547.328 512 547.328c-101.952 0-184.896-82.816-184.896-184.832S410.048 177.6 512 177.6z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

WeidengluTouxiang.defaultProps = {
  size: 18,
};

WeidengluTouxiang = React.memo ? React.memo(WeidengluTouxiang) : WeidengluTouxiang;

export default WeidengluTouxiang;
