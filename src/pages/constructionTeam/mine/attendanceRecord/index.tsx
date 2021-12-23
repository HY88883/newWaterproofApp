import useUserObject from '@/components/hooks/useUserObject';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view';
import SectionListContacts from 'react-native-sectionlist-contacts';
import {px2dp} from '@/utils/';
import {getCurrentUser} from '@/config/authority';
import MyStyleSheet from '@/utils/CustomStyleSheet';
import Config from 'react-native-config';
import Touchable from '@/components/Touchable/Touchable';
import Search from 'react-native-search-box';

const AttendanceRecord = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const userRef = useRef(null);
  const [textContent,setTextContent]=useState('');
  const {
    team: {
        teamAttendanceRecord
    },
  } = useSelector(state => ({
    team: state.team,
  }));

  const nameData = useMemo(() => {
    return teamAttendanceRecord && teamAttendanceRecord.length > 0
      ? teamAttendanceRecord.map((item, i) => ({name: item.userName, ...item}))
      : [];
  }, [teamAttendanceRecord]);

  useEffect(() => {
    const listener=navigation.addListener('focus',()=>{
        onHeaderRefresh();
    });
    onHeaderRefresh();
    return () => {
      listener();
    };
  }, []);

  const handleViewDetail = id => {};

  function onHeaderRefresh() {
    dispatch({
      type: 'team/getTeamAttendanceRecord',
    });
  }

  const _renderHeader = params => {
    return (
      <View style={{height: px2dp(18), backgroundColor: '#F3F3F3'}}>
        <Text style={styles.htext}>{params.key}</Text>
      </View>
    );
  };

  const handleViewRecordDetail=(id,item)=>{
    navigation.navigate('AttendanceRecordDetail', {id,item});
  };

  const _renderItem = (item, index, section) => {
    return (
      <Touchable
          style={styles.iview}
          onPress={() => {
        //   navigation.navigate('TeammateDetail', {id: item.userId});
        }}>
     <View style={styles.fff}>
     <View style={styles.xx}>
       {item.avatar ? (
          <Image
              source={{uri: `${Config.FILE_URL}${item.avatar}`}}
              style={styles.ren}
          />
        ) : (
          <View style={styles.ren} />
        )}
        <View>
        <Text style={styles.Itemtext}>{item.name}</Text>
        <Text style={styles.Itemtextx}>本月出勤：21天</Text>
        </View>
       </View>
       <Touchable style={styles.cha} onPress={()=>{
           handleViewRecordDetail(item.userId,item);
       }}>
           <Text style={styles.chat}>查看详情</Text>
       </Touchable>
     </View>
      </Touchable>
    );
  };

function handleSearch(text){
  setTextContent(text);
  dispatch({
    type: 'team/getTeamMemberPage',
    payload: {
      userName:text
    },
  });
}

  return (
    <View style={styles.container}>
       <Search
           backgroundColor={'#fff'}
           placeholderTextColor={'#999'}
           titleCancelColor={'blue'}
           placeholder={'请输入成员姓名'}
           returnType={'search'}
           inputStyle={{fontSize:px2dp(15),color:'#333'}}
           cancelTitle={'取消'}
           onChangeText={t=>handleSearch(t)}
           onSearch={t=>{
             handleSearch(t);
           }}
           onCancel={_=>handleSearch('')}
           onDelete={_=>handleSearch('')}
           value={textContent}
        />
      <SectionListContacts
          scrollAnimation
        // ref={s=>this.sectionList=s}
          sectionListData={nameData}
          sectionHeight={px2dp(62)}
          sectionHeaderHeight={px2dp(18)}
          initialNumToRender={7}
          showsVerticalScrollIndicator={false}
          renderItem={_renderItem}
          otherAlphabet="#"
          renderHeader={_renderHeader}
      />
    </View>
  );
};

export default AttendanceRecord;

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
    width:'100%'
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
  xx:{
      flexDirection:'row',
      alignItems:'center',
  },
  fff:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent: 'space-between'
  },
  Itemtextx:{
    fontSize: 16,
    fontFamily: 'SimHei',
    color: '#FF9F1C',
  },
  cha:{
    paddingVertical:8,
    paddingHorizontal:16,
    borderWidth:1,
    borderRadius:12,
    overflow:'hidden',
    borderColor:'#D62828',
    marginLeft:'17%'
  },
  chat:{
    fontSize: 17,
    fontFamily: 'SimHei',
    color: '#D62828',
    textAlign:'center',
  }
});
