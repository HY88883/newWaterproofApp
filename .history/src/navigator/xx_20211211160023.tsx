import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Easing, Platform, StatusBar, StyleSheet, Text} from 'react-native';
import {CardStyleInterpolators, createStackNavigator, HeaderStyleInterpolators,} from '@react-navigation/stack';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import SubcontractorBottomTabs from '@/navigator/Subcontractor/SubcontractorBottomTabs';
import Login from '@/pages/Login';
import {navigationRef} from '@/config/RootNavigation';
import AddProject from "@/pages/Subcontractor/Home/AddProject";
import GeolocationService from "@/pages/Subcontractor/Home/AddProject/GeolocationService";
import ProjectDetail from "@/pages/Subcontractor/Home/ProjectDetail";
import ConstructionLog from "@/pages/Subcontractor/Home/ProjectDetail/ConstructionLog";
import Messages from "@/pages/Subcontractor/Home/Messages";
import ConstructionTeamManagement from "@/pages/Subcontractor/Mine/ConstructionTeamManagement";
import DeviceManagement from "@/pages/Subcontractor/Mine/DeviceManagement";
import ProjectManagement from "@/pages/Subcontractor/Mine/ProjectManagement";
import TeamManagementDetail from "@/pages/Subcontractor/Mine/ConstructionTeamManagement/TeamManagementDetail";
import DeviceRollout from "@/pages/Subcontractor/Mine/DeviceManagement/DeviceRollout";
import DeviceAdd from "@/pages/Subcontractor/Mine/DeviceManagement/DeviceAdd";
import ConstructionTeamBottomTabs from "@/navigator/ConstructionTeam/ConstructionTeamBottomTabs";
import TeamMine from "@/pages/ConstructionTeam/TeamMine";
import TeamHome from "@/pages/ConstructionTeam/TeamHome";
import BeginWorkingForm from "@/pages/ConstructionTeam/TeamHome/BeginWorkingForm";
import ConstructionLogAdd from "@/pages/ConstructionTeam/TeamHome/ConstructionLogAdd";
import MemberManagement from "@/pages/ConstructionTeam/TeamMine/MemberManagement";
import TeammateDetail from "@/pages/ConstructionTeam/TeamMine/MemberManagement/TeammateDetail";
import TeammateDetailEdit from "@/pages/ConstructionTeam/TeamMine/MemberManagement/TeammateDetailEdit";
import AttendanceRecord from "@/pages/ConstructionTeam/TeamMine/AttendanceRecord";
import AttendanceRecordDetail from "@/pages/ConstructionTeam/TeamMine/AttendanceRecord/AttendanceRecordDetail";
import AddTeam from "@/pages/Subcontractor/Mine/ConstructionTeamManagement/AddTeam";
import ConstructionRecordList from "@/pages/ConstructionTeam/TeamHome/ConstructionRecordList";
import ExpenseReimbursement from "@/pages/ConstructionTeam/TeamHome/ExpenseReimbursement";
import MaterialRequisition from "@/pages/ConstructionTeam/TeamHome/MaterialRequisition";
import MaterialSign from "@/pages/ConstructionTeam/TeamHome/MaterialSign";
import DeviceView from "@/pages/Subcontractor/Mine/DeviceManagement/DeviceView";
import MaterialApproval from "@/pages/Subcontractor/Home/MaterialApproval";
import ExpenseApproval from "@/pages/Subcontractor/Home/ExpenseApproval";
import PeopleManagement from '@/pages/Subcontractor/Home/PeopleManagement'
import MaterialApprovalDetail from "@/pages/Subcontractor/Home/MaterialApproval/MaterialApprovalDetail";
import ExpenseApprovalDetail from "@/pages/Subcontractor/Home/ExpenseApproval/ExpenseApprovalDetail";
import PeopleDetail from "@/pages/Subcontractor/Home/PeopleManagement/PeopleDetail";
import contractAreaPage from "@/pages/Subcontractor/Home/AddProject/contractAreaPage";
import MaterialStockList from '@/pages/ConstructionTeam/TeamMine/MaterialStockList'
import MemManagement from '@/pages/subcontractor/mine/memManagement'
import MaterialPage from "@/pages/ConstructionTeam/TeamHome/ConstructionLogAdd/materialPage";
import Upload from "@/pages/Subcontractor/Classroom/Upload";
import CancleWork from "@/pages/ConstructionTeam/TeamHome/CancleWork";
import ConstructionRecordView from "@/pages/Subcontractor/Home/ProjectDetail/ConstructionRecordView";
import MaterialView from "@/pages/Subcontractor/Home/ProjectDetail/MaterialView";
import MaterialStockView from "@/pages/Subcontractor/Home/ProjectDetail/MaterialStockView";

