var EdgeType = {
    NORMAL: 0
};

var NodeType = {
    NORMAL: 0,
    SOURCE: 1,
    SINK: 2
};

function createEdge(id, from, to, type) {
    return $.extend({id: id, from: from, to: to}, edgeOptions[type]);
}

function createNode(id, label, type) {
    return $.extend({id: id, label: label}, nodeOptions[type]);
}

var edgeOptions = [{
    arrowStrikethrough: true,
    chosen: true,
    color: {
        color: '#517cff',
        highlight: '#517cff',
        hover: '#517cff',
        inherit: 'from',
        opacity: 1.0
    },
    font: {
        color: '#FFFFFF',
        size: 18, // px
        face: 'Consolas',
        background: '#343434',
        strokeWidth: 0,
        align: 'horizontal'
    },
    label: "0/128",
    labelHighlightBold: true,
    selectionWidth: 1,
    selfReferenceSize: 20,
    smooth: false,
    title: undefined,
    value: undefined,
    width: 3,
    widthConstraint: false
}];

var nodeOptions = [{//NORMAL
    borderWidth: 2,
    borderWidthSelected: 3,
    color: {
        border: '#2B7CE9',
        background: '#97C2FC',
        highlight: {
            border: '#2B7CE9',
            background: '#D2E5FF'
        },
        hover: {
            border: '#2B7CE9',
            background: '#D2E5FF'
        }
    },
    font: {
        color: '#343434',
        size: 18,
        face: 'Consolas',
        strokeWidth: 0,
        align: 'center',
        vadjust: -40
    },
    shape: 'dot',
    size: 20
}, {//SOURCE
    borderWidth: 2,
    borderWidthSelected: 3,
    color: {
        border: '#20c332',
        background: '#bdfcd0',
        highlight: {
            border: '#20c332',
            background: '#dcffe0'
        },
        hover: {
            border: '#20c332',
            background: '#bdfcd0'
        }
    },
    font: {
        color: '#343434',
        size: 18,
        face: 'Consolas',
        strokeWidth: 0,
        align: 'center',
        vadjust: -40
    },
    shape: 'dot',
    size: 20,
    fixed:true
}, {//SINK
    borderWidth: 2,
    borderWidthSelected: 3,
    color: {
        border: '#e9cf32',
        background: '#f1fc94',
        highlight: {
            border: '#e9cf32',
            background: '#f1fc94'
        },
        hover: {
            border: '#e9cf32',
            background: '#f1fc94'
        }
    },
    font: {
        color: '#343434',
        size: 18,
        face: 'Consolas',
        strokeWidth: 0,
        align: 'center',
        vadjust: -40
    },
    shape: 'dot',
    size: 20,
    fixed:true
}];


