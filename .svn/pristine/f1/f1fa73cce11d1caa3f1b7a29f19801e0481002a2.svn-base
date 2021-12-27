import { scaleSizeH, scaleSizeW, setSpText } from '@/utils/index';
import React from 'react';
import { StyleProp, StyleSheet, TextProps, ViewProps } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Divider from '../Divider';

interface frame{
  width:number; height:number; top:number; left:number; right:number;
}

interface ModalDropdownProps {
  options: Array<any> | undefined;
  onSelect: (index: number, value: any) => void;
  dropdownTextStyle?: StyleProp<TextProps>;
  dropdownTextHighlightStyle?: StyleProp<TextProps>;
  dropdownStyle?: StyleProp<ViewProps>;
  adjustFrame?: (frameValue: frame) => frame;
  renderRow?: (option: any, index: string, isSelected: boolean) => React.ReactNode;
}

const MyModalDropdown=(props:ModalDropdownProps)=>{
  const {children, options, onSelect,dropdownTextStyle,dropdownTextHighlightStyle,dropdownStyle,adjustFrame,renderRow} = props;
  return (
      <ModalDropdown
          options={options}
          onSelect={onSelect}
          dropdownTextStyle={[
            styles.dropdownTextStyle,
            dropdownTextStyle,
          ]}
          dropdownTextHighlightStyle={
            [styles.dropdownTextHighlightStyle,dropdownTextHighlightStyle]
          }
          dropdownStyle={[
            styles.dropdownStyle,
            dropdownStyle,
          ]}
          adjustFrame={adjustFrame}
          renderSeparator={()=><Divider/>}
          showsVerticalScrollIndicator
          renderRow={renderRow}
      >
        {children}
      </ModalDropdown>
  );
}

const styles = StyleSheet.create({
  dropdownTextStyle: {
    fontSize: setSpText(13),
    lineHeight: scaleSizeH(20),
    textAlign: 'center',
    color: '#333'
  },
  dropdownTextHighlightStyle: {
    lineHeight: scaleSizeH(20),
    textAlign: 'center',
    color: '#fff',
    fontSize: setSpText(15),
    backgroundColor: '#1890ff',
  },
  dropdownStyle: {
    flex: 1,
    borderRadius: scaleSizeW(4),
    borderWidth: 1,
    borderColor: '#999',
    width: scaleSizeW(60),
  },
})

MyModalDropdown.defaultProps = {
  adjustFrame: (obj) => obj
}

export default MyModalDropdown;
