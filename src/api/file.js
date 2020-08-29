/**
 * 文件上传
 */
import Http from "../Http/http";

export let fileUpload = async (file)=> {
    let param = new FormData();
    param.append('file',file);
    return Http({
        method: 'put',
        url: '/file',
        headers: {"mimeType": "multipart/form-data"},
        data: param
    })
};

export let getAllFile = async ()=> {

    return Http({
        method: 'get',
        url: '/file',

    })
};

export let deleteFile = async (id)=> {

    return Http({
        method: 'delete',
        url: '/file/'+id,

    })
};
