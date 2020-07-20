/* <nowiki>
 * Toggle JS testmode using a link in the toolbar
 *
 * @author Cqm <https://dev.wikia.com/User:Cqm>
 * @version 0.4
 */

/*global jQuery, mediaWiki */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, es3:false,
	forin:true, immed:true, indent:4, latedef:true, newcap:true,
	noarg:true, noempty:true, nonew:true, plusplus:true, quotmark:single,
	undef:true, unused:true, strict:true, trailing:true,
	browser:true, devel:false, jquery:true,
	onevar:true
*/

;(function ($, mw, Wikia) {
    'use strict';

        /**
         *
         */
    var conf = mw.config.get([
            'wgArticleId',
            'wgCityId',
            'wgContentReviewTestModeEnabled'
        ]),

        /*
         *
         */
        testmode = {
            /*
             *
             */
            enable: function (e) {
                e.preventDefault();

                if (conf.wgContentReviewTestModeEnabled) {
                    reloadPage();
                }

                var data = {
                    pageId: conf.wgArticleId,
                    wikiId: conf.wgCityId,
                    editToken: mw.user.tokens.get('editToken')
                };

                $.nirvana.sendRequest({
                    controller: 'ContentReviewApiController',
                    method: 'enableTestMode',
                    data: data,
                    callback: function () {
                        reloadPage();
                    },
                    onErrorCallback: function() {
                        console.error(arguments);
                    }
                });
            },

            /*
             *
             */
            disable: function (e) {
                e.preventDefault();

                if (!conf.wgContentReviewTestModeEnabled) {
                    reloadPage();
                }

                $.nirvana.sendRequest({
                    controller: 'ContentReviewApiController',
                    method: 'disableTestMode',
                    callback: function () {
                        reloadPage();
                    },
                    onErrorCallback: function() {
                        console.error(arguments);
                    }
                });
            }
        };

    /*
     *
     */
    function reloadPage() {
        var qs = new Wikia.Querystring();
        qs.addCb().goTo();
    }

    /*
     *
     */
    function init() {
        window.dev.i18n.loadMessages('ToggleTestMode').done(function (i18n) {
            $('#WikiaBarWrapper .tools').append(
                $('<li>')
                    .addClass('dev-testmode')
                    .append(
                        $('<a>')
                            .attr({
                                href: '#',
                                id: 'dev-testmode-toggle'
                            })
                            .css('cursor', 'pointer')
                            .text(
                                conf.wgContentReviewTestModeEnabled ?
                                    i18n.msg('disable-test-mode').plain() :
                                    i18n.msg('enable-test-mode').plain()
                            )
                            .click((function(e) {
                                return e ? testmode.disable : testmode.enable;
                            })(conf.wgContentReviewTestModeEnabled))
                    )
            );
        });
    }

    window.dev = window.dev || {};
    window.dev.testmode = testmode;

    mw.hook('dev.i18n').add(init);
    importArticles({type: 'script', articles: ['u:dev:I18n-js/code.js']});

}(jQuery, mediaWiki, Wikia));