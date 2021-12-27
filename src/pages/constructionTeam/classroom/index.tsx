import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Classroom = (props) => {
  const {navigation}=props;
  useEffect(() =>{
    navigation.setOptions({
      headerTitle:'施工课堂'
    });
  });

  return (
    <View style={styles.container}>
      <Text>Classroom</Text>
    </View>
  );
};

export default Classroom;

const styles = StyleSheet.create({
  container: {}
});
