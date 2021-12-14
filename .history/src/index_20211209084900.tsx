import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {Provider as ReduxProvider} from 'react-redux';
import MyStyleSheet from './utils/CustomStyleSheet';
import store from '@/config/dva';

enableScreens();
export default function App({params}) {
  return (
    <ReduxProvider store={store}>
       <StatusBar
           backgroundColor="transparent"
           barStyle="dark-content"
           translucent
                />
                  <View style={styles.totalview}>
                    xxx
                </View>
</ReduxProvider>
  );
}

const styles = MyStyleSheet.create({
  totalview: {
    flex: 1,
    // paddingBottom: getBottomSpace()
  },
});

