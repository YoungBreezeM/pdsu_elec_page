// import el from "element-ui/src/locale/lang/el";
// import ca from "element-ui/src/locale/lang/ca";
//
// var nodes = [
//     {category: 0, name: '国信证券经',  "size": 10},
//     {category: 1, name: '海通证券研',  "size": 10},
//     {category: 1, name: '招商证券', "size": 10},
// ];
// //source（起点，对应上面的name），target（终点，对应上面的name），value(起点到终点的距离，值越大，权重越大，距离越短)，label（显示该关系边标签，用来说明两节点之间的关系）。
// // var links = [
// //     {"source": '国信证券经', "target": '', "flow": ""},
// //     {"source": '海通证券研', "target": '招商证券', "flow": ""},
// //     {"source": '招商证券', "target": '海通证券研', "flow": ""},
// // ];
//
//


import ca from "element-ui/src/locale/lang/ca";
import el from "element-ui/src/locale/lang/el";

export let getSortOption = (nodes)=>{

    let links = [];
    let category = [];
    let series =[];
    let cache = {};


    //定义节点格式
    nodes.forEach((node) => {
        node.symbolSize = node.size;//强制指定节点的大小
        category.push("类别"+node.category)
    });


    category =  [...new Set(category)]

    category.forEach(()=>{
        series.push({
            nodes:[],
            edges:[]
        })
    })

    //定义节点格式
    nodes.forEach((item,index) => {
        series[item.category].nodes.push(item);
        if(cache[item.category]===undefined){
            cache[item.category] = item.name;
        }

        if (index===nodes.length-1){
            console.log(cache[item.category])
            series[item.category].edges.push({
                source: item.name,
                target: cache[item.category],
                flow: ""
            })
        }

        if(index<nodes.length-1&&item.category===nodes[index+1].category){
            series[item.category].edges.push({
                source: item.name,
                target: nodes[index+1].name,
                flow: ""
            })
        }else {
            series[item.category].edges.push({
                source: item.name,
                target: cache[item.category],
                flow: ""
            })
        }
    });


    console.log(series)

    return  {
        color:["#45dc1a","#ec0d27","#09f3b2","#dc910d","#5456dd"],
        // 图表标题
        title: {
            text: '',//正标题
            subtext: '',//附标题
            top: 'bottom',//垂直位置
            left: 'middle'//水平位置

        },
        //sereis的数据: 用于设置图表数据之用
        series: series.map( (item, idx)=> {
            return {
                type: 'graph',
                layout: 'force',
                animation: false,
                data: item.nodes,
                left:  50 + '%',
                top:  50 + '%',
                width: '25%',
                height: '25%',
                force: {
                    initLayout: 'circular',
                    gravity: 0,
                    repulsion: 60,
                    edgeLength: 10,
                    layoutAnimation : true
                },
                edges: item.edges.map((e)=> {
                    return e;
                })
            };
        })
    };



}
