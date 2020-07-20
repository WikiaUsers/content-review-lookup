/*jshint jquery:true, browser:true, es5:true, devel:true, camelcase:true, curly:false, undef:true, unused:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:true, maxcomplexity:10 */
/*global mediaWiki:true*/

(function (module, $, mw) {
    
    'use strict';
    
    function init () {
        var user    = mw.config.get('wgUserName'),
            prefs   = 'u:preferences:',
            code    = prefs + 'MediaWiki:',
            scripts = [prefs + 'User:' + user + '/preferences.js',
                       code + 'Preferences.js'];
        
        if (mw.config.get('wgCanonicalNamespace') === 'Special' &&
            mw.config.get('wgTitle') === 'Scripts') {
            scripts.unshift(code + 'Special.js');
        }
        
        $.getScript('/load.php?debug=false&mode=articles&only=scripts&articles=' + scripts.join('|'));
        
        module.defer = $.Deferred();
        $(function () {
            $('<iframe id="pref-server" src="//preferences.wikia.com/wiki/MediaWiki:Server1?action=render" style="display:none;"></iframe>')
            .appendTo(document.body)
            .on('load', function () {
                module.defer.resolve();
            });
        });
        
        module.promises = [];
        
        var Promise = function (addon) {
            this.addon = addon;
            this.queue = [];
        };
        
        $.each(['main', 'form', 'update', 'post', 'fail'], function (i, type) {
            Promise.prototype[type] = function (arg1, arg2) {
                this.queue.push({ type: type, arg1: arg1, arg2: arg2 });
                return this;
            };
        });
        
        module.addon = function (addon) {
            var p = new Promise(addon);
            module.promises.push(p);
            return p;
        };
    }
    
    if (window.postMessage && window.JSON && !module.addon) {
        init();
    }
    
}((window.dev = window.dev || {}).preferences = window.dev.preferences || {}, jQuery, mediaWiki));