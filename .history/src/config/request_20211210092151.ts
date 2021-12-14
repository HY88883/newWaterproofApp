import hash from 'hash.js';
import RequestForm from './RequestForm';
import Config from 'react-native-config';
import { getToken, removeAll } from '@/config/authority';
import * as RootNavigation from '@/config/RootNavigation';

interface IResponse<T> {
  success: boolean,
  data: T,
  msg: string,
  code: number
}


const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const checkStatus = (response: Response) => {
  if (
    (response.status >= 200 && response.status < 300) ||
    // 针对于要显示后端返回自定义详细信息的status, 配置跳过
    response.status === 400 ||
    response.status === 500
  ) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  // 错误通知
  const error = new Error(errortext);
  error.name = response.status.toString();
  //error.response = response;
  throw error;
};

const cachedSave = (response: Response, hashcode: string) => {
  /**
   * Clone a response data and store it in sessionStorage
   * Does not support data other than json, Cache only json
   */
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.match(/application\/json/i)) {
    // All data is saved as text
    // todo
    // response
    //   .clone()
    //   .text()
    //   .then((content) => {
    //     sessionStorage.setItem(hashcode, content);
    //     sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
    //   });
  }
  return response;
};

const checkCode = (response: any) => {
  if (response.code && response.code === 401) {
    RootNavigation.replace('Login', {});
  }
  return response;
};

export default function request<T>(url: string, option?: any): Promise<IResponse<T>> {
  const reUrl = Config.API_URL + url;

  const options = {
    ...option,
  };
  const fingerprint = url + (options.body ? JSON.stringify(options.body) : '');
  const hashcode = hash.sha256().update(fingerprint).digest('hex');

  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };

  newOptions.headers = {
    ...newOptions.headers,
    // 客户端认证
    Authorization: 'Basic c3dvcmQ6c3dvcmRfc2VjcmV0', //TODO 写获取函数
  };

  if (options.text === true) {
    newOptions.headers = {
      ...newOptions.headers,
      'Content-Type': 'text/plain',
    };
  }


  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (
      !(newOptions.body instanceof FormData) &&
      !(newOptions.body instanceof RequestForm)
    ) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else if (newOptions.body instanceof RequestForm) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        ...newOptions.headers,
      };
      newOptions.body = newOptions.body.parse();
    }else if(newOptions.body instanceof FormData){
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        ...newOptions.headers,
      };
    }
    else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  const expirys = options.expirys && 60;
  // options.expirys !== false, return the cache,
  if (options.expirys !== false) {
    // const cached = sessionStorage.getItem(hashcode);
    // const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
    // if (cached !== null && whenCached !== null) {
    //   const age = (Date.now() - whenCached) / 1000;
    //   if (age < expirys) {
    //     const response = new Response(new Blob([cached]));
    //     return response.json();
    //   }
    //   sessionStorage.removeItem(hashcode);
    //   sessionStorage.removeItem(`${hashcode}:timestamp`);
    // }
  }

  // token鉴权
  return getToken().then(
    (token) => {
      if (token) {
        newOptions.headers = {
          ...newOptions.headers,
          'Blade-Auth': token,
        };
      }
      console.log('reUrl' + JSON.stringify(reUrl));
      return fetch(reUrl, newOptions);
    }
  )
    .then(checkStatus)
    .then((response) => cachedSave(response, hashcode))
    .then((response) => {
      // DELETE and 204 do not return data by default
      // using .json will report an error.
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text();
      }
      return response.json();
    }).then((response) => checkCode(response))
    .then((response) => {
      if (response.success !== undefined && response.success !== true) {
        // console.error('=========request error start ===========');
        // console.error('URL:' + reUrl);
        // console.error('options:' + JSON.stringify(newOptions));
        // console.error('response:' + JSON.stringify(response));
        // console.error('请求错误：' + response.msg);
        // console.error('=========request error end =============');
      }
      if (response.success !== undefined && response.success === true) {
        // console.info('=========request success start ===========');
        // console.info('URL:' + reUrl);
        // console.info('newOptions:' + JSON.stringify(newOptions));
        // console.info('response:' + JSON.stringify(response));
        // console.info('=========request success end =============');
      }
      return response;
    }).catch((err) => {
      // console.error('=========request err  =============');
    })
}
