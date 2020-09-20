import Http from "../Http/http";


export let loginApi = async (body)=>{
  return Http({
    method: "post",
    url: "/login",
    data: body
  });

}

export let getAllUser = async ()=>{
  return Http({
    method: "get",
    url: "/getAllUser",
  });
}

export let addUser = async (user)=>{
  return Http({
    method: "put",
    url: "/addUser",
    data:user
  });
}

export let updateUser = async (user)=>{
  return Http({
    method: "post",
    url: "/updateUser",
    data:user
  });
}

export let deleteUser = async (user)=>{
  return Http({
    method: "delete",
    url: "/deleteUser",
    data:user
  });
}

export let checkAdmin = async ()=>{
  return Http({
    method: "get",
    url: "/checkAdmin",
  });
}

export let checkToken = async ()=>{
  return Http({
    method: "get",
    url: "/checkToken",
  });
}

export let addAdmin = async (admin)=>{
  return Http({
    method: "put",
    url: "/addAdmin",
    data:admin
  });
}
