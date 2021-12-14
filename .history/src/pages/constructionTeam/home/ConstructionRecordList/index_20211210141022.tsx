import { getCurrentUser } from '@/config/authority';
import React, { useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';
import { useDispatch } from 'react-redux';

const ConstructionRecordList = (props) => {
    const dispatch=useDispatch()
    const user=useRef({})
    if(!user.current){
        getCurrentUser().then(r=>{
            user.current=r
        })
    }
    const  renderItem = ({item,index}) => {
        console.log('item'+JSON.stringify(item));
        //  return (
        //      <Touchable onPress={()=>this.handleViewDetail(item.id)} style={styles.renderItem}>
        //          {/*projectName*/}
        //             <View style={styles.leftItem}>
        //                 <Text style={customStyles.text}>{item.projectName}</Text>
        //                 <Text style={customStyles.text}>{item.location}</Text>
        //                 <Text style={customStyles.text}>{item.constructionTechnologyName}</Text>
        //             </View>
        //             <View style={styles.rightItem}>
        //                 <View style={styles.dateRightStyle}>
        //                     <Text style={customStyles.text}>{item.recordingTime}</Text>
        //                     <Text style={customStyles.text}>{item.partsName}</Text>
        //                     <Text style={customStyles.text}>完成面积：{item.area===-1?0:item.area}m²</Text>
        //                 </View>
        //                 <IconFont name={'gengduo1'} color={'#999'} />
        //             </View>
        //      </Touchable>
        //  );
     };

const  _onFetch=(page = 1, callback, options)=> {
    setTimeout(() => {
      var header = 'Header '+page;
      var rows = {};
      rows[header] = ['row '+((page - 1) * 3 + 1), 'row '+((page - 1) * 3 + 2), 'row '+((page - 1) * 3 + 3)];
      if (page === 5) {
        callback(rows, {
          allLoaded: true, // the end of the list is reached
        });
      } else {
        callback(rows);
      }
    }, 1000); // simulating network fetching
  };

function onHeaderRefresh(){
    dispatch({
        type: 'constructionRecord/setState',
        payload:{
            refreshState: RefreshState.HeaderRefreshing
        }
    })

    dispatch({
        type: 'constructionRecord/page',
        payload: {
            current: 1,
            size: 10,
            teamId:user.current.deptId
        },
    })

    // 模拟网络请求
    setTimeout(() => {
      // 模拟网络加载失败的情况
      if (Math.random() < 0.2) {
        this.setState({ refreshState: RefreshState.Failure })
        return
      }

      //获取测试数据
      let dataList = this.getTestList(true)

      this.setState({
        dataList: dataList,
        refreshState: dataList.length < 1 ? RefreshState.EmptyData : RefreshState.Idle,
      })
    }, 2000)
}

  return (
    <View style={styles.container}>
    <View style={styles.navBar} />
    <RefreshListView
        data={[{},{},{}]}
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
