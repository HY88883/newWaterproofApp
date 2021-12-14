import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import storage, {load} from '@/config/storage';
import axios from 'axios';
import {selectDeptUser} from '@/service/user';
import {detail, page} from "@/service/materialStock";

const initialState = {
  materialStockList: {
    list: [],
    pagination: {
      total: 0,
      current: 0,
      pageSize: 0,
      pages: 0,
    },
  },
  materialStockDetail: {
    createDept: 0,
    createTime: '',
    createUser: 0,
    id: 0,
    isDeleted: 0,
    name: '',
    number: 0,
    specifications: '',
    status: 0,
    subcontractorId: 0,
    teamId: 0,
    unit: '',
    updateTime: '',
    updateUser: 0,
  },
};

//设备管理详情
const materialStock = {
  namespace: 'materialStock',
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
    //材料库存分页
    *page({payload, callback}, {call, put}) {
      const response = yield call(page, payload);
      if (typeof callback === 'function') {
        callback(response);
      }
      if (response.success) {
        yield put({
          type: 'setState',
          payload: {
            materialStockList: {
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
    //材料库存详情
    *detail({payload}, {call, put}) {
      const response = yield call(detail, payload);
      if (response.success) {
        yield put({
          type: 'setState',
          payload: {
            materialStockDetail: response.data,
          },
        });
      }
    }
  },
};

export default materialStock;