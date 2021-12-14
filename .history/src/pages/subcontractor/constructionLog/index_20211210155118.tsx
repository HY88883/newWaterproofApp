import Touchable from '@/components/Touchable/Touchable';
import MyStyleSheet from '@/utils/CustomStyleSheet';
import  React, { useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Config from 'react-native-config';
import { useDispatch, useSelector } from 'react-redux';
// import GiftedListView from 'react-native-gifted-listview';

const ConstructionLog = (props) => {
    const {route:{params:{id}}}=props;
    const dispatch=useDispatch();
    const {constructionRecord:{constructionRecordDetail}}=useSelector(state=>({
        constructionRecord:state.constructionRecord
      }));

    useEffect(()=>{
        dispatch({
            type: 'constructionRecord/detail',
            payload: {id},
          });
    },[]);

    function handleViewPhoto(i){
        
    }

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
