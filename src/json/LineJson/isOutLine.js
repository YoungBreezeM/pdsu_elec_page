let isOutLine ={
    title:"统计我校师生每天外出情况",
    selectedOption:[
        {
            id:0,
            label: '学生'
        },
        {
            id: 1,
            label: '老师',
        }
    ],
    defaultSelected:"学生",
    series: [
        {
            name: "非外出",
            type: "line",
            data: [22, 70, 111, 571, 440, 360, 10],
            color: "#6dcc37"
        },
        {
            name: "外出",
            type: "line",
            data: [100, 20, 11, 15, 17, 19, 51],
            color: "#cc2e19"
        },
    ],
    xAxis:{
        name:"日期",
        data:["3-1", "3-2", "3-3", "3-4", "3-5", "3-6", "3-7"]
    },
    yAxis:{
        name:"人数"
    }
};

export default isOutLine;