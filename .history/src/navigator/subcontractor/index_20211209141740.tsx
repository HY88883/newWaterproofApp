import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Platform, BackHandler } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function getHeaderTitle(routeName) {
    switch (routeName) {
      case 'Classroom':
        return '施工课堂';
        case 'Mine':
            return '我的';
      default:
        return '施工课堂';
    }
  }

const SubcontractorBottomTabs = (props) => {
    const {navigation, route} = props;

    const lastBackPressed=useRef('');

    useEffect(() =>{
      if (Platform.OS === 'android'){
        BackHandler.addEventListener('hardwareBackPress', onBackAndroid);
    }    
    },[]);

const onBackAndroid = () => {
  //禁用返回键
  if(this.props.navigation.isFocused()) {//判断   该页面是否处于聚焦状态
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
          //最近2秒内按过back键，可以退出应用。
          // return false;
          BackHandler.exitApp();//直接退出APP
      }else{
          this.lastBackPressed = Date.now();
          ToastAndroid.show('再按一次退出应用', 1000);//提示
          return true;
      }
  }
};

    const setOptions = () => {
        // console.log(JSON.stringify(this.props.route))
        const routeName = route.state
        ? route.state.routes[route.state.index].name
        : route.params?.screen || 'Classroom';
        if(routeName === 'Home') {
          navigation.setOptions({
            headerTransparent: true,
            headerTitle: '',
          });
        } else {
          navigation.setOptions({
            headerTransparent: false,
            headerTitle: getHeaderTitle(routeName),
          });
        }
      };
  return (
    <View style={styles.container}>
      <Text>SubcontractorBottomTabs</Text>
    </View>
  );
};

export default SubcontractorBottomTabs;

const styles = StyleSheet.create({
  container: {}
});
