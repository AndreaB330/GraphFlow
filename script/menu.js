/*$('#graph-input').bind('input propertychange', function () {
    //compareAndChange(readGraphFromText($('#graph-input').val()));
});
var timer = null;
$('#graph-input').keyup(function (e) {
    console.log(e);
    clearTimeout(timer);
    if (!parseInt(String.fromCharCode(e.which))) {
        alert(e.target.value);
        compareAndChange(readGraphFromText(e.target.value));
    } else {
        timer = setTimeout(function () {
            compareAndChange(readGraphFromText($('#graph-input').val()))
        }, 1000);
    }
});*/

function dumpGraph() {
    var dump = '';
    dump += graphSize + ' ' + edgesNumber + '\n';
    for (var i = 0; i < edgesNumber; i++) {
        var edge = edges.get(i);
        dump += edge.from + ' ' + edge.to + ' ' + capacity[edge.from][edge.to] + '\n';
    }
    $('#graph-input').val(dump);
}