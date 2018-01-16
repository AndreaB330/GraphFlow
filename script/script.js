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

function defaultGraph() {
    addNode(-150, 0, 1);
    addNode(+150, 0, 2);
    addNode(0, +130, 0);
    addNode(0, -130, 0);
    addEdge(0,2,8);
    addEdge(2,1,10);
    addEdge(0,3,10);
    addEdge(3,1,8);
    addEdge(3,2,2);
    dumpGraph();
}

defaultGraph();