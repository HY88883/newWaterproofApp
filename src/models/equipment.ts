import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import storage, {load} from '@/config/storage';
import axios from 'axios';
import {selectDeptUser} from '@/service/user';
import {detail, page} from '@/service/equipment';
import {dict} from '@/service/dictbiz';

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
  equipmentInit:{classificationInit:[]}
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
  },
  effects: {
    //设备管理分页
    *page({payload, callback}, {call, put}) {
      const response = yield call(page, payload);
      if (typeof callback === 'function') {
        callback(response);
      }
      if (response.success) {
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
