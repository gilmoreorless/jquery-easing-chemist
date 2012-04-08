/*!
 * jQuery Easing Utils plugin v1.0.0
 * https://github.com/gilmoreorless/jquery-easing-molecules/
 * Open source under the MIT licence: http://gilmoreorless.mit-license.org/2011/
 * Original equations by Robert Penner under the BSD licence: http://robertpenner.com/easing_terms_of_use.html
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
    
    // Convert jQuery's inbuilt easing functions to work with the new system
    $e.linear = function (t) {
        return t;
    }
    $e.swing = $e.easeInOutSine;
    
    //// Custom builds
    
/*
Possible API for building up:

// Essentially just the existing Easing Repeater
$.easing.repeated = buildEasing(nameOrFunc, repeatCount);

// Repeat on a sliding scale (like simple "tardis" easing)
$.easing.sliding = buildEasing(nameOrFunc, repeatCount, scale); // scale from 0 to 1, default is 1

// Things needed for keyframes:
// - easing (name or func)
// - transform (reverse and/or reflect)
// - scale
// - adjustment (vertical movement on a graph)

// Build easing using keyframes
$.easing.thingy = buildEasing({
    // string or function, assume no transform, scale or adjustment
    // will go from 0 to keyframe
    0: easingNameOrFunc,
    25: easingNameOrFunc,

    // standard options object
    '50%': {
        easing: nameOrFunc,
        reverse: true,
        reflect: true,
        scale: num,
        adjust: num
    },

    // "smart" object, auto-calculates reverse, scale and adjust based on from/to %
    // eg. {from: -.3, to: '60%'} works out as {scale: .9, adjust: -.3}
    // eg. {from: .6, to: '-30%'} works out as {scale: .9, adjust: -.3, reverse: true}
    75: {
        easing: nameOrFunc,
        reflect: true,
        from: positionPercentage,
        to: positionPercentage
    }
    
    // if 100% isn't defined, linear easing is done from the previous keyframe
});
*/

    // Copied from Raphaël
    var is = (function () {
        var lowerCase = String.prototype.toLowerCase,
            objectToString = Object.prototype.toString,
            isnan = {"NaN": 1, "Infinity": 1, "-Infinity": 1};
        return function is(o, type) {
            type = lowerCase.call(type);
            if (type == "finite") {
                return !isnan.hasOwnProperty(+o);
            }
            if (type == "array") {
                return o instanceof Array;
            }
            return  (type == "null" && o === null) ||
                    (type == typeof o && o !== null) ||
                    (type == "object" && o === Object(o)) ||
                    (type == "array" && Array.isArray && Array.isArray(o)) ||
                    objectToString.call(o).slice(8, -1).toLowerCase() == type;
        };
    })();
    
    function buildEasing(keyframes) {
        var stops = [],
            frames = {},
            defaultEasing,
            frame, prevFrame;
        if (keyframes.easing) {
            defaultEasing = getEasing(keyframes.easing);
        }
        // Get frame stop points and sort them, as we can't guarantee
        // the order of keys in a plain object
        var perc, newPerc;
        for (perc in keyframes) if (keyframes.hasOwnProperty(perc) && perc != 'easing') {
            newPerc = percentToNum(perc, false, true);
            frames[newPerc] = keyframes[perc];
            stops.push(newPerc);
        }
        // Optimise an empty state
        if (!stops.length) {
            return $e.linear;
        }
        // Sort percentage stops in descending order
        stops.sort(function (a, b) {
            return a == b ? 0 : a < b ? 1 : -1;
        });
        // Make sure there's a 100% keyframe
        if (stops[0] != 1) {
            stops.unshift(1);
            frames[1] = {
                easing: defaultEasing || 'linear',
                to: 1
            }
        }
        // Normalise the frames
        for (var i = stops.length; i--;) {
            frame = frames[stops[i]];
            if (is(frame, 'string')) {
                frame = frames[stops[i]] = {easing: frame};
            }
            frame.easing = frame.easing ? getEasing(frame.easing) : defaultEasing;
            if (frame.reflect) {
                frame.easing = utils.reflect(frame.easing);
            }
            // Work out "smart" frames
            if (frame.to !== undefined) {
                var to = frame.to = percentToNum(frame.to, true),
                    from;
                if (frame.from) {
                    from = percentToNum(frame.from, true);
                } else if (prevFrame) {
                    from = prevFrame.to !== undefined
                        ? prevFrame.to
                        : prevFrame.reverse
                            ? prevFrame.adjust
                            : prevFrame.scale + prevFrame.adjust;
                } else {
                    from = 0;
                }
                frame.from = from;
                frame.scale = Math.max(from, to) - Math.min(from, to);
                frame.adjust = Math.min(from, to);
                frame.reverse = from > to;
            } else {
                frame.scale  = percentToNum(frame.scale || 1, true);
                frame.adjust = percentToNum(frame.adjust || 0, true);
            }
            prevFrame = frame;
        }
        // Add in a no-op stop to speed up calculations in the customEasing function
        if (stops[stops.length - 1] != 0) {
            stops.push(0);
        }
        
        return function customEasing(t) {
            var curStop,
                prevStop,
                i = stops.length - 1;
            // Quick way of finding which frame is needed for given time value
            while ((curStop = stops[--i]) < t);
            prevStop = stops[i + 1];
            var frame = frames[curStop],
                // Percentage gap between this frame and previous frame
                step = curStop - prevStop,
                // New time value based on percentage of current frame elapsed
                newT = (1 / step) * (t - prevStop),
                // Easing based on new value of time
                e = frame.easing(newT);
            // Manipulate easing output based on frame parameters
            if (frame.reverse) {
                e = 1 - e;
            }
            e *= frame.scale || 1;
            e += frame.adjust || 0;
            
            return e;
        }
    }
    
    function getEasing(easing) {
        return typeof easing == 'function' ? easing : easing ? $e[easing] : $e.linear;
    }
    
    var rPercent = /^(\S+)%$/;
    function percentToNum(num, unbounded, normalise) {
        if (is(num, 'string')) {
            var match = num.match(rPercent);
            if (match) {
                num = match[1] / 100;
            }
        }
        if (normalise) {
            num = +num > 1 ? num / 100 : num;
        }
        return unbounded ? +num : Math.min(1, Math.max(0, +num));
    }
    
    utils.build = function (easing, repeat, scale) {
        // Keyframes, no further processing required
        if (is(easing, 'object') && !is(easing, 'function')) {
            return buildEasing(easing);
        }
        if (arguments.length > 2) {
            scale = percentToNum(scale);
        }
        if (arguments.length > 1) {
            repeat = Math.max(1, +repeat);
        } else {
            // Only an easing name or function passed in, so just return the function
            // It's faster and easier this way
            return getEasing(easing);
        }
        var frameCount = repeat * 2 - 1,
            frames = {},
            frameReverse,
            frameScale,
            frameAdjust;
        if (scale && scale < 1) {
            var scaleInverse = 1 - scale,
                scaleInverseStep = scaleInverse / frameCount,
                scaleMax = scale + scaleInverseStep,
                scaleMin = scale - scaleInverseStep;
        }
        for (var i = 1; i <= frameCount; i++) {
            frameReverse = i % 2 == 0;
            frameScale = scale;
            frameAdjust = 0;
            if (scale) {
                frameScale = frameReverse ? scaleMin : scaleMax;
                frameAdjust = scaleInverseStep * ~~(i / 2) * 2;
            }
            frames[i / frameCount] = {
                easing: easing,
                reverse: frameReverse,
                scale: frameScale,
                adjust: frameAdjust
            }
        }
        return buildEasing(frames);
    }
})(jQuery);
