import { px2dp } from '@/utils/';
import { viewportWidth } from '@/utils/';
import MyStyleSheet from '@/utils/CustomStyleSheet';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Login = (props) => {
    console.log(viewportWidth);
  return (
    <View style={styles.container}>
            <View style={styles.imgs}/>
            <View style={{marginTop:px2dp(12)}}><Text style={styles.title}>固泽基建</Text></View>
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
      width:145,
      height:171,
      marginTop:105,
      backgroundColor:'red'
  },
  title:{
    fontSize: 25,
    fontWeight: '900',
    color: '#3C85FF',
  }
});
