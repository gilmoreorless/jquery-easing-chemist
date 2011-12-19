/*!
 * TESTING ONLY - USE OF UNSTABLE CODE IN PRODUCTION CAN RESULT IN INJURY OR DEATH
 */

;(function ($, undefined) {
    var $e = $.easing,
		utils = $.easingUtils = {},
		tmpl = utils.templates = {},
        ease = 'ease';
    
    //// Setup
    
    utils.reverse = function (func) {
        return function (t) {
            return 1 - func(1 - t);
        }
    }
    
    utils.reflect = function (func) {
        return function (t) {
            return .5 * (t < .5 ? func(2 * t) : (2 - func(2 - 2 * t)));
        }
    }
    
    utils.triple = function (name, easeInFunc, inOutTweak) {
        var basicFunc = inOutTweak ? easeInFunc() : easeInFunc,
            inOutFunc = inOutTweak ? easeInFunc(inOutTweak) : easeInFunc;
        $e[ease + 'In' + name] = basicFunc;
        $e[ease + 'Out' + name] = utils.reverse(basicFunc);
        $e[ease + 'InOut' + name] = utils.reflect(inOutFunc);
    }
    
    
    //// Easing functions
    
    tmpl.kapow = function (n) {
        return function (t) {
            return Math.pow(t, n);
        }
    }
    
    utils.triple('Quad',  tmpl.kapow(2));
    utils.triple('Cubic', tmpl.kapow(3));
    utils.triple('Quart', tmpl.kapow(4));
    utils.triple('Quint', tmpl.kapow(5));
    
    utils.triple('Sine', function (t) {
        return 1 - Math.cos(t * Math.PI / 2);
    });
    
    utils.triple('Expo', function (t) {
        return Math.pow(2, 10 * (t - 1));
    });
    
    utils.triple('Circ', function (t) {
        return 1 - Math.sqrt(1 - t * t);
    });
    
    tmpl.back = function (s) {
        if (s === undefined) s = 1.70158; // Penner's magic number #1
        return function (t) {
            return t * t * ((s + 1) * t - s);
        }
    }
    // easeInOutBack has a more exaggerated snap-back
    utils.triple('Back', tmpl.back, 1.70158 * 1.525);
    
    utils.triple('Bounce', function (t) {
        var d = 2.75,
            m = 7.5625, // Penner's magic number #2
            e = 0;
        e = t < .25 / d ?
            m * (t -= .125 / d) * t + .984375 :
            t < .75 / d ?
                m * (t -= .5 / d) * t + .9375 :
                t < 1.75 / d ?
                    m * (t -= 1.25 / d) * t + .75 :
                    m * --t * t;
        return 1 - e;
    });
    
    tmpl.elastic = function (p) {
        if (p === undefined) p = .3;
        return function (t) {
            if (t == !!t) return t;
            var pi2 = 2 * Math.PI,
                s = p / pi2 * Math.asin(1);
            return -(Math.pow(2, 10 * --t) * Math.sin((t - s) * pi2 / p));
        }
    }
    // easeInOutElastic has a different modifier so it's not as exaggerated
    utils.triple('Elastic', tmpl.elastic, .45);
	
	

})(jQuery);
