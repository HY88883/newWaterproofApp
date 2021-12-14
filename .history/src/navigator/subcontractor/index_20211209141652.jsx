import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function getHeaderTitle(routeName) {
    switch (routeName) {
      case 'Classroom':
        return '施工课堂';
        case 'Mine':
            return '我的';
      default:
        return '施工课堂';
    }
  }

const SubcontractorBottomTabs = (props) => {
    const {navigation, route} = props;

    const lastBackPressed=useRef('');

    useEffect(() =>{
            
    },[]);

    const setOptions = () => {
        // console.log(JSON.stringify(this.props.route))
        const routeName = route.state
        ? route.state.routes[route.state.index].name
        : route.params?.screen || 'Classroom';
        if(routeName === 'Home') {
          navigation.setOptions({
            headerTransparent: true,
            headerTitle: '',
          });
        } else {
          navigation.setOptions({
            headerTransparent: false,
            headerTitle: getHeaderTitle(routeName),
          });
        }
      };
  return (
    <View style={styles.container}>
      <Text>SubcontractorBottomTabs</Text>
    </View>
  );
};

export default SubcontractorBottomTabs;

const styles = StyleSheet.create({
  container: {}
});
