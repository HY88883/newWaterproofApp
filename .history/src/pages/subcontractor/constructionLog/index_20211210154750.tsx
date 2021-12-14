import MyStyleSheet from '@/utils/CustomStyleSheet';
import * as React from 'react';
import { Text, View, StyleSheet, Image, Touchable } from 'react-native';
import Config from 'react-native-config';
// import GiftedListView from 'react-native-gifted-listview';

const ConstructionLog = (props) => {

 
  return (
    <View style={styles.container}>
        <View>
            <View>
                <Text>成果照片</Text>
                <View style={styles.photoContainer}>
          {constructionRecordDetail.resultPhotoAttachList.map((i,index) => (
              <Touchable onPress={()=>handleViewPhoto(index)} key={i.id}>
                <Image source={{uri: `${Config.FILE_URL}${i.name}`}} style={styles.image} />
              </Touchable>
          ))}
        </View>
            </View>
        </View>
  </View>
  );
};

export default ConstructionLog;

const styles = MyStyleSheet.create({
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
      photoContainer:{
        flexDirection:'row',
        flexWrap:'wrap'
      },
      image: {
        width:100,
        height:100,
       marginHorizontal:4,
        marginBottom:4
      },
});
