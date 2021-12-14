import MyStyleSheet from '@/utils/CustomStyleSheet';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const CancelAndConfirm = (props) => {
    const {leftText,rightText} = props;
    
  return (
    <View style={styles.container}>
        <View>
<Text>{leftText}</Text>
        </View>
        <View>
<Text>{rightText}</Text>
            </View>
    </View>
  );
};

export default CancelAndConfirm;

const styles = MyStyleSheet.create({
  container: {
      backgroundColor:'#fff',

  }
});
