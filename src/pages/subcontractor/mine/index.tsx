import usePageHeaderTitle from '@/components/hooks/usePageHeaderTitle';
import Touchable from '@/components/Touchable/Touchable';
import { removeAll } from '@/config/authority';
import { customStyles } from '@/utils/styles';
import { Modal } from '@ant-design/react-native';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const list=[{name:'项目管理'},{name:'施工队管理'},{name:'人员管理'},{name:'设备管理'},{name:'退出登录'}];

const Mine = (props) => {
  const {navigation}=props;
  usePageHeaderTitle(navigation,'',{headerTitle:'我的',headerTitleAlign:'center'});

 const handleAffairs=(index)=>{
    switch (index) {
        case 0:navigation.navigate('ProjectManagement');break;
        case 1:navigation.navigate('ConstructionTeamManagement');break;
        case 2:navigation.navigate('MemManagement');break;
        case 3:navigation.navigate('DeviceManagement');break;
        case 4:handleLoginout();break;
    }
};

const handleLoginout=()=>{
  Modal.alert(
      <Text style={styles.title}>退出确认</Text>,
      <Text
          style={styles.cancelText}>
          您确定退出吗?
      </Text>,
      [
          {
              text: '取消',
              onPress: () => {},
              style: 'cancel',
          },
          {
              text: '确定',
              onPress: async () => {
                  await removeAll();
                    navigation.reset({
                      index:0,
                      routes:[{name:'Login'}]
                  });
              },
          },
      ],
  );
};

const  handleMap=(item,index)=>{
  return (
      <Touchable style={styles.item} key={index} onPress={()=>handleAffairs(index)}>
          <Text style={customStyles.text}>{item.name}</Text>
          {/* <IconFont name={'jiantou-copy'}/> */}
      </Touchable>
  );
};

  return (
    <View style={styles.container}>
         {
                   list.map(handleMap)
               }
    </View>
  );
};

export default Mine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  item:{
    height:44,
    alignItems:'center',
    justifyContent: 'space-between',
    flexDirection:'row',
    paddingHorizontal:12,
    backgroundColor:'#fff',
    marginVertical:6,
},
title:{color: '#000000', fontSize:18},
cancelText:{
    color: '#888888',
    fontSize: 15,
    lineHeight: 22.5,
},
});
