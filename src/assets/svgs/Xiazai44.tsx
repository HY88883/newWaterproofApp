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

let Xiazai44: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M805.695 973.009c-1.963 0-3.541-0.054-4.672-0.111L203.268 972.898c-40.042 0-63.091-16.865-75.375-31.013-26.919-31.003-24.757-73.037-23.543-84.7l0-359.53 64 0 0 363.913-0.302 1.883c-0.761 6.401-0.833 26.277 8.289 36.609 1.93 2.186 7.803 8.838 26.932 8.838l600.308 0 0.75 0.082c2.153 0.076 22.315 0.434 34.996-11.557 8.454-7.994 12.74-21.212 12.74-39.288L852.063 497.379l64 0 0 360.756c0 45.871-18.247 72.371-33.555 86.525C854.974 970.12 820.092 973.008 805.695 973.009zM136.349 527.688 38 527.688c-13.291 0-25.197-8.214-29.916-20.639-4.718-12.425-1.266-26.472 8.674-35.294l472.219-419.09c12.02-10.668 30.087-10.766 42.223-0.227l478.781 415.791c9.955 8.646 13.588 22.513 9.151 34.929s-16.035 20.84-29.216 21.219l-104.938 3.012c-0.313 0.01-0.624 0.014-0.936 0.014-17.247 0-31.471-13.729-31.97-31.082-0.507-17.666 13.403-32.398 31.069-32.905l22.931-0.658L510.448 119.179 122.266 463.688l14.083 0c17.673 0 32 14.327 32 32S154.022 527.688 136.349 527.688zM403 941.201c-14.912 0-27-12.088-27-27L376 688.355c0.002-4.866 1.234-24.9 20.021-43.995 22.8-23.173 61.458-34.923 114.901-34.923 52.638 0 90.876 11.911 113.652 35.403 19.225 19.828 20.464 40.706 20.426 46.244l0 222.25c0 14.912-12.088 27-27 27s-27-12.088-27-27L591 691.402c-0.179-1.167-1.308-6.104-8.017-11.541-7.569-6.134-26.997-16.424-72.062-16.424-52.272 0-70.848 13.145-76.408 18.795-2.73 2.775-3.876 5.136-4.357 6.627-0.073 0.225-0.123 0.411-0.157 0.549l0 224.793C430 929.113 417.912 941.201 403 941.201zM410 726 401 932 163 919 146 665 151 499 80 476 509 87 932 456 889 497 871 867 854 924 630 932 626 783 612 683 584 660 529 651 461 657 419 663Z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Xiazai44.defaultProps = {
  size: 18,
};

Xiazai44 = React.memo ? React.memo(Xiazai44) : Xiazai44;

export default Xiazai44;
