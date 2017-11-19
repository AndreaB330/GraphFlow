var residualCapacity = []

function runMaxFlow() {
    residualCapacity = capacity.map(function(array) {
        return array.slice();
    });//COPY
}