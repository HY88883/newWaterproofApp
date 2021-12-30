/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import Xiazai44 from './Xiazai44';
import Tianchongxing from './Tianchongxing';
import Ketang from './Ketang';
import WeidengluTouxiang from './WeidengluTouxiang';
import Piliangbianji from './Piliangbianji';
import Tianjia1 from './Tianjia1';
import Tianjia2 from './Tianjia2';
import Xiaoxi from './Xiaoxi';
import Tianjia from './Tianjia';
import Jia from './Jia';
import Jianshao from './Jianshao';
import Weizhi from './Weizhi';
import Sp from './Sp';
import Stu from './Stu';
export { default as Xiazai44 } from './Xiazai44';
export { default as Tianchongxing } from './Tianchongxing';
export { default as Ketang } from './Ketang';
export { default as WeidengluTouxiang } from './WeidengluTouxiang';
export { default as Piliangbianji } from './Piliangbianji';
export { default as Tianjia1 } from './Tianjia1';
export { default as Tianjia2 } from './Tianjia2';
export { default as Xiaoxi } from './Xiaoxi';
export { default as Tianjia } from './Tianjia';
export { default as Jia } from './Jia';
export { default as Jianshao } from './Jianshao';
export { default as Weizhi } from './Weizhi';
export { default as Sp } from './Sp';
export { default as Stu } from './Stu';

export type IconNames = 'xiazai44' | 'tianchongxing-' | 'ketang' | 'weidenglu-touxiang' | 'piliangbianji' | 'tianjia1' | 'tianjia2' | 'xiaoxi' | 'tianjia' | 'jia' | 'jianshao' | 'weizhi' | 'sp' | 'stu';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'xiazai44':
      return <Xiazai44 key="1" {...rest} />;
    case 'tianchongxing-':
      return <Tianchongxing key="2" {...rest} />;
    case 'ketang':
      return <Ketang key="3" {...rest} />;
    case 'weidenglu-touxiang':
      return <WeidengluTouxiang key="4" {...rest} />;
    case 'piliangbianji':
      return <Piliangbianji key="5" {...rest} />;
    case 'tianjia1':
      return <Tianjia1 key="6" {...rest} />;
    case 'tianjia2':
      return <Tianjia2 key="7" {...rest} />;
    case 'xiaoxi':
      return <Xiaoxi key="8" {...rest} />;
    case 'tianjia':
      return <Tianjia key="9" {...rest} />;
    case 'jia':
      return <Jia key="10" {...rest} />;
    case 'jianshao':
      return <Jianshao key="11" {...rest} />;
    case 'weizhi':
      return <Weizhi key="12" {...rest} />;
    case 'sp':
      return <Sp key="L1" {...rest} />;
    case 'stu':
      return <Stu key="L2" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
