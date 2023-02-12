// __NOWYSIWYG__ <source lang="javascript">
/**
 * InactiveUsers
 *
 * documentation at: http://dev.wikia.com/wiki/InactiveUsers
 * © Peter Coester, 2012
 * 
 */
/*jshint curly:false laxbreak:true es5:true jquery:true */

(function (module, $, mw) {
    
    "use strict";
    
    var log = (function () {
        if (!window.console || !window.console.log) return function () {};
        var log = typeof window.console.log === 'object' ?  Function.prototype.bind.call(window.console.log, window.console) : window.console.log;
        return function () {
            log.apply(window.console, ['InactiveUsers', module].concat(Array.prototype.slice.call(arguments)));
        };
    }());

    // Polyfill for ECMAScript 5 function (so it works in older browsers)
    if (!Date.prototype.toISOString) Date.prototype.toISOString = function() {
        function pad(s) {
            return (s += '').length < 2 ? '0' + s : s;
        }
        return this.getUTCFullYear()
            + '-' + pad(this.getUTCMonth() + 1)
            + '-' + pad(this.getUTCDate())
            + 'T' + pad(this.getUTCHours())
            + ':' + pad(this.getUTCMinutes())
            + ':' + pad(this.getUTCSeconds())
            + '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).substr(-3)
            + 'Z';
    };
    
    function getSkinType () {
        switch (mw.config.get('skin')) {
            case 'uncyclopedia': case 'wowwiki': case 'lostbook': case 'monobook':
                return 'monobook';
            case 'oasis': case 'wikia':
                return 'oasis';
            default:
                return false;
        }
    }
    
    function getUserName () {
        var namespace = mw.config.get('wgNamespaceNumber'),
            title     = mw.config.get('wgTitle'),
            user      = mw.config.get('wgUserName'),
            special   = mw.config.get('wgCanonicalSpecialPageName'),
            page      = mw.config.get('wgPageName'),
            indexphp  = mw.config.get('wgScript');
        switch (module.skinType) {
            case 'monobook':
                if (2 !== namespace || -1 !== title.indexOf('/')) return false;
                return title;
            case 'oasis':
                if (-1 < [2,3,500,501,1200].indexOf(namespace) && -1 === title.indexOf('/')) {
                    return title;
                } else if (-1 === namespace && -1 < ['Contributions','Following'].indexOf(special)) {
                    if (indexphp === location.pathname) {
                        return $.getUrlVar('target') || false;
                    }
                    var lastPart = location.pathname.split('/').pop();
                    if (lastPart.length && lastPart !== page) {
                        return decodeURIComponent(lastPart.replace(/_/g, ' '));
                    }
                    return user;
                }
                return false;
            default:
                return false;
        }
    }
    
    function isoDateNDaysAgo (days) {
        return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
    }
    
    function getApiUrl () {
        // mw.util.wikiScript('api') is only available in MW 1.19
        return mw.config.get('wgScriptPath') + '/api' + mw.config.get('wgScriptExtension') +
               '?action=query&list=usercontribs&uclimit=1&ucprop=title|timestamp&format=json' +
               '&ucuser='  + encodeURIComponent(module.userName) +
               '&ucstart=' + isoDateNDaysAgo(0) +
               '&ucend='   + isoDateNDaysAgo(30 * Math.max(parseInt(module.months, 10) || 1, 1));
    }
    
    function labelAsInactive () {
        switch (module.skinType) {
            case 'oasis':
                $(function () {
                    var context = $('#UserProfileMasthead');
                    context.find('.inactive-user').remove();
                    var container = context.find('hgroup');
                    if ('1.16.5' === mw.config.get('wgVersion')) {
                        container.append(
                            '<span class="group inactive-user">' + module.text +  '</span>'
                        );
                    } else {
                        var css = container.find('.tag').length ? ' style="margin-left: 10px !important"' : '';
                        container.append(
                            '<span class="tag inactive-user"' + css + '>' + module.text +  '</span>'
                        );
                    }
                });
                break;
            case 'monobook':
                $(function () {
                    var context = $('h1#firstHeading');
                    context.find('.inactive-user').remove();
                    context.append(
                        ' <span class="inactive-user">[' + module.text +  ']</span>'
                    );
                });
                break;
        }
    }
    
    module = $.extend({
        text: 'Inaktiv', gone: [], months: 3, debug: false
    }, module);
    
    module.skinType = getSkinType();
    module.userName = getUserName();
 
    if (!module.skinType || !module.userName) {
        if (module.debug) log('abort');
        return;
    }
    
    if (-1 < module.gone.indexOf(module.userName)) {
        if (module.debug) log('gone');
        labelAsInactive();
    } else {
        module.apiUrl = getApiUrl ();
        $.getJSON(module.apiUrl, function (result) {
            module.reply = result;
            if (result.query && result.query.usercontribs && !result.query.usercontribs.length) {
                if (module.debug) log('query', result);
                labelAsInactive();
            } else if (module.debug) log('abort');
        });
    }

} (window.InactiveUsers = window.InactiveUsers || {}, jQuery, mediaWiki));

//</source>