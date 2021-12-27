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
            options={{headerTitle: '施工日志查看'}}
            component={ConstructionLog}
        />
        {/*ConstructionRecordList*/}
        <Stack.Screen
            name="ConstructionRecordList"
            options={{headerTitle: '施工记录'}}
            component={ConstructionRecordList}
        />
         {/*ProjectManagement*/}
         <Stack.Screen
             name="ProjectManagement"
             options={{headerTitle: '项目列表'}}
             component={ProjectManagement}
                    />
                     {/*ConstructionTeamManagement*/}
                     <Stack.Screen
                         name="ConstructionTeamManagement"
                         options={{headerTitle: '施工队管理'}}
                         component={ConstructionTeamManagement}
                    />
                     {/*TeamManagementDetail*/}
                     <Stack.Screen
                         name="TeamManagementDetail"
                         options={{headerTitle: '施工队详情'}}
                         component={TeamManagementDetail}
                    />
                     {/*MemManagement*/}
                     <Stack.Screen
                         name="MemManagement"
                         options={{headerTitle: '人员管理'}}
                         component={MemManagement}
                    />
                    {/*TeammateDetail*/}
                    <Stack.Screen
                        name="TeammateDetail"
                        options={{headerTitle: '队员详情'}}
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
      options={{headerTitle: '添加队员'}}
      component={TeammateDetailEdit}
                    />
                       {/*MemberManagement*/}
                       <Stack.Screen
                           name="MemberManagement"
                           options={{headerTitle: '成员管理'}}
                           component={MemberManagement}
                    />
                      {/*DeviceManagement*/}
                      <Stack.Screen
                          name="DeviceManagement"
                          options={{headerTitle: '设备管理'}}
                          component={DeviceManagement}
                    />
                      {/*DeviceView*/}
                      <Stack.Screen
                          name="DeviceView"
                          options={{headerTitle: '设备查看'}}
                          component={DeviceView}
                    />
                     {/*DeviceAdd*/}
                     <Stack.Screen
                         name="DeviceAdd"
                         options={{headerTitle: '添加设备'}}
                         component={DeviceAdd}
                    />
                     {/*DeviceRollout*/}
                     <Stack.Screen
                         name="DeviceRollout"
                         options={{headerTitle: '设备转出'}}
                         component={DeviceRollout}
                    />
                     {/*AttendanceRecord*/}
                     <Stack.Screen
                         name="AttendanceRecord"
                         options={{headerTitle: '出勤记录'}}
                         component={AttendanceRecord}
                    />
                     {/*AttendanceRecordDetail*/}
                     <Stack.Screen
                         name="AttendanceRecordDetail"
                         options={{headerTitle: '出勤详情'}}
                         component={AttendanceRecordDetail}
                    />
                     {/*MaterialStockList*/}
                     <Stack.Screen
                         name="MaterialStockList"
                         options={{headerTitle: '材料库存'}}
                         component={MaterialStockList}
                    />
                      {/*MaterialRequisition*/}
                      <Stack.Screen
                          name="MaterialRequisition"
                          options={{headerTitle: '物料申请'}}
                          component={MaterialRequisition}
                    />
                     {/*ExpenseReimbursement*/}
                     <Stack.Screen
                         name="ExpenseReimbursement"
                         options={{headerTitle: '费用报销'}}
                         component={ExpenseReimbursement}
                    />
                     {/*MaterialSign*/}
                     <Stack.Screen
                         name="MaterialSign"
                         options={{headerTitle: '物料签收'}}
                         component={MaterialSign}
                    />
                     {/*BeginWorkingForm*/}
                     <Stack.Screen
                         name="BeginWorkingForm"
                         options={{headerTitle: '上工'}}
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
                         options={{headerTitle: '物料审批'}}
                         component={MaterialApproval}
                    />
                     {/*CancleWork*/}
                     <Stack.Screen
                         name="CancleWork"
                         options={{headerTitle: '下工确认'}}
                         component={cancleWork}
                    />
                      {/*MaterialApprovalDetail*/}
                      <Stack.Screen
                          name="MaterialApprovalDetail"
                          options={{headerTitle: '物料审批详情'}}
                          component={MaterialApprovalDetail}
                    />
                      {/*ExpenseApproval*/}
                      <Stack.Screen
                          name="ExpenseApproval"
                          options={{headerTitle: '费用报销审批'}}
                          component={ExpenseApproval}
                    />
                      {/*ExpenseApprovalDetail*/}
                      <Stack.Screen
                          name="ExpenseApprovalDetail"
                          options={{headerTitle: '费用报销详情'}}
                          component={ExpenseApprovalDetail}
                    />
                     {/*PeopleManagement*/}
                     <Stack.Screen
                         name="PeopleManagement"
                         options={{headerTitle: '人员审批'}}
                         component={PeopleManagement}
                    />
                     {/*PeopleDetail*/}
                     <Stack.Screen
                         name="PeopleDetail"
                         options={{headerTitle: '人员审批详情'}}
                         component={PeopleDetail}
                    />
                     {/*AddProject*/}
                     <Stack.Screen
                         name="AddProject"
                         options={{headerTitle: '添加项目'}}
                         component={AddProject}
                    />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

const styles = MyStyleSheet.create({
  container: {},
});
