$(function () {
    var $container = $('#container')
      , id = 'utils'
      , $e = $.easing
      , build = $.easingUtils.build
      , easings = [
            [build('easeInOutCubic'), build($e.easeInOutCubic)]
          , [build('easeInOutCubic', 3), build($e.easeInOutCubic, 3, .5)]
          , [build('easeInOutCubic', 5, .405), build($e.easeInOutCubic, 5, '40.5%')]
        ]
      , tempEasing
    
    for (var i = 0, ii = easings.length; i < ii; i++) {
        tempEasing = [easings[i]];
        $('<div/>', {
            id: id + i,
            'class': 'graph-holder'
        }).appendTo($container);
        Graph(id + i, tempEasing);
    }
});