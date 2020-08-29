import Http from "../Http/http";

export let getAllModule = async (timeId,cityId)=>{
    let rs = await Http({
        method:"get",
        url:"/module/moduleScore/"+timeId+"/"+cityId,
    })
    return rs;
}

export let getAllCityModule = async (timeId)=>{
    let rs = await Http({
        method:"get",
        url:"/module/allCityModule/"+timeId,
    })
    return rs;
}

export let updateModule = async (module)=>{
    let rs = await Http({
        method:"post",
        url:"/module",
        data:module
    })
    return rs;
}

export let getModule = async ()=>{
    let rs = await Http({
        method:"get",
        url:"/module",
    })
    return rs;
}

export let getModuleQuotas = async (moduleId,timeId,cityId)=>{
    let rs = await Http({
        method:"get",
        url:"/module/moduleOne/"+moduleId+"/"+timeId+"/"+cityId,
    })
    return rs;
}
