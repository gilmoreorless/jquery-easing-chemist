Raphael.fn.drawGrid = Raphael.fn.drawGrid || function (x, y, w, h, wv, hv, color) {
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

(function (window, $) {
    
    var gWidth     = 400
      , gPadding   = 150
      , resolution = 400
      , gBaseline  = gWidth + gPadding
      , gHeight    = gWidth + gPadding * 2
    
    window.Graph = function Graph(id, easings) {
        if (!(this instanceof Graph)) {
            return new Graph(id, easings);
        }
        this.id = id;
        this.easings = Raphael.is(easings, 'array') ? easings : [easings];
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
        var i = this.easings.length;
        while (i--) {
            this.drawEasing(this.easings[i]);
        }
    }
    
    gproto.drawEasing = function (easingFunc) {
        if (!Raphael.is(easingFunc, 'array')) {
            easingFunc = [easingFunc];
        }
        var easingBg = easingFunc[0]
          , easingFg = easingFunc[1] || easingFunc[0]
          , colour = this.nextColour()
          , bgAttrs = {
                stroke: colour
              , 'stroke-width': 5
              , opacity: .4
            }
          , fgAttrs = {
                stroke: colour
              , 'stoke-width': 1
              , opacity: 1
            }
        this.drawEasingLine(easingBg, bgAttrs);
        this.drawEasingLine(easingFg, fgAttrs);
    }
    
    gproto.drawEasingLine = function (easingFunc, attrs) {
        var path = ['M', 0, gBaseline]
          , steps = resolution
          , s = 1
          , e
        if (!easingFunc) {
            return;
        }
        for (; s < steps; s++) {
            e = easingFunc(s / steps, s, 0, 1, steps); // Extra params to make jQuery happy
            path = drawPoint(path, Graph.xyEasingToGrid(s / steps, e));
//            path = path.concat('L', Graph.xyEasingToGrid(s / steps, e));
        }
        path = drawPoint(path, Graph.xyEasingToGrid(1, 1));
//        path = path.concat('L', Graph.xyEasingToGrid(1, 1));
        this.paper.path(path).attr(attrs);
    }
    
    function drawPoint(path, point) {
//        path = path.concat('L', point);
        path = path.concat('M', point, 'l', [1, 0], [0, 1], [-1, 0], [0, -1], 'z')
        return path;
    }
})(this, jQuery);