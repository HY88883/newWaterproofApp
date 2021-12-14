import { px2dp } from '@/utils/';
import { viewportWidth } from '@/utils/';
import MyStyleSheet from '@/utils/CustomStyleSheet';
import { customStyles } from '@/utils/styles';
import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import LinearGradient from 'react-native-linear-gradient';


const Login = (props) => {
  const { control, handleSubmit, reset, getValues } = useForm();

  return (
    <View style={styles.container}>
            <View style={styles.imgs}/>
            <View style={{marginTop:px2dp(12)}}><Text style={styles.title}>固泽机建</Text></View>
            <Controller
                control={control}
                name="username"
                defaultValue={''}
                rules={{
              required: '请输入手机号码'
            }}
                render={({field})=>(
                <TextInput 
                    style={[customStyles.inputContainerStyle,{marginTop:px2dp(69),marginBottom:px2dp(10)}]}
                    onChangeText={field.onChange}
                    value={field.value}
                    placeholder="请输入手机号码"
            />
            )}
            />
           <Controller
               control={control}
               name="password"
               defaultValue={''}
               rules={{
              required: '请输入密码'
            }}
               render={({field})=>(
                <TextInput 
                    style={customStyles.inputContainerStyle}
                    onChangeText={field.onChange}
                    value={field.value}
                    secureTextEntry
                    placeholder="请输入密码"

            />
            )}
            />
           <TouchableOpacity >
           <LinearGradient colors={['#44BDFF', '#246DDE']} style={styles.liner}>
            <Text style={styles.buttonText}>
            登录
  </Text>
    </LinearGradient>
           </Toucha>
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
  },
  touch:{
    width: 295,
    height: 46,
    // backgroundColor linear-gradient(180deg, #44BDFF, #246DDE);
    borderRadius: 4
  },
  deng:{
    fontSize: 18,
    color: '#fff'
  },
  liner:{
    height:46,
    borderRadius: 5,
    width:295
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
