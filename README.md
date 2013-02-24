# jQuery Easing Chemist

A rebuild of the common [jQuery Easing plugin](http://gsgd.co.uk/sandbox/jquery/easing/) using simpler code and the building block (or molecular) style used by MooTools and D3.

## What does it do?

There are two varieties: Simple and Full.

The **simple** version provides all the usual easing types in the jQuery Easing plugin, but in a smaller, re-usable way. This means easier maintenance and a smaller file size.

The **full** version includes the simple easing functions, as well as utility methods to combine them in new ways. It also provides a keyframe-style easing builder to create custom multi-part easing functions.

Full documentation is coming soon.

## How do I use it?

Both versions (simple and full) can be used as a drop-in replacement for the old easing plugin.

    <script src="jquery.min.js"></script>
    <script src="jquery.easing-chemist.min.js"></script>
    <script>
      // Old animation code does not have to be changed
      $('#something').animate({
        top: 50,
        easing: 'easeOutBounce'
      });
    </script>

If you only want the same functionality as the old easing plugin, just use the **simple** version.

For customised easing functions that you can easily compose yourself, use the **full** version.

## Background

A quick timeline of easing in jQuery:

* 2003 &mdash; [Robert Penner](http://www.robertpenner.com/easing) created the first easing functions for Flash, with parameters for Current Time, Start Value, End Value, Total Duration.
* 2007 &mdash; jQuery 1.1 released with easing support, mostly using Penner’s function signature but with an additional (first) parameter for the percentage of duration.
* 2007 &mdash; [George Smith](http://gsgd.co.uk/) ported Penner’s original functions to jQuery, ignoring the extra Percentage parameter. These have been copied verbatim into projects for 6 years &ndash; including jQuery UI (with only a couple of minor tweaks).

However, other JavaScript libraries like [Dojo](http://dojotoolkit.org/), [Scriptaculous](http://script.aculo.us/), [MooTools](http://mootools.net/) and  [Raphaël](http://raphaeljs.com/) realised that Penner’s system could be simplified.

The percentage of time elapsed is the only thing that really matters to an easing function, and every one of Penner’s equations had to calculate that percentage using 4 function parameters.
These libraries removed all function arguments except for percentage - everything else is handled within the library.

MooTools and, later, [D3](https://github.com/mbostock/d3) made even more improvements by breaking down the repetitive parts of Penner’s equations into small, reusable pieces.

### What’s with all the hating on Penner?

None at all! Penner’s system and equations revolutionised the way people programmed animations in Flash, taking animation customisation away from a purely GUI-based system and putting it in the hands of developers.

Penner’s original system was perfect for what it was required to do (in the ActionScript 1 compiler), and it’s a testament to his ingenuity that the same basic equations are still being used in multiple major libraries today, across different languages.

### Why now? Shouldn’t we be using CSS transitions instead of JS?

Probably. CSS transitions and keyframe animations are certainly better than pure JS for animating DOM elements, but they’re not fully supported in all browsers.

Eventually I’d like to convert this plugin to br framework-agnostic, and include an option for the full builder version to output CSS keyframes.

### One more thing &ndash; Why does this Readme read like an interview when both parts were written by the same person?

Just because. Quiet you!
