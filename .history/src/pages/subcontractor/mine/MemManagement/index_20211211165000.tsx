import useUserObject from '@/components/hooks/useUserObject';
import  React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';
import SectionListContacts from 'react-native-sectionlist-contacts';
import { px2dp } from '@/utils/';
import { getCurrentUser } from '@/config/authority';
let nameData=[
    {name:'阿玛尼',id:'amani',params: ''},
    {name:'OK',id:'ok',params: '123'},
    {name:'天津饭'},
    {name:'%……&'},
    {name:'周星驰'},
    {name:'习大表哥'},
    {name:'不要这样'},
    {name:'V字仇杀队'},
    {name:'拼车'},
    {name:'他妈跌'},
    {name:'淫僧'},
    {name:'钱学森'},
    {name:'宁采臣'},
    {name:'史泰龙'},
    {name:'恐龙'},
    {name:'任达华'},
    {name:'妈咪宝贝'},
    {name:'ing'},
    {name:'康麦隆'},
    {name:'刘德华'},
    {name:'精忠报国'},
    {name:'黄药师'},
    {name:'大叔皮'},
    {name:'布达拉宫'},
    {name:'方世玉'},
    {name:'ET外星人'},
    {name:'程咬金'},
    {name:'**&&&&'},
];
const MemManagement = (props) => {
    const {navigation}=props;
    const dispatch=useDispatch();
    const userRef=useRef(null);
    
    const { team: {
        getTeamMemberPage: {pagination,list},
        refreshState
    },}=useSelector(state=>({
        team:state.team
      }));
        
        useEffect(()=>{
        getCurrentUser().then(r=>{
            userRef.current=r;
        });
            onHeaderRefresh();
            return ()=>{
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
        type: 'team/getTeamMemberPage',
        payload: {
            current: 1,
            size: 10,
            subcontractorId:user.deptId
        }
    });
}

function onFooterRefresh(){
    dispatch({
        type: 'team/getTeamMemberPage',
        payload: {
            current: pagination.current+1,
            size: 10,
            hasMore:true,
            subcontractorId:user.deptId
        }
    });
}

  return (
    <View style={styles.container}>
                <SectionListContacts
                    // ref={s=>this.sectionList=s}
                    sectionListData={nameData}
                    sectionHeight={50}
                    initialNumToRender={nameData.length}
                    showsVerticalScrollIndicator={false}
                    SectionListClickCallback={(item,index,section)=>{
                       console.log('---SectionListClickCallback--:',item,index);
                    }}
                    otherAlphabet="#"
                />
  </View>
  );
};

export default MemManagement;

const styles = StyleSheet.create({
  container: {}
});
