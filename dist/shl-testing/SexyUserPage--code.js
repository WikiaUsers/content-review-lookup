/*jshint jquery:true, browser:true, devel:true, camelcase:true, curly:false, undef:true, unused:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, regexp:false, strict:true, trailing:true, maxcomplexity:10 */
 /*global mediaWiki:true, console:true*/

// __NOWYSIWYG__ <source lang="javascript">

;(function (mw, $) {
    
    'use strict';
    
    var skin   = mw.config.get('skin'),
        action = mw.config.get('wgAction'),
        userName;
    
    function getUserName () {
        var namespace  = mw.config.get('wgNamespaceNumber'),
            title      = mw.config.get('wgTitle'),
            name;
        if (-1 < [2,3,500,501,1200].indexOf(namespace)) {
            name = decodeURIComponent(title.split(/\//).shift().replace(/[&%?=]+/g, ''));
            return encodeURIComponent(name.replace(/ /g, '_'));
        }
        return false;
    }
    
    if (!{oasis:1,wikia:1}[skin] || !{view:1,history:1,edit:1}[action]) return;
    
    if ((userName = getUserName())) {
        $(document.head || 'head').append('<link href="' +
            '/index.php?title=User:' + userName + '/sup.css&ctype=text/css&action=raw&maxage=3600&smaxage=3600' +
        '" rel="stylesheet" type="text/css">');
        if (window.console && console.log) {
            console.log('trying to load stylesheet "User:' + userName + '/sup.css"');
        }
    }
}(mediaWiki, jQuery));
//</source>