import usePageHeaderTitle from '@/components/hooks/usePageHeaderTitle';
import  React, { useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';

const Home = (props) => {
    console.log('props',props);
    const {navigation}=props;
    usePageHeaderTitle(navigation,'',{headerShown:false});

  return (
    <View style={styles.container}>
        
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {}
});
