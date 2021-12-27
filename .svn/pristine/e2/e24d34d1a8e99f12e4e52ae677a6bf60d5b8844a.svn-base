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

let Tianjia: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M334.336 514.56c0 15.872 12.8 29.184 29.184 29.184h297.984c15.872 0 29.184-12.8 29.184-29.184s-12.8-29.184-29.184-29.184H363.008c-15.872 0-28.672 13.312-28.672 29.184z"
        fill={getIconColor(color, 0, '#FFBB12')}
      />
      <Path
        d="M512 336.896c-15.872 0-29.184 12.8-29.184 29.184v297.984c0 15.872 12.8 29.184 29.184 29.184s29.184-12.8 29.184-29.184V365.568c0-15.872-13.312-28.672-29.184-28.672z"
        fill={getIconColor(color, 1, '#FFBB12')}
      />
      <Path
        d="M825.344 201.216C742.4 118.272 629.248 71.68 512 71.68c-117.76 0-230.4 46.592-313.344 129.536a438.62016 438.62016 0 0 0-129.536 313.344c0 117.248 46.592 229.888 129.536 312.832C281.6 910.848 394.24 957.44 512 957.44s230.4-46.592 313.344-129.536c83.456-82.944 130.048-195.584 129.536-313.344 0-117.76-46.592-230.4-129.536-313.344zM785.92 788.48c-73.216 73.216-170.496 113.664-273.92 113.664-102.912 0.512-201.728-40.448-273.92-113.664-73.216-73.216-113.664-170.496-113.664-273.92-0.512-102.912 40.448-201.728 113.664-273.92C311.296 167.424 408.576 126.976 512 126.976c102.912-0.512 201.728 40.448 273.92 113.664 73.216 73.216 113.664 170.496 113.664 273.92 0.512 102.912-40.448 201.728-113.664 273.92z"
        fill={getIconColor(color, 2, '#2E77ED')}
      />
    </Svg>
  );
};

Tianjia.defaultProps = {
  size: 18,
};

Tianjia = React.memo ? React.memo(Tianjia) : Tianjia;

export default Tianjia;
