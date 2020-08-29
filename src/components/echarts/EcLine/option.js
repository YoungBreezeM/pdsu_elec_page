
const textStyle = {
    "color": "#fff",
    "fontWeight": "normal",
    "fontSize": 12
};

const lineStyle = {
    color: "#ccc",
    width: 1
};
const optionLine = {
    "tooltip" : {
        "trigger": "axis",
        "textStyle": textStyle ,
        "formatter": ""
    },
    "legend": {
        selected:{},
        "right": 10,
        "top": 8,
        "textStyle": textStyle,
        type: 'scroll',
        selectedMode: 'multiple',

    },
    "dataZoom":[
        {
            "handleStyle": {
                "color": "#fff",
                "shadowBlur": 3,
                "shadowColor": "rgba(0, 0, 0, 0.6)",
                "shadowOffsetX": 2,
                "shadowOffsetY": 2
            },
            "textStyle": {
                "color": "#fff"
            },
            "height": 20,
            "bottom": 10
        },
        {
            "type": "inside"
        }
    ],
    "xAxis": {
        "axisLine": {
            "show": true,
            "lineStyle": lineStyle
        },
        "axisLabel": {
            "show": true,
            "textStyle": {
                "color": "#fff",
                "fontWeight": "normal",
                "fontSize": 12
            },
            "nameTextStyle": textStyle
        },
        "data":"",
        "name": ""
    },
    yAxis:  {
        type: 'value',
        axisLabel: {
            formatter: '{value}'
        },
        axisLine: {
            lineStyle: lineStyle
        },
        textStyle: textStyle,
        nameTextStyle: textStyle,
        name: "",
        splitLine: {
            show: true,
            lineStyle: {
                color: "#6d6d6d"
            }
        }
    },
    series: []
};
export default optionLine;