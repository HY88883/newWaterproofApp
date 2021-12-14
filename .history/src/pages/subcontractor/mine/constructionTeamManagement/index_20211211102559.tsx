import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view';
import MyStyleSheet from '@/utils/CustomStyleSheet';
import {px2dp} from '@/utils/';
import Touchable from '@/components/Touchable/Touchable';
import {viewportWidth} from '@/utils/';

const ConstructionTeamManagement = props => {
  const {navigation} = props;
  const dispatch = useDispatch();

  const {
    team: {
      ConstructionTeamManagement: {pagination, list},
      refreshState,
    },
  } = useSelector(state => ({
    team: state.team,
  }));

  useEffect(() => {
    onHeaderRefresh();
    return () => {
      dispatch({
        type: 'team/setState',
        payload: {
          ConstructionTeamManagement: {
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

  const handleViewDetail = id => {
    // navigation.navigate('ConstructionLog', {id});
  };

  const renderItem = ({item, index}) => {
    return (
      <>
        <View>
          <Text>{item.deptName}xxxxx</Text>
        </View>
        <Touchable
            onPress={() => handleViewDetail(item.id)}
            style={styles.renderItem}>
          <View style={styles.images}></View>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.leftText]}>队长：</Text>
              <Text style={[styles.leftText, {color: '#E6C229'}]}>
                {item.principalUserName}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.leftText}>队员：</Text>
              <Text style={[styles.leftText, {color: '#D62828'}]}>
                {item.userCount}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.leftText}>累计施工：</Text>
            <Text style={[styles.leftText, {color: '#D62828'}]}>
              {item.completedConstructionAreaCount}m²
            </Text>
          </View>
          </View>
        </Touchable>
      </>
    );
  };

  function onHeaderRefresh() {
    dispatch({
      type: 'team/page',
      payload: {
        current: 1,
        size: 10,
      },
    });
  }

  function onFooterRefresh() {
    dispatch({
      type: 'team/page',
      payload: {
        current: pagination.current + 1,
        size: 10,
        hasMore: true,
      },
    });
  }

  return (
    <View style={styles.container}>
      <RefreshListView
          refreshState={refreshState}
          data={[{}, {}]}
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

export default ConstructionTeamManagement;

const styles = MyStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
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
  renderItem: {
    width: viewportWidth - 24,
    height: 81,
    background: '#FFFFFF',
    // box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
    borderRadius: 4,
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 11,
    marginLeft: 8,
  },
  images: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: 'red',
  },
});
