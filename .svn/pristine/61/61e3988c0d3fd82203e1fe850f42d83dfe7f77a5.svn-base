import { stringify } from 'qs';
import func from '@/utils/Func';
import request from '@/config/request';

//项目管理


//项目分页
export async function page(params){
    return request(`/project_manage/page?${stringify(params)}`)
}

//项目详情
export async function detail(params){
    return request(`/project_manage/detail?${stringify(params)}`)
}

//项目新增/修改
export async function submit(params){
    return request(`/project_manage/submit`,{
        method:'POST',
body:params
    })
}

//项目删除
export async function remove(params){
    return request(`/project_manage/remove`,{
        method:'POST',
        body:func.toFormData(params),
    })
}

//设置项目负责人
export async function setProjectLeader(params){
    return request(`/project_manage/setProjectLeader`,{
        method:'POST',
        body:func.toFormData(params),
    })
}
