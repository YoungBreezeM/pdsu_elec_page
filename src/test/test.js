function createNodes(count) {
    var nodes = [];
    for (var i = 0; i < count; i++) {
        nodes.push({
            id: i
        });
    }
    return nodes;
}

function createEdges(count) {
    var edges = [];
    if (count === 2) {
        return [[0, 1]];
    }
    for (var i = 0; i < count; i++) {
        edges.push([i, (i + 1) % count]);
    }
    return edges;
}

var datas = [];
for (var i = 0; i < 5; i++) {
    datas.push({
        nodes: createNodes(i + 2),
        edges: createEdges(i + 2)
    });
}
console.log(datas[0].nodes)
