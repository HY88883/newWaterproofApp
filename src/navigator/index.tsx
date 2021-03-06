import MyStyleSheet from '@/utils/CustomStyleSheet';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import {navigationRef} from '@/config/RootNavigation';

import * as React from 'react';
import {Text, View, StyleSheet, Platform, StatusBar} from 'react-native';
import Login from '@/pages/login';
import ConstructionTeamBottomTabs from './constructionTeam';
import ConstructionLog from '@/pages/subcontractor/home/projectDetail/constructionLog';
import ConstructionRecordList from '@/pages/constructionTeam/home/ConstructionRecordList';
import ProjectManagement from '@/pages/subcontractor/mine/projectManagement';
import ConstructionTeamManagement from '@/pages/subcontractor/mine/constructionTeamManagement';
import TeamManagementDetail from '@/pages/subcontractor/mine/projectManagement/teamManagementDetail';
import MemManagement from '@/pages/subcontractor/mine/memManagement';
import TeammateDetail from '@/pages/constructionTeam/mine/memberManagement/teammateDetail';
import PhotoBrowserScene from '@/pages/constructionTeam/mine/memberManagement/photoBrowserScene';
import TeammateDetailEdit from '@/pages/constructionTeam/mine/memberManagement/TeammateDetailEdit';
import MemberManagement from '@/pages/constructionTeam/mine/memberManagement';
import DeviceManagement from '@/pages/subcontractor/mine/deviceManagement';
import DeviceView from '@/pages/subcontractor/mine/deviceManagement/DeviceView';
import DeviceAdd from '@/pages/subcontractor/mine/deviceManagement/DeviceAdd';
import DeviceRollout from '@/pages/subcontractor/mine/deviceManagement/DeviceRollout';
import AttendanceRecord from '@/pages/constructionTeam/mine/attendanceRecord';
import AttendanceRecordDetail from '@/pages/constructionTeam/mine/attendanceRecord/AttendanceRecordDetail';
import MaterialStockList from '@/pages/constructionTeam/mine/materialStockList';
import MaterialRequisition from '@/pages/constructionTeam/home/materialRequisition';
import ExpenseReimbursement from '@/pages/constructionTeam/home/expenseReimbursement';
import MaterialSign from '@/pages/constructionTeam/home/MaterialSign';
import BeginWorkingForm from '@/pages/constructionTeam/home/beginWorkingForm';
import SubcontractorBottomTabs from './subcontractor';
import MaterialApproval from '@/pages/subcontractor/home/materialApproval';
import cancleWork from '@/pages/constructionTeam/home/cancleWork';
import MaterialApprovalDetail from '@/pages/subcontractor/home/materialApproval/MaterialApprovalDetail';
import ExpenseApproval from '@/pages/subcontractor/home/expenseApproval';
import ExpenseApprovalDetail from '@/pages/subcontractor/home/expenseApproval/ExpenseApprovalDetail';
import PeopleManagement from '@/pages/subcontractor/home/peopleManagement';
import PeopleDetail from '@/pages/subcontractor/home/peopleManagement/PeopleDetail';
import AddProject from '@/pages/subcontractor/home/addProject';
import ProjectDetail from '@/pages/subcontractor/home/projectDetail';
import MaterialView from '@/pages/subcontractor/home/projectDetail/MaterialView';

