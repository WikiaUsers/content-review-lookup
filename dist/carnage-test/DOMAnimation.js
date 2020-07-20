/**
 * DOMAnimation
 * 
 * Author: Ultimate Dark Carnage
 * Created: July 19, 2020
 * Version: 0.5
 **/
( function( window, document ) { 
    "use strict";
    const 
        CONFIG = Object.freeze( {
            force3d : "auto",
            units: {
                lineHeight: ""
            }
        } ),
        DEFAULTS = Object.freeze( { 
            duration: 0.5,
            overwrite: false,
            delay: 0
        } ),
        BIG_NUMBER = 1e8,
        SMALL_NUMBER = 1 / 1e8,
        TWO_PI = 2 * Math.PI,
        HALF_PI = Math.PI / 2,
        SIN = Math.sin,
        COS = Math.cos;
    
} )( window, document );