import { px2dp } from '@/utils/';
import MyStyleSheet from '@/utils/CustomStyleSheet';
import  React, { useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


const TeammateDetail = (props) => {
  const {route:{params:{id:userId}}}=props;
  const dispatch = useDispatch();
  const {
    team: {
      teamMemberDetail
    },
  } = useSelector(state => ({
    team: state.team,
  }));
    useEffect(()=>{
      dispatch({
        type: 'team/teamMemberDetail',
        payload: {userId},
      });
    },[]);

  return (
    <ScrollView style={styles.container}>
      <View style={{marginVertical:px2dp(12),backgroundColor:'#fff',padding:px2dp(14)}}>
            <View>
              <Text style={styles.ji}>基本信息</Text>
            </View>
            
            <View style={[styles.kua,{marginBottom:px2dp(5)}]}>
              <Text style={styles.x}>姓名</Text>
              <Text style={styles.n}>xxx</Text>
            </View>

            <View style={styles.kua}>
              <Text style={styles.x}>姓名</Text>
              <Text style={styles.n}>xxx</Text>
            </View>

            <View style={styles.images}/>
      </View>

      <View style={{marginVertical:px2dp(12),backgroundColor:'#fff',padding:px2dp(14)}}>
            <View>
              <Text style={styles.ji}>身份证信息</Text>
            </View>
            
            <View style={[styles.kua,{marginBottom:px2dp(5)}]}>
              <Text style={styles.x}>身份证号码</Text>
              <Text style={styles.n}>xxx</Text>
            </View>
    <View style={styles.imagesvv}>
            <View style={styles.sh}/>
            <View style={styles.sh}/>
    </View>
      </View>

      <View style={{marginVertical:px2dp(12),backgroundColor:'#fff',padding:px2dp(14)}}>
            <View>
              <Text style={styles.ji}>银行卡信息</Text>
            </View>
            
            <View style={[styles.kua,{marginBottom:px2dp(5)}]}>
              <Text style={styles.x}>开户行</Text>
              <Text style={styles.n}>xxx</Text>
            </View>
            <View style={[styles.kua,{marginBottom:px2dp(5)}]}>
              <Text style={styles.x}>银行卡号码</Text>
              <Text style={styles.n}>xxx</Text>
            </View>
    <View style={styles.imagesvv}>
            <View style={styles.sh}/>
            <View style={styles.sh}/>
    </View>
      </View>

      <View style={{marginVertical:px2dp(12),backgroundColor:'#fff',padding:px2dp(14)}}>
            <View>
              <Text style={styles.ji}>保险凭证</Text>
            </View>
            
            <View style={[styles.kua,{marginBottom:px2dp(5)}]}>
              <Text style={styles.x}>身份证号码</Text>
              <Text style={styles.n}>xxx</Text>
            </View>
      </View>
    </ScrollView>
  );
};

export default TeammateDetail;

const styles = MyStyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#f9f9f9',
  },
  images:{
    width: 84,
height: 64,
borderRadius: 6,
overflow:'hidden',
backgroundColor:'red',
marginTop:6
  },
  ji:{
fontSize: 16,
fontFamily: 'SimHei',
color: '#495057'
  },
  kua:{
    width: 344,
borderWidth:StyleSheet.hairlineWidth,
borderColor:'#9E9E9E',
borderRadius:4,
flexDirection:'row',
justifyContent:'space-between',
alignItems:'center',
paddingHorizontal:16,
paddingVertical:14
  },
  x:{
fontSize: 17,
fontFamily: 'SimHei',
color: '#495057'
  },
  n:{
fontSize: 19,
fontFamily: 'SimHei',
color: '#212529'
  },
  sh:{
    width: 169,
height: 86,
backgroundColor: '#F8F9FA',
borderRadius: 6,
backgroundColor:'red'
  },
  imagesvv:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  }
});
