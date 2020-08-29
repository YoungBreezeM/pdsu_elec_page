
let textStyle = {
    color: "#fff",
    fontWeight: "normal",
    fontSize: 12
};
let optionPie ={
    tooltip: {
        trigger: 'item',
        textStyle: textStyle,
        formatter: "{b} : {c} 人 ({d}%)"
    },
    legend: {
        orient: "horizontal",
        type: 'scroll',
        right: "-5",
        top: "0",
        textStyle: textStyle
    },
    series:[
        {
            type: 'pie',
            radius: "68%",
            center: ["50%", "50%"],
            data: [],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

export default optionPie;