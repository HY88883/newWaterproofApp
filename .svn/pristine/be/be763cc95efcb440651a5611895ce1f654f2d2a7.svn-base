import React, { useEffect, useRef, useState } from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {customStyles} from '@/utils/styles';
import {px2dp, scaleSizeH, scaleSizeW, setSpText, wp} from '@/utils/index';
import {Row, Rows, Table} from 'react-native-table-component';
import DocumentPicker from 'react-native-document-picker';
import {upload} from '@/service/resource';

import {Select} from 'teaset';
import Func from '@/utils/Func';
import {submit} from '@/service/expenseClaim';
import {goBack} from '@/config/RootNavigation';
import {RootState} from '@/models/index';
import {connect, useDispatch, useSelector} from 'react-redux';
import {getConstructionSummary} from '@/service/constructRecord';
import {getCurrentUser} from '@/config/authority';
import {ActionPopover} from 'teaset';
import WaterproofFunc from '@/utils/WaterproofFunc';
import ImagePicker from 'react-native-image-picker';
import { Toast } from '@ant-design/react-native';
import CancelAndConfirm from '@/components/cancelAndConfirm';
import MyStyleSheet from '@/utils/CustomStyleSheet';
import {Controller, useForm} from 'react-hook-form';
import Touchable from '@/components/Touchable/Touchable';
import { useUpdate } from 'ahooks';

