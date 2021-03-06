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
import MemManagement from '@/pages/Subcontractor/Mine/MemManagement'
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
                        //??????????????????????????????
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
                        //????????????,?????????????????????
                        gestureEnabled: true,
                        gestureDirection: 'horizontal',
                        ...Platform.select({
                            android: {
                                headerStatusBarHeight: StatusBar.currentHeight,
                            },
                        }),
                        headerBackTitleVisible: false,
                        headerTintColor: '#333',
                        // ????????????????????????
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
                        options={{headerTitle: '??????'}}
                        component={Login}
                    />
                    {/*SubcontractorBottomTabs*/}
                    <Stack.Screen
                        name="SubcontractorBottomTabs"
                        options={{headerTitle: ''}}
                        component={SubcontractorBottomTabs}
                    />
                    {/*AddProject*/}
                    <Stack.Screen
                        name="AddProject"
                        options={{headerTitle: '????????????'}}
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
                        options={{headerTitle: '????????????'}}
                        component={ProjectDetail}
                    />
                    {/*ConstructionLog*/}
                    <Stack.Screen
                        name="ConstructionLog"
                        options={{headerTitle: '??????????????????'}}
                        component={ConstructionLog}
                    />
                    {/*Messages*/}
                    <Stack.Screen
                        name="Messages"
                        options={{headerTitle: '??????'}}
                        component={Messages}
                    />
                    {/*ConstructionTeamManagement*/}
                    <Stack.Screen
                        name="ConstructionTeamManagement"
                        options={{headerTitle: '???????????????'}}
                        component={ConstructionTeamManagement}
                    />
                    {/*DeviceManagement*/}
                    <Stack.Screen
                        name="DeviceManagement"
                        options={{headerTitle: '????????????'}}
                        component={DeviceManagement}
                    />
                    {/*ProjectManagement*/}
                    <Stack.Screen
                        name="ProjectManagement"
                        options={{headerTitle: '????????????'}}
                        component={ProjectManagement}
                    />
                    {/*TeamManagementDetail*/}
                    <Stack.Screen
                        name="TeamManagementDetail"
                        options={{headerTitle: '???????????????'}}
                        component={TeamManagementDetail}
                    />
                    {/*DeviceRollout*/}
                    <Stack.Screen
                        name="DeviceRollout"
                        options={{headerTitle: '????????????'}}
                        component={DeviceRollout}
                    />
                    {/*DeviceAdd*/}
                    <Stack.Screen
                        name="DeviceAdd"
                        options={{headerTitle: '????????????'}}
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
                        options={{headerTitle: '??????'}}
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
                        options={{headerTitle: '??????'}}
                        component={BeginWorkingForm}
                    />
                    {/*ConstructionLogAdd*/}
                    <Stack.Screen
                        name="ConstructionLogAdd"
                        options={{headerTitle: '??????????????????'}}
                        component={ConstructionLogAdd}
                    />
                    {/*MemberManagement*/}
                    <Stack.Screen
                        name="MemberManagement"
                        options={{headerTitle: '????????????'}}
                        component={MemberManagement}
                    />
                    {/*TeammateDetail*/}
                    <Stack.Screen
                        name="TeammateDetail"
                        options={{headerTitle: '????????????'}}
                        component={TeammateDetail}
                    />
                    {/*TeammateDetailEdit*/}
                    <Stack.Screen
                        name="TeammateDetailEdit"
                        options={{headerTitle: '????????????'}}
                        component={TeammateDetailEdit}
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
                    {/*AddTeam*/}
                    <Stack.Screen
                        name="AddTeam"
                        options={{headerTitle: '???????????????'}}
                        component={AddTeam}
                    />
                    {/*ConstructionRecordList*/}
                    <Stack.Screen
                        name="ConstructionRecordList"
                        options={{headerTitle: '????????????'}}
                        component={ConstructionRecordList}
                    />
                    {/*ExpenseReimbursement*/}
                    <Stack.Screen
                        name="ExpenseReimbursement"
                        options={{headerTitle: '????????????'}}
                        component={ExpenseReimbursement}
                    />
                    {/*MaterialRequisition*/}
                    <Stack.Screen
                        name="MaterialRequisition"
                        options={{headerTitle: '????????????'}}
                        component={MaterialRequisition}
                    />
                    {/*MaterialSign*/}
                    <Stack.Screen
                        name="MaterialSign"
                        options={{headerTitle: '????????????'}}
                        component={MaterialSign}
                    />
                    {/*DeviceView*/}
                    <Stack.Screen
                        name="DeviceView"
                        options={{headerTitle: '????????????'}}
                        component={DeviceView}
                    />
                    {/*MaterialApproval*/}
                    <Stack.Screen
                        name="MaterialApproval"
                        options={{headerTitle: '????????????'}}
                        component={MaterialApproval}
                    />
                    {/*ExpenseApproval*/}
                    <Stack.Screen
                        name="ExpenseApproval"
                        options={{headerTitle: '??????????????????'}}
                        component={ExpenseApproval}
                    />
                    {/*MaterialApprovalDetail*/}
                    <Stack.Screen
                        name="MaterialApprovalDetail"
                        options={{headerTitle: '??????????????????'}}
                        component={MaterialApprovalDetail}
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
                    {/*contractAreaPage*/}
                    <Stack.Screen
                        name="contractAreaPage"
                        options={{headerTitle: '??????????????????'}}
                        component={contractAreaPage}
                    />
                    {/*MaterialStockList*/}
                    <Stack.Screen
                        name="MaterialStockList"
                        options={{headerTitle: '????????????'}}
                        component={MaterialStockList}
                    />
                    {/*MemManagement*/}
                    <Stack.Screen
                        name="MemManagement"
                        options={{headerTitle: '????????????'}}
                        component={MemManagement}
                    />
                    {/*MaterialPage*/}
                    <Stack.Screen
                        name="MaterialPage"
                        options={{headerTitle: '??????????????????'}}
                        component={MaterialPage}
                    />
                    {/*Upload*/}
                    <Stack.Screen
                        name="Upload"
                        options={{headerTitle: '??????????????????'}}
                        component={Upload}
                    />
                    {/*CancleWork*/}
                    <Stack.Screen
                        name="CancleWork"
                        options={{headerTitle: '????????????'}}
                        component={CancleWork}
                    />
                    {/*ConstructionRecordView*/}
                    <Stack.Screen
                        name="ConstructionRecordView"
                        options={{headerTitle: '????????????'}}
                        component={ConstructionRecordView}
                    />
                    {/*MaterialView*/}
                    <Stack.Screen
                        name="MaterialView"
                        options={{headerTitle: '????????????'}}
                        component={MaterialView}
                    />
                    {/*MaterialStockView*/}
                    <Stack.Screen
                        name="MaterialStockView"
                        options={{headerTitle: '????????????'}}
                        component={MaterialStockView}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default Navigator
