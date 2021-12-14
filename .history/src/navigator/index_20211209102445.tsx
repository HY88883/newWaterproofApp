import MyStyleSheet from '@/utils/CustomStyleSheet';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {navigationRef} from '@/config/RootNavigation';

import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Navigator = (props) => {
    let Stack = createStackNavigator();

  return (
    <NavigationContainer ref={navigationRef}>
         <Stack.Navigator
             headerMode="float"
             screenOptions={{
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
          
      </Stack.Navigator>
        </NavigationContainer>
  );
};

export default Navigator;

const styles = MyStyleSheet.create({
  container: {}
});
