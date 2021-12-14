import MyStyleSheet from '@/utils/CustomStyleSheet';
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Touchable from '../Touchable/Touchable';

const CancelAndConfirm = props => {
  const {leftText='取消', rightText='确定',onLeftClick=()=>{},onRightClick=()=>{},style={},disabled} = props;

  return (
    <View style={[styles.container,style]}>
      <Touchable style={styles.leftView} onClick={onLeftClick} disabled={disabled}>
        <Text style={styles.leftText}>{leftText}</Text>
      </Touchable>
      <Touchable style={styles.rightView} onClick={onRightClick} disabled={disabled}>
        <Text style={styles.rightText}>{rightText}</Text>
      </Touchable>
    </View>
  );
};

export default CancelAndConfirm;

const styles = MyStyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  leftView: {
    width: 140,
    height: 40,
    borderWidth: 1,
    borderColor: '#44BDFF',
    borderRadius: 20,
    overflow: 'hidden',
  },
  leftText: {
    fontSize: 20,
    fontFamily: 'SimHei',
    color: '#246DDE',
    lineHeight:40,
    textAlign: 'center'
  },
  rightView: {
    width: 140,
    height: 40,
    borderWidth: 1,
    borderColor: '#246DDE',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor:'#246DDE'
  },
  rightText:{
    fontSize: 20,
    fontFamily: 'SimHei',
    color: '#fff',
    lineHeight:40,
    textAlign: 'center'
  }
});
