import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import storage, {load} from '@/config/storage';
import axios from 'axios';
import {selectDeptUser} from '@/service/user';
import {
  detail,
  getAttendanceRecordDetail, getAttendanceTimeDetail,
  getTeamAttendanceRecord,
  getTeamMemberPage,
  getToAuditTeamMemberPage,
  list,
  page,
  teamMemberDetail,
} from '@/service/team';
import {dict} from '@/service/dictbiz';

const initialState = {
  ConstructionTeamManagement: {
    list: [],
    pagination: {
      total: 0,
      current: 0,
      pageSize: 0,
      pages: 0,
    },
  },
  ConstructionTeamDetail: {
    ancestors: '',
    children: [
      {
        ancestors: '',
        children: [{}],
        completedConstructionAreaCount: 0,
        deptCategory: 0,
        deptCategoryName: '',
        deptName: '',
        fullName: '',
        hasChildren: true,
        id: 0,
        isDeleted: 0,
        parentId: 0,
        parentName: '',
        principalUserContact: '',
        principalUserId: 0,
        principalUserName: '',
        remark: '',
        sort: 0,
        tenantId: '',
        userCount: 0,
      },
    ],
    completedConstructionAreaCount: 0,
    deptCategory: 0,
    deptCategoryName: '',
    deptName: '',
    fullName: '',
    hasChildren: true,
    id: 0,
    isDeleted: 0,
    parentId: 0,
    parentName: '',
    principalUserContact: '',
    principalUserId: 0,
    principalUserName: '',
    remark: '',
    sort: 0,
    tenantId: '',
    userCount: 0,
  },
  getTeamMemberPage: {
    list: [],
    pagination: {
      total: 0,
      current: 0,
      pageSize: 0,
      pages: 0,
    },
  },
  TeamList: {
    list: [],
  },
  teamMemberDetail: {
    avatar: '',
    bankCardBackPhotos: '',
    bankCardBackPhotosAttach: {
      attachSize: 0,
      createDept: 0,
      createTime: '',
      createUser: 0,
      domain: '',
      extension: '',
      id: 0,
      isDeleted: 0,
      link: '',
      name: '',
      originalName: '',
      status: 0,
      tenantId: '',
      updateTime: '',
      updateUser: 0,
    },
    bankCardNumber: '',
    bankCardPositivePhotos: '',
    bankCardPositivePhotosAttach: {
      attachSize: 0,
      createDept: 0,
      createTime: '',
      createUser: 0,
      domain: '',
      extension: '',
      id: 0,
      isDeleted: 0,
      link: '',
      name: '',
      originalName: '',
      status: 0,
      tenantId: '',
      updateTime: '',
      updateUser: 0,
    },
    id: 0,
    idCardBackPhotos: '',
    idCardBackPhotosAttach: {
      attachSize: 0,
      createDept: 0,
      createTime: '',
      createUser: 0,
      domain: '',
      extension: '',
      id: 0,
      isDeleted: 0,
      link: '',
      name: '',
      originalName: '',
      status: 0,
      tenantId: '',
      updateTime: '',
      updateUser: 0,
    },
    idCardNumber: '',
    idCardPositivePhotos: '',
    idCardPositivePhotosAttach: {
      attachSize: 0,
      createDept: 0,
      createTime: '',
      createUser: 0,
      domain: '',
      extension: '',
      id: 0,
      isDeleted: 0,
      link: '',
      name: '',
      originalName: '',
      status: 0,
      tenantId: '',
      updateTime: '',
      updateUser: 0,
    },
    insuranceCertificate: '',
    insuranceCertificateAttachList: [
      {
        attachSize: 0,
        createDept: 0,
        createTime: '',
        createUser: 0,
        domain: '',
        extension: '',
        id: 0,
        isDeleted: 0,
        link: '',
        name: '',
        originalName: '',
        status: 0,
        tenantId: '',
        updateTime: '',
        updateUser: 0,
      },
    ],
    openingBack: '',
    phone: '',
    userId: 0,
    userName: '',
  },
  teamAttendanceRecord: [
    {
      days: 0,
      userId: 0,
      userName: '',
    },
  ],
  attendanceRecordDetail: [],
  toAuditTeamMemberPage: {
    list: [],
    pagination: {
      total: 0,
      current: 0,
      pageSize: 0,
      pages: 0,
    },
  },
  teamInit: {
    partsInit: [],
  },
  attendanceTimeDetail:[
    {
      "beginTime": {
        "hour": 0,
        "minute": 0,
        "nano": 0,
        "second": 0
      },
      "duration": 0,
      "endTime": {
        "hour": 0,
        "minute": 0,
        "nano": 0,
        "second": 0
      },
      "id": 0,
      "workingShift": ""
    }
  ]
};

