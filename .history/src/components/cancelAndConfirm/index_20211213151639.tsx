import MyStyleSheet from '@/utils/CustomStyleSheet';
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const CancelAndConfirm = props => {
  const {leftText='取消', rightText='确定'} = props;

  return (
    <View style={styles.container}>
      <View style={styles.leftView}>
        <Text style={styles.leftText}>{leftText}</Text>
      </View>
      <View style={styles.rightView}>
        <Text style={styles.rightText}>{rightText}</Text>
      </View>
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
    borderColor: '#F77F00',
    borderRadius: 20,
    overflow: 'hidden',
  },
  leftText: {
    fontSize: 20,
    fontFamily: 'SimHei',
    color: '#246DDE',
    lineHeight:40
  },
  rightView: {
    width: 140,
    height: 40,
    borderWidth: 1,
    borderColor: '#246DDE',
    borderRadius: 20,
    overflow: 'hidden',
  },
  rightText:{
    fontSize: 20,
    fontFamily: 'SimHei',
    color: '#fff',
    lineHeight:40
  }
});
