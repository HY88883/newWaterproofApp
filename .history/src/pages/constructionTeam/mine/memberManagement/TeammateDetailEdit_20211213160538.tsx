import {px2dp} from '@/utils/';
import MyStyleSheet from '@/utils/CustomStyleSheet';
import {customStyles} from '@/utils/styles';
import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView, TextInput} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import CancelAndConfirm from '@/components/cancelAndConfirm';
import StepIndicator from 'react-native-step-indicator';
import Touchable from '@/components/Touchable/Touchable';
import { Toast } from '@ant-design/react-native';

const labels = ['基本信息','身份证','银行卡'];
const customStylesLine = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
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
  currentStepLabelColor: '#6C757D'
};
const TeammateDetailEdit = props => {
  const {control, handleSubmit, reset, getValues} = useForm();
  const [isStepFinish, setIsStepFinish] = useState([false, false, false]);
    const [currentPosition,setCurrentPosition]=useState(1);

    function onError(errors) {
        
        if (Object.keys(errors).length > 0) {
        Toast.fail(errors[Object.keys(errors)[0]].message);
          return;
        }
      }

      function onFinish(values){
        setIsStepFinish([true,false,false]);            
      }

  return (
    <ScrollView style={styles.container}>
     <View style={{paddingVertical:px2dp(8)}}>
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
                    placeholder="请输入姓名"
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
                    placeholder="请输入联系方式"
                    placeholderTextColor={'#CED4DA'}
                    textAlign={'right'}
                />
              )}
            />
          </View>
          {/* {
          teamMemberDetail.avatar?
         <Touchable onPress={()=>hanleImage(0)}>
            <Image
                source={{uri: `${Config.FILE_URL}${teamMemberDetail.avatar}`}}
                style={styles.images}
      />
         </Touchable>:
      <View style={styles.images}/>
        } */}
           <Touchable style={styles.rightView} 
               onPress={handleSubmit(onFinish,onError)}
           >
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
          {/* <View style={styles.imagesvv}>
<Touchable onPress={()=>hanleImage(1)}>
<Image
    source={{uri: `${Config.FILE_URL}${teamMemberDetail.idCardPositivePhotosAttach.name}`}}
    style={styles.sh}
        />
</Touchable>
<Touchable onPress={()=>hanleImage(2)}>
       <Image
           source={{uri: `${Config.FILE_URL}${teamMemberDetail.idCardBackPhotosAttach.name}`}}
           style={styles.sh}
        />
        </Touchable>
</View> */}
        {/* <CancelAndConfirm/> */}
        <Touchable style={styles.rightView} onClick={()=>{}} disabled>
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
          {/* <View style={styles.imagesvv}>
<Touchable onPress={()=>hanleImage(4)}>
<Image
 source={{uri: `${Config.FILE_URL}${teamMemberDetail.bankCardPositivePhotosAttach.name}`}}
 style={styles.sh}
         />
</Touchable>
<Touchable onPress={()=>hanleImage(5)}>
<Image
 source={{uri: `${Config.FILE_URL}${teamMemberDetail.bankCardBackPhotosAttach.name}`}}
 style={styles.sh}
         />
</Touchable>
 </View> */}
        <CancelAndConfirm/>
        </View>
      )}
      {/* {
          teamMemberDetail.insuranceCertificateAttachList.length > 0 &&
          <View style={{marginVertical:px2dp(12),backgroundColor:'#fff',padding:px2dp(14)}}>
          <View>
            <Text style={styles.ji}>保险凭证</Text>
          </View>
            {
              teamMemberDetail.insuranceCertificateAttachList.map(c=>(
                <View style={[styles.kua,{marginBottom:px2dp(5)}]} key={c.id}>
                <Text style={styles.x}>保险凭证</Text>
                <Touchable style={{width:px2dp(220)}} onPress={()=>handleDownload(c)}>
                <Text style={styles.nb} numberOfLines={1}>{c.originalName}</Text>
                </Touchable>
              </View>
              ))
            }
         
    </View>
        } */}
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
    backgroundColor:'#246DDE',
    alignSelf:'center',
    marginTop:12
  },
  rightText:{
    fontSize: 20,
    fontFamily: 'SimHei',
    color: '#fff',
    lineHeight:40,
    textAlign: 'center'
  }
});
