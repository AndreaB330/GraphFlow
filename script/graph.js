var graphSize = 0;
var edgesNumber = 0;
var capacity = [];
var nodeTypes = [];
var graph = [];//adjacency matrix
var undirected = true;

var nodes = new vis.DataSet();
var edges = new vis.DataSet();


function addNode(x, y, type) {
    nodeTypes.push(type||0);
    var node = createNode(graphSize, graphSize.toString(), type||NodeType.NORMAL);
    node.x = x;
    node.y = y;
    nodes.add(node);
    if (capacity.length <= graphSize) {
        capacity.forEach(function (array) {
            array.push(0)
        });
        graph.forEach(function (array) {
            array.push(false);
        });
        capacity.push(new Array(graphSize + 1).fill(0));
        graph.push(new Array(graphSize + 1).fill(false));
    }
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

function removeNode() {
    nodes.remove(graphSize - 1);
    graphSize--;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function graphChanged() {
    //todo:mb remove
}

function compareAndChange(newGraph) {
    if (newGraph.size != graphSize) {
        while(graphSize > newGraph.size) {
            removeNode();
        }
        while(graphSize < newGraph.size) {
            addNode();
        }
    }
    for (var i = 0; i < edgesNumber; i++) {
        var edge = edges.get(i);
        var found = false;
        newGraph.edges.forEach(function(newEdge) {
           //if (edge)
        });
    }
    for (var i = 0; i < newGraph.edges.length; i++) {

    }
}

function readGraphFromText(text) {
    var lines = text.split('\n');
    var graph = {};
    graph.size = parseInt(lines[0].split(' ')[0]);
    graph.source = parseInt(lines[0].split(' ')[1]);
    graph.sink = parseInt(lines[0].split(' ')[2]);
    if (!graph.size) {
        return null;
    }
    graph.edges = [];
    for (var i = 1; i < lines.length; i++) {
        var numbers = lines[i].split(' ').map(function (x) {
            return parseInt(x);
        });
        var edge = {from: numbers[0], to: numbers[1], capacity: numbers[2]};
        if (edge.from > edge.to) {
            edge = {from: numbers[1], to: numbers[0], capacity: numbers[2]};
        }
        if (edge.from && edge.to && edge.capacity && edge.to!=edge.from) {
            graph.edges.push(edge);
        }
    }
    return graph;
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
        enabled: true,
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


