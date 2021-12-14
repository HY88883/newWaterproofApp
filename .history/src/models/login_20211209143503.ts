import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import * as RootNavigation from '@/config/RootNavigation';
import {Toast} from '@ant-design/react-native';
import {Loging, reflashToken} from '../service/login';
import {getCaptchaImage} from '@/service/user';

import {
  getCurrentUser,
  getVerificateUser,
  setCaptchaKey,
  setVerificateUser,
} from '@/config/authority';

import {
  setAccessToken,
  setAuthority,
  setCurrentUser,
  setToken,
  getReflushToken,
  setReflushToken,
} from '@/config/authority';
import Func from '@/utils/Func';
import {navigationRef} from '@/config/RootNavigation';

const initialState = {
  image: null,
};

const LogingModel = {
  namespace: 'login',
  state: initialState,
  reducers: {
    changeLoginStatus(state, {payload}) {
      const {status, type} = payload;
      console.log('payload'+JSON.stringify(payload.data));
      if (status) {
        const {
          data: {
            token_type,
            access_token,
            refresh_token,
            role_name,
            account,
            user_id,
            dept_id,
            oauth_id,
            user_name,
            avatar,
            user_code,
            phone,
            email,
            dept_name,
            nick_name
          },
        } = payload;
        const token = `${token_type} ${access_token}`;
        setToken(token);
        setAccessToken(access_token);
        setAuthority(role_name);
        setCurrentUser({
          userId: user_id,
          oauthId: oauth_id,
          deptId: dept_id,
          deptName: dept_name,
          avatar,
          account,
          name: nick_name,
          realName: nick_name,
          authority: role_name,
          user_code,
          phone,
          email,
        });
        setReflushToken(refresh_token);
      }
      return {...state};
    },
    setState(state = initialState, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *loging({payload, callback}, {call, put}) {
      navigationRef.current?.reset({
              index: 0,
              routes: [{name: 'SubcontractorBottomTabs'}],
            });
      // const response = yield call(Loging, payload);
      // if (callback && typeof callback === 'function') {
      //   callback(response);
      // }
      // if (response.success !== undefined && !response.success) {
      //   Toast.fail(response.msg);
      //   yield put({
      //     type: 'refreshCaptcha',
      //     payload: {},
      //   });
      // } else if (response.error_description) {
      //   Toast.fail(response.error_description);
      // } else {
      //   yield put({
      //     type: 'changeLoginStatus',
      //     payload: {
      //       status: true,
      //       type: 'login',
      //       data: {...response},
      //     },
      //   });
      //   console.log('changeLoginStatus' + JSON.stringify(response));
      //   response.role_name === 'subcontractor'
      //     ? (Func.ifubcontractor = true)
      //     : (Func.ifubcontractor = false);
      //   response.role_name.includes('project_leader')?(Func.isProjectLeader=true):(Func.isProjectLeader=false)
      //  if (response.role_name === 'subcontractor') {
      //     navigationRef.current?.reset({
      //       index: 0,
      //       routes: [{name: 'SubcontractorBottomTabs'}],
      //     });
      //   }else{
      //     navigationRef.current?.reset({
      //       index: 0,
      //       routes: [{name: 'ConstructionTeamBottomTabs'}],
      //     });
      //   }

      //   /* const  userId = yield getVerificateUser();
      //    if(!userId||userId!==response.user_id){
      //      RootNavigation.replace('VerificateUserPage', {});
      //      // setVerificateUser(getCurrentUser().userId)
      //    }else{
      //      RootNavigation.replace('ConstructionTeamBottomTabs', {});
      //    }*/
      // }
    },

    *checkToken({payload}, {call, put}) {
      const reflushToken = yield getReflushToken();
      if (Func.isEmpty(reflushToken)) {
        return;
      }
      const response = yield call(reflashToken, {
        grant_type: 'refresh_token',
        refresh_token: reflushToken,
        tenantId: '000000',
      });
      if (response.success !== undefined && !response.success) {
        Toast.fail(response.msg);
      } else if (response.error_description) {
        Toast.fail(response.error_description);
      } else {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: true,
            type: 'login',
            data: {...response},
          },
        });
        // console.log('chencktion',JSON.stringify(response))
        response.role_name === 'subcontractor'
            ? (Func.ifubcontractor = true)
            : (Func.ifubcontractor = false);
        response.role_name.includes('project_leader')?(Func.isProjectLeader=true):(Func.isProjectLeader=false);
        if (response.role_name === 'subcontractor') {
          navigationRef.current?.reset({
            index: 0,
            routes: [{name: 'SubcontractorBottomTabs'}],
          });
        }else{
          navigationRef.current?.reset({
            index: 0,
            routes: [{name: 'ConstructionTeamBottomTabs'}],
          });
        }
      }
    },
    *refreshCaptcha({payload}, {call, put}) {
      const response = yield call(getCaptchaImage, {});
      if (response.key) {
        yield put({
          type: 'setState',
          payload: {
            image: response.image,
          },
        });
        yield setCaptchaKey(response.key);
      }
    },
  },
};

export default LogingModel;