const Navigator = () => {
  let Stack = createStackNavigator();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
          screenOptions={{
          headerMode: 'screen',
          headerTitleAlign: 'center',
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          ...Platform.select({
            android: {
              headerStatusBarHeight: StatusBar.currentHeight,
            },
          }),
          headerBackTitleVisible: false,
          headerTintColor: '#333',
          headerStyle: {
            ...Platform.select({
              android: {
                elevation: 0,
                borderBottomWidth: StyleSheet.hairlineWidth,
              },
            }),
          },
        }}>
        <Stack.Screen
            name="Login"
            options={{headerTitle: '', headerTransparent: true}}
            component={Login}
        />
        <Stack.Screen
            name="ConstructionTeamBottomTabs"
            options={{headerShown:false}}
            component={ConstructionTeamBottomTabs}
        />
        {/*ConstructionLog*/}
        <Stack.Screen
            name="ConstructionLog"
            options={{headerTitle: '??????????????????'}}
            component={ConstructionLog}
        />
        {/*ConstructionRecordList*/}
        <Stack.Screen
            name="ConstructionRecordList"
            options={{headerTitle: '????????????'}}
            component={ConstructionRecordList}
        />
         {/*ProjectManagement*/}
         <Stack.Screen
             name="ProjectManagement"
             options={{headerTitle: '????????????'}}
             component={ProjectManagement}
                    />
                     {/*ConstructionTeamManagement*/}
                     <Stack.Screen
                         name="ConstructionTeamManagement"
                         options={{headerTitle: '???????????????'}}
                         component={ConstructionTeamManagement}
                    />
                     {/*TeamManagementDetail*/}
                     <Stack.Screen
                         name="TeamManagementDetail"
                         options={{headerTitle: '???????????????'}}
                         component={TeamManagementDetail}
                    />
                     {/*MemManagement*/}
                     <Stack.Screen
                         name="MemManagement"
                         options={{headerTitle: '????????????'}}
                         component={MemManagement}
                    />
                    {/*TeammateDetail*/}
                    <Stack.Screen
                        name="TeammateDetail"
                        options={{headerTitle: '????????????'}}
                        component={TeammateDetail}
                    />
                    <Stack.Screen
                        name="PhotoBrowserScene"
                        options={{headerShown:false}}
                        component={PhotoBrowserScene}
                    />
  {/*TeammateDetailEdit*/}
  <Stack.Screen
      name="TeammateDetailEdit"
      options={{headerTitle: '????????????'}}
      component={TeammateDetailEdit}
                    />
                       {/*MemberManagement*/}
                       <Stack.Screen
                           name="MemberManagement"
                           options={{headerTitle: '????????????'}}
                           component={MemberManagement}
                    />
                      {/*DeviceManagement*/}
                      <Stack.Screen
                          name="DeviceManagement"
                          options={{headerTitle: '????????????'}}
                          component={DeviceManagement}
                    />
                      {/*DeviceView*/}
                      <Stack.Screen
                          name="DeviceView"
                          options={{headerTitle: '????????????'}}
                          component={DeviceView}
                    />
                     {/*DeviceAdd*/}
                     <Stack.Screen
                         name="DeviceAdd"
                         options={{headerTitle: '????????????'}}
                         component={DeviceAdd}
                    />
                     {/*DeviceRollout*/}
                     <Stack.Screen
                         name="DeviceRollout"
                         options={{headerTitle: '????????????'}}
                         component={DeviceRollout}
                    />
                     {/*AttendanceRecord*/}
                     <Stack.Screen
                         name="AttendanceRecord"
                         options={{headerTitle: '????????????'}}
                         component={AttendanceRecord}
                    />
                     {/*AttendanceRecordDetail*/}
                     <Stack.Screen
                         name="AttendanceRecordDetail"
                         options={{headerTitle: '????????????'}}
                         component={AttendanceRecordDetail}
                    />
                     {/*MaterialStockList*/}
                     <Stack.Screen
                         name="MaterialStockList"
                         options={{headerTitle: '????????????'}}
                         component={MaterialStockList}
                    />
                      {/*MaterialRequisition*/}
                      <Stack.Screen
                          name="MaterialRequisition"
                          options={{headerTitle: '????????????'}}
                          component={MaterialRequisition}
                    />
                     {/*ExpenseReimbursement*/}
                     <Stack.Screen
                         name="ExpenseReimbursement"
                         options={{headerTitle: '????????????'}}
                         component={ExpenseReimbursement}
                    />
                     {/*MaterialSign*/}
                     <Stack.Screen
                         name="MaterialSign"
                         options={{headerTitle: '????????????'}}
                         component={MaterialSign}
                    />
                     {/*BeginWorkingForm*/}
                     <Stack.Screen
                         name="BeginWorkingForm"
                         options={{headerTitle: '??????'}}
                         component={BeginWorkingForm}
                    />
                      {/*SubcontractorBottomTabs*/}
                      <Stack.Screen
                          name="SubcontractorBottomTabs"
                          options={{headerShown:false}}
                          component={SubcontractorBottomTabs}
                    />
                     {/*MaterialApproval*/}
                     <Stack.Screen
                         name="MaterialApproval"
                         options={{headerTitle: '????????????'}}
                         component={MaterialApproval}
                    />
                     {/*CancleWork*/}
                     <Stack.Screen
                         name="CancleWork"
                         options={{headerTitle: '????????????'}}
                         component={cancleWork}
                    />
                      {/*MaterialApprovalDetail*/}
                      <Stack.Screen
                          name="MaterialApprovalDetail"
                          options={{headerTitle: '??????????????????'}}
                          component={MaterialApprovalDetail}
                    />
                      {/*ExpenseApproval*/}
                      <Stack.Screen
                          name="ExpenseApproval"
                          options={{headerTitle: '??????????????????'}}
                          component={ExpenseApproval}
                    />
                      {/*ExpenseApprovalDetail*/}
                      <Stack.Screen
                          name="ExpenseApprovalDetail"
                          options={{headerTitle: '??????????????????'}}
                          component={ExpenseApprovalDetail}
                    />
                     {/*PeopleManagement*/}
                     <Stack.Screen
                         name="PeopleManagement"
                         options={{headerTitle: '????????????'}}
                         component={PeopleManagement}
                    />
                     {/*PeopleDetail*/}
                     <Stack.Screen
                         name="PeopleDetail"
                         options={{headerTitle: '??????????????????'}}
                         component={PeopleDetail}
                    />
                     {/*AddProject*/}
                     <Stack.Screen
                         name="AddProject"
                         options={{headerTitle: '????????????'}}
                         component={AddProject}
                    />
                     {/*ProjectDetail*/}
                     <Stack.Screen
                         name="ProjectDetail"
                         options={{headerTitle: '????????????'}}
                         component={ProjectDetail}
                    />
                     {/*MaterialView*/}
                     <Stack.Screen
                         name="MaterialView"
                         options={{headerTitle: '????????????'}}
                         component={MaterialView}
                    />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

const styles = MyStyleSheet.create({
  container: {},
});
