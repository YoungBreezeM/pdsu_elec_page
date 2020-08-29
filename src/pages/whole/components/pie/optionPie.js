

export  let getPieOption = (target,name)=>{
    let data =  {
        legendData: [],
        seriesData: [],
        selected: []
    };

   target.forEach(item=>{
       data.legendData.push(item[name])
       data.selected.push()
       data.seriesData.push({id:item.id,name:item[name],value:item.value})
   })
    return {
        title: {
            text: '',
            textStyle: {
                color: '#f5f1f1',
            },
            subtext: '',
            left: 'left'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
            textStyle: {
                fontSize: 15,

            }
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 0,
            bottom: 10,
            data: data.legendData,
            selected: data.selected,
            textStyle: {
                color: '#f5f1f1',

            }
        },
        series: [
            {
                name: '模块名称',
                type: 'pie',
                radius: '55%',
                center: ['40%', '50%'],
                data: data.seriesData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 5,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
}


