import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';


const ConstructionLog = (props) => {
  return (
    <View style={styles.container}>
    <View style={styles.navBar} />
    <GiftedListView
        rowView={this._renderRowView}
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
