
var n = 25;
var nodesArray = [];
var edgesArray = [];

nodesArray.push(createNode(1,'S',NodeType.SOURCE));
nodesArray.push(createNode(n,'T',NodeType.SINK));
for (var i = 2; i < n; i++) {
    nodesArray.push(createNode(i,i.toString(),NodeType.NORMAL));
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (var j = 0; j < n*1.5; j++) {
    var a = getRandomInt(1,n);
    var b = getRandomInt(1,n);
    edgesArray.push(createEdge(j,a,b,EdgeType.NORMAL));
}

var nodes = new vis.DataSet(nodesArray);

var edges = new vis.DataSet(edgesArray);


var container = document.getElementById('mynetwork');

var data = {
    nodes: nodes,
    edges: edges
};
var options = {
    physics: {
        stabilization: true,
        barnesHut: {
            damping: 0.15,
            springConstant: 0.005
        }
    },
    edges: {
        smooth: false
    },
    interaction: {
        //dragView: false
    }
};
var network = new vis.Network(container, data, options);

network.moveNode(1, -500, 0);
network.moveNode(n, +500, 0);
vis.stabilize(10000);