import Touchable from '@/components/Touchable/Touchable';
import { getCurrentUser } from '@/config/authority';
import { px2dp } from '@/utils/';
import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';
import MyStyleSheet from '@/utils/CustomStyleSheet';

const ProjectManagement = (props) => {
    const {navigation}=props;
    const dispatch=useDispatch();
   
    const { projectManage: {
        ProjectManagement: {pagination,list},
        refreshState
    },}=useSelector(state=>({
        projectManage:state.projectManage
      }));
        
        useEffect(()=>{
            onHeaderRefresh();
            return ()=>{
                dispatch({
                    type: 'projectManage/setState',
                    payload: {
                        ProjectManagement: {
                            list: [],
                            pagination: {
                              total: 0,
                              current: 0,
                              pageSize: 0,
                              pages: 0,
                            },
                          },
                    }
                });
            };
        },[]);        


const handleViewDetail=(id)=>{
    // navigation.navigate('ConstructionLog', {id});
};

    const  renderItem = ({item,index}) => {
         return (
             <Touchable onPress={()=>handleViewDetail(item.id)} style={styles.renderItem}>
                 <View style={styles.status}>
                     <Text>{item.statusName}</Text>
                 </View>
                <View>
                <View style={{marginBottom:px2dp(10)}}><Text style={styles.biao}>{item.projectName}</Text></View>
                <View style={{flexDirection:'row',alignItems: 'center'}}>
                  <Text style={[styles.leftText]}>合同面积：</Text>
                  <Text style={[styles.leftText,{color:'#E6C229'}]}>{item.contractArea===-1?0:item.contractArea}m²</Text>
                </View>
                <View style={{flexDirection:'row',alignItems: 'center'}}>
                <Text style={styles.leftText}>已完工：</Text>
                  <Text style={[styles.leftText,{color:'#D62828'}]}>{item.completedArea}m²</Text>
                  </View>
              </View>
              <View style={{flexDirection:'row',alignItems: 'center'}}>
                <Text style={styles.leftText}>施工队伍：</Text>
                  <Text style={[styles.leftText,{color:'#D62828'}]}>{item.teamName}</Text>
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
        renderItem={renderItem}
        ItemSeparatorComponent={()=><View style={{height:px2dp(12),backgroundColor:'#f9f9f9'}}/>}
        />
  </View>
  );
};

export default ProjectManagement;

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
      status:{
          position: 'absolute',
          top:0,
          right:0,
          width:0,
          height:0,
          borderWidth:30,
          borderTopColor:'#F77F00',
          borderRightColor:'#F77F00',
          borderLeftColor:'#fff',
          borderBottomColor:'#fff'
      }
});
