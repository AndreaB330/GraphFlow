$('#graph-input').bind('input propertychange', function() {
    //readGraphFromText($('#graph-input').val());
});

function dumpGraph() {
    var dump = '';
    dump += graphSize + ' ' + edgesNumber + '\n';
    for (var i = 0; i < edgesNumber; i++) {
        var edge = edges.get(i);
        dump += edge.from + ' ' + edge.to + ' ' + capacity[edge.from][edge.to] + '\n';
    }
    $('#graph-input').val(dump);
}