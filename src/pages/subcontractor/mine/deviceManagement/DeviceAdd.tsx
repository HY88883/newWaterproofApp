import Touchable from '@/components/Touchable/Touchable';
import {px2dp} from '@/utils/';
import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import Config from 'react-native-config';
import {ActionSheet, Toast, Select} from 'teaset';
import * as ImagePicker from 'react-native-image-picker';
import {upload} from '@/service/resource';
import {customStyles} from '@/utils/styles';
import {Controller, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import MyStyleSheet from '@/utils/CustomStyleSheet';
import {DatePicker} from '@ant-design/react-native';
import DocumentPicker from 'react-native-document-picker';
import { getCurrentUser } from '@/config/authority';
import CancelAndConfirm from '@/components/cancelAndConfirm';
import Func from '@/utils/Func';
import { submit } from '@/service/equipment';

export const CustomPickerChildren = props => (
  <Touchable onPress={props.onPress}>
    <View style={[styles.infoInputStyle]}>
      <Text style={customStyles.textShow}>{props.children}</Text>
      <Text
          style={{
          ...customStyles.textShow,
          color: props.extra.includes('请选择') ? '#CED4DA' : '#333333',
        }}>
        {props.extra}
      </Text>
    </View>
  </Touchable>
);

const DeviceAdd = props => {
  const {navigation} = props;
  const {control, handleSubmit, reset, getValues} = useForm();
  const dispatch = useDispatch();

  const [linkObj, setLinkObj] = useState('');
  const [classificationItem, setClassificationItem] = useState({});
  const [goumaiDate, setGoumaiDate] = useState('');
  const [uploadFileList,setUploadFileList] = useState([]);
    const userRef=useRef({});
const [operationItem,setOperationItem] =useState({});
const [teamItem,setTeamItem] = useState({});

  const {
    equipment: {
      equipmentInit: {classificationInit},
    },
    team: {
        TeamList: {list},
        getTeamMemberPage: {list:memberList, pagination},
      },
  } = useSelector(state => ({
    equipment: state.equipment,
    team:state.team
  }));

  useEffect(() =>{
    (
        async () =>{
            userRef.current = await getCurrentUser();
            dispatch({
                type: 'team/list',
                payload: {},
              });
              dispatch({
                type: 'equipment/equipmentInit'
              });
        }
    )();
    return ()=>{
      dispatch({
        type:'team/clearDeviceAdd'
      });
    };
  },[]);


  const handleUploadPhoto = () => {
    //拍摄照片
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
              setLinkObj({link: res.data.name, attachId: res.data.attachId});
            } else {
              Toast.fail(res.msg);
            }
          }
        },
      );
    };

    //从相册中选择图片
    const selectPhoto = () => {
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
              setLinkObj({link: res.data.name, attachId: res.data.attachId});
            } else {
              Toast.fail(res.msg);
            }
          }
        },
      );
    };
    let items = [
      {title: '拍摄', onPress: handlePhoto},
      {title: '从相册中选择', onPress: selectPhoto},
    ];
    let cancelItem = {title: '取消'};
    ActionSheet.show(items, cancelItem);
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
      let newFileList = [...uploadFileList, res.data];
        setUploadFileList(newFileList);
    } else {
      Toast.fail(res.msg);
    }
  };

  const onSelected = (item, index) => {
    setOperationItem({});
    setTeamItem(item);
    dispatch({
      type: 'team/getTeamMemberPage',
      payload: {
        deptId: item.id,
      },
    });
  };

  const   onSelectedOperation=(item,index)=>{
    setOperationItem(item);
  };

  function onError(errors) {
    if (Object.keys(errors).length > 0) {
      Toast.fail(errors[Object.keys(errors)[0]].message);
      return;
    }
  }

