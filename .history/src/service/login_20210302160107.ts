import Func from '@/utils/Func';
import request from '@/utils/../config/request';
import md5 from 'js-md5';
import { Toast } from '@ant-design/react-native';

import crypto from '@/config/crypto';
import { getCaptchaKey } from '@/config/authority';

import  defalut from '../defaultSettings';
import { Form } from 'formik';

export async function testfunc(params: any) {
  return request('/case_filing_hall/test', {});
}

const captchaMode = false;



function testFatch() {
  fetch('https://www.baidu.com').then((response) => {
    if (response.status === 200) {
    }
  });
}

export async function Loging(params: any) {
  const values = params;
  // console.log("defaultSettings" + JSON.stringify(defalut));

  values.grant_type = defalut.captchaMode ? 'captcha' : 'password';
  values.scope = 'all';
  //values.password = crypto.encryptAES(values.password, crypto.aesKey);


  values.password = md5(values.password);
  const CaptchaKey = await getCaptchaKey();

  // testFatch();
  return request('/blade-auth/oauth/token', {
    headers: {
      'Tenant-Id': values.tenantId,
      // 'Captcha-key': CaptchaKey,
      // 'Captcha-code': values.code,
    },
    method: 'POST',
    body: Func.toFormData(values),
  });
}

export async function reflashToken(params: any) {
  const values = params;

  //values.password = md5(values.password);
  const CaptchaKey = await getCaptchaKey();

  // testFatch();
  return request('/blade-auth/oauth/token', {
    headers: {
      'Tenant-Id': values.tenantId,
    },
    method: 'POST',
    body: Func.toFormData(values),
  });
}
