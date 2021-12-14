import usePageHeaderTitle from '@/components/hooks/usePageHeaderTitle';
import  React, { useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Home = (props) => {
    const {navigation}=props;
    usePageHeaderTitle(navigation,'',{headerShown:false});

  return (
    <ScrollView style={styles.container}>
         <LinearGradient colors={['#44BDFF', '#246DDE']} style={styles.liner}>
          <View style={styles.header}>
            <View style={styles.leftView}> 
                <View style={styles.images}>

                </View>
                <View>
                      <View>
                        <Text>立</Text>
                        <Text>纷纷</Text>
                      </View>
                      <View>
                        <Text>件</Text>
                      </View>
                </View>
            </View>
            <View>
              xx
            </View>
            </View>  
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
    width:'100%',
    height:200,
    borderBottomLeftRadius:110,
    borderBottomRightRadius:110,
    overflow: 'hidden'
    
  },
  header:{
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  leftView:{
    flexDirection:'row',
  },
  images:{
    width: 63,
height: 63,
borderRadius:31.5,
  backgroundColor:'#f9f9f9'
  }
});
