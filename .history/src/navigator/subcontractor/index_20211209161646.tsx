import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Platform, BackHandler, ToastAndroid } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { customStyles } from '@/utils/styles';
import Home from '../../pages/subcontractor/home';
import Classroom from '../../pages/subcontractor/classroom';
import Mine from '../../pages/subcontractor/mine';
import { useNavigationState } from '@react-navigation/native';

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
    const routesContent = useNavigationState(state => state.routes);
    console.log('routesContent',JSON.stringify(routesContent));
    useEffect(() =>{
      if (Platform.OS === 'android'){
        BackHandler.addEventListener('hardwareBackPress', onBackAndroid);
    }   
    return ()=>{
      if (Platform.OS === 'android'){
        BackHandler.removeEventListener('hardwareBackPress', onBackAndroid);
    } 
    }; 
    },[]);

    useEffect(() =>{
      setOptions();
    },[routesContent]);

const onBackAndroid = () => {
  //禁用返回键
  if(navigation.isFocused()) {//判断   该页面是否处于聚焦状态
      if (lastBackPressed.current && lastBackPressed.current + 2000 >= Date.now()) {
          BackHandler.exitApp();//直接退出APP
      }else{
          lastBackPressed.current = Date.now();
          ToastAndroid.show('再按一次退出应用', 1000);//提示
          return true;
      }
  }
};

    const setOptions = () => {
        const routeName = routesContent.state
        ? routesContent.state.routes[routesContent.state.index].name
        : routesContent.params?.screen || 'Classroom';
        console.log('====================================');
        console.log('fw==',routeName);
        console.log('====================================');
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
    <Tab.Navigator
        screenOptions={{
          activeTintColor: '#0066FF',
            inactiveTintColor:'#333',
            style:{alignItems: 'center',justifyContent:'center'}
        }}
      >
          <Tab.Screen
              name="Home"
              component={Home}
              options={{
            tabBarLabel: (params)=><Text style={[customStyles.text,{color:params.color}]}>主页</Text>,
            // tabBarIcon: ({color, size}) => (
            //   // <IconFont name="zhuye" color={color} size={size} />
            // ),
          }}
        />
          <Tab.Screen
              name="Classroom"
              component={Classroom}
              options={{
                  tabBarLabel: (params)=><Text style={[customStyles.text,{color:params.color}]}>施工课堂</Text>,
                  // tabBarIcon: ({color, size}) => (
                  //     // <IconFont name="ketang" color={color} size={size} />
                  // ),
              }}
          />
      

          <Tab.Screen
              name="Mine"
              component={Mine}
              options={{
                  tabBarLabel: (params)=><Text style={[customStyles.text,{color:params.color}]}>我的</Text>,
                  // tabBarIcon: ({color, size}) => (
                  //     // <IconFont name="iconfontwo" color={color} size={size} />
                  // ),
              }}
          />

      </Tab.Navigator>
  );
};

export default SubcontractorBottomTabs;

const styles = StyleSheet.create({
  container: {}
});
