/*
		// Draw graph
		var steps = 1000,
			maxX = 600,
			maxY = 400,
			minY = maxY - (paper.height - maxY),
			set = paper.set(),
			path = [],
			progress, e;

		// Original easing graph (if applicable)
		if (easing != oldEasing) {
			path = ['M', 0, maxY];
			for (progress = 1; progress < steps; progress++) {
				e = steps * $.easing[oldEasing](progress / steps, progress, 0, 1, steps);
				path = path.concat(['L', (progress / steps * maxX), maxY - (e / steps * minY)]);
			}
			path = paper.path(path).attr({
				stroke: '#FFFFFF'
			});
			set.push(path);
		}
 */
Raphael.fn.drawGrid = function (x, y, w, h, wv, hv, color) {
    color = color || "#000";
    var path = ["M", x, y, "L", x + w, y, x + w, y + h, x, y + h, x, y],
        rowHeight = h / hv,
        columnWidth = w / wv;
    for (var i = 1; i < hv; i++) {
        path = path.concat(["M", x, y + i * rowHeight, "L", x + w, y + i * rowHeight]);
    }
    for (var i = 1; i < wv; i++) {
        path = path.concat(["M", x + i * columnWidth, y, "L", x + i * columnWidth, y + h]);
    }
    return this.path(path.join(",")).attr({stroke: color});
};

$(function () {
	var undefined;
	
	/*** GRAPHS ***/
	
	var gWidth     = 400
	  , gPadding   = 150
	  , resolution = 300
	  , gBaseline  = gWidth + gPadding
	  , gHeight    = gWidth + gPadding * 2
	
	function Graph(id, easings, prefix) {
		if (!(this instanceof Graph)) {
			return new Graph(id, easings, prefix);
		}
		this.id = id;
		this.easings = Raphael.is(easings, 'string') ? [easings] : easings;
		this.prefix = '' + prefix;
		this.init();
		this.render();
	}
	
	Graph.xyEasingToGrid = function (x, y) {
		var xy = arguments.length > 1 ? [x, y] : x;
		return [
		    xy[0] * gWidth
		  , (1 - xy[1]) * gWidth + gPadding
		]
	}
	
	Graph.xyGridToEasing = function (x, y) {
		var xy = arguments.length > 1 ? [x, y] : x;
		return [
		    xy[0] / gWidth
		  , 1 - ((xy[1] - gPadding) / gWidth)
		]
	}
	
	var gproto = Graph.prototype;
	gproto.init = function () {
		this.paper = Raphael(this.id, gWidth, gHeight);
		this.paper.rect(0, 0, gWidth, gHeight).attr({fill: '#000', 'stoke-width': 0});
		this.paper.drawGrid(0.5, gPadding + .5, gWidth, gWidth, 20, 20, '#555');
		this.hue = ~~(Math.random() * 360);
	}
	
	gproto.nextColour = function () {
		var colour = 'hsl(' + [this.hue, 50, 50] + ')';
		this.hue = (this.hue + 60) % 360;
		return colour;
	}
	
	gproto.render = function () {
		for (var i = 0, ii = this.easings.length; i < ii; i++) {
			this.drawEasingComparison(this.easings[i]);
		}
	}
	
	gproto.drawEasingComparison = function (easing) {
		var easingName = this.prefix + easing
		  , colour = this.nextColour()
		  , origAttrs = {
			    stroke: colour
		      , 'stroke-width': 7
			  , opacity: .4
			}
		  , newAttrs = {
			    stroke: colour
			  , 'stoke-width': 1
			  , opacity: 1
		    }
		this.drawEasingLine(easingName + 'Orig', origAttrs);
		this.drawEasingLine(easingName, newAttrs);
	}
	
	gproto.drawEasingLine = function (easingName, attrs) {
		var easingFunc = $.easing[easingName]
		  , path = ['M', 0, gBaseline]
		  , steps = resolution
		  , s = 1
		  , e
		if (!easingFunc) {
			return;
		}
		for (; s < steps; s++) {
			e = easingFunc(s / steps, s, 0, 1, steps);
			path = path.concat('L', Graph.xyEasingToGrid(s / steps, e));
		}
		path = path.concat('L', Graph.xyEasingToGrid(1, 1));
		this.paper.path(path).attr(attrs);
	}
	
	
	
	
	/*** SETUP ***/
	
	var data = [{
		    id: 'basic'
		  , easings: ['Sine', 'Quad', 'Cubic', 'Quart', 'Quint', 'Expo', 'Circle']
		}, {
		    id: 'back'
		  , easings: ['Back']
		}, {
		    id: 'bounce'
		  , easings: ['Bounce']
		}, {
		    id: 'elastic'
		  , easings: ['Elastic']
		}]
	  , nameArr = ['easeIn', 'easeOut', 'easeInOut']
	  , $container = $('#container');
	for (var i = 0, ii = data.length; i < ii; i++) {
		var type = data[i]
		  , name
		for (var j = 0; j < 3; j++) {
			name = type.id + '-' + nameArr[j];
			$('<div/>', {
				id: name,
				'class': 'graph-holder'
			}).appendTo($container);
			Graph(name, type.easings, nameArr[j]);
		}
	}
});