import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const SubcontractorBottomTabs = (props) => {
  return (
    <View style={styles.container}>
      <Text>SubcontractorBottomTabs</Text>
    </View>
  );
};

export default SubcontractorBottomTabs;

const styles = StyleSheet.create({
  container: {}
});
