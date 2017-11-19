var graphSize = 0;
var edgesNumber = 0;
var capacity = [];
var nodeTypes = [];
var graph = [];//adjacency matrix
var undirected = true;

var selectedNode = -1;

var container = document.getElementById('mynetwork');

var nodes = new vis.DataSet();
var edges = new vis.DataSet();

var data = {nodes: nodes, edges: edges};

var network = new vis.Network(container, data, globalOptions);


function updateInformation() {
    $('#information').html(
        'Graph size: ' + graphSize + '<br>' +
        'Edges number: ' + edgesNumber + '<br>' +
        'Selected node: ' + selectedNode + '<br>' +
        'Add node: [DoubleClick]' + '<br>' +
        'Change node type: [DoubleClick]' + '<br>' +
        'Delete edge: [DoubleClick]' + '<br>' +
        'Add edge: [Click]'
    );
}

updateInformation();

function addNode(x, y) {
    nodeTypes.push(0);
    var node = createNode(graphSize, graphSize.toString(), NodeType.NORMAL);
    node.x = x;
    node.y = y;
    nodes.add(node);
    capacity.forEach(function (array) {
        array.push(0)
    });
    graph.forEach(function (array) {
        array.push(false);
    });
    graphSize++;
    capacity.push(new Array(graphSize).fill(0));
    graph.push(new Array(graphSize).fill(false));
}

function addEdge(from, to) {
    if (graph[from][to] || undirected && graph[to][from] || from === to) {
        return;
    }
    edges.add(createEdge(edgesNumber, from, to, EdgeType.NORMAL));
    capacity[from][to] = 1;
    graph[from][to] = true;
    if (undirected) {
        capacity[to][from] = 1;
        graph[to][from] = true;
    }
    edgesNumber++;
}

function removeEdge(id) {
    var edge = edges.get(id);
    if (!edge) {
        return;
    }
    if (graph[edge.from][edge.to] && (!undirected || graph[edge.to][edge.from])) {
        capacity[edge.from][edge.to] = 0;
        if (undirected) {
            capacity[edge.to][edge.from] = 0;
        }
        edges.remove(id);
    }
}

network.on("doubleClick", function (params) {
    if (params.nodes.length === 0 && params.edges.length === 0) {
        addNode(params.pointer.canvas.x, params.pointer.canvas.y);
    } else {
        params.nodes.forEach(function (node) {
            var data = nodeOptions[nodeTypes[node] = (nodeTypes[node] + 1) % 3];
            nodes.update($.extend({id:node},data));
        });
        if (params.nodes.length === 0) {
            removeEdge(params.edges[0]);
        }
    }
    selectedNode = -1;
    updateInformation();
});

network.on("click", function (params) {
    if (params.nodes.length !== 0) {
        if (selectedNode === -1) {
            selectedNode = params.nodes[0];
        } else {
            if (selectedNode !== params.nodes[0]) {
                addEdge(selectedNode, params.nodes[0]);
                selectedNode = -1;
            }
        }
    } else {
        selectedNode = -1;
    }
    updateInformation();
});

/*
network.moveNode(1, -500, 0);
network.moveNode(n, +500, 0);
vis.stabilize(10000);*/