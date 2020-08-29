
const textStyle = {
    color: "#fff",
    fontWeight: "normal",
    fontSize: 12
};

const optionMap ={
    tooltip:{
        trigger: 'item',
        formatter:'',
        textStyle: textStyle
    } ,
    visualMap: {
        min: 0,
        max: 500,
        left: 0,
        bottom: 10,
        showLabel: !0,
        text: ["高", "低"],
        pieces: [
            {
            gt: 1000,
            label: "> 1000 人",
            color: "#7f1100"
            },
            {
                gte: 100,
                lte: 1000,
                label: "100 - 1000 人",
                color: "#ff5428"
            },
            {
                gte: 1,
                lt: 100,
                label: "1 - 100 人",
                color: "#ff8c71"
            },
            {
                value: 0,
                color: "lightgreen"
            }
        ],
        show: true,
        textStyle: {
            fontSize: "10",
            color: "white"
        }
    },
    geo: {
        map: "",
        zoom: 1.25,
        label: {
            normal: {
                show: true,
                fontSize: "12",
                color: "rgba(0,0,0,0.7)"
            }
        },
        itemStyle: {
            normal: {
                borderColor: "rgba(0, 0, 0, 0.2)"
            },
            emphasis: {
                areaColor: "#f2d5ad",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                borderWidth: 0
            }
        }
    },
    series:  [
        {
            type: "map",
            roam: false,
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: "#fff"
                    }
                },
                emphasis: {
                    color: "red"
                }
            },
            geoIndex: 0,
            data: []
        }
    ]
};

export default optionMap;