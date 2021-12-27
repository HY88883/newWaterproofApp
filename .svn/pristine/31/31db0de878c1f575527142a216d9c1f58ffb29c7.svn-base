/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps, SvgXml } from 'react-native-svg';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

const xml = `
<svg 
 xmlns="http://www.w3.org/2000/svg"
 xmlns:xlink="http://www.w3.org/1999/xlink"
 width="128px" height="128px">
<defs>
<linearGradient id="PSgrad_0" x1="19.081%" x2="0%" y1="0%" y2="98.163%">
  <stop offset="0%" stop-color="rgb(72,198,239)" stop-opacity="1" />
  <stop offset="39%" stop-color="rgb(92,166,227)" stop-opacity="1" />
  <stop offset="100%" stop-color="rgb(111,134,214)" stop-opacity="1" />
</linearGradient>

</defs>
<path fill-rule="evenodd"  fill="rgb(248, 249, 250)"
 d="M16.000,-0.000 L112.000,-0.000 C120.837,-0.000 128.000,7.163 128.000,16.000 L128.000,112.000 C128.000,120.837 120.837,128.000 112.000,128.000 L16.000,128.000 C7.163,128.000 -0.000,120.837 -0.000,112.000 L-0.000,16.000 C-0.000,7.163 7.163,-0.000 16.000,-0.000 Z"/>
<path fill="url(#PSgrad_0)"
 d="M16.000,-0.000 L112.000,-0.000 C120.837,-0.000 128.000,7.163 128.000,16.000 L128.000,112.000 C128.000,120.837 120.837,128.000 112.000,128.000 L16.000,128.000 C7.163,128.000 -0.000,120.837 -0.000,112.000 L-0.000,16.000 C-0.000,7.163 7.163,-0.000 16.000,-0.000 Z"/>
</svg>
`

let Sp: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <SvgXml xml={xml}  width={size} height={size} {...rest} />
  );
};

Sp.defaultProps = {
  size: 18,
};

Sp = React.memo ? React.memo(Sp) : Sp;

export default Sp;
