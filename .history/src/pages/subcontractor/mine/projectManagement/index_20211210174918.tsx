import Touchable from '@/components/Touchable/Touchable';
import { getCurrentUser } from '@/config/authority';
import { px2dp } from '@/utils/';
import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';

const ProjectManagement = (props) => {
    const {navigation}=props;
    const dispatch=useDispatch();
    const user=useRef({});
    if(!user.current){
        getCurrentUser().then(r=>{
            user.current=r;
        });
    }
    const { projectManage: {
        ProjectManagement: {pagination,list},
    },}=useSelector(state=>({
        projectManage:state.projectManage
      }));
        
        useEffect(()=>{
            onHeaderRefresh();
            return ()=>{
                dispatch({
                    type: 'constructionRecord/setState',
                    payload: {
                        constructionRecordList: {
                            list: [],
                            pagination: {
                              total: 0,
                              current: 0,
                              pageSize: 0,
                              pages: 0,
                            },
                          }
                    }
                });
            };
        },[]);        


const handleViewDetail=(id)=>{
    navigation.navigate('ConstructionLog', {id});
};

    const  renderItem = ({item,index}) => {
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
        type: 'projectManage/page',
        payload: {
            current: 1,
            size: 10,
        }
    });
}

function onFooterRefresh(){
    dispatch({
        type: 'projectManage/page',
        payload: {
            current: pagination.current+1,
            size: 10,
            hasMore:true
        }
    });
}

  return (
    <View style={styles.container}>
    <RefreshListView
        refreshState={refreshState}
        data={list}
        keyExtractor={item=>item.id}
        onHeaderRefresh={onHeaderRefresh}
        onFooterRefresh={onFooterRefresh}
        // keyExtractor={this.keyExtractor}
        renderItem={renderItem}
        // refreshState={this.state.refreshState}
        ItemSeparatorComponent={()=><View style={{height:px2dp(12),backgroundColor:'#f9f9f9'}}/>}
        />
  </View>
  );
};

export default ProjectManagement;

const styles = StyleSheet.create({
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
        backgroundColor: '#fff',
        paddingVertical:12,
        paddingLeft:12
      },
      biao:{
        fontSize: 19,
        fontFamily: 'SimHei',
        color: '#212529'
      },
      leftText:{
        fontSize: 12,
        fontFamily: 'Adobe Heiti Std',
        color: '#575757'
      },
});
