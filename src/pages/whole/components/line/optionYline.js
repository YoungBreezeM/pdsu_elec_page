export let getLineOption = (item,x,series,selected,color)=>{
    return {
        color:color,
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: item,
            type: 'scroll',
            textStyle: {
                color: '#f5f1f1',

            },
            selected:selected,
        },
        toolbox: {

        },
        dataZoom: [
            {
                type: 'slider',
                xAxisIndex: 0,
                filterMode: 'empty',
                height:20

            },
        ],
        grid: {
            left: '10%',
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: x,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#ffffff'
                    },

                },
            }
        ],
        yAxis: [
            {
                type: 'value',
                nameTextStyle: {
                    color: "#ccc"
                },
                splitArea: {
                    show: false,

                },
                splitLine: {
                    show: false,

                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#ffffff'
                    }
                },
            }
        ],
        series: series
    };
}


