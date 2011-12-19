$(function () {
    var $container = $('#container')
      , $e = $.easing
      , f = $e.easeInCubic
      , id = 'manip'
      , easings = [
            {n: 'Normal',              d: 'f(t)', e: f}
          , {n: 'Flip Horizontal',     d: 'f(1 - t)', e: function (t) {return f(1 - t)}}
          , {n: 'Flip Vertical',       d: '1 - f(t)', e: function (t) {return 1 - f(t)}}
          , {n: 'Rotate 180˚',         d: '1 - f(1 - t)', e: function (t) {return 1 - f(1 - t)}}
          , {n: 'Shrink Horizontal',   d: 'f(t * 2)', e: function (t) {return f(t * 2)}}
          , {n: 'Stretch Horizontal',  d: 'f(t / 2)', e: function (t) {return f(t / 2)}}
          , {n: 'Shrink Vertical',     d: 'f(t) / 2', e: function (t) {return f(t) / 2}}
          , {n: 'Stretch Vertical',    d: 'f(t) * 2', e: function (t) {return f(t) * 2}}
          , {n: 'Move Horizontal (+)', d: 'f(t - 0.25)', e: function (t) {return f(t - .25)}}
          , {n: 'Move Horizontal (-)', d: 'f(t + 0.5)', e: function (t) {return f(t + .5)}}
          , {n: 'Move Vertical (+)',   d: 'f(t) + 0.5', e: function (t) {return f(t) + .5}}
          , {n: 'Move Vertical (-)',   d: 'f(t) - 0.5', e: function (t) {return f(t) - .5}}
        ]
      , easing
      , $div
    
    for (var i = 0, ii = easings.length; i < ii; i++) {
        easing = easings[i]
        $div = $('<div/>', {
            id: id + i,
            'class': 'graph-holder'
        })
        $div.appendTo($container)
        Graph(id + i, easing.e)
        $div.prepend('<span class="title">' + easing.n + '</span><span class="desc">' + easing.d + '</span>')
    }
});