//???????????????
const team = {
  namespace: 'team',
  state: initialState,
  reducers: {
    setState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    //???????????????
    *page({payload, callback}, {call, put}) {
      const response = yield call(page, payload);
      if (typeof callback === 'function') {
        callback(response);
      }
      if (response.success) {
        yield put({
          type: 'setState',
          payload: {
            ConstructionTeamManagement: {
              list: response.data.records,
              pagination: {
                total: response.data.total,
                current: response.data.current,
                pageSize: response.data.size,
                pages: response.data.pages,
              },
            },
          },
        });
      }
    },
    //???????????????
    *detail({payload}, {call, put}) {
      const response = yield call(detail, payload);
      if (response.success) {
        yield put({
          type: 'setState',
          payload: {
            ConstructionTeamDetail: response.data,
          },
        });
      }
    },
    //???????????????????????????
    *getTeamMemberPage({payload, callback}, {call, put}) {
      const response = yield call(getTeamMemberPage, payload);
      if (typeof callback === 'function') {
        callback(response);
      }
      if (response.success) {
        yield put({
          type: 'setState',
          payload: {
            getTeamMemberPage: {
              list: response.data.records,
              pagination: {
                total: response.data.total,
                current: response.data.current,
                pageSize: response.data.size,
                pages: response.data.pages,
              },
            },
          },
        });
      }
    },
    //???????????????????????????
    *list({payload}, {call, put}) {
      yield put({type:'clearDeviceAdd',})
      const response = yield call(list, payload);
      if (response.success) {
        yield put({
          type: 'setState',
          payload: {
            TeamList: {
              list: response.data,
            },
          },
        });
      }
    },
    //??????????????????
    *teamMemberDetail({payload,callback} , {call, put}) {
      const response = yield call(teamMemberDetail, payload);
      if(typeof callback==='function'){
        callback(response)
      }
      if (response.success) {
        yield put({
          type: 'setState',
          payload: {
            teamMemberDetail: response.data,
          },
        });
      }
    },
    *getTeamAttendanceRecord({callback}, {call, put}) {
      const response = yield call(getTeamAttendanceRecord);
      if (typeof callback === 'function') {
        callback(response);
      }
      if (response.success) {
        yield put({
          type: 'setState',
          payload: {
            teamAttendanceRecord: response.data,
          },
        });
      }
    },
    *getAttendanceRecordDetail({payload}, {call, put}) {
      const response = yield call(getAttendanceRecordDetail, payload);
      if (response.success) {
        yield put({
          type: 'setState',
          payload: {attendanceRecordDetail: response.data},
        });
      }
    },
    //????????????????????????????????????
    *getToAuditTeamMemberPage({payload, callback}, {call, put}) {
      const response = yield call(getToAuditTeamMemberPage, payload);
      if (typeof callback === 'function') {
        callback(response);
      }
      if (response.success) {
        yield put({
          type: 'setState',
          payload: {
            toAuditTeamMemberPage: {
              list: response.data.records,
              pagination: {
                total: response.data.total,
                current: response.data.current,
                pageSize: response.data.size,
                pages: response.data.pages,
              },
            },
          },
        });
      }
    },
    //???????????????
    *teamInit(_, {call, put, all}) {
      const [partsResponse] = yield all([
        call(dict, {
          code: 'parts',
        }),
      ]);
      console.log('partsResponse' + JSON.stringify(partsResponse));
      if (partsResponse.success) {
        yield put({
          type: 'setState',
          payload: {
            teamInit: {
              partsInit: partsResponse.data,
            },
          },
        });
      }
    },
    *clearTeamManagementDetail(_, {put}) {
      yield put({
        type: 'setState',
        payload: {
          ConstructionTeamDetail: {},
          getTeamMemberPage: initialState.getTeamMemberPage,
        },
      });
      yield put({
        type: 'equipment/setState',
        payload: {
          equipmentList: {
            list: [],
            pagination: {
              total: 0,
              current: 0,
              pageSize: 0,
              pages: 0,
            },
          },
        },
      });
      // materialStock
      yield put({
        type: 'materialStock/setState',
        payload: {
          materialStockList: {
            list: [],
            pagination: {
              total: 0,
              current: 0,
              pageSize: 0,
              pages: 0,
            },
          },
        },
      });

    },
   *getAttendanceTimeDetail({payload, callback}, {call, put}){
      const response = yield call(getAttendanceTimeDetail, payload);
      if(response.success){
        yield put({
          type:'setState',
          payload:{
            attendanceTimeDetail:response.data
          }
        })
      }
   },
    *clearAttendanceRecordDetail(_,{put}){
      yield put({
        type:'setState',
        payload:{
          attendanceTimeDetail:[]
        }
      })
    },
    *clearDeviceAdd(_,{put}){
      console.log('clearDeviceAdd')
      yield put({
        type:'setState',
        payload:{
          TeamList: {
            list: [],
          },
          getTeamMemberPage: initialState.getTeamMemberPage,
        }
      })
    },
  },
};

export default team;
