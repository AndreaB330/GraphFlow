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
        var edgeIds = [];
        while (previous[node] != node) {
            residualCapacity[previous[node]][node] -= flow;
            residualCapacity[node][previous[node]] += flow;
            edgeIds.push(edgeId[previous[node]][node]);
            node = previous[node];
        }

        edgeIds.forEach(function (id) {
            var edge = edges.get(Math.abs(id));
            var width = Math.abs(capacity[edge.from][edge.to] - residualCapacity[edge.from][edge.to]);
            edges.update({
                id: edge.id, color: {color: '#33EE33', highlight: '#33EE33', hover: '#33EE33'},
                width: 6,
                label: (width - flow) + '/' + capacity[edge.from][edge.to] + '\n+' + flow,
                arrows: {to: {enabled: (id > 0)}, from: {enabled: (id < 0)}}
            });
        });

        setTimeout(function () {
            edgeIds.forEach(function (id) {
                var edge = edges.get(Math.abs(id));
                var width = (capacity[edge.from][edge.to] - residualCapacity[edge.from][edge.to]);
                if (width) {
                    edges.update({
                        id: edge.id, color: {color: '#EE3333', highlight: '#EE3333', hover: '#EE3333'},
                        width: 6,
                        label: ' ' + Math.abs(width) + '/' + capacity[edge.from][edge.to],
                        arrows: {to: {enabled: (width > 0)}, from: {enabled: (width < 0)}}
                    });
                } else {
                    resetEdge(edge.id);
                }
            });
        }, 2000);

        setTimeout(makeFlowStep, 3000, source, sink, residualCapacity);
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