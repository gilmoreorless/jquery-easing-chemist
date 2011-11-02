$.easing.tardis = function (t) {
    var s = 5
      , f = $.easing.easeInOutQuad
    return t < 1 / s ?
        f(t * s) * 3 / s :
        t < 2 / s ?
            1 - f((t - 1 / s) * s) * 2 / s - 2 / s :
            t < 3 / s ?
                f((t - 2 / s) * s) * 3 / s + 1 / s :
                t < 4 / s ?
                    1 - f((t - 3 / s) * s) * 2 / s - 1 / s :
                    f((t - 4 / s) * s) * 3 / s + 2 / s
}

$(function () {
    var $container = $('#container')
      , id = 'tardis'
      , easings = [$.easing.tardis]
    
    $('<div/>', {
        id: id,
        'class': 'graph-holder'
    }).appendTo($container);
    Graph(id, easings);
});