import MyStyleSheet from '@/utils/CustomStyleSheet';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Navigator = (props) => {
  return (
    <View style={styles.container}>
      <Text>Navigator</Text>
    </View>
  );
};

export default Navigator;

const styles = MyStyleSheet.create({
  container: {}
});
