/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import Tianjia from './Tianjia';
import Jia from './Jia';
import Jianshao from './Jianshao';
import Weizhi from './Weizhi';
import Sp from './Sp';
import Stu from './Stu';
export { default as Tianjia } from './Tianjia';
export { default as Jia } from './Jia';
export { default as Jianshao } from './Jianshao';
export { default as Weizhi } from './Weizhi';
export { default as Sp } from './Sp';
export { default as Stu } from './Stu';

export type IconNames = 'tianjia' | 'jia' | 'jianshao' | 'weizhi' | 'sp' | 'stu';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'tianjia':
      return <Tianjia key="1" {...rest} />;
    case 'jia':
      return <Jia key="2" {...rest} />;
    case 'jianshao':
      return <Jianshao key="3" {...rest} />;
    case 'weizhi':
      return <Weizhi key="4" {...rest} />;
    case 'sp':
      return <Sp key="L1" {...rest} />;
    case 'stu':
      return <Stu key="L2" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
