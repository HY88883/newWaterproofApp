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
        
        </NavigationContainer>
  );
};

export default Navigator;

const styles = MyStyleSheet.create({
  container: {}
});
