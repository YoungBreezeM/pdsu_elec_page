import Http from "../Http/http";

export let getAllQuotas = async ()=>{
    let rs = await Http({
        method:"get",
        url:"/quota",
    })
    return rs;
}

export let updateQuota = async (quota)=>{
    let rs = await Http({
        method:"post",
        url:"/quota",
        data:quota
    })
    return rs;
}
