/**
 * @name            WikiToolbar
 * @version         v0.6
 * @author          Ultimate Dark Carnage
 * @description     Replaces the current toolbar with an updated version.
 **/

require([
    "wikia.window",
    "wikia.document",
    "jquery",
    "mw"
], function(window, document, $, mw){
    "use strict";
    const MAX_LENGTH = 8;
    
    const CLAMP = function(n, min, max){
        return Math.max(min, Math.min(n, max));
    };
    
    const CALC_LENGTH = function(target){
    };
});