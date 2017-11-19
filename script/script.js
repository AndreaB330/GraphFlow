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