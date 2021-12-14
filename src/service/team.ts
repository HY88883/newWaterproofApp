import { stringify } from 'qs';
import func from '@/utils/Func';
import request from '@/config/request';

//施工队管理

//新增或修改
export async function submit(params){
    return request(`/team/submit`,{
        method: 'POST',
        body: params,
    });
}

//施工队分页
export async function page(params){
    return request(`/team/page?${stringify(params)}`)
}

//施工队详情
export async function detail(params){
    return request(`/team/detail?${stringify(params)}`)
}

//获取施工队成员列表
export async function getTeamMemberPage(params){
    return request(`/team/getTeamMemberPage?${stringify(params)}`)
}

//获取施工队下拉列表
export async function list(params){
    return request(`/team/list?${stringify(params)}`)
}

//删除
export async function remove(params){
    return request(`/team/remove`,{
        method: 'POST',
        body: func.toFormData(params),
    })
}

//新增或修改施工队成员
export async function submitTeamMember(params){
    return request(`/team/submitTeamMember`,{
        method: 'POST',
        body: params,
    });
}

//施工队成员详情
export async function teamMemberDetail(params){
    return request(`/team/teamMemberDetail?${stringify(params)}`)
}

//施工队成员总数
export async function getTeamMemberCountByTeamId(params){
    return request(`/team/getTeamMemberCountByTeamId?${stringify(params)}`)
}

//获取待审核施工队成员列表
export async function getToAuditTeamMemberPage(params){
    return request(`/team/getToAuditTeamMemberPage?${stringify(params)}`)
}

//施工队员审核
export async function auditTeamMember(params){
    return request(`/team/auditTeamMember`,{
        method: 'POST',
        body: func.toFormData(params),
    })
}

//获取施工队出勤记录
export async function getTeamAttendanceRecord(params){
    return request(`/team/getTeamAttendanceRecord?${stringify(params)}`)
}

//根据施工队员ID获取出勤记录详情
export async function getAttendanceRecordDetail(params){
    return request(`/team/getAttendanceRecordDetail?${stringify(params)}`)
}

//获取出勤时间详情
export async function getAttendanceTimeDetail(params){
    return request(`/team/getAttendanceTimeDetail?${stringify(params)}`)
}
