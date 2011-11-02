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
      , $container = $('#container')
      , i, ii
      , j
      , k, kk
      , type
      , name
      , easings
      , prefix
    for (i = 0, ii = data.length; i < ii; i++) {
        type = data[i]
        for (j = 0; j < 3; j++) {
            easings = []
            for (k = 0, kk = type.easings.length; k < kk; k++) {
                prefix = nameArr[j] + type.easings[k]
                easings[k] = [
                    $.easing[prefix + 'Orig']
                  , $.easing[prefix]
                ]
            }
            name = type.id + '-' + nameArr[j];
            $('<div/>', {
                id: name,
                'class': 'graph-holder'
            }).appendTo($container);
            Graph(name, easings);
        }
    }
});