//费用报销
function ExpenseReimbursement(props) {
    const {navigation}=props;
    const [fileList,setFileList]=useState([]);
    const [projectItem,setProjectItem]=useState({});
    const user=useRef({});
    const dispatch = useDispatch();
    const obj=useRef({});
    const materialList=useRef([]);
    const {control, handleSubmit, reset, getValues} = useForm();
const update=useUpdate();
    const { projectManage:{ProjectManagement:{list}}}=useSelector(state=>({
        projectManage:state.projectManage
      }));

    const optionsChange = useRef({
        tableHead: ['项目', '金额(元)'],
        tableData: [
          [
            <TextInput
                style={styles.tableInput}
                underlineColorAndroid={'transparent'}
                onChangeText={(text)=>onTextInput('category',text)}
                // name
            />,
            <TextInput
                keyboardType={'decimal-pad'}
                style={styles.tableInput}
                underlineColorAndroid={'transparent'}
                onChangeText={(text)=>onTextInput('amount',text)}
                // amount
            />,
          ],
        ],
      });

  useEffect(() =>{  
    const request =async ()=>{
        user.current = await getCurrentUser();
        dispatch({
            type:'projectManage/page',
            payload:{
            current:1,
            size:999
            }
          });
    };
    request();
  },[]);


   const onTextInput=(field,text)=>{
        obj.current[field]=text;
    };


 const addtableRow = () => {
    if(!WaterproofFunc.isAmountEmpty(obj.current)){
      let newObj=obj.current;
      materialList.current.push(newObj);
      obj.current={};
      optionsChange.current.tableData.push([
        <TextInput
            style={styles.tableInput}
            underlineColorAndroid={'transparent'}
            onChangeText={(text)=>onTextInput('category',text)}
        />,
        <TextInput
            keyboardType={'decimal-pad'}
            style={styles.tableInput}
            underlineColorAndroid={'transparent'}
            onChangeText={(text)=>onTextInput('amount',text)}
        />
      ]);
      update();
    }else{
      Toast.fail('请输入完整后再增加');
    }
  };

const  onSubmit = async (values) => {
    if(Func.isEmptyObject(projectItem)){
        Toast.fail('请选择项目');
        return;
    }
    if (fileList.length === 0) {
        Toast.fail('请上传附件');
      return;
    }
    if(!WaterproofFunc.isAmountEmpty(obj.current)) {
      let newObj=obj.current;
      materialList.current.push(newObj);
    }
    if(materialList.current.length===0){
      Toast.fail('数据不能为空');
      return;
    }
    const params={
      projectId:projectItem.id,
      teamId:user.current.deptId,
      reason:values.reason,
      totalAmount:values.totalAmount,
      expenseClaimDetailList:materialList.current,
      invoiceId:fileList.map(i=>i.attachId).join(',')
    };
    const res=await submit(params);
    if(res.success){
      Toast.success('操作成功');
      goBack();
    }
  };

 const minustableRow = () => {
    if(optionsChange.current.tableData.length>1){
      if(!Func.isEmptyObject(materialList.current)){
        materialList.current.pop();
      }
      obj.current={};
      optionsChange.current.tableData.pop();
      update();
    }else{
      Toast.fail('不能再减少了');
    }
  };

 const handleOperation = (ref,index) => {
    ref.measureInWindow((x, y, width, height) => {
      // console.log(x, y, width, height);
      y=y+px2dp(30);
      let items = [
        {title: '删除', onPress: ()=>handleDeleteFile(index)},
      ];
      ActionPopover.show({x, y, width, height}, items);
    });
  };

  const handleDeleteFile=index=>{
    fileList.splice(index,1);
    setFileList([...fileList]);
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
        async (response) => {
          if (response.assets){
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
              let newFileList = [...fileList, res.data];
              setFileList(newFileList);
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
      let newFileList = [...fileList, res.data];
        setFileList(newFileList);
    } else {
      Toast.fail(res.msg);
    }
  };

  function onError(errors) {
    if (Object.keys(errors).length > 0) {
    Toast.fail(errors[Object.keys(errors)[0]].message);
      return;
    }
  }

    return (
        <View style={styles.container}>
        <ScrollView
            style={[styles.container, {paddingLeft: px2dp(12)}]}>
          <View style={styles.itemStyle}>
            <Text style={customStyles.text}>项目</Text>
            <Select
                style={[styles.selectStyle,{marginLeft: px2dp(8)}]}
                value={projectItem.id}
                valueStyle={styles.valueStyle}
                items={list}
                getItemValue={(item, index) => item.id}
                getItemText={(item, index) => item.projectName}
                iconTintColor="#333"
                placeholder="请选择项目"
                pickerTitle="请选择项目"
                placeholderTextColor={'#999'}
                onSelected={(item, index) =>
                    setProjectItem(item)
                }
                icon={'none'}
            />
          </View>
          <View style={styles.itemStyle}>
            <Text style={customStyles.text}>事由</Text>
            <Controller
                control={control}
                name="reason"
                defaultValue={''}
                rules={{
                required: '请输入事由',
              }}
                render={({field}) => (
                    <TextInput
                        style={[customStyles.inputSStyle,{marginLeft:px2dp(8)}]}
                        onChangeText={field.onChange}
                        value={field.value}
                        placeholder="请输入"
                        placeholderTextColor={'#CED4DA'}
                   />
              )}
            />
          </View>
          <View style={styles.itemStyle}>
            <Text style={customStyles.text}>费用总额</Text>
            <Controller
                control={control}
                name="totalAmount"
                defaultValue={''}
                rules={{
                required: '请输入费用总额',
              }}
                render={({field}) => (
                    <TextInput
                        style={[customStyles.inputSStyle,{marginLeft:px2dp(8),width:'15%'}]}
                        onChangeText={field.onChange}
                        value={field.value}
                        placeholder="请输入"
                        placeholderTextColor={'#CED4DA'}
                    />
              )}
            />
            <Text style={[customStyles.text,{marginLeft:px2dp(4)}]}>元</Text>
          </View>
          <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: px2dp(4),
              }}>
            <Text style={customStyles.text}>费用明细</Text>
            <Touchable onPress={addtableRow}>
              {/* <IconFont
                  name={'add'}
                  style={{marginLeft: scaleSizeW(4)}}
              /> */}
              <Text style={{color:'#333'}}>+++++++++</Text>
            </Touchable>
            <Touchable onPress={minustableRow}>
              {/* <IconFont
                  name={'minus-bold'}
                  style={{marginLeft: scaleSizeW(4)}}
              /> */}
              <Text style={{color:'#333'}}>----------</Text>
            </Touchable>
          </View>
          <Table
              borderStyle={{borderWidth: 1, borderColor: '#333'}}
              style={styles.table}>
            <Row
                flexArr={[3, 1]}
                data={optionsChange.current.tableHead}
                style={styles.head}
                textStyle={[customStyles.text, {textAlign: 'center'}]}
            />
            <Rows
                flexArr={[3, 1]}
                data={optionsChange.current.tableData}
                style={styles.rowsStyle}
                textStyle={[customStyles.text, {textAlign: 'center'}]}
            />
          </Table>

          <View style={styles.uploadFile}>
          <View>
          <View style={[styles.kua,{marginBottom:px2dp(5),alignItems:'flex-start'}]}>
                <Text style={styles.x}>附件</Text>
              <View>
                {
                  fileList&&fileList.length>0&&fileList.map((item,index)=>(
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
        </ScrollView>
        <CancelAndConfirm
            onLeftClick={() => {
                navigation.goBack();
          }}
            onRightClick={handleSubmit(onSubmit, onError)}
            style={{marginVertical:px2dp(12)}}
        />
      </View>
    );
}

const styles = MyStyleSheet.create({
  uploadFile: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
    paddingBottom: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4
  },
  containerinput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#222',
    borderRadius: 2,
    width: wp(60),
    backgroundColor: '#fff',
  },
  inputStyle: {
    padding: 0,
    fontSize: 14,
    color: '#333',
    height: 30,
    width: wp(50),
  },
  rowsStyle: {
    height: 40,
  },
  table: {
    width: wp(90),
    left: 12,
  },
  head: {
    height: 40,
  },
  tableInput: {
    padding: 0,
    fontSize: 13,
    color: '#222',
    textAlign: 'center',
  },
  selectStyle: {color: '#222', width: wp(48), backgroundColor: '#fff'},
  valueStyle: {
    flex: 1,
    color: '#222',
    textAlign: 'left',
    fontSize:14,
  },
  kua: {
    width: '90%',
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
  }
});

export default ExpenseReimbursement;