export type RootStackParamList = {
    [name:string]:undefined;
};

class Navigator extends React.Component {

    render() {
        let Stack = createStackNavigator<RootStackParamList>();
        return (
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator
                    headerMode="float"
                    screenOptions={{
                        headerTitleAlign: 'center',
                        //设置跳转时的动画效果
                        transitionSpec: {
                            open: {
                                animation: 'timing',
                                config: {
                                    duration: 450,
                                    easing: Easing.bezier(0.35, 0.39, 0, 1)
                                }
                            },
                            close: {
                                animation: 'timing',
                                config: {
                                    duration: 450,
                                    easing: Easing.bezier(0.35, 0.39, 0, 1)
                                }
                            }
                        },
                        headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
                        cardStyleInterpolator: ({ current, next, layouts }) => {
                            return {
                                cardStyle: {
                                    transform: [
                                        {
                                            translateX: next
                                                ? next.progress.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [0, -layouts.screen.width * .3]
                                                })
                                                : current.progress.interpolate( {
                                                    inputRange: [0, 1],
                                                    outputRange: [layouts.screen.width, 0]
                                                })
                                        }
                                    ]
                                }
                            };
                        },
                        //开启手势,并设置手势方向
                        gestureEnabled: true,
                        gestureDirection: 'horizontal',
                        ...Platform.select({
                            android: {
                                headerStatusBarHeight: StatusBar.currentHeight,
                            },
                        }),
                        headerBackTitleVisible: false,
                        headerTintColor: '#333',
                        // 设置滑动时的阴影
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
                        options={{headerTitle: '登录'}}
                        component={Login}
                    />
                    SubcontractorBottomTabs
                    <Stack.Screen
                        name="SubcontractorBottomTabs"
                        options={{headerTitle: ''}}
                        component={SubcontractorBottomTabs}
                    />
                    {/*AddProject*/}
                    <Stack.Screen
                        name="AddProject"
                        options={{headerTitle: '添加项目'}}
                        component={AddProject}
                    />
                    {/*GeolocationService*/}
                    <Stack.Screen
                        name="GeolocationService"
                        options={{headerTitle: ''}}
                        component={GeolocationService}
                    />
                    {/*ProjectDetail*/}
                    <Stack.Screen
                        name="ProjectDetail"
                        options={{headerTitle: '项目详情'}}
                        component={ProjectDetail}
                    />
                    {/*ConstructionLog*/}
                    <Stack.Screen
                        name="ConstructionLog"
                        options={{headerTitle: '施工日志查看'}}
                        component={ConstructionLog}
                    />
                    {/*Messages*/}
                    <Stack.Screen
                        name="Messages"
                        options={{headerTitle: '消息'}}
                        component={Messages}
                    />
                    {/*ConstructionTeamManagement*/}
                    <Stack.Screen
                        name="ConstructionTeamManagement"
                        options={{headerTitle: '施工队管理'}}
                        component={ConstructionTeamManagement}
                    />
                    {/*DeviceManagement*/}
                    <Stack.Screen
                        name="DeviceManagement"
                        options={{headerTitle: '设备管理'}}
                        component={DeviceManagement}
                    />
                    {/*ProjectManagement*/}
                    <Stack.Screen
                        name="ProjectManagement"
                        options={{headerTitle: '项目列表'}}
                        component={ProjectManagement}
                    />
                    {/*TeamManagementDetail*/}
                    <Stack.Screen
                        name="TeamManagementDetail"
                        options={{headerTitle: '施工队详情'}}
                        component={TeamManagementDetail}
                    />
                    {/*DeviceRollout*/}
                    <Stack.Screen
                        name="DeviceRollout"
                        options={{headerTitle: '设备转出'}}
                        component={DeviceRollout}
                    />
                    {/*DeviceAdd*/}
                    <Stack.Screen
                        name="DeviceAdd"
                        options={{headerTitle: '添加设备'}}
                        component={DeviceAdd}
                    />
                    {/*ConstructionTeamBottomTabs*/}
                    <Stack.Screen
                        name="ConstructionTeamBottomTabs"
                        options={{headerTitle: ''}}
                        component={ConstructionTeamBottomTabs}
                    />
                    {/*TeamMine*/}
                    <Stack.Screen
                        name="TeamMine"
                        options={{headerTitle: '我的'}}
                        component={TeamMine}
                    />
                    {/*TeamHome*/}
                    <Stack.Screen
                        name="TeamHome"
                        options={{headerTitle: ''}}
                        component={TeamHome}
                    />
                    {/*BeginWorkingForm*/}
                    <Stack.Screen
                        name="BeginWorkingForm"
                        options={{headerTitle: '上工'}}
                        component={BeginWorkingForm}
                    />
                    {/*ConstructionLogAdd*/}
                    <Stack.Screen
                        name="ConstructionLogAdd"
                        options={{headerTitle: '新增施工日志'}}
                        component={ConstructionLogAdd}
                    />
                    {/*MemberManagement*/}
                    <Stack.Screen
                        name="MemberManagement"
                        options={{headerTitle: '成员管理'}}
                        component={MemberManagement}
                    />
                    {/*TeammateDetail*/}
                    <Stack.Screen
                        name="TeammateDetail"
                        options={{headerTitle: '队员详情'}}
                        component={TeammateDetail}
                    />
                    {/*TeammateDetailEdit*/}
                    <Stack.Screen
                        name="TeammateDetailEdit"
                        options={{headerTitle: '添加队员'}}
                        component={TeammateDetailEdit}
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
                    {/*AddTeam*/}
                    <Stack.Screen
                        name="AddTeam"
                        options={{headerTitle: '新增施工队'}}
                        component={AddTeam}
                    />
                    {/*ConstructionRecordList*/}
                    <Stack.Screen
                        name="ConstructionRecordList"
                        options={{headerTitle: '施工记录'}}
                        component={ConstructionRecordList}
                    />
                    {/*ExpenseReimbursement*/}
                    <Stack.Screen
                        name="ExpenseReimbursement"
                        options={{headerTitle: '费用报销'}}
                        component={ExpenseReimbursement}
                    />
                    {/*MaterialRequisition*/}
                    <Stack.Screen
                        name="MaterialRequisition"
                        options={{headerTitle: '物料申请'}}
                        component={MaterialRequisition}
                    />
                    {/*MaterialSign*/}
                    <Stack.Screen
                        name="MaterialSign"
                        options={{headerTitle: '物料签收'}}
                        component={MaterialSign}
                    />
                    {/*DeviceView*/}
                    <Stack.Screen
                        name="DeviceView"
                        options={{headerTitle: '设备查看'}}
                        component={DeviceView}
                    />
                    {/*MaterialApproval*/}
                    <Stack.Screen
                        name="MaterialApproval"
                        options={{headerTitle: '物料审批'}}
                        component={MaterialApproval}
                    />
                    {/*ExpenseApproval*/}
                    <Stack.Screen
                        name="ExpenseApproval"
                        options={{headerTitle: '费用报销审批'}}
                        component={ExpenseApproval}
                    />
                    {/*MaterialApprovalDetail*/}
                    <Stack.Screen
                        name="MaterialApprovalDetail"
                        options={{headerTitle: '物料审批详情'}}
                        component={MaterialApprovalDetail}
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
                    {/*contractAreaPage*/}
                    <Stack.Screen
                        name="contractAreaPage"
                        options={{headerTitle: '填写合同面积'}}
                        component={contractAreaPage}
                    />
                    {/*MaterialStockList*/}
                    <Stack.Screen
                        name="MaterialStockList"
                        options={{headerTitle: '材料库存'}}
                        component={MaterialStockList}
                    />
                    {/*MemManagement*/}
                    <Stack.Screen
                        name="MemManagement"
                        options={{headerTitle: '人员管理'}}
                        component={MemManagement}
                    />
                    {/*MaterialPage*/}
                    <Stack.Screen
                        name="MaterialPage"
                        options={{headerTitle: '填写使用材料'}}
                        component={MaterialPage}
                    />
                    {/*Upload*/}
                    <Stack.Screen
                        name="Upload"
                        options={{headerTitle: '填写使用材料'}}
                        component={Upload}
                    />
                    {/*CancleWork*/}
                    <Stack.Screen
                        name="CancleWork"
                        options={{headerTitle: '下工确认'}}
                        component={CancleWork}
                    />
                    {/*ConstructionRecordView*/}
                    <Stack.Screen
                        name="ConstructionRecordView"
                        options={{headerTitle: '施工日志'}}
                        component={ConstructionRecordView}
                    />
                    {/*MaterialView*/}
                    <Stack.Screen
                        name="MaterialView"
                        options={{headerTitle: '使用材料'}}
                        component={MaterialView}
                    />
                    {/*MaterialStockView*/}
                    <Stack.Screen
                        name="MaterialStockView"
                        options={{headerTitle: '材料库存'}}
                        component={MaterialStockView}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default Navigator
