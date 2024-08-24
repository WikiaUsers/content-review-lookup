 importScriptPage('FloatingToc/code.js', 'dev');
 
/* desplegable */ 
var ShowHideConfig = { linkBefore:true }; 
importScriptPage('ShowHide/code.js', 'dev');

//Burócrata/
(function () {
        "use strict";
        var userRightsList = {
            "Suicune R": ["Burócrata"]
 
        };
 
        if ($('.masthead-info hgroup').length) {
            var name = $('.masthead-info h1[itemprop="name"]').text();
            if (userRightsList[name] !== undefined) {
                var i;
                for (i = 0; i < userRightsList[name].length; i++) {
                    $('.masthead-info hgroup').append('<span class="tag">' + userRightsList[name][i] + '</span>');
                }
            }
        }
    }());
    
    //Reversor/
(function () {
        "use strict";
        var userRightsList = {
            "Frostare": ["Reversor"]
 
        };
 
        if ($('.masthead-info hgroup').length) {
            var name = $('.masthead-info h1[itemprop="name"]').text();
            if (userRightsList[name] !== undefined) {
                var i;
                for (i = 0; i < userRightsList[name].length; i++) {
                    $('.masthead-info hgroup').append('<span class="tag">' + userRightsList[name][i] + '</span>');
                }
            }
        }
    }());