


export let setRadarOption = (item,indicator,series,selected,color)=>{
    return  {
        color:color,
        title: {
            text: ''
        },
        tooltip: {

        },
        legend: {
            data: item,
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            textStyle: {
                color: '#f5f1f1',

            },
            selected:selected
        },
        radar: {
            name: {
                textStyle: {
                    color: '#fff',
                }
            },
            splitNumber: 3,
            indicator: indicator
        },
        series: [{
            name: 'rad',
            type: 'radar',
            // areaStyle: {normal: {}},
            data:series
        }]
    };

}

