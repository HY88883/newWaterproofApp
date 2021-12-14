import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {Provider as ReduxProvider} from 'react-redux';

enableScreens()
export default function App({params}) {
  return (
    <ReduxProvider store={store}>
       <StatusBar
                    backgroundColor="transparent"
                    barStyle="dark-content"
                    translucent
                />
                  <View style={styles.totalview}>
                    {isInitGeo?<Navigator />:<></>}
                </View>
</ReduxProvider>
  );
}
