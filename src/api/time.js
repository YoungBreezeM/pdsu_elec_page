import Http from "../Http/http";

export let getAllTime = async ()=>{
    let rs = await Http({
        method:"get",
        url:"/time",
    })
    return rs;
}
