import {getCurrentUser} from '@/config/authority';
import React, {useEffect, useRef} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SegmentedView} from 'teaset';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view';
import {px2dp} from '@/utils/';
import Touchable from '@/components/Touchable/Touchable';
import Config from 'react-native-config';

const PeopleManagement = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const user = useRef({});

  const {
    team: {
      toAuditTeamMemberPage: {pagination, list},
      refreshState,
    },
  } = useSelector(state => ({
    team: state.team,
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
    navigation.navigate('PeopleDetail', {id});
  };

  const renderItem = ({item, index}) => {
    return (
      <Touchable
          onPress={() => handleViewDetail(item.userId)}
          style={styles.renderItem}>
        <View style={styles.lay}>
        {
               item.avatar?<Image source={{uri:`${Config.FILE_URL}${item.avatar}`}} style={styles.avatar}/>:        <View style={styles.avatar}/>

           }
          <View style={{marginBottom: px2dp(10),marginRight:px2dp(12)}}>
            <Text style={styles.biao}>{item.userName}</Text>
            <Text style={[styles.leftText]}>待审核</Text>
          </View>
        </View>
      </Touchable>
    );
  };

  function onHeaderRefresh() {
    dispatch({
      type: 'team/getToAuditTeamMemberPage',
      payload: {
        current: 1,
        size: 10,
        deptId: user.current.deptId,
      },
    });
  }

  function onFooterRefresh() {
    dispatch({
      type: 'team/getToAuditTeamMemberPage',
      payload: {
        current: pagination.current + 1,
        size: 10,
        deptId: user.current.deptId,
        hasMore: true,
      },
    });
  }

  return (
    <View style={styles.container}>
      <RefreshListView
          refreshState={refreshState}
          data={list}
          keyExtractor={item => item.userId}
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

export default PeopleManagement;

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
  avatar:{
    borderRadius:28,
    overflow: 'hidden',
    width:56,
    height:56
  },
  lay:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
