import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import storage, {load} from '@/config/storage';
import axios from 'axios';
import {selectDeptUser} from '@/service/user';
import {detail, page} from '@/service/equipment';
import {dict} from '@/service/dictbiz';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';

const initialState = {
  equipmentList: {
    list: [],
    pagination: {
      total: 0,
      current: 0,
      pageSize: 0,
      pages: 0,
    },
  },
  equipmentDetail: {
    attachId: '',
    attachList: [
      {
        attachSize: 0,
        createDept: '',
        createTime: '',
        createUser: '',
        domain: '',
        extension: '',
        id: '',
        isDeleted: 0,
        link:
          '',
        name: '',
        originalName: '',
        status: 1,
        tenantId: '',
        updateTime: '',
        updateUser: '',
      },
    ],
    code: '',
    createDept: '',
    createTime: '',
    createUser: '',
    createdBy: '',
    id: '',
    isDeleted: 0,
    model: '',
    name: '',
    operator: -1,
    ownershipId: -1,
    ownershipName: '',
    photo: '',
    photosAttach: {
      attachSize: 0,
      createDept: '',
      createTime: '',
      createUser: '',
      domain: '',
      extension: '',
      id: '',
      isDeleted: 0,
      link:
        '',
      name: '',
      originalName: '',
      status: 1,
      tenantId: '',
      updateTime: '',
      updateUser: '',
    },
    purchasingDate: '',
    rightToUseId: -1,
    rightToUseName: '',
    status: 1,
    updateTime: '',
    updateUser: '',
    updatedBy: '',
    warrantyPeriod: '',
  },
  equipmentInit:{classificationInit:[]},
  refreshState:1
};

//设备管理详情
const equipment = {
  namespace: 'equipment',
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
        equipmentList:{
          list:state.equipmentList.list.concat(payload.equipmentList.list),
          pagination:payload.equipmentList.pagination
        },
        refreshState:payload.refreshState
      };
    }
  },
  effects: {
    //设备管理分页
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
              equipmentList: {
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
              equipmentList: {
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
            equipmentDetail: response.data,
          },
        });
      }
    },
    *equipmentInit(_,{call,put,all}){
      const [classificationResponse] = yield all([call(dict,{code:'equipment_classification'})]);
      if(classificationResponse.success){
        yield put({
          type:'setState',
          payload:{
            equipmentInit:{classificationInit:classificationResponse.data}
          }
        });
      }
    }
  },
};

export default equipment;
