$.easing.tardis = function (t) {
    var s = 5
      , f = $.easing.easeInOutQuad
    return t < 1 / s ?
        f(t * s) * 3 / s :
        t < 2 / s ?
            1 - (f((t - 1 / s) * s) * 2 / s + 2 / s) :
            t < 3 / s ?
                f((t - 2 / s) * s) * 3 / s + 1 / s :
                t < 4 / s ?
                    1 - (f((t - 3 / s) * s) * 2 / s + 1 / s) :
                    f((t - 4 / s) * s) * 3 / s + 2 / s
}

function buildUpSteps(easing, steps) {
    if (!(steps % 2)) {
        steps++;
    }
    var halfSteps = steps / 2
    return function (t) {
        var curStep = ~~(t * steps),
            stepDiff = curStep / steps,
            newPerc = (t - stepDiff) * steps,
            divide1 = curStep % 2 ? halfSteps - .5 : halfSteps + .5,
            divide2 = curStep % 2 ? halfSteps - (curStep / 2) : curStep / 2,
            newEasing;
        newEasing = easing(newPerc) * divide1 / steps + divide2 / steps;
        if (curStep % 2) {
            newEasing = 1 - newEasing;
        }
        return newEasing;
    }
}

function buildUpLinear(easing, steps) {
    if (!(steps % 2)) {
        steps++;
    }
    return function (t) {
        var curStep = ~~(t * steps),
            stepDiff = curStep / steps,
            newPerc = (t - stepDiff) * steps,
            newEasing;
        newEasing = easing(newPerc);
        if (curStep % 2) {
            newEasing = 1 - newEasing;
        }
        newEasing = newEasing * .5 + t / 2
        return newEasing;
    }
}

$(function () {
    var $container = $('#container')
      , id = 'tardis'
      , easings = [
            buildUpSteps($.easing.easeInOutQuint, 3)
          , [$.easing.tardis, buildUpLinear($.easing.easeInOutQuad, 5)]
          , buildUpSteps($.easing.easeInOutCirc, 7)
          , [buildUpSteps($.easing.easeInOutSine, 8), buildUpLinear($.easing.easeInOutSine, 8)]
		  , buildUpLinear($.easing.easeOutElastic, 7)
		  , buildUpLinear($.easing.easeOutBounce, 7)
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
    
    
    var $tardis = $('<div id="tardis"/>').appendTo($container);
    $.easing.tardis2 = buildUpLinear($.easing.easeInOutSine, 8)
    $.easing.tardis3 = buildUpLinear($.easing.easeOutElastic, 7)
    $(document).click(function () {
        $tardis.hide().fadeIn(10000, 'tardis2')
//        $tardis.css('marginLeft', 0).animate({marginLeft: 900}, 5000, 'tardis3')
    })
});