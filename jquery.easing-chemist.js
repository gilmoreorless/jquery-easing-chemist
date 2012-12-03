/*!
 * jQuery Easing Chemist plugin v1.0.0 - Simple version
 * https://github.com/gilmoreorless/jquery-easing-chemist/
 * Open source under the MIT licence: http://gilmoreorless.mit-license.org/2011/
 * Original equations by Robert Penner under the BSD licence: http://robertpenner.com/easing_terms_of_use.html
 */
;(function ($, undefined) {
    var $e = $.easing,
        ease = 'ease';

    //// Setup

    function reverse(func) {
        return function (t) {
            return 1 - func(1 - t);
        }
    }

    function reflect(func) {
        return function (t) {
            return .5 * (t < .5 ? func(2 * t) : (2 - func(2 - 2 * t)));
        }
    }

    function build(name, easeInFunc, inOutTweak) {
        var basicFunc = inOutTweak ? easeInFunc() : easeInFunc,
            inOutFunc = inOutTweak ? easeInFunc(inOutTweak) : easeInFunc;
        $e[ease + 'In' + name] = basicFunc;
        $e[ease + 'Out' + name] = reverse(basicFunc);
        $e[ease + 'InOut' + name] = reflect(inOutFunc);
    }


    //// Easing functions

    function kapow(n) {
        return function (t) {
            return Math.pow(t, n);
        }
    }

    build('Quad',  kapow(2));
    build('Cubic', kapow(3));
    build('Quart', kapow(4));
    build('Quint', kapow(5));

    build('Sine', function (t) {
        return 1 - Math.cos(t * Math.PI / 2);
    });

    build('Expo', function (t) {
        return Math.pow(2, 10 * (t - 1));
    });

    build('Circ', function (t) {
        return 1 - Math.sqrt(1 - t * t);
    });

    var back = function (s) {
        if (s === undefined) s = 1.70158; // Penner's magic number #1
        return function (t) {
            return t * t * ((s + 1) * t - s);
        }
    }
    // easeInOutBack has a more exaggerated snap-back
    build('Back', back, 1.70158 * 1.525);

    build('Bounce', function (t) {
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

    var elastic = function (p) {
        if (p === undefined) p = .3;
        return function (t) {
            if (t == !!t) return t;
            var pi2 = 2 * Math.PI,
                s = p / pi2 * Math.asin(1);
            return -(Math.pow(2, 10 * --t) * Math.sin((t - s) * pi2 / p));
        }
    }
    // easeInOutElastic has a different modifier so it's not as exaggerated
    build('Elastic', elastic, .45);

})(jQuery);
