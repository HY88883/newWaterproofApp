import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Platform, BackHandler, ToastAndroid } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { customStyles } from '@/utils/styles';
import { useNavigationState } from '@react-navigation/native';
import Mine from '@/pages/constructionTeam/mine';
import Classroom from '@/pages/constructionTeam/classroom';
import Home from '@/pages/constructionTeam/home';
import TeamMine from '@/pages/constructionTeam/mine';

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

const ConstructionTeamBottomTabs = (props) => {
    const {navigation, route} = props;
    
    const lastBackPressed=useRef('');
    // const routesContent = useNavigationState(state => state.routes);
    console.log('routesContent',navigation);
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

    // useEffect(() =>{
    //   setOptions();
    // },[routesContent]);

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

    // const setOptions = () => {
    //     const routeName = routesContent[0].state
    //     ? routesContent[0].state.routes[routesContent[0].state.index].name
    //     : routesContent[0].params?.screen || 'Home';
          
    //     if(routeName === 'Home') {
    //       navigation.setOptions({
    //        headerShown:false,
    //       });
    //     } else {
    //       navigation.setOptions({
    //         // headerTransparent: false,
    //         // headerTitle: getHeaderTitle(routeName),
    //       });
    //     }
    //   };
  return (
    <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#0066FF',
          tabBarInactiveTintColor:'#333',
          tabBarStyle:{alignItems: 'center',justifyContent:'center'}
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
              component={TeamMine}
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

export default ConstructionTeamBottomTabs;

const styles = StyleSheet.create({
  container: {}
});
