
import {constructionRecordPage, detail, getConstructionSummary, page} from '@/service/constructRecord';
import {dict} from '@/service/dictbiz';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';

const initialState = {
  constructionRecordList: {
    list: [],
    pagination: {
      total: 0,
      current: 0,
      pageSize: 0,
      pages: 0,
    },
  },
  materialRecordList: {
    list: [],
    pagination: {
      total: 0,
      current: 0,
      pageSize: 0,
      pages: 0,
    },
  },
  constructionRecordDetail: {
    'area': 0,
    'constructionRecordDetailList': [],
    'constructionTechnology': '',
    'constructionTechnologyName': '',
    'content': '',
    'createDept': 0,
    'createTime': '',
    'createUser': 0,
    'createdBy': '',
    'id': 0,
    'isDeleted': 0,
    'location': '',
    'mainMaterial': '',
    'mainMaterialName': '',
    'parts': '',
    'partsName': '',
    'projectId': 0,
    'recordingTime': '',
    'resultPhoto': '',
    'resultPhotoAttachList': [],
    'status': 0,
    'teamId': 0,
    'updateTime': '',
    'updateUser': 0,
    'updatedBy': '',
    'workRecordId': 0
  },
  constructionRecordInit: {
    shigongbuwei: [],
    fangshuizhucai: [],
    technology: [],
    wastedMaterialRequisitionList:[]
  },
  ConstructionSummary: {
    thisMonthConstructionArea: 0,
    thisMonthWorkingHours: 0,
    workRecordId: 0,
  },
  refreshState:1
};

//施工日志
const constructionRecord = {
  namespace: 'constructionRecord',
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
        constructionRecordList:{
          list:state.constructionRecordList.list.concat(payload.constructionRecordList.list),
          pagination:payload.constructionRecordList.pagination
        },
        refreshState:payload.refreshState
      };
    }
  },
  effects: {
    //施工记录分页
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
              constructionRecordList: {
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
        }
       else{
        yield put({
          type: 'setState',
          payload: {
            constructionRecordList: {
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
    // constructionRecordPage
    *constructionRecordPage({payload, callback}, {call, put}) {
      const response = yield call(constructionRecordPage, payload);
      if (typeof callback === 'function') {
        callback(response);
      }
      if (response.success) {
        yield put({
          type: 'setState',
          payload: {
            materialRecordList: {
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
    //施工记录详情
    *detail({payload}, {call, put}) {
      const response = yield call(detail, payload);
      if (response.success) {
        yield put({
          type: 'setState',
          payload: {
            constructionRecordDetail: response.data,
          },
        });
      }
    },
    //清除详情
    *clearDetail(_,{put}){
      yield put({
        type: 'setState',
        payload: {
          constructionRecordDetail: initialState.constructionRecordDetail
        },
      });
    },
    //施工日志初始化数据
    *constructionRecordInit({payload}, {call, put,all}) {
      const [partsResponse,mainMaterialResponse,technologyResponse,wastedMaterialRequisitionListResponse]=yield all([call(dict, {
        code: 'parts',
      }),call(dict, {
        code: 'main_material',
      }),call(dict, {
        code: 'construction_technology',
      }),call(dict, {
        code: 'wasted_material_requisition_list',
      })]);
      if (
        partsResponse.success &&
        mainMaterialResponse.success &&
        technologyResponse.success&
          wastedMaterialRequisitionListResponse.success
      ) {
        yield put({
          type: 'setState',
          payload: {
            constructionRecordInit: {
              shigongbuwei: partsResponse.data,
              fangshuizhucai: mainMaterialResponse.data,
              technology: technologyResponse.data,
              wastedMaterialRequisitionList:wastedMaterialRequisitionListResponse.data
            },
          },
        });
      }
    },
    // 获取施工队长首页施工汇总信息
    *getConstructionSummary(_, {call, put}) {
      const response = yield call(getConstructionSummary);
      console.log(response);
      if (response.success) {
        yield put({
          type: 'setState',
          payload: {
          ConstructionSummary: response.data,
          },
        });
      }
    },
  },
};

export default constructionRecord;
