import { stringify } from 'qs';
import func from '@/utils/Func';
import request from '@/config/request';

//施工记录


//施工记录分页
export async function page(params){
    return request(`/construction_record/page?${stringify(params)}`);
}

//施工材料分页
export async function constructionRecordPage(params){
    return request(`/construction_record_detail/page?${stringify(params)}`);
}

//施工记录详情
export async function detail(params){
    return request(`/construction_record/detail?${stringify(params)}`);
}

//施工记录新增或修改
export async function submit(params){
    return request('/construction_record/submit',{
        method:'POST',
        body:params
    });
}

//施工记录逻辑删除
export async function remove(params){
    return request('/construction_record/remove',{
        method : 'POST',
        body:func.toFormData(params)
    });
}

//上工
export async function startWork(params){
    return request('/construction_record/startWork',{
        method : 'POST',
        body:params
    });
}

//下工
export async function   stopWork(params){
    return request('/construction_record/stopWork',{
        method : 'POST',
        body:params
    });
}

//获取施工队长首页施工汇总信息
export async function getConstructionSummary(params){
    return request('/construction_record/getConstructionSummary');
}
