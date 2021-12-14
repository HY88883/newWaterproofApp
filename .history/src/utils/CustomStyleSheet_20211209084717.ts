import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {px2dp} from './index';

type NamedStyles<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle};

let MyStyleSheet = {
  create<T extends NamedStyles<T> | NamedStyles<any>>(
    style: T | NamedStyles<T>,
  ): T {
    let s = {...style}; // 目前仅对以下的属性进行处理
    let list = [
      'width',
      'height',
      'marginTop',
      'marginBottom',
      'marginLeft',
      'marginRight',
      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',
      'top',
      'right',
      'bottom',
      'left',
      'fontSize',
      'lineHeight',
        'borderRadius',
      'borderTopLeftRadius',
      'borderTopRightRadius' ,
      'borderBottomRightRadius',
      'borderBottomLeftRadius'
    ];
    for (let outKey in s) {
      for (let innerKey in s[outKey]) {
        if (
          list.includes(innerKey) &&
          typeof s[outKey][innerKey] === 'number'
        ) {
          s[outKey][innerKey] = px2dp(s[outKey][innerKey]);
        }
      }
    }
    return StyleSheet.create(s);
  },
};
export default MyStyleSheet;
