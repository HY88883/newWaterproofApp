import { stringify } from 'qs';
import func from '@/utils/Func';
import request from '@/config/request';

export async function upload(params: FormData) {
    return request<any>('/blade-resource/oss/endpoint/put-file-attach', {
        method: 'POST',
        body: params
    });
}
