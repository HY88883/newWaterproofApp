import usePageHeaderTitle from '@/components/hooks/usePageHeaderTitle';
import  React, { useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Home = (props) => {
    console.log('props',props);
    const {navigation}=props;
    usePageHeaderTitle(navigation,'',{headerShown:false});

  return (
    <ScrollView style={styles.container}>
         <LinearGradient colors={['#44BDFF', '#246DDE']} style={styles.liner}>
          
    </LinearGradient>
      <Text>Home</Text>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#f9f9f9'
  },
  liner:{
    width:'200%',
    height:200m
    
  }
});
