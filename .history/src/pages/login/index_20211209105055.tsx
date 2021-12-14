import { viewportWidth } from '@/utils/';
import MyStyleSheet from '@/utils/CustomStyleSheet';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Login = (props) => {
    console.log(viewportWidth);
  return (
    <View style={styles.container}>
            <View style={styles.imgs}/>
            <View></View>
    </View>
  );
};

export default Login;

const styles = MyStyleSheet.create({
  container: {
      flex: 1,
      backgroundColor:'#fff',
      alignItems:'center'
  },
  imgs:{
      width:280,
      height:329,
      marginTop:202,
      backgroundColor:'red'
  }
});
