/*jshint curly:false, jquery:true, browser:true */
/*global mediaWiki:true, importArticles:true, importArticle:true, dev:true*/
 
;(function ($, mw) {
    'use strict';
 
    var includes = {
 
        /**
         * possible fields:
         *
         * - selector: element(s) to look for in the page
         * - page: name of the page
         * - subpages: exclude subpages     when set to false
         * - exec: callback to execute      when selector or page are detected
         * - styles: stylesheet(s) to load  when selector or page are detected
         * - scripts: script(s) to load     when selector or page are detected
         *
         */

 /*
        InfoWidgets: {
            selector: '#infowidgets-demo',
            styles: 'MediaWiki:InfoWidgets/demo.css',
            scripts: 'MediaWiki:InfoWidgets/demo.js'
        },
 
        StarRatingsUi: {
            selector: '.rating-widget',
            scripts: 'MediaWiki:StarRatings/ui.js'
        },
 
        DropdownMenu: {
            selector: '.custom-dropdown',
            styles: 'MediaWiki:DropdownMenu.css'
        },

        NavboxBuilder: {
            selector: '.navbox .navbox-table-wrapper',
            styles: 'MediaWiki:Global_Lua_Modules/NavboxBuilder.css'
        },
 
        Flags: {
            selector: '.flag-icon',
            scripts: 'MediaWiki:Flags/code.js'
        },
 
        UserActivityTab: {
            page: 'User:' + mw.config.get('wgUserName'),
            scripts: 'MediaWiki:UserActivityTab/code.js'
        },
 
         WantedPagesFilter: {
            page: 'WantedPagesFilter',
            scripts: 'MediaWiki:WantedPagesFilter/code.js',
            exec: function() {
                window.wgCanonicalSpecialPageName = 'Wantedpages';
            }
        },
 
        WikiaNotification: {
            page: 'WikiaNotification',
            scripts: 'MediaWiki:WikiaNotification/code.js',
            exec: function() {
                window.localStorage.removeItem('ls-wikianotifications');
            }
        },
 
        Wikificator: {
            page: 'Wikificator',
            scripts: ['MediaWiki:Wikificator.js', 'MediaWiki:TrymeButton.js'],
            exec: function() {
                if ($.inArray(mw.config.get('wgAction'), ['edit', 'submit']) !== -1) return;
                mw.loader.load('jquery.textSelection');
                window.wikificator = window.wikificator || {};
                window.wikificator.forced = true;
                var t = $('#wpTextbox1').text();
                $('#wpTextbox1').replaceWith($('<textarea>', {id: 'wpTextbox1', value: t, style: 'width:inherit;min-width:50%;height:inherit;min-height:100px;'}));
            }
        },
 
        BackToTopButton: {
            page: 'BackToTopButton',
            scripts: 'MediaWiki:BackToTopButton/code.js',
            exec: function() {
                window.BackToTopModern = true;
            }
        }*/
 
    };
 
    function merge (other) {
        /*jshint validthis:true*/
        var self = this;
 
        if (Array.isArray(other)) {
            other.forEach(function (elem) {
                if (self.indexOf(elem) === -1) {
                    self.push(elem);
                }
            });
        } else {
            self.push(other);
        }
    }
 
    $.get(mw.util.wikiScript('load'), {
        mode: 'articles',
        articles: 'MediaWiki:Custom-DemoScripts',
        only: 'styles',
        cb: Date.now()
    }).always(function(data) {
        if (data && !data.error) {
            data = JSON.parse(data.replace(/\/\*.*\*\//g, ''));
            $.each(data, function() {
                this.restricted = 1;
            });
            // keep includes on top and preserve it from overwriting by data
            includes = $.extend(true, {}, includes, data, includes);
        }
        $(function () {
            var scripts = [],
                styles = [],
                page = mw.config.get('wgPageName'),
                basepage = page.replace(/\/.*/, '');
 
            scripts.merge = merge;
            styles.merge = merge;
 
            $.each(includes, function (name, actions) {
                var pageRestriction = new RegExp('^MediaWiki:' + basepage + '(/.*)*\\.js$');
                if (actions.restricted) {
                    actions.selector = '#mw-content-text ' + (actions.selector || '').split(',')[0];
                    if (actions.scripts) {
                        if (actions.scripts instanceof Array) {
                            actions.disabled = actions.disabled || !actions.scripts.every(function(v) {
                                return (!/\|/.test(v) && pageRestriction.test(v));
                            });
                        } else {
                            actions.disabled = actions.disabled ||
                                (!(!/\|/.test(actions.scripts) && pageRestriction.test(actions.scripts)));
                        }
                    }
                }
 
                if (actions.disabled) {
                    return;
                }
 
                if (actions.selector && !$(actions.selector).length) {
                    return;
                }
 
                if (actions.page && (actions.subpages === false ? page : basepage) !== actions.page) {
                    return;
                }
 
                if (actions.exec && !actions.restricted) {
                    actions.exec();
                }
 
                if (actions.styles && !actions.restricted) {
                    styles.merge(actions.styles);
                }
 
                if (actions.scripts) {
                    scripts.merge(actions.scripts);
                }
            });
 
            if (scripts.length) {
                importArticles({ type: 'script', articles: scripts });
            }
            if (styles.length) {
                importArticles({ type: 'style', articles: styles });
            }
        });
    });
}(jQuery, mediaWiki));