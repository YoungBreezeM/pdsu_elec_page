


export let getYPieOption = (target, name,attention) => {
    let color ={
         attentionColor : "#ecab09",
         scoreColor : "#3571d9",
         exceedColor:"#02f62a",
         belowColor:"#e00606"
    }

    let data =  {
        values: [],
        cities: [],
        exceed:[],
        below:[],
        scoreColor:[],
        sum:0
    };

    target.forEach(item=>{

        if(item[name]===attention){
            data.scoreColor.push(color.attentionColor)
        }else {
            data.scoreColor.push(color.scoreColor)
        }

        data.cities.push(item[name]);
        data.sum+=item.value;
        data.values.push(item.value);
    })

    let avg = data.sum/data.values.length;

    data.values.forEach(item=>{
        let val = (item-avg).toFixed(2);
        if(val>0){
            data.exceed.push(val*-1);
            data.below.push(null);
        }else if(val<0){
            data.below.push(val);
            data.exceed.push(null);
        }else {
            data.exceed.push(null);
            data.below.push(null);
        }
    })

    return {                                  // 基础配置
        legend: {                               // 图例
            data: ['得分', '高于平均', '低于平均'],  // 图例 记得和series中的name要和这里保持一致
            textStyle: {
                fontSize: 13,//字体大小
                color: '#ffffff'//字体颜色

            },
        },
        tooltip: {
            formatter: function (params) {
                if (params.value < 0&&params.seriesName!=="得分") {
                    return "<div style='color: " + params.color + "'>" +
                        params.name+"<br/>"+
                        params.seriesName + ':' + Math.abs(params.value) +
                        "</div>";
                }
                return "<div style='color: " + params.color + "'>" +
                    params.name+"<br/>"+
                    params.seriesName + ':' + params.value +
                    "</div>";
            }
        },
        xAxis: {
            data: data.cities, // x轴数据
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#ffffff'
                },

            },
        },
        yAxis: {
            inverse: false,
            type: "value",
            lineStyle: {
                // 使用深浅的间隔色
                color: ['red']
            },
            splitArea: {
                show: false,

            },
            splitLine: {
                show: false,

            },
            nameTextStyle: {
                color: "#ccc"
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#ffffff'
                },
                formatter: function (value) {

                    if (value < 0) {
                        return Math.abs(value);
                    } else {
                        return value;
                    }

                }
            },

        },
        grid: {
            left: 100
        },
        series: [
            {
                name: '得分',
                type: 'bar',
                //  都为正就是堆叠柱状图，一个为正一个为负则为双向柱状图
                stack: 'one',
                data: data.values,
                color: color.scoreColor,
                barMaxWidth:'40px',
                itemStyle: {
                    //通常情况下：
                    normal:{
                        //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                        color: function (params){
                            return data.scoreColor[params.dataIndex];
                        }
                    },
                    //鼠标悬停时：
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },
            {
                name: '高于平均',
                type: 'bar',
                stack: 'one',
                data: data.exceed,
                color: color.exceedColor,
                barMaxWidth:'40px',
            },
            {
                name: '低于平均',
                type: 'bar',
                stack: 'one',
                data: data.below,
                color: color.belowColor,
                barMaxWidth:'40px',
            }

        ]
    };
}
