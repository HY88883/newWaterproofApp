import  React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';
import { px2dp } from '@/utils/';

const ConstructionTeamManagement = (props) => {
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
             <Touchable onPress={()=>handleViewDetail(item.id)} style={styles.renderItem} >
                 <View style={styles.status}>
                 </View>
                 <View style={styles.statusView}>
                 <Text style={styles.statusText}>{item.statusName}</Text>
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
        type: 'team/page',
        payload: {
            current: 1,
            size: 10,
        }
    });
}

function onFooterRefresh(){
    dispatch({
        type: 'team/page',
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

export default ConstructionTeamManagement;

const styles = StyleSheet.create({
  container: {}
});
