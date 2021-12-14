import Touchable from '@/components/Touchable/Touchable';
import {px2dp} from '@/utils/';
import MyStyleSheet from '@/utils/CustomStyleSheet';
import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Config from 'react-native-config';
import {useDispatch, useSelector} from 'react-redux';
// import GiftedListView from 'react-native-gifted-listview';

const ConstructionLog = props => {
  const {
    route: {
      params: {id},
    },
  } = props;
  const dispatch = useDispatch();
  const {
    constructionRecord: {constructionRecordDetail},
  } = useSelector(state => ({
    constructionRecord: state.constructionRecord,
  }));

  useEffect(() => {
    dispatch({
      type: 'constructionRecord/detail',
      payload: {id},
    });
  }, []);

  function handleViewPhoto(i) {}

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>成果照片</Text>
        <View style={styles.photoContainer}>
          {constructionRecordDetail.resultPhotoAttachList.map((i, index) => (
            <Touchable onPress={() => handleViewPhoto(index)} key={i.id}>
              <Image
                  source={{uri: `${Config.FILE_URL}${i.name}`}}
                  style={styles.image}
              />
            </Touchable>
          ))}
        </View>
      </View>
      <View
          style={{
          height: px2dp(12),
          backgroundColor: '#f9f9f9',
          marginHorizontal: -30,
        }}
      />

      <View>
          <View style={{marginVertical:px2dp(12),}}>
        <Text style={styles.title}>施工日志</Text>
          </View>
        <View>
          <Text style={styles.leftText}>
            时间：
            <Text style={styles.rightText}>
              {constructionRecordDetail.recordingTime}
            </Text>
          </Text>
          <Text style={styles.leftText}>
            施工部位：
            <Text style={styles.rightText}>
              {constructionRecordDetail.partsName}
            </Text>
          </Text>
          <Text style={styles.leftText}>
            施工区域：
            <Text style={styles.rightText}>
              {constructionRecordDetail.location}
            </Text>
          </Text>
          <Text style={styles.leftText}>
            施工工艺：
            <Text style={styles.rightText}>
              {constructionRecordDetail.constructionTechnologyName}
            </Text>
          </Text>
          <Text style={styles.leftText}>
            完成面积：
            <Text style={styles.rightText}>
              
              {constructionRecordDetail.area === -1
                ? 0
                : constructionRecordDetail.area}
              m²
            </Text>
          </Text>
        </View>
      </View>

      <View
          style={{
          height: px2dp(12),
          backgroundColor: '#f9f9f9',
          marginHorizontal: -30,
        }}
      />


    </View>
  );
};

export default ConstructionLog;

const styles = MyStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  navBar: {
    height: 64,
    backgroundColor: '#CCC',
  },
  row: {
    padding: 10,
    height: 44,
  },
  photoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    marginBottom: 12,
    width:'100%'
  },
  image: {
    width: 110,
    height: 84,
    marginHorizontal: 4,
    marginBottom: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    fontFamily: 'SimHei',
    color: '#212529',
  },
  leftText: {
    fontSize: 19,
    fontFamily: 'SimHei',
    color: '#495057',
  },
  rightText: {
    fontSize: 16,
    fontFamily: 'SimHei',
    color: '#FF9F1C',
  },
});
