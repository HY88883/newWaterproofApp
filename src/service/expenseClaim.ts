import { stringify } from 'qs';
import func from '@/utils/Func';
import request from '@/config/request';

//费用报销

//新增或修改
export async function submit(params){
    return request(`/expense_claim/submit`,{
        method: 'POST',
        body: params,
    });
}

//分页
export async function page(params){
    return request(`/expense_claim/page?${stringify(params)}`)
}

//详情
export async function detail(params){
    return request(`/expense_claim/detail?${stringify(params)}`)
}

//删除
export async function remove(params){
    return request(`/expense_claim/remove`,{
        method:'POST',
        body:func.toFormData(params)
    })
}
