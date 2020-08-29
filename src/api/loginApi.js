import Http from "../Http/http";
import checkApi from "../utils/checkApi";

const LoginApi = async (body)=>{
    let res = await Http({
        method:"Post",
        url:"/login",
        data:body
    });
    return res
};

export default LoginApi

