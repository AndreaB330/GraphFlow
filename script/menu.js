$('#graph-input').bind('input propertychange', function () {
    //compareAndChange(readGraphFromText($('#graph-input').val()));
});
var timer = null;
$('#graph-input').keyup(function (e) {
    clearTimeout(timer);
    if (!parseInt(String.fromCharCode(e.which))) {
        compareAndChange(readGraphFromText(e.target.value));
    } else {
        timer = setTimeout(function () {
            compareAndChange(readGraphFromText($('#graph-input').val()))
        }, 1000);
    }
});

function dumpGraph() {
    var dump = '';
    dump += graphSize + '\n';
    for (var i = 0; i < edgesNumber; i++) {
        var edge = edges.get(i);
        if (edge) {
            dump += edge.from + ' ' + edge.to + ' ' + capacity[edge.from][edge.to] + '\n';
        }
    }
    $('#graph-input').val(dump);
}

function resetGraph() {
    for (var i = 1; i < edgesNumber; i++) {
        removeEdge(i);
    }
    compareAndChange(readGraphFromText($('#graph-input').val()));
}

function switchDirected(checkbox) {
    for (var i = 1; i < edgesNumber; i++) {
        removeEdge(i);
    }
    undirected = !checkbox.checked;
    compareAndChange(readGraphFromText($('#graph-input').val()));
}

function switchPhysics(checkbox) {
    network.setOptions({physics: {enabled: checkbox.checked}});
}