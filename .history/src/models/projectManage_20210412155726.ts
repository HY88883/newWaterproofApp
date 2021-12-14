import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import storage, {load} from '@/config/storage';
import axios from 'axios';
import {selectDeptUser} from '@/service/user';
import {detail, page, setProjectLeader} from '@/service/projectManage';

const initialState = {
  ProjectManagement: {
    list: [],
    pagination: {
      total: 0,
      current: 0,
      pageSize: 0,
      pages: 0,
    },
  },
    ProjectManagementDetail: {
    completedArea: 0,
    contractArea: 0,
    createDept: 0,
    createTime: '',
    createUser: 0,
    id: 0,
    isDeleted: 0,
    location: '',
    position: '',
    projectManagerId: 0,
    projectName: '',
    status: 0,
    subcontractorId: 0,
    teamId: '',
    updateTime: '',
    updateUser: 0,
  },
};

//项目管理
const projectManage = {
  namespace: 'projectManage',
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
    *page({payload, callback}, {call, put,take,takeLatest}) {
      const response = yield call(page, payload);
      if (typeof callback === 'function') {
        callback(response);
      }
      if (response.success) {
        yield put({
          type: 'setState',
          payload: {
            ProjectManagement: {
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
    //项目管理详情
    *detail({payload}, {call, put}) {
      const response = yield call(detail, payload);
      if (response.success) {
        yield put({
          type: 'setState',
          payload: {
            ProjectManagementDetail: response.data,
          },
        });
      }
    },
    *clearDetail(_,{put}){
      yield put({
        type: 'setState',
        payload: {
          ProjectManagementDetail: initialState.ProjectManagementDetail
        },
      })
    }
  },
};

export default projectManage;
