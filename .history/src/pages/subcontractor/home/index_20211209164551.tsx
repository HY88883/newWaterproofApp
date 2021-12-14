import usePageHeaderTitle from '@/components/hooks/usePageHeaderTitle';
import  React, { useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Home = (props) => {
    console.log('props',props);
    const {navigation}=props;
    usePageHeaderTitle(navigation,'',{headerShown:false});

  return (
    <View style={styles.container}>
         <LinearGradient colors={['#44BDFF', '#246DDE']} style={styles.liner}>
            <Text style={styles.buttonText}>
            登录
  </Text>
    </LinearGradient>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {}
});
