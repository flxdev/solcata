/** svg.path.js - v0.6.0 - 2014-02-04
 * http://otm.github.io/svg.path.js/
 * Copyright (c) 2014 Nils Lagerkvist; Licensed under the  MIT license /
 */

(function() {

  SVG.extend(SVG.Path, {
    
    /**
     * Easing:
     *  <>: ease in and out
     *  >: ease out
     *  <: ease in
     *  -: linear
     *  =: external control
     *  a function
     */
    drawAnimated: function(options){
      options = options || {};
      options.duration = options.duration || '1000';
      options.delay = options.delay || 0;
      options.dashOffset = options.dashOffset || 0;
      
      var length = this.length();

      this.stroke({
        width:         2,
        dasharray:     length + ' ' + length,
        dashoffset:    length
      });

      var fx = this.animate(options.duration, options.delay);

      fx.stroke({
        dashoffset: -length
      });
      
      return this;
    }

  });

}).call(this);