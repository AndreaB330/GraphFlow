var graphSize = 0;
var edgesNumber = 0;
var capacity = [];
var nodeTypes = [];
var graph = [];//adjacency matrix
var undirected = true;

var nodes = new vis.DataSet();
var edges = new vis.DataSet();

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
    capacity.push(new Array(graphSize + 1).fill(0));
    graph.push(new Array(graphSize + 1).fill(false));
    graphSize++;
    graphChanged();
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
    graphChanged();
}

function removeEdge(id) {
    var edge = edges.get(id);
    if (!edge) {
        return;
    }
    if (graph[edge.from][edge.to] && (!undirected || graph[edge.to][edge.from])) {
        capacity[edge.from][edge.to] = 0;
        graph[edge.from][edge.to] = false;
        if (undirected) {
            capacity[edge.to][edge.from] = 0;
            graph[edge.to][edge.from] = false;
        }
        edges.remove(id);
        graphChanged();
    }
}

function graphChanged() {
    //todo:mb remove
}

function readGraphFromText(text) {
    var data = text
        .split(/[ \n]+/)
        .map(function(x){return parseInt(x);})
        .filter(function(x){return x;});
    console.log(data);
    var n = data[0];
    var m = data[1];
    for (var i = 2; i < 3*m+2;i+=3) {
        var edge = {};
        edge.from = data[i];
        edge.to = data[i+1];
        edge.capacity = data[i+2];
        console.log(edge);
    }
}

var EdgeType = {
    NORMAL: 0
};

var NodeType = {
    NORMAL: 0,
    SOURCE: 1,
    SINK: 2
};

function createEdge(id, from, to, type) {
    return $.extend({id: id, from: from, to: to}, edgeOptions[type]);
}

function createNode(id, label, type) {
    return $.extend({id: id, label: label}, nodeOptions[type]);
}

var globalOptions = {
    physics: {
        enabled:true,
        stabilization: {
            enabled: true,
            iterations: 10,
            updateInterval: 100,
            onlyDynamicEdges: false,
            fit: true
        },
        barnesHut: {
            damping: 0.15,
            springConstant: 0.005
        }
    },
    edges: {
        smooth: false
    },
    interaction: {
        dragView: false,
        zoomView: false
    }
};

var edgeOptions = [
    {
        arrowStrikethrough: true,
        chosen: true,
        color: {
            color: '#517cff',
            highlight: '#517cff',
            hover: '#517cff',
            inherit: 'from',
            opacity: 1.0
        },
        font: {
            color: '#FFFFFF',
            size: 18, // px
            face: 'Consolas',
            background: '#343434',
            strokeWidth: 0,
            align: 'horizontal'
        },
        label: " 1 ",
        labelHighlightBold: true,
        selectionWidth: 1,
        selfReferenceSize: 20,
        smooth: false,
        title: undefined,
        value: undefined,
        width: 3,
        widthConstraint: false
    }
];

var nodeOptions = [
    {//NORMAL
        borderWidth: 2,
        borderWidthSelected: 3,
        color: {
            border: '#2B7CE9',
            background: '#97C2FC',
            highlight: {
                border: '#2B7CE9',
                background: '#D2E5FF'
            },
            hover: {
                border: '#2B7CE9',
                background: '#D2E5FF'
            }
        },
        font: {
            color: '#343434',
            size: 18,
            face: 'Consolas',
            strokeWidth: 0,
            align: 'center',
            vadjust: -40
        },
        shape: 'dot',
        size: 20,
        fixed: false
    },
    {//SOURCE
        borderWidth: 2,
        borderWidthSelected: 3,
        color: {
            border: '#20c332',
            background: '#bdfcd0',
            highlight: {
                border: '#20c332',
                background: '#dcffe0'
            },
            hover: {
                border: '#20c332',
                background: '#bdfcd0'
            }
        },
        font: {
            color: '#343434',
            size: 18,
            face: 'Consolas',
            strokeWidth: 0,
            align: 'center',
            vadjust: -40
        },
        shape: 'dot',
        size: 20,
        fixed: false
    },
    {//SINK
        borderWidth: 2,
        borderWidthSelected: 3,
        color: {
            border: '#e9cf32',
            background: '#f1fc94',
            highlight: {
                border: '#e9cf32',
                background: '#f1fc94'
            },
            hover: {
                border: '#e9cf32',
                background: '#f1fc94'
            }
        },
        font: {
            color: '#343434',
            size: 18,
            face: 'Consolas',
            strokeWidth: 0,
            align: 'center',
            vadjust: -40
        },
        shape: 'dot',
        size: 20,
        fixed: false
    }
];


