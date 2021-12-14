import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import {Provider as ReduxProvider} from 'react-redux';
import MyStyleSheet from './utils/CustomStyleSheet';
import store from '@/config/dva';
import {Provider} from '@ant-design/react-native';
import Navigator from '@/navigator/index';

export default function App({params}) {
  return (
    <ReduxProvider store={store}>
                <Provider>
       <StatusBar
           backgroundColor="transparent"
           barStyle="dark-content"
           translucent
                />
                  <View style={styles.totalview}>
                    <Navigator/>
                </View>
                </Provider>
</ReduxProvider>
  );
}

const styles = MyStyleSheet.create({
  totalview: {
    flex: 1,
    // paddingBottom: getBottomSpace()
  },
});

