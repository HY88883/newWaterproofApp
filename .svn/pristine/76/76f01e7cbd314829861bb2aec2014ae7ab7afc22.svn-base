import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import storage, {load} from '@/config/storage';
import axios from 'axios';
import {selectDeptUser} from '@/service/user';
import {detail, page} from '@/service/materialStock';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view';

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
  refreshState:1,
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
    setMoreList(state, {payload}) {
      return {
        ...state,
        materialStockList: {
          list: state.materialStockList.list.concat(
            payload.materialStockList.list,
          ),
          pagination: payload.materialStockList.pagination,
        },
        refreshState: payload.refreshState,
      };
    },
  },
  effects: {
    //材料库存分页
    *page({payload, callback}, {call, put}) {
      yield put({
        type: 'setState',
        payload: {
          refreshState: payload.hasMore
            ? RefreshState.FooterRefreshing
            : RefreshState.HeaderRefreshing,
        },
      });
      const response = yield call(page, payload);
      if (typeof callback === 'function') {
        callback(response);
      }
      if (response.success) {
        if (payload.hasMore) {
          yield put({
            type: 'setMoreList',
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
              refreshState:
                response.data.current * response.data.size >=
                response.data.total
                  ? RefreshState.NoMoreData
                  : RefreshState.Idle,
            },
          });
        } else {
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
              refreshState:
                response.data.total < 1
                  ? RefreshState.EmptyData
                  : RefreshState.Idle,
            },
          });
        }
      } else {
        yield put({
          type: 'setState',
          payload: {
            refreshState: RefreshState.Failure,
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
    },
  },
};

export default materialStock;
