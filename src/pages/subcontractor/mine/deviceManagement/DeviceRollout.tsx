import Touchable from '@/components/Touchable/Touchable';
import { px2dp } from '@/utils/';
import MyStyleSheet from '@/utils/CustomStyleSheet';
import { customStyles } from '@/utils/styles';
import  React, { useEffect, useMemo, useState } from 'react';
import { Text, View, StyleSheet, Image, Platform, Alert } from 'react-native';
import Config from 'react-native-config';
import { useDispatch, useSelector } from 'react-redux';
import * as DocumentOpener from 'react-native-document-opener';
const RNFS = require('react-native-fs');
import {Overlay, Theme} from 'teaset';

const DeviceRollout = (props) => {
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
            payload: {id},
          });
    },[]);

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

    const media=useMemo(()=>{
      return [{photo:`${Config.FILE_URL}${equipmentDetail.qrCodePath.name}`}];
    },[equipmentDetail]); 

    const  handViewPhoto=(i)=>{
      navigation.navigate('PhotoBrowserScene', {media, index: i});
    };

  return (
    <View style={styles.container}>
         <View style={{alignSelf:'center',paddingVertical:px2dp(40)}}>
      {equipmentDetail.qrCodePath ? (
              <Touchable onPress={() =>handViewPhoto(0)}>
                <Image source={{uri: `${Config.FILE_URL}${equipmentDetail.qrCodePath.name}`}} style={styles.imageStyle} />
              </Touchable>
          ) : (
            <Text style={{textAlign:'center'}}>待接收</Text>
          )} 
          <View style={{marginVertical:px2dp(8)}}>
              <Text style={styles.daiStyle}>待接收</Text>
          </View>
      </View>
    <View>
    <View style={{alignSelf:'center',}}>
          <View style={styles.fff}>
              <Text style={customStyles.textShow}>设备名称:</Text>
          </View>
          <View style={styles.bView}>
              <Text style={styles.bText}>{equipmentDetail.name}</Text>
          </View>
          <View style={styles.fff}>
              <Text style={customStyles.textShow}>设备编号:</Text>
          </View>
          <View style={styles.bView}>
              <Text style={styles.bText}>{equipmentDetail.code}</Text>
          </View>
          <View style={styles.fff}>
              <Text style={customStyles.textShow}>采购日期:</Text>
          </View>
          <View style={styles.bView}>
              <Text style={styles.bText}>{equipmentDetail.purchasingDate}</Text>
          </View>
          <View style={styles.fff}>
              <Text style={customStyles.textShow}>附件:</Text>
          </View>
          {
              equipmentDetail.attachList.map(v=>{
                        return  <View style={[styles.bView]} key={v.id}>
                            <Touchable style={{width:'90%'}}
                                onPress={()=>handleDownload(v)}
                            >
                        <Text style={styles.vText} numberOfLines={1}>{v.originalName}</Text>
                            </Touchable>
                    </View>;
              })
          }
      </View>
    </View>
    </View>
  );
};

export default DeviceRollout;

const styles = MyStyleSheet.create({
  container: {
      flex:1,
      backgroundColor:'#fff'
  },
  imageStyle:{
    width: 86,
    height: 86,
    borderRadius:4,
    overflow:'hidden',
  },
  fff:{
      marginVertical: 6
  },
  bView:{
    width: 260,
    // height: 29,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    overflow:'hidden',
    ...Platform.select({
        android:{
            elevation: 2
        },
        ios:{
            shadowColor: '#000000',
            shadowRadius: 3,
            shadowOpacity: 0.14,
            shadowOffset: { width:1, height: 5 }
        }
    }),
    padding:8
  },
  bText:{
    fontSize: 18,
    color: '#FF9F1C',
    // lineHeight: 29,
  },
  vText:{
    fontSize: 18,
    color: '#00A6FB',
    lineHeight: 29,
    textDecorationLine:'underline'
  },
  daiStyle:{
    fontSize: 12,
    color: '#F71735',
    textAlign:'center',
  }
});
