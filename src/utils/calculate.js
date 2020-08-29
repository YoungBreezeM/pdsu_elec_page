export let Ascending =(arr,key)=>{

   return arr.sort((before,next)=>{

       return  before[key]-next[key];
   })
}
export let Descending =(arr,key)=>{

    return arr.sort((before,next)=>{

        return  next[key]-before[key];
    })
}

export const deepClone=(obj)=>{
    let proto=Object.getPrototypeOf(obj);
    return Object.assign({},Object.create(proto),obj);
}
