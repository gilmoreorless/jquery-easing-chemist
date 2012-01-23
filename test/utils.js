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
            
            // Empty easing, defaults to linear
          , build('')
            
            // Keyframe object
          , build({
                // Most basic keyframe
                .25: 'easeOutElastic'
                
                // A reflect+reverse, turn 50 into .5
              , 50: {
                    easing: 'easeInBack'
                  , reflect: true
                  , reverse: true
                }
                
                // Scale+adjust, turn '75%' into .75
              , '75%': {
                    easing: $e.easeOutBounce
                  , scale: 1.2
                  , adjust: -.1
//                  , reverse: true // TEMP for testing 100% defaults
                }
                
                // No listing of 100%, should use linear
            })
            
            // Empty keyframes - should default to linear
          , build({})
            
/*
    // "smart" object, auto-calculates reverse, scale and adjust based on from/to %
    // eg. {from: -.3, to: '60%'} works out as {scale: .9, adjust: -.3}
    // eg. {from: .6, to: '-30%'} works out as {scale: .9, adjust: -.3, reverse: true}
    75: {
        easing: nameOrFunc,
        reflect: true,
        from: positionPercentage,
        to: positionPercentage
    }
 */
            // Single smart frame, normal
          , build({
                100: {
                    easing: 'easeOutQuint'
                  , from: .125
                  , to: '72.5%'
                }
            })
            
            // Single smart frame, reverse
          , build({
                100: {
                    easing: 'easeOutQuint'
                  , from: .725
                  , to: '12.5%'
                }
            })
            
            // Multi-step smart frames, with default easing
          , build({
                easing: $e.easeInSine
              , .33: {
                    // No `easing`, should default to keyframes.easing
                    // No `from`, should default to 0
                    to: '90%'
                }
              , '75%': {
                    // No `from`, should default to `to` of previous frame
                    to: .4
                  , easing: 'linear'
                }
              , 100: {
                    // No `easing`, should default to keyframes.easing
                    from: .3
                  , to: 1
                  , reflect: true
                }
            })
            
            // Mix normal frames with smart frames
          , build({
                25: {
                    easing: 'easeInCirc'
                  , scale: '25%'
                }
              , 50: {
                    easing: $e.easeOutCirc
                  , to: .5
                  , reflect: true
                }
              , '75%': {
                    easing: $e.easeInCirc
                  , scale: .25
                  , adjust: .25
                  , reverse: true
                }
              , 1: {
                    easing: 'easeOutCirc'
                  , to: 1
                  , reverse: true // Shouldn't do anything when `to` is present
                }
            })
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