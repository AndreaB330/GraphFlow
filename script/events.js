var events = {
    selectedNode: -1,
    doubleClick: function doubleClick(params) {
        if (params.nodes.length === 0 && params.edges.length === 0) {
            addNode(params.pointer.canvas.x, params.pointer.canvas.y);
        } else {
            params.nodes.forEach(function (node) {
                switchNodeType(node,(nodeTypes[node] + 1) % 3);
            });
            if (params.nodes.length === 0) {
                removeEdge(params.edges[0]);
            }
        }
        events.selectedNode = -1;
        dumpGraph();
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