/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright 2008 George McGinley Smith
 * Modified 2011 Gilmore Davidson
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
*/

/**
 * This is a file used for testing the simplification of formulae used in the original
 * jQuery Easing plugin, which has a lot of redundant variables carried over from Penner's
 * original equations and don't make sense in jQuery
 * 
 * I've only simplified the easeIn functions as a lead-in to the proper molecule system.
 */

$.easing.jswing = $.easing.swing;

$.extend($.easing, {
	def: 'easeOutQuad',
	swing: function (t) {
		return $.easing[$.easing.def](t);
	},
	easeInQuad: function (t) {
		return t*t;
	},
	easeInCubic: function (t) {
		return t*t*t;
	},
	easeInQuart: function (t) {
		return t*t*t*t;
	},
	easeInQuint: function (t) {
		return t*t*t*t*t;
	},
	easeInSine: function (t) {
		return 1 - Math.cos(t * Math.PI / 2);
	},
	easeInExpo: function (t) {
		return (t==0) ? 0 : Math.pow(2, 10 * (t - 1));
	},
	easeInCirc: function (t) {
		return 1 - Math.sqrt(1 - t * t);
	},
	easeInElastic: function (t) {
		var s, p=.3;
		if (t==0 || t==1) return t;
		s = p/(2*Math.PI) * Math.asin(1);
		return -(Math.pow(2,10*(t-=1)) * Math.sin( (t-s)*(2*Math.PI)/p ));
	},
	easeInBack: function (t) {
		var s = 1.70158;
		return t*t*((s+1)*t - s);
	},
	easeInBounce: function (t) {
		t = 1 - t
		if (t < (1/2.75)) {
			return 1-(7.5625*t*t);
		} else if (t < (2/2.75)) {
			return 1-(7.5625*(t-=(1.5/2.75))*t + .75);
		} else if (t < (2.5/2.75)) {
			return 1-(7.5625*(t-=(2.25/2.75))*t + .9375);
		} else {
			return 1-(7.5625*(t-=(2.625/2.75))*t + .984375);
		}
	}
});
