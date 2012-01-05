$(function () {
    var $container = $('#container')
      , id = 'utils'
      , $e = $.easing
      , build = $.easingUtils.build
      , easings = [
            // Simple easing reference, should just return the actual easing function
            [build('easeInOutCubic'), build($e.easeInOutCubic)]
            
            // Simple repeat and repeat-with-scale
          , [build('easeInOutCubic', 3), build($e.easeInOutCubic, 3, .5)]
            
            // Test numeric and string values for scale
          , [build('easeInOutCubic', 5, .405), build($e.easeInOutCubic, 5, '40.5%')]
            
            // Lots of repeats, some with scale
          , [build('easeOutCirc', 10), build('easeOutCirc', 10, .3)]
            
            // Re-usability of returned easing function (graph will call it twice)
          , build('easeOutCirc', 4)
            
            // Keyframe object
//          , build({
//                // Most basic keyframe
//                .25: 'easeOutElastic'
//                
//                // A reflect+reverse, turn 50 into .5
//              , 50: {
//                    easing: 'easeInBack'
//                  , reflect: true
//                  , reverse: true
//                }
//                
//                // Scale+adjust, turn '75%' into .75
//              , '75%': {
//                    easing: $e.easeOutBounce
//                  , scale: 1.1
//                  , adjust: -.1
//                }
//                
//                // No listing of 100%, should use linear
//            })
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