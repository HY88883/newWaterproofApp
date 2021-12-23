import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import storage, {load} from '@/config/storage';
import axios from 'axios';
import {selectDeptUser} from '@/service/user';
import {detail, page} from '@/service/expenseClaim';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';

const initialState = {
  expenseClaimList: {
    list: [],
    pagination: {
      total: 0,
      current: 0,
      pageSize: 0,
      pages: 0,
    },
  },
  expenseClaimDetail: {
    applicationTime: '',
    createDept: 0,
    createTime: '',
    createUser: 0,
    createdBy: '',
    expenseClaimDetailList: [],
    id: 0,
    invoiceAttachList: [],
    invoiceId: '',
    isDeleted: 0,
    projectId: 0,
    reason: '',
    status: 0,
    subcontractorId: 0,
    teamId: 0,
    totalAmount: '',
    updateTime: '',
    updateUser: 0,
    updatedBy: '',
    userId: 0,
  },
};

//费用报销
const expenseClaim = {
  namespace: 'expenseClaim',
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
        expenseClaimList:{
          list:state.expenseClaimList.list.concat(payload.expenseClaimList.list),
          pagination:payload.expenseClaimList.pagination
        },
        refreshState:payload.refreshState
      };
    }
  },
  effects: {
    //费用报销分页
    *page({payload, callback}, {call, put}) {
      yield put({
        type:'setState',
        payload:{
          refreshState: payload.hasMore?RefreshState.FooterRefreshing:RefreshState.HeaderRefreshing
        }
      });
      const response = yield call(page, payload);
      console.log('response'+JSON.stringify(response));
      if (typeof callback === 'function') {
        callback(response);
      }
      if (response.success) {
        if(payload.hasMore){
          yield put({
            type: 'setMoreList',
            payload: {
              expenseClaimList: {
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
              expenseClaimList: {
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
    //费用报销详情
    *detail({payload}, {call, put}) {
      const response = yield call(detail, payload);
      if (response.success) {
        yield put({
          type: 'setState',
          payload: {
            expenseClaimDetail: response.data,
          },
        });
      }
    },
    //清除费用报销详情
    *clearDetail(_, {put}) {
        yield put({
          type: 'setState',
          payload: {
            expenseClaimDetail: initialState.expenseClaimDetail
          },
        });
    },
  },
};

export default expenseClaim;
