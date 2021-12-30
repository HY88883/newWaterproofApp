import {getCurrentUser} from '@/config/authority';
import MyStyleSheet from '@/utils/CustomStyleSheet';
import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  ScrollView,
  Image,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import Func from '@/utils/Func';
import {Checkbox, Modal, Toast} from '@ant-design/react-native';
import Overlay from '@/components/OverlayLoading';
import {usePrevious} from 'ahooks';
import {wp, hp} from '@/utils/index';
import Touchable from '@/components/Touchable/Touchable';
import {px2dp} from '@/utils/index';
import * as ImagePicker from 'react-native-image-picker';
import {upload} from '@/service/resource';
import CancelAndConfirm from '@/components/cancelAndConfirm';
import { startWork } from '@/service/constructRecord';

const CheckboxItem = Checkbox.CheckboxItem;

const BeginWorkingForm = props => {
  const {navigation,route:{params:{
    getConstructionSummary
  }}} = props;
  const dispatch = useDispatch();
  const user = useRef({});
  const [lives, setLives] = useState({});
  const geolocationRef = useRef({});
  const localLocation = useRef('');
  const projectName = useRef('');
  const projectId = useRef('');
  const localDistance = useRef(0);
  const isProjectlistLoaded = useRef(false);
  const [visible, setVisible] = useState(false);
  const [workPersonnel, setWorkPersonnel] = useState([]);
  const workPersonnelRef = useRef([]);
  const [files, setFiles] = useState([]);
  const [lData, setLData] = useState({
    location: '',
    distance: 0,
    projectName: '',
  });

  const {
    projectManage: {
      ProjectManagement: {list},
    },
    team: {
      getTeamMemberPage: {list: pList, pagination},
    },
  } = useSelector(state => ({
    projectManage: state.projectManage,
    team: state.team,
  }));

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '申请定位权限',
          message: '此App需要使用您的定位功能',
          buttonNeutral: '稍后提醒',
          buttonNegative: '拒绝',
          buttonPositive: '允许',
        },
      ).then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('granted ACCESS_FINE_LOCATION success');
        } else {
          console.log('granted ACCESS_FINE_LOCATION fail');
        }
      });
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: '需要访问相机',
        message: '需要访问相机',
      }).then(r => {
        if (r === PermissionsAndroid.RESULTS.GRANTED) {
        } else {
        }
      });
    }
  }, []);

  const getWeatherInfos = data => {
    geolocationRef.current = data;
    if (data.status === 1) {
      const latitude = data.position.lat.toFixed(4),
        longitude = data.position.lng.toFixed(4);
      const str = `https://restapi.amap.com/v3/geocode/regeo?key=af4503155f02aceb076cff16d94ed6e6&location=${
        longitude + ',' + latitude
      }`;
      axios.get(str).then(r => {
        if (r.status === 200 && r.data.status === '1') {
          const regeocode = r.data.regeocode;
          const adcode = regeocode.addressComponent.adcode;
          axios
            .get(
              `https://restapi.amap.com/v3/weather/weatherInfo?key=af4503155f02aceb076cff16d94ed6e6&city=${adcode}&extensions=base`,
            )
            .then(res => {
              if (res.status === 200 && res.data.status === '1') {
                setLives(res.data.lives[0]);
              }
            });
        }
      });
    }
  };

  useEffect(() => {
    const request = async () => {
      user.current = await getCurrentUser();
      dispatch({
        type: 'projectManage/page',
        payload: {
          current: 1,
          size: 999,
        },
      });
      dispatch({
        type: 'team/getTeamMemberPage',
        payload: {
          deptId: user.current.deptId,
          size: 999,
        },
      });
    };
    request();
  }, []);

  useEffect(() => {
    if (
      list &&
      Object.keys(geolocationRef.current).length > 0 &&
      !lData.projectName
    ) {
      const latitude = geolocationRef.current.position.lat,
        longitude = geolocationRef.current.position.lng;
      if (Func.isEmptyObject(list)) {
        Toast.fail('当前还没有可施工项目，请联系分包商添加项目');
        Overlay.removeLoading();
        navigation.goBack();
      }
      localLocation.current = list[0].location;
      projectName.current = list[0].projectName;
      projectId.current = list[0].id;

      let [onelongitude, onelatitude] = list[0].position.split(',');
      localDistance.current = Func.getDotsDistance(
        latitude,
        longitude,
        onelatitude,
        onelongitude,
      );

      for (let i = 0; i < list.length; i++) {
        let [waitlongitude, waitlatitude] = list[i].position.split(',');
        const distance = Func.getDotsDistance(
          latitude,
          longitude,
          waitlatitude,
          waitlongitude,
        );
        const location = list[i].location;
        const projectName = list[i].projectName;
        const projectId = list[i].id;
        if (localDistance.current > distance) {
          localDistance.current = distance;
          localLocation.current = location;
          projectName.current = projectName;
          projectId.current = projectId;
        }
      }

      if (localDistance.current >= 3) {
        Toast.fail(
          '您所处的位置无法定位到项目，请前往需要施工的项目所在地后重试',
        );
        Overlay.removeLoading();
        navigation.goBack();
      }
      setLData({
        location: localLocation.current,
        distance: localDistance.current,
        projectName: projectName.current,
      });
      isProjectlistLoaded.current = true;
    }
  });

  let source;
  if (Platform.OS === 'ios') {
    source = require('../../../html/bdMap.html');
  } else if (Platform.OS === 'android') {
    source = {uri: 'file:///android_asset/html/bdMap.html'};
  }

  const mapRef = useRef(null);

  const _handleMessage = event => {
    getWeatherInfos(JSON.parse(event.nativeEvent.data));
  };

  const _onLoad = syntheticEvent => {
    mapRef.current.injectJavaScript('getCurrentPosition();true;');
  };

  const handleChange = (checked, index, item) => {
    if (checked) {
      workPersonnel.push(item);
      setWorkPersonnel([...workPersonnel]);
    } else {
      workPersonnel.pop();
      setWorkPersonnel([...workPersonnel]);
    }
    // this.setState({total: this.workPersonnel.length});
  };

  const handleFileChange = files => {
    console.log('files changed', files);
  };

  const handlePhoto = async () => {

    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        maxHeight: 500,
        maxWidth: 500,
        quality: 1.0,
        cameraType: 'back',
        saveToPhotos: true,
      },
      async response => {
        console.log('response', response);

        if (response.assets) {
          const formData = new FormData();
          const imgObj = {
            uri: response.assets[0].uri,
            name: response.assets[0].fileName,
            type: response.assets[0].type,
          };
          formData.append('file', imgObj);
          const res = await upload(formData);
          if (res.success) {
            Toast.success('上传成功');
            files.push(res.data);
            setFiles([...files]);
          } else {
            Toast.fail(res.msg);
          }
        }
      },
    );
  };

  async function handleSubmit(){
    if(Func.isEmptyObject(workPersonnel)){
      Toast.fail('请选择人员');
      return; 
    }
    if(Func.isEmptyObject(files)){
      Toast.fail('请至少上传一张照片');
      return; 
    }
    const params={
      projectId:projectId.current,
      teamId:user.current.deptId,
      weather:lives.weather,
      temperature:lives.temperature,
      windPower:lives.windpower,
      workPersonnel:workPersonnel.join(','),
      dressPhotos:files[0].attachId
    };
const res=await startWork(params);
if(res.success){
  Toast.success('操作成功');
  if(getConstructionSummary){
    getConstructionSummary();
  }
  navigation.goBack();
}else{
  Toast.fail(res.msg);
}
  }

  return (
    <View style={styles.container}>
    <ScrollView style={styles.container}>
    <WebView
        ref={mapRef}
        style={{display: 'none', height: 0, width: 0, flex: 0}}
        containerStyle={{display: 'none', height: 0, width: 0, flex: 0}}
        source={source}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        geolocationEnabled={true}
        androiddomStorageEnabled={false}
        originWhitelist={['*']}
        onMessage={_handleMessage}
        onLoad={_onLoad}
        // injectedJavaScript={patchPostMessageJsCode}
      />
      <View style={styles.vStyle}>
        <Text style={styles.leftText}>时间</Text>
        <Text style={styles.rightText}>
          {Func.dateFormat('YYYY-MM-DD HH:mm:SS', new Date())}
        </Text>
      </View>
      <View style={styles.vStyle}>
        <Text style={styles.leftText}>项目</Text>
        <Text style={styles.rightText}>{lData.projectName}</Text>
      </View>
      <View style={styles.vStyle}>
        <Text style={styles.leftText}>天气</Text>
        <Text style={styles.rightText}>{lives.weather}</Text>
      </View>
      <View style={styles.vStyle}>
        <Text style={styles.leftText}>温度</Text>
        <Text style={styles.rightText}>{lives.temperature} ℃</Text>
      </View>
      <View style={styles.vStyle}>
        <Text style={styles.leftText}>风力</Text>
        <Text style={styles.rightText}>{lives.windpower}</Text>
      </View>

      <Touchable
          style={styles.vStyle}
          onPress={() => {
          setVisible(true);
        }}>
        <Text style={styles.leftText}>人员</Text>
        <Text style={[styles.rightText,{width:'90%'}]}>
          {workPersonnel.map((i, _i) =>
            _i !== workPersonnel.length - 1 ? i.userName + '、' : i.userName,
          )}
          {`  共${workPersonnel.length}人`}
        </Text>
      </Touchable>

      <View
          style={{
          padding: px2dp(24),
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}>
        {files &&
          files.length > 0 &&
          files.map((item, i) => (
            <Touchable key={item.attachId}>
              <Image source={{uri: item.link}} style={styles.imageStyle} />
            </Touchable>
          ))}
        <Touchable
            style={styles.views}
            onPress={() => handlePhoto()}></Touchable>
      </View>
    </ScrollView>
      <CancelAndConfirm
          onLeftClick={() => {
            navigation.goBack();
          }}
          onRightClick={() => {
              handleSubmit();            
          }}
          style={{marginVertical:px2dp(12)}}
        />



      <Modal
          title="选择人员"
          visible={visible}
          closable
          maskClosable
          onClose={() => {
          setVisible(false);
          // setWorkPersonnel([]);
        }}
          popup
          animationType="slide-up">
        <ScrollView style={styles.modal}>
          <View style={styles.xxx}>
            <Text style={styles.rtext}>选择人员</Text>
            <Text
                style={styles.que}
                onPress={() => {
                setVisible(false);
              }}>
              确定
            </Text>
          </View>
          {pList &&
            pList.length > 0 &&
            pList.map((item, index) => (
              <CheckboxItem
                  key={item.userId}
                  onChange={e => handleChange(e.target.checked, index, item)}
                  checked={
                  workPersonnel.findIndex(
                    unit => unit.userId === item.userId,
                  ) !== -1
                }>
                <Text style={styles.rightText}>{item.userName}</Text>
              </CheckboxItem>
            ))}
        </ScrollView>
      </Modal>
    </View>
  );
};

export default BeginWorkingForm;

const styles = MyStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  vStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 12,
    borderBottomColor: '#9E9E9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 14,
  },
  leftText: {
    fontSize: 16,
    color: '#6C757D',
  },
  rightText: {
    fontSize: 17,
    color: '#212529',
    paddingLeft:8
  },
  modal: {
    height: hp(50),
    width: '100%',
    backgroundColor: '#fff',
  },
  rtext: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  que: {
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
  },
  xxx: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomColor: '#9E9E9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  views: {
    width: 82,
    height: 86,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#eee',
    margin: 4,
  },
  imageStyle: {
    width: 82,
    height: 86,
    borderRadius: 4,
    overflow: 'hidden',
    margin: 4,
  },
});
