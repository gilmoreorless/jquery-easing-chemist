$(function () {
    var data = [{
            id: 'basic'
          , easings: ['Sine', 'Quad', 'Cubic', 'Quart', 'Quint', 'Expo']
        }, {
            id: 'backCirc'
          , easings: ['Back', 'Circ']
        }, {
            id: 'bounce'
          , easings: ['Bounce']
        }, {
            id: 'elastic'
          , easings: ['Elastic']
        }]
      , nameArr = ['easeIn', 'easeOut', 'easeInOut']
      , $container = $('#container');
    for (var i = 0, ii = data.length; i < ii; i++) {
        var type = data[i]
          , name
        for (var j = 0; j < 3; j++) {
            name = type.id + '-' + nameArr[j];
            $('<div/>', {
                id: name,
                'class': 'graph-holder'
            }).appendTo($container);
            Graph(name, type.easings, nameArr[j]);
        }
    }
});