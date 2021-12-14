import MyStyleSheet from '@/utils/CustomStyleSheet';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import {navigationRef} from '@/config/RootNavigation';

import * as React from 'react';
import {Text, View, StyleSheet, Platform, StatusBar} from 'react-native';
import Login from '@/pages/login';
import ConstructionTeamBottomTabs from './constructionTeam';
import ConstructionLog from '@/pages/subcontractor/home/projectDetail/constructionLog';
import ConstructionRecordList from '@/pages/constructionTeam/home/ConstructionRecordList';
import ProjectManagement from '@/pages/subcontractor/mine/projectManagement';
import ConstructionTeamManagement from '@/pages/Subcontractor/Mine/ConstructionTeamManagement';

const Navigator = () => {
  let Stack = createStackNavigator();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
          screenOptions={{
          headerMode: 'float',
          headerTitleAlign: 'center',
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          ...Platform.select({
            android: {
              headerStatusBarHeight: StatusBar.currentHeight,
            },
          }),
          headerBackTitleVisible: false,
          headerTintColor: '#333',
          headerStyle: {
            ...Platform.select({
              android: {
                elevation: 0,
                borderBottomWidth: StyleSheet.hairlineWidth,
              },
            }),
          },
        }}>
        <Stack.Screen
            name="Login"
            options={{headerTitle: '', headerTransparent: true}}
            component={Login}
        />
        <Stack.Screen
            name="ConstructionTeamBottomTabs"
            options={{headerShown:false}}
            component={ConstructionTeamBottomTabs}
        />
        {/*ConstructionLog*/}
        <Stack.Screen
            name="ConstructionLog"
            options={{headerTitle: '施工日志查看'}}
            component={ConstructionLog}
        />
        {/*ConstructionRecordList*/}
        <Stack.Screen
            name="ConstructionRecordList"
            options={{headerTitle: '施工记录'}}
            component={ConstructionRecordList}
        />
         {/*ProjectManagement*/}
         <Stack.Screen
             name="ProjectManagement"
             options={{headerTitle: '项目列表'}}
             component={ProjectManagement}
                    />
                     {/*ConstructionTeamManagement*/}
                     <Stack.Screen
                         name="ConstructionTeamManagement"
                         options={{headerTitle: '施工队管理'}}
                         component={ConstructionTeamManagement}
                    />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

const styles = MyStyleSheet.create({
  container: {},
});
