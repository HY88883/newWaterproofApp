import usePageHeaderTitle from '@/components/hooks/usePageHeaderTitle';
import Touchable from '@/components/Touchable/Touchable';
import { getCurrentUser } from '@/config/authority';
import { viewportWidth } from '@/utils/';
import { px2dp } from '@/utils/';
import Func from '@/utils/Func';
import { Carousel } from '@ant-design/react-native';
import  React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

const optionList=[{name:'daibanshiwu',title:'物料申请'},{name:'baojiadan',title:'费用报销'},{name:'jixiaoguanli',title:'施工记录'},
{name:'weituodan',title:'物料签收'},
];

const workList=[{name:'daibanshiwu',title:'本月累计工时'},{name:'baojiadan',title:'本月累计施工面积'},{name:'jixiaoguanli',title:'添加上工'},
];

const Home = (props) => {
    const {navigation}=props;
    usePageHeaderTitle(navigation,'',{headerShown:false});
  const dispatch =useDispatch();
  const {constructionRecord:{ConstructionSummary,constructionRecordList:{list}}}=useSelector(state=>({
    constructionRecord:state.constructionRecord
  }));
const userRef=useRef({});
  useEffect(()=>{
    getConstructionSummary();
   let ref= navigation.addListener('focus',()=>{
      getConstructionSummary();
    });
    return ()=>{
      ref&&ref();
    };
  },[]);
 

  const getConstructionSummary = async () => {
    const user = await getCurrentUser();
    userRef.current=user;
    console.log('====================================');
    console.log('user',user);
    console.log('====================================');
    dispatch({
      type: 'constructionRecord/page',
      payload: {
        size: 99,
        teamId: user.deptId,
        date:Func.dateFormat('YYYY-MM-DD',new Date())
      }
    });
    dispatch({
      type: 'constructionRecord/getConstructionSummary',
    });
  };

const  onHorizontalSelectedIndexChange=(index)=> {
  /* tslint:disable: no-console */
  // console.log('vertical change to', index);
};

function showInfo(title){
  if(title==='本月累计工时')return `${ConstructionSummary.thisMonthWorkingHours===-1?0:ConstructionSummary.thisMonthWorkingHours}H`;
  else if(title==='本月累计施工面积')return `${ConstructionSummary.thisMonthConstructionArea===-1?0:ConstructionSummary.thisMonthConstructionArea}m²`;
  else return ConstructionSummary.workRecordId !== -1 ? '下工' : '上工';
}

  function showStyle(title){
    if(title.indexOf('工时')!==-1)return styles.rVeiew;
        else if(title.indexOf('面积')!==-1)return styles.rShiVeiew;
else return styles.rShangVeiew;
  }

  return (
    <View style={styles.container}>
      <View style={styles.ceng}/>
         <LinearGradient colors={['#44BDFF', '#246DDE']} style={styles.liner}>
          <View style={styles.header}>
            <View style={styles.leftView}> 
                <View style={styles.images}>

                </View>
                <View style={{marginLeft:px2dp(13)}}>
                      <View style={{marginTop:px2dp(12),marginBottom:px2dp(5)}}>
                        <Text style={styles.one}>{userRef.current.realName}{'  '}
                        <Text style={styles.two}>施工队</Text>
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.three}>{userRef.current.deptName}</Text>
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
        optionList&&optionList.map((item,_i)=>(
        <View key={item.title} style={{alignItems:'center'}}>
          <View style={styles.imgs}></View>
          <Text>{item.title}</Text>
        </View>
        ))
      }
      </View>
      <View style={styles.ben}>
        {
          workList&&workList.length>0&&workList.map((item,_i)=>(
            <View style={styles.itemStyle} key={item.title}>
              <Text style={styles.lei}>{item.title}</Text>
              <View style={styles.bView}>
                <View/>
                <View style={showStyle(item.title)}>
                  <Text style={item.title.indexOf('添加')!==-1?styles.shang:styles.infox}>{showInfo(item.title)}</Text>
                </View>
              </View>
            </View>
          ))
        }
      </View>

      <View style={styles.listView}>
        <View style={styles.listViewheader}>
          <View>
            <View/>
            <Text style={styles.shi}>施工日志</Text>
            <View/>
          </View>
          <View>
            <Text style={styles.geng}>更多</Text>
            <View/>
          </View>
        </View>
         <ScrollView style={styles.list}>
         {
            list&&list.length>0&&list.map((item,_i)=>(
              <View style={styles.itemxx} key={item.id}>
              <View>
                <View style={{marginBottom:px2dp(10)}}><Text style={styles.biao}>{item.projectName}</Text></View>
                <View style={{flexDirection:'row',alignItems: 'center'}}>
                  <Text style={[styles.leftText]}>工作内容：</Text>
                  <Text style={[styles.leftText,{color:'#E6C229'}]}>{item.projectName}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems: 'center'}}>
                <Text style={styles.leftText}>完成面积：</Text>
                  <Text style={[styles.leftText,{color:'#D62828'}]}>{item.area}m²</Text>
                  </View>
              </View>
    
              <View style={{alignItems: 'flex-end'}}>
                  <View style={{marginBottom:px2dp(10)}}><Text style={styles.leftText}>{item.recordingTime}</Text></View>
                  <Touchable >
                  <LinearGradient colors={['#44BDFF', '#246DDE']} style={styles.tbtn}>
                <Text style={styles.buttonText}>
                查看详情
      </Text>
      </LinearGradient>
                  </Touchable>
              </View>
            </View>
            ))
          }
         </ScrollView>
      
      </View>
    </View>
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
    overflow: 'hidden',
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
    backgroundColor:'blue',
    marginBottom:8
  },
  ben:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginHorizontal:20,
  },
  itemStyle:{
    backgroundColor:'#DFEFFB',
    flex: 1,
    borderRadius:10,
    marginHorizontal:4,
    paddingLeft:10,
    height:64,
    paddingTop:8
  },
  lei:{
fontSize: 9,
color: '#495057'
  },
  bView:{
    marginTop:8,
  },
  rVeiew:{
    width: 54,
height: 16,
backgroundColor: '#08B9A2',
borderRadius: 8,
overflow: 'hidden'
  },
  rShiVeiew:{
    width: 54,
height: 16,
backgroundColor: '#F17105',
borderRadius: 8,
overflow: 'hidden'
  },
  rShangVeiew:{
    width: 64,
height: 29,
backgroundColor: '#246DDE',
borderRadius: 16,
overflow: 'hidden'
  },
  infox:{
fontSize: 11,
color: '#FFFFFF',
textAlign:'center',
lineHeight:16
  },
  listView:{
    backgroundColor:'#fff',
    flex: 1,
    marginVertical:12,
    paddingHorizontal:24
  },
  listViewheader:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingVertical:12,
    borderBottomColor:'#E9ECEF',
    borderBottomWidth:1
  },
  shi:{
fontSize: 21,
color: '#121212',
fontFamily: 'KaiTi'
  },
  geng:{
fontSize: 13,
color: '#1890FF'
  },
  itemxx:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical:12,
    borderTopColor:'#E9ECEF',
    borderTopWidth:1
  },
  tbtn:{
    width: 54,
height: 16,
borderRadius: 8,
overflow: 'hidden'
  },
  buttonText:{
fontSize: 8,
fontFamily: 'Adobe Heiti Std',
color: '#FFFFFF',
lineHeight:15,
textAlign: 'center'
  },
  shang:{
fontSize: 15,
fontFamily: 'Adobe Heiti Std',
color: '#FFFFFF',
lineHeight:28,
textAlign: 'center'
  },
  biao:{
    fontSize: 13,
fontFamily: 'Adobe Heiti Std',
color: '#3E3E3E'
  },
  leftText:{
    fontSize: 12,
    fontFamily: 'Adobe Heiti Std',
    color: '#575757'
  },
  list:{
    flex: 1,
  },
  ceng:{
    position:'absolute',
    zIndex:-1,
    top:0,
    left:0,
    right:0,
    width:'100%',
    height:'50%',
    backgroundColor:'red'
  }
});
