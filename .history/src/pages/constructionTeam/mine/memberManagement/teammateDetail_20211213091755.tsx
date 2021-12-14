import MyStyleSheet from '@/utils/CustomStyleSheet';
import  React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';


const TeammateDetail = (props) => {
  const {route:{params:{id:userId}}}=props
  const dispatch = useDispatch();

    useEffect(()=>{
      dispatch({
        type: 'team/teamMemberDetail',
        payload: {userId},
      });
    },[])
    
  return (
    <View style={styles.container}>
      <Text>componentName</Text>
    </View>
  );
};

export default TeammateDetail;

const styles = MyStyleSheet.create({
  container: {}
});
