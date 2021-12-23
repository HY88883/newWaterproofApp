import Touchable from '@/components/Touchable/Touchable';
import { px2dp } from '@/utils/';
import MyStyleSheet from '@/utils/CustomStyleSheet';
import { customStyles } from '@/utils/styles';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, Platform, Alert } from 'react-native';
import Config from 'react-native-config';
import { useDispatch, useSelector } from 'react-redux';
import * as DocumentOpener from 'react-native-document-opener';
import {Overlay, Theme} from 'teaset';
const RNFS = require('react-native-fs');

const DeviceView = (props) => {
    const {navigation,route:{params:{id}}}=props;
    const dispatch = useDispatch();
    const [progress, setProgress] = useState(0);
    const [downloading, setDownloading] = useState(false);

    const {
        equipment: {
            equipmentDetail
        },
      } = useSelector(state => ({
        equipment: state.equipment,
      }));

    useEffect(() =>{
        dispatch({
            type: 'equipment/detail',
            payload:{id}
          });
    },[]);

    function handleViewPhoto(){

    }

    function handleDownload(item) {
      let savePath =
        Platform.OS === 'ios'
          ? RNFS.DocumentDirectoryPath
          : RNFS.ExternalDirectoryPath;
      let toFilePath = savePath + `/${item.originalName}`; // 文件路径
      let url = `${Config.FILE_URL}${item.name}`; // 文件下载地址
      // let fileType = 'application/pdf';
  
      RNFS.exists(toFilePath).then(exists => {
        if (exists) {
          try {
            DocumentOpener.openAsync(toFilePath);
          } catch (e) {
            Alert.alert('提示', '打开文件失败，请先安装对应软件');
          }
        } else {
          const downRet = RNFS.downloadFile({
            fromUrl: url,
            toFile: toFilePath,
            progress: data => {
              var text = JSON.stringify(data);
              if (progress < 100) {
                if (text.contentLength > 0) {
                  var num = this.state.progress + 1;
                  setProgress(num);
                } else {
                  var num = Math.round(data.bytesWritten / 10000);
                  if (num < 100) {
                    setProgress(num);
                  }
                }
              }
            },
            begin: res => {
              setDownloading(true);
              Overlay.displayLoading('文件下载中...');
            },
          });
  
          downRet.promise
            .then(res => {
              setDownloading(false);
              Overlay.removeLoading();
              try {
                DocumentOpener.openAsync(toFilePath);
              } catch (e) {
                Alert.alert('提示', '打开文件失败，请先安装对应软件');
              }
            })
            .catch(err => {
              setDownloading(false);
              setProgress(0);
              Overlay.removeLoading();
              Alert.alert('提示', '下载文件失败,错误原因:' + err);
            });
        }
      });
    }

  return (
    <ScrollView style={styles.container}>
         <View style={styles.containerView}>
      <View style={{alignSelf:'center',paddingVertical:px2dp(40)}}>
      {equipmentDetail.photosAttach.name ? (
              <Touchable onPress={handleViewPhoto}>
                <Image source={{uri: `${Config.FILE_URL}${equipmentDetail.photosAttach.name}`}} style={styles.imageStyle} />
              </Touchable>
          ) : (
            <Text style={{textAlign:'center'}}>暂无照片</Text>
          )} 
      </View>
          <View style={styles.projectName}>
            <Text style={customStyles.textShow}>设备编号：</Text>
            <Text style={customStyles.textShow}>{equipmentDetail.code}</Text>
          </View>
          <View style={styles.projectName}>
            <Text style={customStyles.textShow}>设备名称：</Text>
            <Text style={customStyles.textShow}>{equipmentDetail.name}</Text>
          </View>
          <View style={styles.projectName}>
            <Text style={customStyles.textShow}>设备分类：</Text>
            <Text style={customStyles.textShow}>{equipmentDetail.model}</Text>
          </View>
          <View style={styles.projectName}>
            <Text style={customStyles.textShow}>设备保修期：</Text>
            <Text style={customStyles.textShow}>{equipmentDetail.warrantyPeriod}</Text>
          </View>
          <View style={styles.projectName}>
            <Text style={customStyles.textShow}>购买日期：</Text>
            <Text style={customStyles.textShow}>{equipmentDetail.purchasingDate}</Text>
          </View>
          <View style={styles.uploadFile}>
            <Text style={customStyles.textShow}>附件：</Text>
            <View>
              {equipmentDetail.attachList && equipmentDetail.attachList.length !== 0
                ? equipmentDetail.attachList.map((item, index) => (
                    <Touchable
                        key={item.id}
                        onPress={()=>handleDownload(item)}
                    >
                      <Text>
                        {item.originalName}
                      </Text>
                    </Touchable>

                  ))
                : null}
            </View>
          </View>
        </View>
    </ScrollView>
  );
};

export default DeviceView;

const styles = MyStyleSheet.create({
  container: {
      flex: 1,
      backgroundColor:'#fff'
  },
  projectName:{
      flexDirection:'row', alignItems: 'center',
      borderBottomColor:'#999',
      borderTopColor:'#999',
      borderTopWidth:StyleSheet.hairlineWidth,
      borderBottomWidth:StyleSheet.hairlineWidth,
    paddingVertical:14
  },
  containerView:{
      marginHorizontal:30,
    //   alignSelf:'center',
  },
  imageStyle:{
    width: 86,
    height: 86,
    borderRadius:4,
    overflow:'hidden',
  },
  uploadFile:{
      marginTop:px2dp(15)
  }
});
