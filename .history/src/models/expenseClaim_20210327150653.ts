import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import storage, {load} from '@/config/storage';
import axios from 'axios';
import {selectDeptUser} from '@/service/user';
import {detail, page} from '@/service/expenseClaim';

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
  },
  effects: {
    //费用报销分页
    *page({payload, callback}, {call, put}) {
      const response = yield call(page, payload);
      console.log('response'+JSON.stringify(response))
      if (typeof callback === 'function') {
        callback(response);
      }
      if (response.success) {
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
          },
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
