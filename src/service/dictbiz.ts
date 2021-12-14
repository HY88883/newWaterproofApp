import {stringify} from 'qs';
import func from '@/utils/Func';
import request from '@/config/request';

// =====================字典===========================

export async function dict(params:any) {
  return request(`/blade-system/dict-biz/dictionary?${stringify(params)}`, {});
}

export async function list(params) {
  return request(`/blade-system/dict-biz/list?${stringify(params)}`, {});
}

export async function parentList(params) {
  return request(`/blade-system/dict-biz/parent-list?${stringify(params)}`, {});
}

export async function childList(params) {
  return request(`/blade-system/dict-biz/child-list?${stringify(params)}`, {});
}

export async function tree(params) {
  return request(`/blade-system/dict-biz/tree?${stringify(params)}`, {});
}

export async function remove(params) {
  return request('/blade-system/dict-biz/remove', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function submit(params) {
  return request('/blade-system/dict-biz/submit', {
    method: 'POST',
    body: params,
  });
}

export async function detail(params) {
  return request(`/blade-system/dict-biz/detail?${stringify(params)}`, {});
}
