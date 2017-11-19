var residualCapacity = []

function makeFlowStep(source, sink, residualCapacity) {
    var queue = [source];
    var used = new Array(graphSize).fill(false);
    var previous = new Array(graphSize).fill(source);
    used[source] = true;
    while (queue.length > 0) {
        var current = queue.shift();
        for (var i = 0; i < graphSize; i++) {
            if (residualCapacity[current][i] > 0 && !used[i]) {
                used[i] = true;
                previous[i] = current;
                queue.push(i);
            }
        }
    }
    if (used[sink]) {
        var node = sink;
        var flow = 10000000;//todo: magic const
        while (previous[node] != node) {
            flow = Math.min(flow, residualCapacity[previous[node]][node]);
            node = previous[node];
        }
        console.log('Flow: ' + flow);
        node = sink;
        while (previous[node] != node) {
            residualCapacity[previous[node]][node] -= flow;
            residualCapacity[node][previous[node]] += flow;
            for (var i = 0; i < edgesNumber; i++) {
                var edge = edges.get(i);
                if (edge.from == node && edge.to == previous[node] ||
                    edge.from == previous[node] && edge.to == node) {
                    var width = capacity[previous[node]][node] - residualCapacity[previous[node]][node];
                    edges.update({
                        id: edge.id, color: {
                            color: '#EE3333',
                            highlight: '#EE3333',
                            hover: '#EE3333'
                        }, width: 6
                    });
                }
            }
            node = previous[node];
        }
        setTimeout(makeFlowStep, 1000, source, sink, residualCapacity);
    }
}

function runMaxFlow() {
    residualCapacity = capacity.map(function (array) {
        return array.slice();
    });//COPY
    var source = -1;
    var sink = -1;
    for (var i = 0; i < graphSize; i++) {
        if (nodeTypes[i] == 1) {
            source = i;
        }
        if (nodeTypes[i] == 2) {
            sink = i;
        }
    }
    makeFlowStep(source, sink, residualCapacity);
}