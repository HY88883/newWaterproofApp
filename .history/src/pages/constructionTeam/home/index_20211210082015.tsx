import usePageHeaderTitle from '@/components/hooks/usePageHeaderTitle';
import Touchable from '@/components/Touchable/Touchable';
import { viewportWidth } from '@/utils/';
import { px2dp } from '@/utils/';
import { Carousel } from '@ant-design/react-native';
import  React, { useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const list=[{name:'daibanshiwu',title:'物料申请'},{name:'baojiadan',title:'费用报销'},{name:'jixiaoguanli',title:'施工记录'},
{name:'weituodan',title:'物料签收'},
];


const Home = (props) => {
    const {navigation}=props;
    usePageHeaderTitle(navigation,'',{headerShown:false});

const  onHorizontalSelectedIndexChange=(index)=> {
  /* tslint:disable: no-console */
  // console.log('vertical change to', index);
};

  return (
    <ScrollView style={styles.container}>
         <LinearGradient colors={['#44BDFF', '#246DDE']} style={styles.liner}>
          <View style={styles.header}>
            <View style={styles.leftView}> 
                <View style={styles.images}>

                </View>
                <View style={{marginLeft:px2dp(13)}}>
                      <View style={{marginTop:px2dp(12),marginBottom:px2dp(5)}}>
                        <Text style={styles.one}>立{'  '}
                        <Text style={styles.two}>纷纷</Text>
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.three}>件</Text>
                      </View>
                </View>
            </View>
            <View>
            <Text>xxx</Text>
            </View>
            </View>  
    </LinearGradient>
   <View style={styles.viewContainer}>
   <Carousel
       style={styles.wrapper}
       selectedIndex={2}
       autoplay
       infinite
       afterChange={onHorizontalSelectedIndexChange}
          >
            <View
                style={[styles.containerHorizontal, { backgroundColor: 'red' }]}
            >
            </View>
            <View
                style={[styles.containerHorizontal, { backgroundColor: 'blue' }]}
            >
            </View>
          </Carousel>
   </View>
   <View style={styles.info}>
      {
        list&&list.map((item,_i)=>(
        <View key={item.title}>
          <View style={styles.imgs}></View>
          <Text>{item.title}</Text>
        </View>
        ))
      }
      </View>
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
    justifyContent: 'space-between',
    marginTop:50,
    marginHorizontal:24
  },
  leftView:{
    flexDirection:'row',
  },
  images:{
    width: 63,
height: 63,
borderRadius:31.5,
  backgroundColor:'#f9f9f9',
  },
  one:{
    fontSize: 18,
color: '#FFFFFF'
  },
  two:{
    fontSize: 12,
color: '#FFEC51'
  },
  three:{
    fontSize: 13,
    color: '#FFFFFF'
  },
  wrapper: {
    width:viewportWidth-48,
    height:100,
    borderRadius:10,
    overflow: 'hidden'
    // marginTop:-100,
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  containerVertical: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  text: {
    color: '#fff',
    fontSize: 36,
  },
  viewContainer:{
    // position:'absolute',
    marginTop:-50,
    alignSelf:'center',
    overflow: 'hidden',
    borderRadius:10,
  },
  info:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginHorizontal:24,
    marginVertical:14
  },
  imgs:{
    width:36,
    height:36,
    borderRadius:18,
    overflow:'hidden',
    backgroundColor:'blue'
  }
});
