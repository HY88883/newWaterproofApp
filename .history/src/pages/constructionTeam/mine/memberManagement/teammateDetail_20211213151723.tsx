import Touchable from '@/components/Touchable/Touchable';
import {px2dp} from '@/utils/';
import MyStyleSheet from '@/utils/CustomStyleSheet';
import Func from '@/utils/Func';
import React, {useEffect, useMemo, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  Alert,
} from 'react-native';
import Config from 'react-native-config';
import {useDispatch, useSelector} from 'react-redux';
const RNFS = require('react-native-fs');
import * as DocumentOpener from 'react-native-document-opener';
import {Toast} from '@ant-design/react-native';
import Overlay from '@/components/OverlayLoading';

const TeammateDetail = props => {
  const {
    route: {
      params: {id: userId},
    },
    navigation,
  } = props;
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const {
    team: {teamMemberDetail},
  } = useSelector(state => ({
    team: state.team,
  }));
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Touchable
            onPress={() => {
            navigation.navigate('TeammateDetailEdit', {
              id: teamMemberDetail.id,
            });
          }}>
          <Text style={{color: '#333'}}>编辑</Text>
        </Touchable>
      ),
    });
    dispatch({
      type: 'team/teamMemberDetail',
      payload: {userId},
    });
  }, []);

  let media = useMemo(() => {
    return teamMemberDetail &&
      teamMemberDetail.idCardPositivePhotosAttach &&
      teamMemberDetail.idCardBackPhotosAttach &&
      teamMemberDetail.bankCardPositivePhotosAttach &&
      teamMemberDetail.bankCardBackPhotosAttach
      ? [
          {photo: `${Config.FILE_URL}${teamMemberDetail.avatar}`},
          {
            photo: `${Config.FILE_URL}${teamMemberDetail.idCardPositivePhotosAttach.name}`,
          },
          {
            photo: `${Config.FILE_URL}${teamMemberDetail.idCardBackPhotosAttach.name}`,
          },
          {
            photo: `${Config.FILE_URL}${teamMemberDetail.bankCardPositivePhotosAttach.name}`,
          },
          {
            photo: `${Config.FILE_URL}${teamMemberDetail.bankCardBackPhotosAttach.name}`,
          },
        ]
      : [];
  }, [teamMemberDetail]);

  function hanleImage(i) {
    navigation.navigate('PhotoBrowserScene', {media: media, index: i});
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
      <View
          style={{
          marginVertical: px2dp(12),
          backgroundColor: '#fff',
          padding: px2dp(14),
        }}>
        <View>
          <Text style={styles.ji}>基本信息</Text>
        </View>

        <View style={[styles.kua, {marginBottom: px2dp(5)}]}>
          <Text style={styles.x}>姓名</Text>
          <Text style={styles.n}>{teamMemberDetail.userName}</Text>
        </View>

        <View style={styles.kua}>
          <Text style={styles.x}>联系方式</Text>
          <Text style={styles.n}>{teamMemberDetail.phone}</Text>
        </View>
        {Func.ifubcontractor && (
          <View style={styles.kua}>
            <Text style={styles.x}>人员所属队</Text>
            <Text style={styles.n}>{teamMemberDetail.teamName}</Text>
          </View>
        )}
        {teamMemberDetail.avatar ? (
          <Touchable onPress={() => hanleImage(0)}>
            <Image
                source={{uri: `${Config.FILE_URL}${teamMemberDetail.avatar}`}}
                style={styles.images}
            />
          </Touchable>
        ) : (
          <View style={styles.images} />
        )}
      </View>

      <View
          style={{
          marginVertical: px2dp(12),
          backgroundColor: '#fff',
          padding: px2dp(14),
        }}>
        <View>
          <Text style={styles.ji}>身份证信息</Text>
        </View>

        <View style={[styles.kua, {marginBottom: px2dp(5)}]}>
          <Text style={styles.x}>身份证号码</Text>
          <Text style={styles.n}>{teamMemberDetail.idCardNumber}</Text>
        </View>
        <View style={styles.imagesvv}>
          <Touchable onPress={() => hanleImage(1)}>
            <Image
                source={{
                uri: `${Config.FILE_URL}${teamMemberDetail.idCardPositivePhotosAttach.name}`,
              }}
                style={styles.sh}
            />
          </Touchable>
          <Touchable onPress={() => hanleImage(2)}>
            <Image
                source={{
                uri: `${Config.FILE_URL}${teamMemberDetail.idCardBackPhotosAttach.name}`,
              }}
                style={styles.sh}
            />
          </Touchable>
        </View>
      </View>

      <View
          style={{
          marginVertical: px2dp(12),
          backgroundColor: '#fff',
          padding: px2dp(14),
        }}>
        <View>
          <Text style={styles.ji}>银行卡信息</Text>
        </View>

        <View style={[styles.kua, {marginBottom: px2dp(5)}]}>
          <Text style={styles.x}>开户行</Text>
          <Text style={styles.n}>{teamMemberDetail.openingBack}</Text>
        </View>
        <View style={[styles.kua, {marginBottom: px2dp(5)}]}>
          <Text style={styles.x}>银行卡号码</Text>
          <Text style={styles.n}>{teamMemberDetail.bankCardNumber}</Text>
        </View>
        <View style={styles.imagesvv}>
          <Touchable onPress={() => hanleImage(4)}>
            <Image
                source={{
                uri: `${Config.FILE_URL}${teamMemberDetail.bankCardPositivePhotosAttach.name}`,
              }}
                style={styles.sh}
            />
          </Touchable>
          <Touchable onPress={() => hanleImage(5)}>
            <Image
                source={{
                uri: `${Config.FILE_URL}${teamMemberDetail.bankCardBackPhotosAttach.name}`,
              }}
                style={styles.sh}
            />
          </Touchable>
        </View>
      </View>
      {teamMemberDetail.insuranceCertificateAttachList.length > 0 && (
        <View
            style={{
            marginVertical: px2dp(12),
            backgroundColor: '#fff',
            padding: px2dp(14),
          }}>
          <View>
            <Text style={styles.ji}>保险凭证</Text>
          </View>
          {teamMemberDetail.insuranceCertificateAttachList.map(c => (
            <View style={[styles.kua, {marginBottom: px2dp(5)}]} key={c.id}>
              <Text style={styles.x}>保险凭证</Text>
              <Touchable
                  style={{width: px2dp(220)}}
                  onPress={() => handleDownload(c)}>
                <Text style={styles.nb} numberOfLines={1}>
                  {c.originalName}
                </Text>
              </Touchable>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default TeammateDetail;

const styles = MyStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  images: {
    width: 84,
    height: 64,
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 6,
  },
  ji: {
    fontSize: 16,
    fontFamily: 'SimHei',
    color: '#495057',
  },
  kua: {
    width: 344,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9E9E9E',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  x: {
    fontSize: 17,
    fontFamily: 'SimHei',
    color: '#495057',
  },
  n: {
    fontSize: 19,
    fontFamily: 'SimHei',
    color: '#212529',
  },
  sh: {
    width: 169,
    height: 86,
    backgroundColor: '#F8F9FA',
    borderRadius: 6,
  },
  imagesvv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nb: {
    fontSize: 19,
    fontFamily: 'SimHei',
    color: '#00A6FB',
    textDecorationLine: 'underline',
  },
});
