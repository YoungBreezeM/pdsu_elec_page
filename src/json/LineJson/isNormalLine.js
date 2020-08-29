let isNormalLine ={
    title:"统计我校学生每天体温情况",
    selectedOption:null,
    defaultSelected:[0],
    series: [
        {
            name: "正常",
            type: "line",
            data: [1000, 800, 1000, 1000, 980, 1000, 1000],
            color: "#6dcc37"
        },
        {
            name: "不正常",
            type: "line",
            data: [0, 200, 0, 0, 20, 0, 0],
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

export default isNormalLine;