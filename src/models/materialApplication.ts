import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import storage, {load} from '@/config/storage';
import axios from 'axios';
import {selectDeptUser} from '@/service/user';
import {detail, page} from '@/service/materialApplication';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';

const initialState = {
  materialApplicationList: {
    list: [],
    pagination: {
      total: 0,
      current: 0,
      pageSize: 0,
      pages: 0,
    },
  },
  materialApplicationDetail: {
    applicationTime: '',
    createDept: 0,
    createTime: '',
    createUser: 0,
    createdBy: '',
    id: 0,
    isDeleted: 0,
    materialApplicationDetailList: [],
    projectId: '',
    remarks: '',
    status: 0,
    subcontractorId: 0,
    teamId: 0,
    updateTime: '',
    updateUser: 0,
    updatedBy: '',
    userId: 0,
  },
  refreshState:1
};

//物料申请
const materialApplication = {
  namespace: 'materialApplication',
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
        materialApplicationList:{
          list:state.materialApplicationList.list.concat(payload.materialApplicationList.list),
          pagination:payload.materialApplicationList.pagination
        },
        refreshState:payload.refreshState
      };
    }
  },
  effects: {
    //物料申请分页
    *page({payload, callback}, {call, put}) {
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
              materialApplicationList: {
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
              materialApplicationList: {
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
    //物料申请详情
    *detail({payload}, {call, put}) {
      const response = yield call(detail, payload);
      if (response.success) {
        yield put({
          type: 'setState',
          payload: {
            materialApplicationDetail: response.data,
          },
        });
      }
    },
    //清除申请详情
    *clearDetail(_,{put}){
      yield put({
        type: 'setState',
        payload: {
          materialApplicationDetail: initialState.materialApplicationDetail
        },
      });
    }
  },
};

export default materialApplication;
