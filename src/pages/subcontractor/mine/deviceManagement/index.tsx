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
              <Text style={[{color: '#333'}]}>添加</Text>
            </Touchable>
          ),
        });
      } else {
        userTypeObj.current.rightToUseId = userRef.current.deptId;
      }
      onHeaderRefresh();
    };
    aRequest();
    navigation.addListener('focus',()=>{
    aRequest();
    });
    return () => {
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
      <Touchable
          onPress={() => handleViewDetail(item.id)}
          style={styles.renderItem}>
        <View style={styles.status}></View>
        <Touchable style={styles.statusView} onPress={() =>{
          navigation.navigate('DeviceRollout',{id:item.id});
        }}>
          <Text style={styles.statusText}>转出</Text>
        </Touchable>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            {item.photosAttach.name ? (
              <Image
                  source={{uri: `${Config.FILE_URL}${item.photosAttach.name}`}}
                  style={styles.photoStyle}
              />
            ) : null}
          </View>
          <View style={{marginLeft:px2dp(12)}}>
            <View style={{marginBottom: px2dp(10)}}>
              <Text style={styles.biao}>{item.name}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.leftText]}>设备编号：</Text>
              <Text style={[styles.leftText, {color: '#E6C229'}]}>
                {item.code}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.leftText}>设备分类：</Text>
              <Text style={[styles.leftText, {color: '#D62828'}]}>
                {item.model}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.leftText}>采购日期：</Text>
              <Text style={[styles.leftText, {color: '#D62828'}]}>
                {item.purchasingDate}
              </Text>
            </View>
          </View>
        </View>
      </Touchable>
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
    color: '#212529',
  },
  leftText: {
    fontSize: 12,
    fontFamily: 'Adobe Heiti Std',
    color: '#575757',
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
    fontSize: 13,
    fontFamily: 'Adobe Heiti Std',
    color: '#fff',
    transform: [{rotateZ: '45deg'}],
  },
  statusView: {
    position: 'absolute',
    top: 12,
    right: 0,
  },
  photoStyle: {
    width: 60,
    height: 60,
    overflow: 'hidden',
    borderRadius: 30,
  },
});
