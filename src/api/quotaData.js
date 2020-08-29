import Http from "../Http/http";
export let getCityValueByTidAndIid = async (timeId,indexId)=>{
    let rs = await Http({
        method:"get",
        url:"/quotaData/"+timeId+"/"+indexId,
    })
    return rs;
}

export let getAllCityValueByIid = async (indexId)=>{
    let rs = await Http({
        method:"get",
        url:"/quotaData/"+indexId,
    })
    return rs;
}

export let getAllCategory = async (timeId,indexId)=>{
    let rs = await Http({
        method:"get",
        url:"/quotaData/category/"+timeId+"/"+indexId,
    })
    return rs;
}
