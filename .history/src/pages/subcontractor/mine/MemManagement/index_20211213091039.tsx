import useUserObject from '@/components/hooks/useUserObject';
import React, {useEffect, useMemo, useRef} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view';
import SectionListContacts from 'react-native-sectionlist-contacts';
import {px2dp} from '@/utils/';
import {getCurrentUser} from '@/config/authority';
import MyStyleSheet from '@/utils/CustomStyleSheet';
import Config from 'react-native-config';
import Touchable from '@/components/Touchable/Touchable';

const MemManagement = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const userRef = useRef(null);

  const {
    team: {
      getTeamMemberPage: {pagination, list},
      refreshState,
    },
  } = useSelector(state => ({
    team: state.team,
  }));

  const nameData = useMemo(() => {
    return list && list.length > 0
      ? list.map((item, i) => ({name: item.userName, ...item}))
      : [];
  }, [list]);

  useEffect(() => {
    const getUser = async () => {
      userRef.current = await getCurrentUser();
      onHeaderRefresh();
    };
    getUser();
    return () => {
      dispatch({
        type: 'team/setState',
        payload: {
          getTeamMemberPage: {
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

  const handleViewDetail = id => {};

  function onHeaderRefresh() {
    dispatch({
      type: 'team/getTeamMemberPage',
      payload: {
        current: 1,
        size: 10,
        subcontractorId: userRef.current.deptId,
      },
    });
  }

  const _renderHeader = params => {
    return (
      <View style={{height: px2dp(18), backgroundColor: '#F3F3F3'}}>
        <Text style={styles.htext}>{params.key}</Text>
      </View>
    );
  };

  const _renderItem = (item, index, section) => {
    return (
      <Touchable
          style={styles.iview}
          onPress={() => {
          navigation.navigate('ConstructionLog', {id: item.userId});
        }}>
        {item.avatar ? (
          <Image
              source={{uri: `${Config.FILE_URL}${item.avatar}`}}
              style={styles.ren}
          />
        ) : (
          <View style={styles.ren} />
        )}
        <Text style={styles.Itemtext}>{item.name}</Text>
      </Touchable>
    );
  };

  return (
    <View style={styles.container}>
      <SectionListContacts
          scrollAnimation
        // ref={s=>this.sectionList=s}
          sectionListData={nameData}
          sectionHeight={px2dp(62)}
          sectionHeaderHeight={px2dp(18)}
          initialNumToRender={nameData.length}
          showsVerticalScrollIndicator={false}
          renderItem={_renderItem}
          otherAlphabet="#"
          renderHeader={_renderHeader}
      />
    </View>
  );
};

export default MemManagement;

const styles = MyStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  htext: {
    fontSize: 17,
    fontFamily: 'SimHei',
    color: '#898989',
  },
  iview: {
    height: px2dp(62),
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomColor: '#DEDFE0',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  ren: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    overflow: 'hidden',
    marginRight: 10,
  },
  Itemtext: {
    fontSize: 18,
    fontFamily: 'SimHei',
    color: '#000000',
  },
});
