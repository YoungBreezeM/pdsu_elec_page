import Http from "../Http/http";

export let getAllCity = async ()=>{
    let rs = await Http({
        method:"get",
        url:"/city",
    })
    return rs;
}
