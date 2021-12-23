import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import storage, {load} from '@/config/storage';
import axios from 'axios';
import {selectDeptUser} from '@/service/user';
import {detail, page, setProjectLeader} from '@/service/projectManage';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';

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
  refreshState:1
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
    setMoreList(state,{payload}){
      return {
        ...state,
        ProjectManagement:{
          list:state.ProjectManagement.list.concat(payload.ProjectManagement.list),
          pagination:payload.ProjectManagement.pagination
        },
        refreshState:payload.refreshState
      };
    }
  },
  effects: {
    *page({payload, callback}, {call, put,take,takeLatest}) {
      yield put({
        type:'setState',
        payload:{
          refreshState: payload.hasMore?RefreshState.FooterRefreshing:RefreshState.HeaderRefreshing
        }
      });
      const response = yield call(page, payload);
      if (typeof callback === 'function') {
        callback(response);
      }
      if (response.success) {
        if(payload.hasMore){
          yield put({
            type: 'setMoreList',
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
            refreshState: response.data.current*response.data.size >=response.data.total ? RefreshState.NoMoreData  : RefreshState.Idle
            },
          });
        }else{
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
          refreshState: response.data.total < 1 ? RefreshState.EmptyData : RefreshState.Idle
            },
          });
        }
      }else{
        yield put({
          type:'setState',
          payload:{
            refreshState: RefreshState.Failure
          }
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
