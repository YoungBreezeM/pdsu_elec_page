import {
   Notification,
   MessageBox
} from "element-ui"


const msgCenter = (responseData)=>{
    let {code,msg} = responseData;

    if(code!==0){
        console.log(code)
        if(code==500){
            MessageBox({
                title: '警告',
                message: "身份认证已过期，请重新登陆",
                type: 'warning'
            }).then(()=>{
                console.log(code)
                window.location.href = "/login"
            })
        }else {
            Notification({
                title: '失败',
                message: msg,
                type: 'error'
            });
        }

    }
};

export default msgCenter;
