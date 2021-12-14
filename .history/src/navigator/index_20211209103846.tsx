import MyStyleSheet from '@/utils/CustomStyleSheet';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack';
import {navigationRef} from '@/config/RootNavigation';

import * as React from 'react';
import { Text, View, StyleSheet, Platform, StatusBar } from 'react-native';
import Login from '@/pages/login';

const Navigator = () => {
    let Stack = createStackNavigator();

  return (
    <NavigationContainer ref={navigationRef}>
         <Stack.Navigator
             screenOptions={{
             headerMode:'float',
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
              options={{headerTitle: '登录'}}
              component={Login}
                    />
      </Stack.Navigator>
        </NavigationContainer>
  );
};

export default Navigator;

const styles = MyStyleSheet.create({
  container: {}
});
