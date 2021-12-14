import { px2dp } from '@/utils/';
import { viewportWidth } from '@/utils/';
import MyStyleSheet from '@/utils/CustomStyleSheet';
import { customStyles } from '@/utils/styles';
import * as React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';

const Login = (props) => {
    console.log(viewportWidth);
  return (
    <View style={styles.container}>
            <View style={styles.imgs}/>
            <View style={{marginTop:px2dp(12)}}><Text style={styles.title}>固泽机建</Text></View>
            <Controller
                control={control}
                name="hostJudge"
                defaultValue={{}}
                rules={{
              validate: () => handleConfirmSkuId('hostJudge')
            }}
                render={({field})=>(
                <TextInput 
                    style={customStyles.inputContainerStyle}
                    onChangeText={text => onChangeText(text)}
                    value={value}
            />
            )}
            />
            <TextInput
                style={customStyles.inputContainerStyle}
                onChangeText={text => onChangeText(text)}
                value={value}
            />
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
    fontSize: 19,
    fontWeight: '600',
    color: '#3C85FF',
  }
});
