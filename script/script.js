var container = document.getElementById('mynetwork');

var network = new vis.Network(container, {nodes: nodes, edges: edges}, globalOptions);

network.on("click", events.click);
network.on("doubleClick", events.doubleClick);

function updateInformation() {
    $('#information').html(
        'Graph size: ' + graphSize + '<br/>' +
        'Edges number: ' + edgesNumber + '<br/>' +
        'Selected node: ' + events.selectedNode + '<br/>' +
        'Add node: [DoubleClick]' + '<br/>' +
        'Change node type: [DoubleClick]' + '<br/>' +
        'Delete edge: [DoubleClick]' + '<br/>' +
        'Add edge: [Click]'
    );
}

window.onload = function () {
    updateInformation();
};

function randomGraph() {
    var size = 52;
    addNode(-10, 0, 1);
    for (var i = 1; i < size - 1; i++) {
        addNode();
    }
    addNode(+10, 0, 2);

    for (var j = 0; j < size * 2; j++) {
        addEdge(getRandomInt(0, size - 1), getRandomInt(0, size - 1));
    }
}

randomGraph();