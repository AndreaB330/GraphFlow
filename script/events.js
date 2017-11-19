var events = {
    selectedNode: -1,
    doubleClick: function doubleClick(params) {
        if (params.nodes.length === 0 && params.edges.length === 0) {
            addNode(params.pointer.canvas.x, params.pointer.canvas.y);
            dumpGraph();
        } else {
            params.nodes.forEach(function (node) {
                var data = nodeOptions[nodeTypes[node] = (nodeTypes[node] + 1) % 3];
                nodes.update($.extend({id: node}, data));
                dumpGraph();
            });
            if (params.nodes.length === 0) {
                removeEdge(params.edges[0]);
                dumpGraph();
            }
        }
        events.selectedNode = -1;
        updateInformation();
    },
    click: function click(params) {
        if (params.nodes.length !== 0) {
            if (events.selectedNode === -1) {
                events.selectedNode = params.nodes[0];
            } else {
                if (events.selectedNode !== params.nodes[0]) {
                    addEdge(events.selectedNode, params.nodes[0]);
                    dumpGraph();
                    events.selectedNode = -1;
                }
            }
        } else {
            events.selectedNode = -1;
        }
        updateInformation();
    }
};