export let isStand = function (data) {
    data.forEach(area=>{
        if(!area.name.endsWith("市")&&!area.name.endsWith("县")&&!area.name.endsWith("区")){
           area.name = area.name+"市";
        }
    })
};

export let removeSpace = (data)=>{
  data.forEach(area=>{
      area.name = area.name.replace(/\s+/g,"");
  })
};


export let resolvePopulationData = (data)=> {
    let selected ={};
    let timeList;
    let series =[];
    timeList = data[0].time;
    data.forEach(area=>{
        selected[area.area.name] = false;
        series.push(area.area)
    });

    return {
        selected,
        series,
        timeList
    }
};