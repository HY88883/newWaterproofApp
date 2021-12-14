import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';


const ConstructionRecordList = (props) => {
    const  renderItem = (item,index) => {
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

//   return (
//     <View style={styles.container}>
//     <View style={styles.navBar} />
//     <GiftedListView
//         rowView={renderItem}
//         onFetch={_onFetch}
//         firstLoader={true} // display a loader for the first fetching
//         pagination={true} // enable infinite scrolling using touch to load more
//         refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
//         withSections={false} // enable sections
//         customStyles={{
//         paginationView: {
//           backgroundColor: '#eee',
//         },
//       }}

//         refreshableTintColor="blue"
//     />
//   </View>
//   );
return null;
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
