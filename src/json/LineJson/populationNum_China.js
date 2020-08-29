let populationNum_China ={
    title:"统计我校师生每天各省人数情况",
    defaultSelected:[0],
    selectedOption:null,
    legend:{
        selected:{
            // "河南":true,
            // "福建":false,
            // "海南":false,
            // "四川":false,
            // "云南":false
        }
    },
    series: [
        // {
        //     name: "河南",
        //     type: "line",
        //     data: [10, 0, 0, 150, 1, 0, 1],
        //     stack: '总量',
        //     // color: "#6dcc37"
        // },
        // {
        //     name: "福建",
        //     type: "line",
        //     data: [0, 20, 0, 0, 10, 0, 0],
        //     // color: "#cc2e19"
        // },
        // {
        //     name: "海南",
        //     type: "line",
        //     data: [0, 100, 0, 20, 20, 0, 0],
        //     // color: "#bfcc56"
        // },
        // {
        //     name: "四川",
        //     type: "line",
        //     data: [100, 50, 0, 20, 20, 0, 0],
        //     // color: "#52ccab"
        // },
        // {
        //     name: "f川",
        //     type: "line",
        //     data: [100, 50, 0, 20, 20, 0, 0],
        //     // color: "#52ccab"
        // }
    ],
    xAxis:{
        name:"日期",
        data:null
    },
    yAxis:{
        name:"人数"
    }
};

export default populationNum_China;