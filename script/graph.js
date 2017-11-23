var graphSize = 0;
var edgesNumber = 1;

var nodeTypes = [];

var capacity = [];
var edgeId = [];
var graph = []; //adjacency matrix

var undirected = true;
var showLabels = true;

var nodes = new vis.DataSet();
var edges = new vis.DataSet();

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addNode(x, y, type) {
    nodeTypes.push(type || 0);
    var node = createNode(graphSize, graphSize.toString(), type || NodeType.NORMAL);
    node.x = x || getRandomInt(-60, 60);
    node.y = y || getRandomInt(-60, 60);
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

function removeNode() {
    nodes.remove(graphSize - 1);
    nodeTypes[graphSize - 1] = 0;
    graphSize--;
}

function addEdge(from, to, cap) {
    if (graph[from][to] || undirected && graph[to][from] || from === to) {
        return;
    }
    cap = (cap !== 0 ? cap || getRandomInt(1, 23) : cap);
    edges.add(createEdge(edgesNumber, from, to, (undirected ? EdgeType.NORMAL : EdgeType.DIRECTED)));
    edges.update({id: edgesNumber, label: (showLabels ? '0/' + cap : undefined)});
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

function resetEdgeStyle(id) {
    edges.update($.extend({id: id}, edgeOptions[(undirected ? EdgeType.NORMAL : EdgeType.DIRECTED)]));
}

function switchNodeType(node, type) {
    nodeTypes[node] = type;
    nodes.update($.extend({id: node}, nodeOptions[type]));
}

function changeEdgeStyle(id, color, label, width, arrowToEnabled, arrowFromEnabled) {
    edges.update({
        id: id,
        color: {color: color, highlight: color, hover: color},
        label: (showLabels ? label : 0),
        width: width,
        arrows: {to: {enabled: arrowToEnabled}, from: {enabled: arrowFromEnabled}}
    });

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
        var edgeToChange;
        newGraph.edges.forEach(function (newEdge) {
            if (edge.from == newEdge.from && edge.to == newEdge.to) {
                edgeToChange = newEdge;
            }
            if (undirected && edge.from == newEdge.to && edge.to == newEdge.from) {
                edgeToChange = newEdge;
            }
        });
        if (edgeToChange) {
            if (edgeToChange.capacity != capacity[edge.from][edge.to] && (edgeToChange.capacity || edgeToChange.capacity === 0)) {
                capacity[edge.from][edge.to] = edgeToChange.capacity;
                if (undirected) {
                    capacity[edge.to][edge.from] = edgeToChange.capacity;
                }
                edges.update({
                    id: edge.id, label: (showLabels ? ' 0/' + edgeToChange.capacity + ' ' : undefined)
                });
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

var EdgeType = {
    NORMAL: 0,
    DIRECTED: 1
};

var NodeType = {
    NORMAL: 0,
    FLOW_SOURCE: 1,
    FLOW_SINK: 2
};

function createEdge(id, from, to, type) {
    return $.extend({id: id, from: from, to: to}, edgeOptions[type]);
}

function createNode(id, label, type) {
    return $.extend({id: id, label: label}, nodeOptions[type]);
}

//VIS.JS options
var globalOptions = {
    physics: {
        enabled: false,
        stabilization: {
            enabled: true,
            iterations: 100,
            updateInterval: 100,
            onlyDynamicEdges: false,
            fit: true
        },
        barnesHut: {
            damping: 0.1,
            springConstant: 0.02
        }
    },
    edges: {
        arrows: {
            to: {
                enabled: false
            },
            from: {
                enabled: false
            }
        },
        smooth: false,
        chosen: true,
        font: {
            color: '#FFFFFF',
            size: 18, // px
            face: 'Consolas',
            background: '#343434',
            strokeWidth: 0,
            align: 'horizontal'
        },
        labelHighlightBold: true,
        selectionWidth: 1,
        selfReferenceSize: 20,
        width: 3,
        widthConstraint: false
    },
    nodes: {
        borderWidth: 2,
        borderWidthSelected: 3,
        font: {
            color: '#343434',
            size: 18,
            face: 'Consolas',
            strokeWidth: 0,
            align: 'center',
            vadjust: -40
        },
        shape: 'dot',
        size: 20
    },
    interaction: {
        dragView: true,
        zoomView: true
    }
};

var edgeOptions = [
    {//UNDIRECTED EDGE
        color: {
            color: '#517cff',
            highlight: '#517cff',
            hover: '#517cff'
        },
        smooth: false
    },
    {//DIRECTED EDGE
        color: {
            color: '#517cff',
            highlight: '#517cff',
            hover: '#517cff'
        },
        smooth: {
            enabled: true,
            type: 'curvedCW',
            roundness: 0.15
        },
        arrows: {
            to: {
                enabled: true
            }
        }
    }
];

var nodeOptions = [
    {//NORMAL
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
        }
    },
    {//FLOW_SOURCE
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
        }
    },
    {//FLOW_SINK
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
        }
    }
];


