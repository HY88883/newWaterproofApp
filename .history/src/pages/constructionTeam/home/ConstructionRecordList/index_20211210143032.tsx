import Touchable from '@/components/Touchable/Touchable';
import { getCurrentUser } from '@/config/authority';
import React, { useRef } from 'react';
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
    const {constructionRecord:{refreshState,constructionRecordList:{list}}}=useSelector(state=>({
        constructionRecord:state.constructionRecord
      }));
    const  renderItem = ({item,index}) => {
        console.log('item'+JSON.stringify(item));
         return (
             <Touchable onPress={()=>this.handleViewDetail(item.id)} style={styles.renderItem}>
                 {/*projectName*/}
                    <View style={styles.leftItem}>
                        <Text style={customStyles.text}>{item.projectName}</Text>
                        <Text style={customStyles.text}>{item.location}</Text>
                        <Text style={customStyles.text}>{item.constructionTechnologyName}</Text>
                    </View>
                    <View style={styles.rightItem}>
                        <View style={styles.dateRightStyle}>
                            <Text style={customStyles.text}>{item.recordingTime}</Text>
                            <Text style={customStyles.text}>{item.partsName}</Text>
                            <Text style={customStyles.text}>完成面积：{item.area===-1?0:item.area}m²</Text>
                        </View>
                        <IconFont name={'gengduo1'} color={'#999'} />
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

  return (
    <View style={styles.container}>
    <View style={styles.navBar} />
    <RefreshListView
        refreshState={refreshState}
        data={list}
        onHeaderRefresh={onHeaderRefresh}
        // keyExtractor={this.keyExtractor}
        renderItem={renderItem}
        // refreshState={this.state.refreshState}
        // onHeaderRefresh={this.onHeaderRefresh}
        // onFooterRefresh={this.onFooterRefresh}
        />
  </View>
  );
};

export default ConstructionRecordList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
      },
      navBar: {
        height: 64,
        backgroundColor: '#CCC'
      },
      row: {
        padding: 10,
        height: 44,
      },
});
