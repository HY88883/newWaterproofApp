import { stringify } from 'qs';
import func from '@/utils/Func';
import request from '@/config/request';

//材料库存

//物料签收
export async function submit(params){
    return request(`/material_stock/submit`,{
        method: 'POST',
        body: params,
    });
}

//材料库存分页
export async function page(params){
    return request(`/material_stock/page?${stringify(params)}`)
}

//材料库存详情
export async function detail(params){
    return request(`/material_stock/detail?${stringify(params)}`)
}

//材料库存删除
export async function remove(params){
    return request(`/material_stock/remove`,{
        method:'POST',
        body:func.toFormData(params)
    })
}
