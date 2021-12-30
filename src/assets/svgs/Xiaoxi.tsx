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

let Xiaoxi: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M727.552 213.376l2.176 0.085333 2.176 0.128 2.133333 0.170667 2.176 0.256 2.133334 0.298667 2.090666 0.341333 2.090667 0.426667 2.090667 0.426666 2.048 0.512 2.048 0.554667 2.005333 0.597333 1.962667 0.64 2.005333 0.682667 1.92 0.768 1.92 0.768 1.92 0.853333 1.877333 0.853334 1.877334 0.938666 1.792 0.938667 1.834666 1.024 1.749334 1.066667 1.749333 1.066666 1.706667 1.152 1.706666 1.152 1.664 1.194667 1.621334 1.28 1.578666 1.28 1.578667 1.322667 1.536 1.365333 1.493333 1.365333 1.450667 1.450667 1.450667 1.450667 1.365333 1.493333 1.365333 1.536 1.322667 1.578667 1.28 1.578666 1.28 1.621334 1.194667 1.664 1.152 1.706666 1.152 1.706667 1.066666 1.749333 1.066667 1.749334 1.024 1.834666 0.938667 1.792 0.938666 1.877334 0.853334 1.877333 0.853333 1.92 0.768 1.92 0.768 1.92 0.682667 2.005333 0.64 1.962667 0.597333 2.005333 0.554667 2.048 0.512 2.048 0.426666 2.090667 0.426667 2.090667 0.341333 2.090666 0.298667 2.133334 0.256 2.176 0.170667 2.133333 0.128 2.176 0.085333 2.176L810.666667 298.666667v341.333333l-0.042667 2.218667-0.085333 2.176-0.128 2.176-0.170667 2.133333-0.256 2.176-0.298667 2.133333-0.341333 2.090667-0.426667 2.090667-0.426666 2.090666-0.512 2.048-0.554667 2.048-0.597333 2.005334-0.64 1.962666-0.682667 2.005334-0.768 1.92-0.768 1.92-0.853333 1.92-0.853334 1.877333-0.938666 1.877333-0.938667 1.792-1.024 1.834667-1.066667 1.749333-1.066666 1.749334-1.152 1.706666-1.152 1.706667-1.194667 1.664-1.28 1.621333-1.28 1.578667-1.322667 1.578667-1.365333 1.536-1.365333 1.493333-1.450667 1.450667-1.450667 1.450666-1.493333 1.365334-1.536 1.365333-1.578667 1.322667-1.578666 1.28-1.621334 1.28-1.664 1.194666-1.706666 1.152-1.706667 1.152-1.749333 1.066667-1.749334 1.066667-1.834666 1.024-1.792 0.938666-1.877334 0.938667-1.877333 0.853333-1.92 0.853334-1.92 0.768-1.92 0.768-2.005333 0.682666-1.962667 0.64-2.005333 0.597334-2.048 0.554666-2.048 0.512-2.090667 0.426667-2.090667 0.426667-2.090666 0.341333-2.133334 0.298667-2.176 0.256-2.133333 0.170666-2.176 0.128-2.176 0.085334L725.333333 725.333333h-256l-213.333333 170.666667v-170.666667H213.333333l-2.133333-0.042666-2.090667-0.042667-2.133333-0.170667-2.090667-0.170666-2.090666-0.213334-2.048-0.298666-2.090667-0.341334-2.048-0.384-2.048-0.426666-2.005333-0.469334-2.048-0.554666-2.005334-0.554667-1.962666-0.64-1.962667-0.682667-1.962667-0.725333-1.92-0.768-1.92-0.810667-1.92-0.896-1.834666-0.896-1.877334-0.981333-1.834666-0.981333-1.792-1.066667-1.792-1.066667-1.749334-1.152-1.706666-1.194666-1.706667-1.194667-1.664-1.28-1.664-1.322667-1.578667-1.365333-1.578666-1.365333-1.578667-1.450667-1.493333-1.493333-1.493334-1.493334-1.450666-1.578666-1.365334-1.578667-1.365333-1.578667-1.322667-1.664-1.28-1.664-1.194666-1.706666-1.194667-1.706667-1.152-1.749333-1.066667-1.792-1.066666-1.792-0.981334-1.834667-0.981333-1.877333-0.896-1.834667-0.896-1.92-0.810667-1.92-0.768-1.92-0.725333-1.962667-0.682667-1.962666-0.64-1.962667-0.554666-2.005333-0.554667-2.005334-0.469333-2.048-0.426667-2.048-0.384-2.048-0.341333-2.090666-0.298667-2.048-0.213333-2.090667-0.170667-2.090667-0.170667-2.133333-0.042666-2.090667L128 640V298.666667l0.042667-2.218667 0.085333-2.176 0.128-2.176 0.170667-2.133333 0.256-2.176 0.298666-2.133334 0.341334-2.090666 0.426666-2.090667 0.426667-2.090667 0.512-2.048 0.554667-2.048 0.597333-2.005333 0.64-1.962667 0.682667-2.005333 0.768-1.92 0.768-1.92 0.853333-1.92 0.853333-1.877333 0.938667-1.877334 0.938667-1.792 1.024-1.834666 1.066666-1.749334 1.066667-1.749333 1.152-1.706667 1.152-1.706666 1.194667-1.664 1.28-1.621334 1.28-1.578666 1.322666-1.578667 1.365334-1.536 1.365333-1.493333 1.450667-1.450667 1.450666-1.450667 1.493334-1.365333 1.536-1.365333 1.578666-1.322667 1.578667-1.28 1.621333-1.28 1.664-1.194667 1.706667-1.152 1.706667-1.152 1.749333-1.066666 1.749333-1.066667 1.834667-1.024 1.792-0.938667 1.877333-0.938666 1.877334-0.853334 1.92-0.853333 1.92-0.768 1.92-0.768 2.005333-0.682667 1.962667-0.64 2.005333-0.597333 2.048-0.554667 2.048-0.512 2.090667-0.426666 2.090666-0.426667 2.090667-0.341333 2.133333-0.298667 2.176-0.256 2.133334-0.170667 2.176-0.128 2.176-0.085333L213.333333 213.333333h512l2.218667 0.042667zM213.589333 256h-1.365333l-1.109333 0.042667-1.109334 0.085333-1.066666 0.085333-1.109334 0.128-1.066666 0.170667-1.024 0.170667-1.066667 0.170666-1.024 0.256-1.024 0.256-0.981333 0.256-1.024 0.298667-0.981334 0.298667-0.981333 0.341333-0.981333 0.384-0.938667 0.384-0.938667 0.426667-0.938666 0.426666-0.938667 0.469334-0.896 0.469333-0.896 0.512-0.896 0.512-0.853333 0.554667-0.853334 0.554666-0.853333 0.597334-0.853333 0.597333-0.810667 0.64-0.810667 0.64-0.768 0.682667-0.768 0.682666-0.768 0.682667-0.725333 0.725333-0.725333 0.725334-0.682667 0.768-0.682667 0.768-0.682666 0.768-0.64 0.810666-0.64 0.810667-0.597334 0.853333-0.597333 0.853334-0.554667 0.853333-0.554666 0.853333-0.512 0.896-0.512 0.896-0.469334 0.896-0.469333 0.938667-0.426667 0.938667-0.426666 0.938666-0.384 0.981334-0.384 0.938666-0.341334 0.981334-0.298666 0.981333-0.298667 1.024-0.256 0.981333-0.256 1.024-0.256 1.024-0.170667 1.066667-0.170666 1.024-0.170667 1.066667-0.128 1.109333-0.085333 1.066667-0.085334 1.109333L170.666667 297.557333v343.509334l0.042666 1.066666 0.085334 1.024 0.085333 1.066667 0.128 1.024 0.128 1.066667 0.170667 1.024 0.170666 1.024 0.256 1.024 0.213334 1.024 0.256 0.981333 0.298666 1.024 0.341334 0.981333 0.341333 0.981334 0.341333 0.981333 0.384 0.981333 0.426667 0.938667 0.426667 0.938667 0.469333 0.938666 0.469333 0.938667 0.512 0.896 0.512 0.896 0.554667 0.896 0.554667 0.896 0.597333 0.853333 0.597333 0.853334 0.64 0.810666 0.682667 0.853334 0.64 0.810666 0.725333 0.768 0.725334 0.768 0.725333 0.768 0.768 0.725334 0.768 0.725333 0.768 0.725333 0.810667 0.682667 0.853333 0.64 0.810667 0.64 0.853333 0.597333 0.853333 0.597334 0.896 0.554666 0.896 0.554667 0.896 0.512 0.896 0.512 0.938667 0.469333 0.938667 0.469334 0.938666 0.426666 0.938667 0.426667 0.981333 0.384 0.981334 0.341333 0.981333 0.341334 0.981333 0.341333 1.024 0.298667 0.981334 0.256 1.024 0.213333 1.024 0.256 1.024 0.170667 1.024 0.170666 1.066666 0.128 1.024 0.128 1.066667 0.085334 1.024 0.085333 1.066667 0.042667H298.666667v124.544L454.357333 682.666667h272.085334l1.109333-0.042667 1.109333-0.085333 1.066667-0.085334 1.109333-0.128 1.066667-0.170666 1.024-0.170667 1.066667-0.170667 1.024-0.256 1.024-0.256 0.981333-0.256 1.024-0.298666 0.981333-0.298667 0.981334-0.341333 0.981333-0.384 0.938667-0.384 0.938666-0.426667 0.938667-0.426667 0.938667-0.469333 0.896-0.469333 0.896-0.512 0.896-0.512 0.853333-0.554667 0.853333-0.554667 0.853334-0.597333 0.853333-0.597333 0.810667-0.64 0.810666-0.64 0.768-0.682667 0.768-0.682667 0.768-0.682666 0.725334-0.725334 0.725333-0.725333 0.682667-0.768 0.682666-0.768 0.682667-0.768 0.64-0.810667 0.64-0.810666 0.597333-0.853334 0.597334-0.853333 0.554666-0.853333 0.554667-0.853334 0.512-0.896 0.512-0.896 0.469333-0.896 0.469334-0.938666 0.426666-0.938667 0.426667-0.938667 0.384-0.981333 0.384-0.938667 0.341333-0.981333 0.298667-0.981333 0.298667-1.024 0.298666-0.981334 0.213334-1.024 0.256-1.024 0.170666-1.066666 0.170667-1.024 0.170667-1.066667 0.128-1.109333 0.085333-1.066667 0.085333-1.109333 0.042667-1.109334V297.557333l-0.042667-1.109333-0.085333-1.109333-0.085333-1.066667-0.128-1.109333-0.170667-1.066667-0.170667-1.024-0.170666-1.066667-0.256-1.024-0.213334-1.024-0.298666-0.981333-0.298667-1.024-0.298667-0.981333-0.341333-0.981334-0.384-0.938666-0.384-0.981334-0.426667-0.938666-0.426666-0.938667-0.469334-0.938667-0.469333-0.896-0.512-0.896-0.512-0.896-0.554667-0.853333-0.554666-0.853333-0.597334-0.853334-0.597333-0.853333-0.64-0.810667-0.64-0.810666-0.682667-0.768-0.682666-0.768-0.682667-0.768-0.725333-0.725334-0.725334-0.725333-0.768-0.682667-0.768-0.682666-0.768-0.682667-0.810666-0.64-0.810667-0.64-0.853333-0.597333-0.853334-0.597334-0.853333-0.554666-0.853333-0.554667-0.896-0.512-0.896-0.512-0.896-0.469333-0.938667-0.469334-0.938667-0.426666-0.938666-0.426667-0.981334-0.384-0.938666-0.384-0.981334-0.341333-0.981333-0.298667-1.024-0.298667-0.981333-0.256-1.024-0.256-1.024-0.256-1.066667-0.170666-1.024-0.170667-1.066667-0.170667-1.109333-0.128-1.066667-0.085333-1.109333-0.085333L726.442667 256H213.589333z"
        fill={getIconColor(color, 0, '#0400FF')}
      />
      <Path
        d="M792.32 128.042667c54.485333 2.048 101.546667 48.768 103.637333 103.637333 1.664 128.981333 0.042667 258.005333 0.042667 386.986667-2.090667 39.808-41.386667 24.234667-42.666667 0 0-129.194667 4.821333-258.432-0.085333-387.541334a65.92 65.92 0 0 0-60.373333-60.373333C621.141333 164.224 449.194667 170.666667 277.333333 170.666667c-39.808-2.090667-24.234667-41.386667 0-42.666667 171.648 0 343.338667-2.133333 514.986667 0.042667z"
        fill={getIconColor(color, 1, '#0400FF')}
      />
      <Path
        d="M298.666667 469.333333m-42.666667 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z"
        fill={getIconColor(color, 2, '#0400FF')}
      />
      <Path
        d="M300.842667 426.709333l2.176 0.170667 2.133333 0.298667 2.090667 0.341333 2.090666 0.512 2.005334 0.554667 2.005333 0.682666 1.92 0.768 1.877333 0.853334 1.834667 0.938666 1.792 1.024 1.749333 1.109334 1.664 1.194666 1.621334 1.237334 1.536 1.365333 1.493333 1.408 1.408 1.493333 1.365333 1.536 1.237334 1.621334 1.194666 1.664 1.109334 1.749333 1.024 1.792 0.938666 1.834667 0.853334 1.877333 0.768 1.92 0.682666 2.005333 0.554667 2.005334 0.512 2.090666 0.341333 2.090667 0.298667 2.133333 0.170667 2.176L341.333333 469.333333l-0.042666 2.176-0.170667 2.176-0.298667 2.133334-0.341333 2.090666-0.512 2.090667-0.554667 2.005333-0.682666 2.005334-0.768 1.92-0.853334 1.877333-0.938666 1.834667-1.024 1.792-1.109334 1.749333-1.194666 1.664-1.237334 1.621333-1.365333 1.536-1.408 1.493334-1.493333 1.408-1.536 1.365333-1.621334 1.237333-1.664 1.194667-1.749333 1.109333-1.792 1.024-1.834667 0.938667-1.877333 0.853333-1.92 0.768-2.005333 0.682667-2.005334 0.554667-2.090666 0.512-2.090667 0.341333-2.133333 0.298667-2.176 0.170666L298.666667 512l-2.176-0.042667-2.176-0.170666-2.133334-0.298667-2.090666-0.341333-2.090667-0.512-2.005333-0.554667-2.005334-0.682667-1.92-0.768-1.877333-0.853333-1.834667-0.938667-1.792-1.024-1.749333-1.109333-1.664-1.194667-1.621333-1.237333-1.536-1.365333-1.493334-1.408-1.408-1.493334-1.365333-1.536-1.237333-1.621333-1.194667-1.664-1.109333-1.749333-1.024-1.792-0.938667-1.834667-0.853333-1.877333-0.768-1.92-0.682667-2.005334-0.554667-2.005333-0.512-2.090667-0.341333-2.090666-0.298667-2.133334-0.170666-2.176L256 469.333333l0.042667-2.176 0.170666-2.176 0.298667-2.133333 0.341333-2.090667 0.512-2.090666 0.554667-2.005334 0.682667-2.005333 0.768-1.92 0.853333-1.877333 0.938667-1.834667 1.024-1.792 1.109333-1.749333 1.194667-1.664 1.237333-1.621334 1.365333-1.536 1.408-1.493333 1.493334-1.408 1.536-1.365333 1.621333-1.237334 1.664-1.194666 1.749333-1.109334 1.792-1.024 1.834667-0.938666 1.877333-0.853334 1.92-0.768 2.005334-0.682666 2.005333-0.554667 2.090667-0.512 2.090666-0.341333 2.133334-0.298667 2.176-0.170667L298.666667 426.666667l2.176 0.042666zM298.666667 469.333333z"
        fill={getIconColor(color, 3, '#0400FF')}
      />
      <Path
        d="M467.285333 469.333333m-42.666666 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z"
        fill={getIconColor(color, 4, '#0400FF')}
      />
      <Path
        d="M469.461333 426.709333l2.176 0.170667 2.133334 0.298667 2.090666 0.341333 2.090667 0.512 2.005333 0.554667 2.005334 0.682666 1.92 0.768 1.877333 0.853334 1.834667 0.938666 1.792 1.024 1.749333 1.109334 1.664 1.194666 1.621333 1.237334 1.536 1.365333 1.493334 1.408 1.408 1.493333 1.365333 1.536 1.237333 1.621334 1.194667 1.664 1.109333 1.749333 1.024 1.792 0.938667 1.834667 0.853333 1.877333 0.768 1.92 0.682667 2.005333 0.554667 2.005334 0.512 2.090666 0.341333 2.090667 0.298667 2.133333 0.170666 2.176L509.952 469.333333l-0.042667 2.176-0.170666 2.176-0.298667 2.133334-0.341333 2.090666-0.512 2.090667-0.554667 2.005333-0.682667 2.005334-0.768 1.92-0.853333 1.877333-0.938667 1.834667-1.024 1.792-1.109333 1.749333-1.194667 1.664-1.237333 1.621333-1.365333 1.536-1.408 1.493334-1.493334 1.408-1.536 1.365333-1.621333 1.237333-1.664 1.194667-1.749333 1.109333-1.792 1.024-1.834667 0.938667-1.877333 0.853333-1.92 0.768-2.005334 0.682667-2.005333 0.554667-2.090667 0.512-2.090666 0.341333-2.133334 0.298667-2.176 0.170666L467.285333 512l-2.176-0.042667-2.176-0.170666-2.133333-0.298667-2.090667-0.341333-2.090666-0.512-2.005334-0.554667-2.005333-0.682667-1.92-0.768-1.877333-0.853333-1.834667-0.938667-1.792-1.024-1.749333-1.109333-1.664-1.194667-1.621334-1.237333-1.536-1.365333-1.493333-1.408-1.408-1.493334-1.365333-1.536-1.237334-1.621333-1.194666-1.664-1.109334-1.749333-1.024-1.792-0.938666-1.834667-0.853334-1.877333-0.768-1.92-0.682666-2.005334-0.554667-2.005333-0.512-2.090667-0.341333-2.090666-0.298667-2.133334-0.170667-2.176L424.618667 469.333333l0.042666-2.176 0.170667-2.176 0.298667-2.133333 0.341333-2.090667 0.512-2.090666 0.554667-2.005334 0.682666-2.005333 0.768-1.92 0.853334-1.877333 0.938666-1.834667 1.024-1.792 1.109334-1.749333 1.194666-1.664 1.237334-1.621334 1.365333-1.536 1.408-1.493333 1.493333-1.408 1.536-1.365333 1.621334-1.237334 1.664-1.194666 1.749333-1.109334 1.792-1.024 1.834667-0.938666 1.877333-0.853334 1.92-0.768 2.005333-0.682666 2.005334-0.554667 2.090666-0.512 2.090667-0.341333 2.133333-0.298667 2.176-0.170667L467.285333 426.666667l2.176 0.042666zM467.285333 469.333333z"
        fill={getIconColor(color, 5, '#0400FF')}
      />
      <Path
        d="M640 469.333333m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z"
        fill={getIconColor(color, 6, '#0400FF')}
      />
      <Path
        d="M642.176 426.709333l2.176 0.170667 2.133333 0.298667 2.090667 0.341333 2.090667 0.512 2.005333 0.554667 2.005333 0.682666 1.92 0.768 1.877334 0.853334 1.834666 0.938666 1.792 1.024 1.749334 1.109334 1.664 1.194666 1.621333 1.237334 1.536 1.365333 1.493333 1.408 1.408 1.493333 1.365334 1.536 1.237333 1.621334 1.194667 1.664 1.109333 1.749333 1.024 1.792 0.938667 1.834667 0.853333 1.877333 0.768 1.92 0.682667 2.005333 0.554666 2.005334 0.512 2.090666 0.341334 2.090667 0.298666 2.133333 0.170667 2.176L682.666667 469.333333l-0.042667 2.176-0.170667 2.176-0.298666 2.133334-0.341334 2.090666-0.512 2.090667-0.554666 2.005333-0.682667 2.005334-0.768 1.92-0.853333 1.877333-0.938667 1.834667-1.024 1.792-1.109333 1.749333-1.194667 1.664-1.237333 1.621333-1.365334 1.536-1.408 1.493334-1.493333 1.408-1.536 1.365333-1.621333 1.237333-1.664 1.194667-1.749334 1.109333-1.792 1.024-1.834666 0.938667-1.877334 0.853333-1.92 0.768-2.005333 0.682667-2.005333 0.554667-2.090667 0.512-2.090667 0.341333-2.133333 0.298667-2.176 0.170666L640 512l-2.176-0.042667-2.176-0.170666-2.133333-0.298667-2.090667-0.341333-2.090667-0.512-2.005333-0.554667-2.005333-0.682667-1.92-0.768-1.877334-0.853333-1.834666-0.938667-1.792-1.024-1.749334-1.109333-1.664-1.194667-1.621333-1.237333-1.536-1.365333-1.493333-1.408-1.408-1.493334-1.365334-1.536-1.237333-1.621333-1.194667-1.664-1.109333-1.749333-1.024-1.792-0.938667-1.834667-0.853333-1.877333-0.768-1.92-0.682667-2.005334-0.554666-2.005333-0.512-2.090667-0.341334-2.090666-0.298666-2.133334-0.170667-2.176L597.333333 469.333333l0.042667-2.176 0.170667-2.176 0.298666-2.133333 0.341334-2.090667 0.512-2.090666 0.554666-2.005334 0.682667-2.005333 0.768-1.92 0.853333-1.877333 0.938667-1.834667 1.024-1.792 1.109333-1.749333 1.194667-1.664 1.237333-1.621334 1.365334-1.536 1.408-1.493333 1.493333-1.408 1.536-1.365333 1.621333-1.237334 1.664-1.194666 1.749334-1.109334 1.792-1.024 1.834666-0.938666 1.877334-0.853334 1.92-0.768 2.005333-0.682666 2.005333-0.554667 2.090667-0.512 2.090667-0.341333 2.133333-0.298667 2.176-0.170667L640 426.666667l2.176 0.042666zM640 469.333333z"
        fill={getIconColor(color, 7, '#0400FF')}
      />
    </Svg>
  );
};

Xiaoxi.defaultProps = {
  size: 18,
};

Xiaoxi = React.memo ? React.memo(Xiaoxi) : Xiaoxi;

export default Xiaoxi;