async function onFinish(values){
  if(!linkObj.link){
    Toast.fail('请上传设备图片');
    return; 
  }
  if(Func.isEmptyObject(classificationItem)){
    Toast.fail('请选择设备分类');
    return; 
  }
  if(!goumaiDate){
    Toast.fail('请选择购买日期');
    return; 
  }
  const params={
    ownershipId:userRef.current.deptId,
    rightToUseId:teamItem.id,
    operator:operationItem.id,
    photo:linkObj.link,
    code:values.code,
    name:values.name,
    model:classificationItem.dictValue,
    warrantyPeriod:values.warrantyPeriod,
    purchasingDate:Func.dateFormat('YYYY-MM-DD',goumaiDate),
    attachId:uploadFileList.map(i=>i.attachId).join(',')
  };
  const res=await submit(params);
  if(res.success){
    // actions.setSubmitting(false)
    Toast.success('操作成功');
    navigation.goBack();
  }else{
    Toast.fail(res.msg);
  }
}

  return (
  <View style={styles.conxx}>
      <ScrollView style={styles.container}>
      <View style={styles.containerView}>
        <View style={{alignSelf: 'center', paddingVertical: px2dp(40)}}>
          {
            <Touchable onPress={handleUploadPhoto}>
              {linkObj.link ? (
                <Image
                    source={{uri: `${Config.FILE_URL}${linkObj.link}`}}
                    style={styles.imageStyle}
                />
              ) : (
                <View style={[styles.imageStyle,{backgroundColor:'#eee'}]} />
              )}
            </Touchable>
          }
        </View>
        <View style={styles.projectName}>
          <Text style={customStyles.textShow}>设备编号</Text>
          <Controller
              control={control}
              name="code"
              defaultValue={''}
              rules={{
              required: '请输入设备编号',
            }}
              render={({field}) => (
              <TextInput
                  style={[customStyles.inputDStyle]}
                  onChangeText={field.onChange}
                  value={field.value}
                  placeholder="请输入"
                  placeholderTextColor={'#CED4DA'}
                  textAlign={'right'}
              />
            )}
          />
        </View>
        <View style={styles.projectName}>
          <Text style={customStyles.textShow}>设备名称</Text>
          <Controller
              control={control}
              name="name"
              defaultValue={''}
              rules={{
              required: '请输入设备名称',
            }}
              render={({field}) => (
              <TextInput
                  style={[customStyles.inputDStyle]}
                  onChangeText={field.onChange}
                  value={field.value}
                  placeholder="请输入"
                  placeholderTextColor={'#CED4DA'}
                  textAlign={'right'}
              />
            )}
          />
        </View>
        <View style={styles.projectName}>
          <Text style={customStyles.textShow}>设备分类</Text>
          <Select
              style={styles.containerinput}
              value={classificationItem.dictKey}
              valueStyle={styles.valueStyle}
              items={classificationInit}
              getItemValue={(item, index) => item.dictKey}
              getItemText={(item, index) => item.dictValue}
              iconTintColor="#333"
              placeholder="请选择"
              pickerTitle="请选择"
              placeholderTextColor={'#CED4DA'}
              onSelected={item => setClassificationItem(item)}
              icon={'none'}
          />
        </View>
        <View style={styles.projectName}>
          <Text style={customStyles.textShow}>使用权人</Text>
          <Select
              style={styles.containerinput}
              value={teamItem.id}
              valueStyle={styles.valueStyle}
              items={list}
              getItemValue={(item, index) => item.id}
              getItemText={(item, index) => item.deptName}
              iconTintColor="#333"
              placeholder="请选择"
              pickerTitle="请选择"
              placeholderTextColor={'#CED4DA'}
              onSelected={onSelected}
              icon={'none'}
          />
        </View>
        <View style={styles.projectName}>
          <Text style={customStyles.textShow}>操作者</Text>
          <Select
              style={styles.containerinput}
              value={operationItem.userId}
              valueStyle={styles.valueStyle}
              items={memberList}
              getItemValue={(item, index) => item.userId}
              getItemText={(item, index) => item.userName}
              iconTintColor="#333"
              placeholder="请选择"
              pickerTitle="请选择"
              placeholderTextColor={'#CED4DA'}
              onSelected={onSelectedOperation}
              icon={'none'}
          />
        </View>
        <View style={styles.projectName}>
          <Text style={customStyles.textShow}>设备保修期</Text>
          <Controller
              control={control}
              name="warrantyPeriod"
              defaultValue={''}
              rules={{
              required: '请输入设备保修期',
            }}
              render={({field}) => (
              <TextInput
                  style={[customStyles.inputDStyle]}
                  onChangeText={field.onChange}
                  value={field.value}
                  placeholder="请输入"
                  placeholderTextColor={'#CED4DA'}
                  textAlign={'right'}
              />
            )}
          />
        </View>
        <DatePicker
            style={{marginTop: px2dp(2)}}
            value={goumaiDate}
            mode="date"
            defaultDate={new Date()}
            minDate={new Date(2000, 0, 0)}
            maxDate={new Date(2100, 0, 0)}
            onChange={(value: any) => {
            setGoumaiDate(value);
          }}
            format="YYYY-MM-DD"
            extra={'请选择购买日期'}>
          <CustomPickerChildren>购买日期</CustomPickerChildren>
        </DatePicker>
        <View style={styles.uploadFile}>
          <Text style={customStyles.textShow}>附件</Text>
          <View>
          <View style={[styles.kua,{marginBottom:px2dp(5),alignItems:'flex-start'}]}>
                <Text style={styles.x}>附件</Text>
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
        </View>
      </View>
    </ScrollView>
    <CancelAndConfirm onLeftClick={()=>{navigation.goBack();}}
        onRightClick={handleSubmit(onFinish, onError)}
        style={{marginVertical:px2dp(24)}}
      />
  </View>
  );
};

export default DeviceAdd;

const styles = MyStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  projectName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#999',
    borderTopColor: '#999',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 14,
  },
  containerView: {
    marginHorizontal: 30,
    //   alignSelf:'center',
  },
  imageStyle: {
    width: 86,
    height: 86,
    borderRadius: 4,
    overflow: 'hidden',
  },
  uploadFile: {
    marginTop: 15
  },
  containerinput: {
    backgroundColor: '#fff',
    flex: 1,
    borderWidth:0
  },
  valueStyle: {
    flex: 1,
    textAlign: 'right',
    // width: '20%',
    height: 30,
    color:'#333',
    fontSize:19,
    left:20
    // padding:0,
    // margin:0
  },
  infoInputStyle: {
    borderBottomColor: '#999',
    borderTopColor: '#999',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  kua: {
    width: '100%',
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
  nb: {
    fontSize: 19,
    fontFamily: 'SimHei',
    color: '#00A6FB',
    textDecorationLine: 'underline',
  },
  nbx:{
    fontSize: 19,
    fontFamily: 'SimHei',
    color: '#666',
  },
  conxx:{
    flex:1,
    backgroundColor:'#fff'
  }
});
