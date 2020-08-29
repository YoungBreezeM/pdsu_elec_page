const Status ={
  110:()=>{
      window.location.href = "/login.html?msg=110";
  },
  1001:()=>{
      if(window.localStorage.user==="admin"){
           window.location.href = "/login.html?msg=1001";
      }

      if(window.localStorage.user==="role"){
          window.location.href = "/report/login?msg=1001";
      }

  },
  512:()=>{
      window.location.href = "/login.html?msg=512";
  },
  100:()=>{
      window.location.href = "/report/login?msg=100";
  }
};

const checkApi = (responseData)=>{
    let {code} = responseData;
    console.log(code)
    if(Status[code]){
        console.log(code)
        Status[code]();
    }

};

export default checkApi;