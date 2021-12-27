import { stringify } from 'qs';
import md5 from 'js-md5';
import request from '@/config/request';
import { getCaptchaKey } from '@/config/authority';
import func from '@/utils/Func';
import { captchaMode } from '../defaultSettings';

// =====================用户===========================

export async function accountLogin(params: any) {
  const values = params;
  values.grant_type = captchaMode ? 'captcha' : 'password';
  values.scope = 'all';
  values.password = md5(values.password);
  return request('/blade-auth/oauth/token', {
    headers: {
      'Tenant-Id': values.tenantId,
      //'Captcha-key': getCaptchaKey(),
      //'Captcha-code': values.code,
    },
    method: 'POST',
    body: func.toFormData(values),
  });
}

export async function socialLogin(params) {
  const values = params;
  values.grant_type = 'social';
  values.scope = 'all';
  return request('/blade-auth/oauth/token', {
    method: 'POST',
    body: func.toFormData(values),
  });
}

export async function registerGuest(form, oauthId) {
  const values = form;
  values.oauthId = oauthId;
  return request('/blade-user/register-guest', {
    method: 'POST',
    body: func.toFormData(values),
  });
}

export async function query() {
  return request('/users', {});
}

export async function queryCurrent() {
  return request('/currentUser', {});
}

export async function list(params) {
  return request(`/blade-user/page?${stringify(params)}`, {});
}

export async function grant(params) {
  return request('/blade-user/grant', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function resetPassword(params) {
  return request('/blade-user/reset-password', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function remove(params) {
  return request('/blade-user/remove', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function submit(params) {
  return request('/blade-user/submit', {
    method: 'POST',
    body: params,
  });
}

export async function update(params) {
  return request('/blade-user/update', {
    method: 'POST',
    body: params,
  });
}

export async function updateInfo(params) {
  return request('/blade-user/update-info', {
    method: 'POST',
    body: params,
  });
}

export async function detail(params) {
  return request(`/blade-user/detail?${stringify(params)}`, {});
}

export async function getUserInfo() {
  return request('/blade-user/info', {});
}

export async function updatePassword(params: any) {
  const values = params;
  values.oldPassword = md5(values.oldPassword);
  values.newPassword = md5(values.newPassword);
  values.newPassword1 = md5(values.newPassword1);
  return request('/blade-user/update-password', {
    method: 'POST',
    body: func.toFormData(values),
  });
}

export async function getCaptchaImage() {
  return request('/blade-auth/oauth/captcha', {});
}

export async function clearCache() {
  return request('/blade-auth/oauth/clear-cache', {});
}
// 最近联系人
export async function searchRecentContactsUserInfo(params: any) {
  return request(
      `/blade-user/searchRecentContactsUserInfo?${stringify(params)}`, {}
  );
}

export interface userInfor {
  id: number,
  code: string,
  account: string,
  name: string,
  realName: string,
  avatar: string,
  email: string,
  phone: string,
  roleId: string,
  deptId: string,
  postId: string,
  practiceNumber: string,
  tenantName: string,
  roleName: string,
  deptName: string,
  postName: string,
  sexName: string
}

// 搜索全部用户
export async function searchUserInfo(params: any) {
  return request<userInfor>(`/blade-user/searchUserInfo?${stringify(params)}`, {});
}

//部门用户树形结构
export async function selectDeptUser(params) {
  return request(`/select_dept_user/tree?${stringify(params)}`);
}
