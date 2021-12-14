import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
// import GiftedListView from 'react-native-gifted-listview';

const ConstructionLog = (props) => {

 
  return (
    <View style={styles.container}>
        <View>
            <View>
                <Text>成果照片</Text>
                
            </View>
        </View>
  </View>
  );
};

export default ConstructionLog;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
      },
      navBar: {
        height: 64,
        backgroundColor: '#CCC'
      },
      row: {
        padding: 10,
        height: 44,
      },
});
