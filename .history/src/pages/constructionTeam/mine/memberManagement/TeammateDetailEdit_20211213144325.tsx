import { px2dp } from '@/utils/';
import MyStyleSheet from '@/utils/CustomStyleSheet';
import { customStyles } from '@/utils/styles';
import React from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput } from 'react-native';

const TeammateDetailEdit = (props) => {
  return (
    <ScrollView style={styles.container}>
      <View style={{marginVertical:px2dp(12),backgroundColor:'#fff',padding:px2dp(14)}}>
            <View>
              <Text style={styles.ji}>基本信息</Text>
            </View>
            
            <View style={[styles.kua,{marginBottom:px2dp(5)}]}>
              <Text style={styles.x}>姓名</Text>
              <TextInput 
                  style={[customStyles.inputContainerStyle]}
                  onChangeText={field.onChange}
                  value={field.value}
                  placeholder="请输入姓名"
            />
            </View>

            <View style={styles.kua}>
              <Text style={styles.x}>联系方式</Text>
              <TextInput 
                  style={[customStyles.inputContainerStyle]}
                  onChangeText={field.onChange}
                  value={field.value}
                  placeholder="请输入联系方式"
            />
            </View>
            {
              teamMemberDetail.avatar?
             <Touchable onPress={()=>hanleImage(0)}>
                <Image
                    source={{uri: `${Config.FILE_URL}${teamMemberDetail.avatar}`}}
                    style={styles.images}
          />
             </Touchable>:
          <View style={styles.images}/>
            }
      </View>

      <View style={{marginVertical:px2dp(12),backgroundColor:'#fff',padding:px2dp(14)}}>
            <View>
              <Text style={styles.ji}>身份证信息</Text>
            </View>
            
            <View style={[styles.kua,{marginBottom:px2dp(5)}]}>
              <Text style={styles.x}>身份证号码</Text>
              <TextInput 
                  style={[customStyles.inputContainerStyle]}
                  onChangeText={field.onChange}
                  value={field.value}
                  placeholder="请输入身份证号码"
            />
            </View>
    <View style={styles.imagesvv}>
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
    </View>
      </View>

      <View style={{marginVertical:px2dp(12),backgroundColor:'#fff',padding:px2dp(14)}}>
            <View>
              <Text style={styles.ji}>银行卡信息</Text>
            </View>
            
            <View style={[styles.kua,{marginBottom:px2dp(5)}]}>
              <Text style={styles.x}>开户行</Text>
              <TextInput 
                  style={[customStyles.inputContainerStyle]}
                  onChangeText={field.onChange}
                  value={field.value}
                  placeholder="请输入身份证号码"
            />
            </View>
            <View style={[styles.kua,{marginBottom:px2dp(5)}]}>
              <Text style={styles.x}>银行卡号码</Text>
              <Text style={styles.n}>{teamMemberDetail.bankCardNumber}</Text>
            </View>
    <View style={styles.imagesvv}>
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
    </View>
      </View>
        {
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
        }
    </ScrollView>
  );
};

export default TeammateDetailEdit;

const styles = MyStyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#f9f9f9',
      },
      images:{
        width: 84,
    height: 64,
    borderRadius: 6,
    overflow:'hidden',
    marginTop:6
      },
      ji:{
    fontSize: 16,
    fontFamily: 'SimHei',
    color: '#495057'
      },
      kua:{
        width: 344,
    borderWidth:StyleSheet.hairlineWidth,
    borderColor:'#9E9E9E',
    borderRadius:4,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:16,
    paddingVertical:14
      },
      x:{
    fontSize: 17,
    fontFamily: 'SimHei',
    color: '#495057'
      },
      n:{
    fontSize: 19,
    fontFamily: 'SimHei',
    color: '#212529',
      },
      sh:{
        width: 169,
    height: 86,
    backgroundColor: '#F8F9FA',
    borderRadius: 6,
      },
      imagesvv:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
      },
      nb:{
        fontSize: 19,
        fontFamily: 'SimHei',
        color: '#00A6FB',
        textDecorationLine:'underline'
      }
});
