import { stringify } from 'qs';
import func from '@/utils/Func';
import request from '@/config/request';

//物料申请

//新增或修改
export async function submit(params){
    return request(`/material_application/submit`,{
        method: 'POST',
        body: params,
    });
}

//物料申请分页
export async function page(params){
    return request(`/material_application/page?${stringify(params)}`)
}

//物料申请详情
export async function detail(params){
    return request(`/material_application/detail?${stringify(params)}`)
}

//物料申请删除
export async function remove(params){
    return request(`/material_application/remove`,{
        method:'POST',
        body:func.toFormData(params)
    })
}
