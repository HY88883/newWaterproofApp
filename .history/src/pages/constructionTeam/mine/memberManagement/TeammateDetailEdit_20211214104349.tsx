import {px2dp} from '@/utils/';
import MyStyleSheet from '@/utils/CustomStyleSheet';
import {customStyles} from '@/utils/styles';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  PermissionsAndroid,
  Platform,
  Image,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import CancelAndConfirm from '@/components/cancelAndConfirm';
import StepIndicator from 'react-native-step-indicator';
import Touchable from '@/components/Touchable/Touchable';
import {Toast} from '@ant-design/react-native';
import {upload} from '@/service/resource';
import Config from 'react-native-config';
import * as ImagePicker from 'react-native-image-picker';
import Func from '@/utils/Func';
import { submitTeamMember, teamMemberDetail } from '@/service/team';
import { useSelector } from 'react-redux';
import {Select} from 'teaset';
import DocumentPicker from 'react-native-document-picker';

const labels = ['基本信息', '身份证', '银行卡'];
const customStylesLine = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: '#6C757D',
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: '#009D35',
  stepStrokeUnFinishedColor: '#CED4DA',
  separatorFinishedColor: '#009D35',
  separatorUnFinishedColor: '#CED4DA',
  stepIndicatorFinishedColor: '#009D35',
  stepIndicatorUnFinishedColor: '#CED4DA',
  stepIndicatorCurrentColor: '#fff',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: '#6C757D',
  stepIndicatorLabelFinishedColor: '#009D35',
  stepIndicatorLabelUnFinishedColor: '#CED4DA',
  labelColor: '#CED4DA',
  labelSize: 13,
  currentStepLabelColor: '#6C757D',
};
const TeammateDetailEdit = props => {
    const {navigation}=props;
  const {control, handleSubmit, reset, getValues} = useForm();
  const [isStepFinish, setIsStepFinish] = useState([false, false, false]);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [files, setFiles] = useState([]);
  const [teamId,setTeamId] = useState('');
  const [uploadFileList,setUploadFileList] = useState([]);

  const { team: {
    TeamList: {list},
},}=useSelector(state=>({
  team:state.team
  }));

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: '需要访问相册',
            message: '需要访问相册',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // this.setState({
          //   granted: true,
          // })
        } else {
          // this.setState({
          //   granted: false,
          // })
        }
      } catch (err) {
        console.warn(err);
      }
    };
    if (Platform.OS === 'android') {
      requestCameraPermission();
    }
  }, []);

  useEffect(() =>{
    
    const {route:{params}}=props;
    if(params&&params.id){
      teamMemberDetail({userId:params.id}).then(r=>{
        if(r.success){    
            const data=r.data;
            reset(data);
         if(data.teamId)   setTeamId(data.teamId);
                files[0] = {
                  avatarLink: data.avatar,
                  avatorattachId: ''
                };
                files[1] = {
                  identityPositionLink: data.idCardPositivePhotosAttach.name,
                  identityPositionId: data.idCardPositivePhotosAttach.id,
                };
                files[2] = {
                  identityOppositionLink: data.idCardBackPhotosAttach.name,
                  identityOppositionId: data.idCardBackPhotosAttach.id
                };
                files[3] = {
                    bankcardPositionLink: data.bankCardPositivePhotosAttach.name,
                    bankcardPositionId: data.bankCardPositivePhotosAttach.id
                  };
                files[4] = {
                    bankcardOppositionLink: data.bankCardBackPhotosAttach.id,
                    bankcardOppositionId: data.bankCardBackPhotosAttach.name
                  };
                  setFiles([...files]);
                if(data.insuranceCertificateAttachList&&data.insuranceCertificateAttachList.length>0){
                  setUploadFileList(data.insuranceCertificateAttachList);  
        }
      }
      });
    }
  },[]);

  function onError(errors) {
    if (Object.keys(errors).length > 0) {
      Toast.fail(errors[Object.keys(errors)[0]].message);
      return;
    }
  }

  function onFinish(values) {
    if (!files[0]) {
      Toast.fail('请上传头像');
      return;
    }
    setIsStepFinish([true, false, false]);
    setCurrentPosition(1);
  }

  function onFinishs(values) {
    if (!files[1]) {
      Toast.fail('请上传身份证正面照片');
      return;
    }
    if (!files[2]) {
      Toast.fail('请上传身份证反面照片');
      return;
    }
    setIsStepFinish([true, true, false]);
    setCurrentPosition(2);
  }

  async function  onFinisht(values){
    if (!files[3]) {
        Toast.fail('请上传银行卡正面照片');
        return;
      }
      if (!files[4]) {
        Toast.fail('请上传银行卡背面照片');
        return;
      }
      setIsStepFinish([true, true, true]);
      setCurrentPosition(3);

      const params = {
        // id,
        // userId,
        // teamId,
        avatar: files[0].avatarLink,
        userName: values.userName,
        phone: values.phone,
        idCardPositivePhotos: files[1].identityPositionId,
        idCardBackPhotos: files[2].identityOppositionId,
        idCardNumber: values.idCardNumber,
        bankCardPositivePhotos: files[3].bankcardPositionId,
        bankCardBackPhotos: files[4].bankcardOppositionId,
        openingBack: values.openingBack,
        bankCardNumber: values.bankCardNumber,
        emergencyContactName:values.emergencyContactName,
        emergencyContactWay:values.emergencyContactWay,
        insuranceCertificate: Func.isEmptyObject(uploadFileList)?'':uploadFileList.map((v) => v.attachId || v.id).join(','),
      };
  
      const res = await submitTeamMember(params);

      if(res.success){
      Toast.success('操作成功');
        navigation.goBack();
      }
  }

  const hanleImage = type => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        maxHeight: 500,
        maxWidth: 500,
        quality: 1.0,
      },
      async response => {
        if (response.assets) {
          console.log(response);
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
            switch (type) {
              case 1:
                files[0] = {
                  avatarLink: res.data.name,
                  avatorattachId: res.data.attachId,
                };
                setFiles([...files]);
                break;
              case 2:
                files[1] = {
                  identityPositionLink: res.data.name,
                  identityPositionId: res.data.attachId,
                };
                setFiles([...files]);
                break;
              case 3:
                files[2] = {
                  identityOppositionLink: res.data.name,
                  identityOppositionId: res.data.attachId,
                };
                setFiles([...files]);
                break;
              case 4:
                files[3] = {
                    bankcardPositionLink: res.data.name,
                    bankcardPositionId: res.data.attachId,
                  };
                  setFiles([...files]);
                break;
              case 5:
                files[4] = {
                    bankcardOppositionLink: res.data.name,
                    bankcardOppositionId: res.data.attachId,
                  };
                  setFiles([...files]);
                break;
            }
          } else {
            Toast.fail('上传失败');
          }
        }
      },
    );
  };

 const handleUploadFile = async () => {
    const picker = await DocumentPicker.pick({
      type: [
        DocumentPicker.types.doc,
        DocumentPicker.types.docx,
        DocumentPicker.types.ppt,
        DocumentPicker.types.pptx,
        DocumentPicker.types.xls,
        DocumentPicker.types.xlsx,
        DocumentPicker.types.pdf,
        DocumentPicker.types.plainText,
        DocumentPicker.types.images,
      ],
    });
    
    const formData = new FormData();
    formData.append('file', picker[0]);
    const res = await upload(formData);
    if (res.success) {
      Toast.success('上传成功');
      console.log(res);
      let newFileList = [...uploadFileList, res.data];
        setUploadFileList(newFileList);
    } else {
      Toast.fail(res.msg);
    }
  };

  const handleOperation = (ref,index) => {
    // console.log(ref,index)
    ref.measureInWindow((x, y, width, height) => {
      // console.log(x, y, width, height);
      y=y+scaleSizeH(30);
      let items = [
        {title: '删除', onPress: ()=>this.handleDeleteFile(index)},
      ];
      ActionPopover.show({x, y, width, height}, items);
    });
  };

  const handleDeleteFile=index=>{
    let {fileList}=this.state;
    // console.log('fileList'+JSON.stringify(fileList),index)
    fileList.splice(index,1);
    this.setState({fileList});
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{paddingVertical: px2dp(8)}}>
        <StepIndicator
            customStyles={customStylesLine}
            currentPosition={currentPosition}
            labels={labels}
            stepCount={3}
        />
      </View>
      {!isStepFinish[0] && (
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
            <Controller
                control={control}
                name="userName"
                defaultValue={''}
                rules={{
                required: '请输入姓名',
              }}
                render={({field}) => (
                <TextInput
                    style={[customStyles.inputMStyle]}
                    onChangeText={field.onChange}
                    value={field.value}
                    placeholder="请输入"
                    placeholderTextColor={'#CED4DA'}
                    textAlign={'right'}
                />
              )}
            />
          </View>

          <View style={styles.kua}>
            <Text style={styles.x}>联系方式</Text>
            <Controller
                control={control}
                name="phone"
                defaultValue={''}
                rules={{
                required: '请输入联系方式',
              }}
                render={({field}) => (
                <TextInput
                    style={[customStyles.inputMStyle]}
                    onChangeText={field.onChange}
                    value={field.value}
                    placeholder="请输入"
                    placeholderTextColor={'#CED4DA'}
                    textAlign={'right'}
                />
              )}
            />
          </View>
          {files[0] && files[0].avatarLink ? (
            <Touchable onPress={() => hanleImage(1)}>
              <Image
                  source={{uri: `${Config.FILE_URL}${files[0].avatarLink}`}}
                  style={styles.images}
              />
            </Touchable>
          ) : (
            <Touchable style={styles.images} onPress={() => hanleImage(1)} />
          )}
           {
                      Func.ifubcontractor&&<View
                          style={[
                            styles.infoInputView,
                            {marginVertical: px2dp(8)},
                          ]}>
                        <Text style={styles.x}>人员所属队：</Text>
                        <Select
                            style={styles.selectStyle}
                            value={teamId}
                            valueStyle={styles.valueStyle}
                            items={list}
                            getItemValue={(item, index) => item.id}
                            getItemText={(item, index) => item.deptName}
                            iconTintColor="#333"
                            placeholder="请选择人员所属队"
                            pickerTitle="请选择人员所属队"
                            placeholderTextColor={'#999'}
                            onSelected={(item, index) =>{
                              setTeamId(item.id);
                            }}
                        />
                      </View>
                    }
<View style={[styles.kua,{marginVertical:px2dp(8)}]}>
            <Text style={styles.x}>紧急联系人姓名</Text>
            <Controller
                control={control}
                name="emergencyContactName"
                defaultValue={''}
                rules={{
                required: '请输入紧急联系人姓名',
              }}
                render={({field}) => (
                <TextInput
                    style={[customStyles.inputMStyle]}
                    onChangeText={field.onChange}
                    value={field.value}
                    placeholder="请输入"
                    placeholderTextColor={'#CED4DA'}
                    textAlign={'right'}
                />
              )}
            />
          </View>
          <View style={styles.kua}>
            <Text style={styles.x}>紧急联系人联系方式</Text>
            <Controller
                control={control}
                name="emergencyContactWay"
                defaultValue={''}
                rules={{
                required: '请输入紧急联系人联系方式',
              }}
                render={({field}) => (
                <TextInput
                    style={[customStyles.inputMStyle]}
                    onChangeText={field.onChange}
                    value={field.value}
                    placeholder="请输入"
                    placeholderTextColor={'#CED4DA'}
                    textAlign={'right'}
                />
              )}
            />
          </View>

          <Touchable
              style={styles.rightView}
              onPress={handleSubmit(onFinish, onError)}>
            <Text style={styles.rightText}>下一步</Text>
          </Touchable>
        </View>
      )}

      {isStepFinish[0] && !isStepFinish[1] && (
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
            <Controller
                control={control}
                name="idCardNumber"
                defaultValue={''}
                rules={{
                required: '请输入身份证号码',
              }}
                render={({field}) => (
                <TextInput
                    style={[customStyles.inputMStyle]}
                    onChangeText={field.onChange}
                    value={field.value}
                    placeholder="请输入身份证号码"
                    placeholderTextColor={'#CED4DA'}
                    textAlign={'right'}
                />
              )}
            />
          </View>
          <View style={styles.imagesvv}>
            {files[1] && files[1].identityPositionLink ? (
              <Touchable onPress={() => hanleImage(2)}>
                <Image
                    source={{
                    uri: `${Config.FILE_URL}${files[1].identityPositionLink}`,
                  }}
                    style={styles.sh}
                />
              </Touchable>
            ) : (
              <Touchable style={styles.sh} onPress={() => hanleImage(2)} />
            )}
            {files[2] && files[2].identityOppositionLink ? (
              <Touchable onPress={() => hanleImage(3)}>
                <Image
                    source={{
                    uri: `${Config.FILE_URL}${files[2].identityOppositionLink}`,
                  }}
                    style={styles.sh}
                />
              </Touchable>
            ) : (
              <Touchable style={styles.sh} onPress={() => hanleImage(3)} />
            )}
          </View>
          <Touchable
              style={styles.rightView}
              onPress={handleSubmit(onFinishs, onError)}>
            <Text style={styles.rightText}>下一步</Text>
          </Touchable>
        </View>
      )}

      {isStepFinish[0] && isStepFinish[1] && !isStepFinish[2] && (
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
            <Controller
                control={control}
                name="openingBack"
                defaultValue={''}
                rules={{
                required: '请输入开户行',
              }}
                render={({field}) => (
                <TextInput
                    style={[customStyles.inputMStyle]}
                    onChangeText={field.onChange}
                    value={field.value}
                    placeholder="请输入开户行"
                    placeholderTextColor={'#CED4DA'}
                    textAlign={'right'}
                />
              )}
            />
          </View>
          <View style={[styles.kua, {marginBottom: px2dp(5)}]}>
            <Text style={styles.x}>银行卡号码</Text>
            <Controller
                control={control}
                name="bankCardNumber"
                defaultValue={''}
                rules={{
                required: '请输入银行卡号码',
              }}
                render={({field}) => (
                <TextInput
                    style={[customStyles.inputMStyle]}
                    onChangeText={field.onChange}
                    value={field.value}
                    placeholder="请输入银行卡号码"
                    placeholderTextColor={'#CED4DA'}
                    textAlign={'right'}
                />
              )}
            />
          </View>
          <View style={styles.imagesvv}>
            {files[3] && files[3].bankcardPositionLink ? (
              <Touchable onPress={() => hanleImage(4)}>
                <Image
                    source={{
                    uri: `${Config.FILE_URL}${files[3].bankcardPositionLink}`,
                  }}
                    style={styles.sh}
                />
              </Touchable>
            ) : (
              <Touchable style={styles.sh} onPress={() => hanleImage(4)} />
            )}
            {files[4] && files[4].bankcardOppositionLink ? (
              <Touchable onPress={() => hanleImage(5)}>
                <Image
                    source={{
                    uri: `${Config.FILE_URL}${files[4].bankcardOppositionLink}`,
                  }}
                    style={styles.sh}
                />
              </Touchable>
            ) : (
              <Touchable style={styles.sh} onPress={() => hanleImage(5)} />
            )}
          </View>

          <View style={{marginVertical:px2dp(12),backgroundColor:'#fff',padding:px2dp(14)}}>
          <View>
            <Text style={styles.ji}>保险凭证</Text>
          </View>
                <View style={[styles.kua,{marginBottom:px2dp(5),alignItems:'flex-start'}]}>
                <Text style={styles.x}>保险凭证</Text>
              <View>
                {
                  uploadFileList&&uploadFileList.length>0&&uploadFileList.map((item,index)=>(
                    <Touchable style={{width:px2dp(220)}} key={(item.attachId||item.id)}
                    >
                    <Text style={styles.nb} numberOfLines={1}>{item.originalName}</Text>
                    </Touchable>
                  ))
                }
              <Touchable style={{width:px2dp(220)}} onPress={()=>handleUploadFile()}>
                <Text style={styles.nbx} numberOfLines={1}>上传文件</Text>
                </Touchable>
              </View>
              </View>
         
    </View>

          <CancelAndConfirm onLeftClick={() =>{
              navigation.goBack();
          }}
              onRightClick={handleSubmit(onFinisht, onError)}
              style={{marginTop:px2dp(12)}}
          />
        </View>
      )}
        
    </ScrollView>
  );
};

export default TeammateDetailEdit;

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
  rightView: {
    width: 140,
    height: 40,
    borderWidth: 1,
    borderColor: '#246DDE',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#246DDE',
    alignSelf: 'center',
    marginTop: 12,
  },
  rightText: {
    fontSize: 20,
    fontFamily: 'SimHei',
    color: '#fff',
    lineHeight: 40,
    textAlign: 'center',
  },
  infoInputView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectStyle: {color: '#222', width: 48, backgroundColor: '#fff',borderColor: '#ccc'},
  valueStyle: {
    flex: 1,
    color: '#222',
    textAlign: 'left',
    fontSize:14
  },
  nbx:{
    fontSize: 19,
    fontFamily: 'SimHei',
    color: '#666',
  }
});
