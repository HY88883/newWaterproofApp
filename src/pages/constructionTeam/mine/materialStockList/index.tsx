import Touchable from '@/components/Touchable/Touchable';
import {getCurrentUser} from '@/config/authority';
import {px2dp} from '@/utils/';
import Func from '@/utils/Func';
import React, {useEffect, useRef} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';

const MaterialStockList = props => {
  const {navigation,route:{params}} = props;
  const dispatch = useDispatch();
  const userRef = useRef({});
  const {
    materialStock: {
      materialStockList: {pagination, list},
    refreshState,
    },
  } = useSelector(state => ({
    materialStock: state.materialStock,
  }));

  useEffect(() => {
    const request = async () => {
      userRef.current = await getCurrentUser();
        onHeaderRefresh();
    };
    request();
    // const listener=navigation.addListener('focus',()=>{

    // })
  }, []);

  const handleViewDetail = id => {
    // navigation.navigate('ConstructionLog', {id});
  };

  const renderItem = ({item, index}) => {
    return (
      <Touchable
          onPress={() => handleViewDetail(item.id)}
          style={styles.renderItem}>
        {/* <View style={styles.status}></View>
        <View style={styles.statusView}>
          <Text style={styles.statusText}>{item.name}</Text>
        </View> */}
        <View>
          <View style={{marginBottom: px2dp(10)}}>
            <Text style={styles.biao}>{item.name}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[styles.leftText]}>单位：</Text>
            <Text style={[styles.leftText, {color: '#E6C229'}]}>
            {item.unit}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.leftText}>数量：</Text>
            <Text style={[styles.leftText, {color: '#D62828'}]}>
            {item.number===-1?0:Number(item.number).toFixed(0)}
            </Text>
          </View>
        </View>
      </Touchable>
    );
  };

  function onHeaderRefresh() {
    dispatch({
      type: 'materialStock/page',
      payload: params&&params.id?{
        current: 1,
        size: 10,
        projectId:params.id
      }:{
        current: 1,
        size: 10,
        teamId: userRef.current.deptId,
      },
    });
  }

  function onFooterRefresh() {
    dispatch({
      type: 'materialStock/page',
      payload: params&&params.id?{
        current: pagination.current + 1,
        size: 10,
        hasMore: true,
        projectId:params.id
      }:{
        current: pagination.current + 1,
        size: 10,
        teamId: userRef.current.deptId,
        hasMore: true,
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

export default MaterialStockList;

const styles = StyleSheet.create({
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
});
