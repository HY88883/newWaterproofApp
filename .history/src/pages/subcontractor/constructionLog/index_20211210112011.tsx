import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import GiftedListView from 'react-native-gifted-listview'

const ConstructionLog = (props) => {

   const  renderItem = (item,index) => {
        console.log('item'+JSON.stringify(item))
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

  return (
    <View style={styles.container}>
    <View style={styles.navBar} />
    <GiftedListView
        rowView={renderItem}
        onFetch={this._onFetch}
        firstLoader={true} // display a loader for the first fetching
        pagination={true} // enable infinite scrolling using touch to load more
        refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
        withSections={false} // enable sections
        customStyles={{
        paginationView: {
          backgroundColor: '#eee',
        },
      }}

        refreshableTintColor="blue"
    />
  </View>
  );
};

export default ConstructionLog;

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
