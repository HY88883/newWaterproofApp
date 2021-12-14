import Touchable from '@/components/Touchable/Touchable';
import { getCurrentUser } from '@/config/authority';
import { px2dp } from '@/utils/';
import MyStyleSheet from '@/utils/CustomStyleSheet';
import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';
import { useDispatch, useSelector } from 'react-redux';

const ConstructionRecordList = (props) => {
    const dispatch=useDispatch();
    const user=useRef({});
    if(!user.current){
        getCurrentUser().then(r=>{
            user.current=r;
        });
    }
    const {constructionRecord:{refreshState,constructionRecordList:{list,pagination}}}=useSelector(state=>({
        constructionRecord:state.constructionRecord
      }));
        console.log('fwe=====',refreshState);
        
        useEffect(()=>{
            onHeaderRefresh();
        },[]);        


const handleViewDetail=(id)=>{

};

    const  renderItem = (item) => {
        console.log('====================================');
        console.log('fwefw',item);
        console.log('====================================');
         return (
             <Touchable onPress={()=>handleViewDetail(item.id)} style={styles.renderItem}>
                <View>
                <View style={{marginBottom:px2dp(10)}}><Text style={styles.biao}>{item.projectName}</Text></View>
                <View style={{flexDirection:'row',alignItems: 'center'}}>
                  <Text style={[styles.leftText]}>施工区域：</Text>
                  <Text style={[styles.leftText,{color:'#E6C229'}]}>{item.location}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems: 'center'}}>
                <Text style={styles.leftText}>完成面积：</Text>
                  <Text style={[styles.leftText,{color:'#D62828'}]}>{item.area}m²</Text>
                  </View>
              </View>
             </Touchable>
         );
     };

function onHeaderRefresh(){
    dispatch({
        type: 'constructionRecord/page',
        payload: {
            current: 1,
            size: 10,
            teamId:user.current.deptId
        }
    });
}

function onFooterRefresh(){
    dispatch({
        type: 'constructionRecord/page',
        payload: {
            current: pagination.current+1,
            size: 10,
            teamId:user.current.deptId,
            hasMore:true
        }
    });
}

  return (
    <View style={styles.container}>
    <RefreshListView
        refreshState={refreshState}
        data={list}
        onHeaderRefresh={onHeaderRefresh}
        onFooterRefresh={onFooterRefresh}
        // keyExtractor={this.keyExtractor}
        renderItem={renderItem}
        // refreshState={this.state.refreshState}
        />
  </View>
  );
};

export default ConstructionRecordList;

const styles = MyStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
      },
      navBar: {
        height: 64,
        backgroundColor: '#CCC'
      },
      row: {
        padding: 10,
        height: 44,
      },
      renderItem:{
        backgroundColor: '#fff'
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
});
