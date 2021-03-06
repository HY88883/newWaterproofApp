import {getCurrentUser} from '@/config/authority';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SegmentedView} from 'teaset';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view';
import {px2dp} from '@/utils/';
import Touchable from '@/components/Touchable/Touchable';

export function getByStatus(status){
  switch (status) {
      case 1:return '待审核';
      case 2:return '通过';
      case 3:return '驳回';
  }
}

const MaterialApproval = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const user = useRef({});

  const {
    materialApplication: {
      materialApplicationList: {pagination, list},
      refreshState,
    },
  } = useSelector(state => ({
    materialApplication: state.materialApplication,
  }));

  useEffect(() => {
    const request = async function () {
      user.current = await getCurrentUser();
      onHeaderRefresh();
    };
    request();
    const listener=navigation.addListener('focus',()=>{
      request();
    });
    return ()=>{
      listener&&listener();
    };
  }, []);

  const handleViewDetail = id => {
    navigation.navigate('MaterialApprovalDetail', {id});
  };

  const renderItem = ({item, index}) => {
    return (
      <Touchable
          onPress={() => handleViewDetail(item.id)}
          style={styles.renderItem}>
        <View style={styles.status}></View>
        <View style={styles.statusView}>
          <Text style={styles.statusText}>{getByStatus(item.status)}</Text>
        </View>
        <View>
          <View style={{marginBottom: px2dp(10)}}>
            <Text style={styles.biao}>{item.teamName}的物料申请</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[styles.leftText]}>项目：</Text>
            <Text style={[styles.leftText, {color: '#E6C229'}]}>
            {item.projectName}
            </Text>
          </View>
        </View>
      </Touchable>
    );
  };

  function onHeaderRefresh() {
    dispatch({
      type: 'materialApplication/page',
      payload: {
        current: 1,
        size: 10,
        subcontractorId: user.current.deptId,
      },
    });
  }

  function onFooterRefresh() {
    dispatch({
      type: 'materialApplication/page',
      payload: {
        current: pagination.current + 1,
        size: 10,
        subcontractorId: user.current.deptId,
        hasMore: true,
      },
    });
  }

  function onChange(index){
  }

  return (
    <View style={styles.container}>
      <SegmentedView style={{height:px2dp(36)}} type="projector" onChange={onChange}>
        <SegmentedView.Sheet title="待审核">
        </SegmentedView.Sheet>
        <SegmentedView.Sheet title="通过">
        </SegmentedView.Sheet>
        <SegmentedView.Sheet title="驳回">
        </SegmentedView.Sheet>
      </SegmentedView>

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

export default MaterialApproval;

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
