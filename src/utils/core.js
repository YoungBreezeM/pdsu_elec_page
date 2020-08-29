/**
 * 用于数据处理
 * */
const core = {
    /**
     * @param {Object} target
     * @param {Object} template
     * */
    synthetic(target,template){

        let rs = Object.assign({},template);
        for (let i in target ){
            if(template[i] instanceof Array){
                rs[i] = Object.assign([],template[i],target[i])
            }else{
                rs[i] = Object.assign({},template[i],target[i])
            }

        }
        return rs;
    }
};

export default core;