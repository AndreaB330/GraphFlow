var graphSize = 0;
var edgesNumber = 1;

var nodeTypes = [];

var capacity = [];
var edgeId = [];
var graph = []; //adjacency matrix

var undirected = true;

var nodes = new vis.DataSet();
var edges = new vis.DataSet();

function addNode(x, y, type) {
    nodeTypes.push(type || 0);
    var node = createNode(graphSize, graphSize.toString(), type || NodeType.NORMAL);
    node.x = x || getRandomInt(-60,60);
    node.y = y || getRandomInt(-60,60);
    nodes.add(node);
    if (capacity.length <= graphSize) {
        capacity.forEach(function (array) {
            array.push(0)
        });
        graph.forEach(function (array) {
            array.push(false);
        });
        edgeId.forEach(function (array) {
            array.push(0);
        });
        capacity.push(new Array(graphSize + 1).fill(0));
        graph.push(new Array(graphSize + 1).fill(false));
        ;
        edgeId.push(new Array(graphSize + 1).fill(0));
    }
    graphSize++;
}

function addEdge(from, to, cap) {
    if (graph[from][to] || undirected && graph[to][from] || from === to) {
        return;
    }
    cap = cap || getRandomInt(1, 23);
    edges.add(createEdge(edgesNumber, from, to, (undirected ? EdgeType.NORMAL : EdgeType.DIRECTED)));
    edges.update({id: edgesNumber, label: '0/' + cap});
    capacity[from][to] = cap;
    graph[from][to] = true;
    edgeId[from][to] = edgesNumber;
    if (undirected) {
        capacity[to][from] = cap;
        graph[to][from] = true;
        edgeId[to][from] = -edgesNumber;
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
        graph[edge.from][edge.to] = false;
        edgeId[edge.from][edge.to] = 0;
        if (undirected) {
            capacity[edge.to][edge.from] = 0;
            graph[edge.to][edge.from] = false;
            edgeId[edge.to][edge.from] = 0;
        }
        edges.remove(id);
    }
}

function removeNode() {
    nodes.remove(graphSize - 1);
    nodeTypes[graphSize - 1] = 0;
    graphSize--;
}

function resetEdgeStyle(id) {
    edges.update($.extend({id: id}, edgeOptions[(undirected ? EdgeType.NORMAL : EdgeType.DIRECTED)]));
}

function switchNodeType(node, type) {
    nodeTypes[node] = type;
    nodes.update($.extend({id: node}, nodeOptions[type]));
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rebuildGraph(newGraph) {
    //rebuild graph with minimum changes
    while (graphSize > newGraph.size) {
        removeNode();
    }
    while (graphSize < newGraph.size) {
        addNode();
    }

    for (var i = 0; i < edgesNumber; i++) {
        var edge = edges.get(i);
        if (!edge) {
            continue;
        }
        var newEdge;
        newGraph.edges.forEach(function (newEdge) {
            if (edge.from == newEdge.from && edge.to == newEdge.to) {
                newEdge = newEdge;
            }
            if (undirected && edge.from == newEdge.to && edge.to == newEdge.from) {
                newEdge = newEdge;
            }
        });
        if (newEdge) {
            if (newEdge.capacity != capacity[edge.from][edge.to]) {
                capacity[edge.from][edge.to] = newEdge.capacity;
                if (undirected) {
                    capacity[edge.to][edge.from] = newEdge.capacity;
                }
                edges.update({id: edge.id, label: ' 0/' + newEdge.capacity + ' '});
            }
        } else {
            removeEdge(edge.id);
        }
    }
    newGraph.edges.forEach(function (newEdge) {
        if (!graph[newEdge.from][newEdge.to]) {
            addEdge(newEdge.from, newEdge.to, newEdge.capacity);
        }
    });
}

function readGraphFromText(text) {
    var lines = text.split('\n');
    var graph = {};
    graph.size = parseInt(lines[0].split(' ')[0]);
    graph.source = parseInt(lines[0].split(' ')[1]);
    graph.sink = parseInt(lines[0].split(' ')[2]);
    if (graph.size !== 0 && !graph.size) {
        return null;
    }
    graph.edges = [];
    for (var i = 1; i < lines.length; i++) {
        var numbers = lines[i].split(' ').map(function (x) {
            return parseInt(x);
        });
        var edge = {from: numbers[0], to: numbers[1], capacity: numbers[2]};
        if ((edge.from || edge.from === 0) && (edge.to || edge.to === 0) && edge.to != edge.from) {
            graph.edges.push(edge);
        }
    }
    return graph;
}

function changeEdgeStyle(id ,color, label, width, arrowTo, arrowFrom) {
    edges.update({
        id: id, color: {color: color, highlight: color, hover: color}
    });
    edges.update({
        id: id, label: label
    });
    edges.update({
        id: id, width: width
    });
    edges.update({
        id: id, arrows: {to: {enabled: arrowTo}, from: {enabled: arrowFrom}}
    });

}

var EdgeType = {
    NORMAL: 0,
    DIRECTED: 1
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
        enabled: false,
        stabilization: {
            enabled: true,
            iterations: 10,
            updateInterval: 100,
            onlyDynamicEdges: false,
            fit: true
        },
        barnesHut: {
            damping: 0.1,
            springConstant: 0.01
        }
    },
    edges: {
        smooth: false
    },
    interaction: {
        dragView: true,
        zoomView: true
    }
};

var edgeOptions = [
    {
        arrows: {
            to: {
                enabled: false
            },
            from: {
                enabled: false
            }
        },
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
        label: " 0/1 ",
        labelHighlightBold: true,
        selectionWidth: 1,
        selfReferenceSize: 20,
        smooth: false,
        title: undefined,
        value: undefined,
        width: 3,
        widthConstraint: false
    },
    {
        arrows: {
            to: {
                enabled: true
            }
        },
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
        label: " 0/1 ",
        labelHighlightBold: true,
        selectionWidth: 1,
        selfReferenceSize: 20,
        smooth: {
            enabled: true,
            type: 'curvedCW',
            roundness: 0.15
        },
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


