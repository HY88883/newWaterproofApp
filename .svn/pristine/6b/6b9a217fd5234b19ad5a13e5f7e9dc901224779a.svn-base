import { stringify } from 'qs';
import func from '@/utils/Func';
import request from '@/config/request';

//设备管理

//新增或修改
export async function submit(params){
    return request(`/equipment/submit`,{
        method: 'POST',
        body: params,
    });
}

//设备管理分页
export async function page(params){
    return request(`/equipment/page?${stringify(params)}`)
}

//设备管理详情
export async function detail(params){
    return request(`/equipment/detail?${stringify(params)}`)
}

//设备管理删除
export async function remove(params){
    return request(`/equipment/remove`,{
        method:'POST',
        body:func.toFormData(params)
    })
}
