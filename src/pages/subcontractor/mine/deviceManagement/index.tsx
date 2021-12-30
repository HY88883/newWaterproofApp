import Touchable from '@/components/Touchable/Touchable';
import {getCurrentUser} from '@/config/authority';
import {px2dp} from '@/utils/';
import React, {useEffect, useRef} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view';
import MyStyleSheet from '@/utils/CustomStyleSheet';
import Func from '@/utils/Func';
import Config from 'react-native-config';
import moment from 'moment';
import IconFont from '@/assets/svgs';

const DeviceManagement = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const userRef = useRef(null);
  const userTypeObj = useRef({});

  const {
    equipment: {
      equipmentList: {pagination, list},
      refreshState,
    },
  } = useSelector(state => ({
    equipment: state.equipment,
  }));

  useEffect(() => {
    const aRequest=async () => {
      userRef.current = await getCurrentUser();
      if (Func.ifubcontractor) {
        userTypeObj.current.ownershipId = userRef.current.deptId;
        navigation.setOptions({
          headerRight: () => (
            <Touchable onPress={() => {
                navigation.navigate('DeviceAdd');
            }}>
              <IconFont name="tianjia1" style={{marginRight:px2dp(12)}}/>
            </Touchable>
          ),
        });
      } else {
        userTypeObj.current.rightToUseId = userRef.current.deptId;
      }
      onHeaderRefresh();
    };
    aRequest();
   const list= navigation.addListener('focus',()=>{
    aRequest();
    });
    return () => {
      list&&list();
      dispatch({
        type: 'equipment/setState',
        payload: {
          equipmentList: {
            list: [],
            pagination: {
              total: 0,
              current: 0,
              pageSize: 0,
              pages: 0,
            },
          },
        },
      });
    };
  }, []);

  const handleViewDetail=(id)=>{
    navigation.navigate('DeviceView',{id});
};
  const renderItem = ({item, index}) => {
    return (
      <View
          style={styles.renderItem}>
             <Image
                 resizeMode={'contain'}
                 source={require('@/assets/images/luosi.png')}
                 style={styles.imgsxff}
        />
           {/* <Touchable onPress={() =>{
          navigation.navigate('DeviceRollout',{id:item.id});
        }}>

        </Touchable> */}
          <Text style={styles.statusText}>转出</Text>
        <Touchable  onPress={() =>{
          navigation.navigate('DeviceRollout',{id:item.id});
        }} style={{zIndex:10}}>
        <Image
            resizeMode={'contain'}
            source={require('@/assets/images/zhuanchu.png')}
            style={styles.imgsxffx}
        />
        </Touchable>
          <View style={{flexDirection:'row',alignItems: 'center'}}>
          <Image
              resizeMode={'contain'}
              source={require('@/assets/images/leftbj.png')}
              style={styles.imgs}
        /> 
        <Image
            resizeMode={'contain'}
            source={require('@/assets/images/beijin.png')}
            style={styles.imgsx}
        />
          </View>
          

        {/* <View style={styles.status}></View> */}
     
        {/* </Touchable> */}
        <View style={{flexDirection: 'row', alignItems: 'center',position: 'absolute',left:px2dp(40),top:px2dp(40)}}>
          <View>
            {item.photosAttach.name ? (
              <Image
                  resizeMode={'cover'}
                  source={{uri: `${Config.FILE_URL}${item.photosAttach.name}`}}
                  style={styles.photoStyle}
              />
            ) : <View style={[styles.photoStyle,{backgroundColor:'#eee'}]} />}
          </View>
          <View style={{marginLeft:px2dp(70)}}>
            <View style={{marginBottom: px2dp(10),marginTop: px2dp(-40),marginLeft:px2dp(-30)}}>
              <Text style={styles.biao}>{item.name}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.leftText]}>设备编号：</Text>
              <Text style={[styles.leftText, {color: '#fff'}]}>
                {item.code}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.leftText}>设备分类：</Text>
              <Text style={[styles.leftText, {color: '#fff'}]}>
                {item.model}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.leftText}>采购日期：</Text>
              <Text style={[styles.leftText, {color: '#fff'}]}>
                {moment(item.purchasingDate).format('YYYY年MM月DD日')}
              </Text>
            </View>

         <Touchable style={{position: 'relative'}}
             onPress={() => handleViewDetail(item.id)}
        
         >
         <Image
             resizeMode={'contain'}
             source={require('@/assets/images/btn.png')}
             style={styles.imgsxxxx}
        /> 
        <Text style={styles.cha}>查看详情</Text>
         </Touchable>
          </View>
        </View>
      </View>
    );
  };

  function onHeaderRefresh() {
    dispatch({
      type: 'equipment/page',
      payload: {
        current: 1,
        size: 10,
        ...userTypeObj.current,
      },
    });
  }

  function onFooterRefresh() {
    dispatch({
      type: 'equipment/page',
      payload: {
        current: pagination.current + 1,
        size: 10,
        hasMore: true,
        ...userTypeObj.current,
      },
    });
  }

  return (
    <View style={styles.container}>
      <RefreshListView
          refreshState={refreshState}
          data={list}
          keyExtractor={item => item.id}
          onHeaderRefresh={onHeaderRefresh}
          onFooterRefresh={onFooterRefresh}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
          <View style={{height: px2dp(12), backgroundColor: '#f9f9f9'}} />
        )}
      />
    </View>
  );
};

export default DeviceManagement;

const styles = MyStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  navBar: {
    height: 64,
    backgroundColor: '#CCC',
  },
  row: {
    padding: 10,
    height: 44,
  },
  renderItem: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingLeft: 12,
  },
  biao: {
    fontSize: 19,
    fontFamily: 'SimHei',
    color: '#fff',
  },
  leftText: {
    fontSize: 12,
    fontFamily: 'Adobe Heiti Std',
    color: '#fff',
  },
  status: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 0,
    height: 0,
    borderWidth: 32,
    borderTopColor: '#F77F00',
    borderRightColor: '#F77F00',
    borderLeftColor: '#fff',
    borderBottomColor: '#fff',
    zIndex: -1,
  },
  statusText: {
    position: 'absolute',
    fontSize: 15,
    fontFamily: 'Adobe Heiti Std',
    color: '#fff',
    right: '10%',
    top:'21%',
    // transform: [{rotateZ: '90deg'}],
    zIndex: 20,
    width: 15
  },
  statusView: {
    position: 'absolute',
    top: 12,
    right: 0,
  },
  photoStyle: {
    width: 43,
    height: 104,
    overflow: 'hidden',
    borderRadius: 8,
  },
  imgs:{
    width:176,
    height:134 
  },
  imgsx:{
    width:261,
    height:155,
    left:-90
  },
  imgsxxxx:{
    width: 90,
height: 29,
borderRadius: 15,
overflow: 'hidden',
left: 40,
top:30
  },
  cha:{
fontSize: 15,
color: '#FFFFFF',
textAlign: 'center',
position: 'absolute',
left:54,
top:32
  },
  imgsxff:{
    width: 13,
height: 12,
position: 'absolute',
top:'54%',
left:20,
zIndex:10
  },
  imgsxffx:{
    width: 24,
    height: 62,
    position: 'absolute',
    top:'5%',
    right:30,
    zIndex:10
  },
  tianjia1:{
    width:19,
    height:19
  }
});
