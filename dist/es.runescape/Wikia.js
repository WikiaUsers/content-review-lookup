/** <nowiki>
 * MediaWiki:Wikia.js - Loads for every user using the Oasis skin.
 *
 * For scripts that load in all skins, see [[MediaWiki:Common.js]].
 * For scripts that load in the monobook skin, see [[MediaWiki:Monobook.js]].
 *
 * Please test any changes made to this file.
 * Jshint <http://www.jshint.com> can catch syntax errors to help testing.
 */
 
/*jshint bitwise:true, browser:true, camelcase:true, curly:true, devel:false,
         eqeqeq:true, es3:false, forin:true, immed:true, jquery:true,
         latedef:true, newcap:true, noarg:true, noempty:true, nonew:true,
         onevar:false, plusplus:true, quotmark:single, undef:true, unused:true,
         strict:true, trailing:true
*/
 
;(function ($, mw, rs) {
 
    'use strict';
 
    var conf = mw.config.get([
        'wgAction',
        'wgCanonicalSpecialPageName',
        'wgNamespaceNumber',
        'wgUserName'
    ]);
 
    var includes = {
        /**
         * Add extra links to the on wiki tab tab on wiki navigation.
         * Per <http://rs.wikia.com/?diff=4890582>
         *
         * @todo fix for new header or remove
         *
         * @author Ryan PM
         * @author Suppa chuppa
         * @author Sactage
         * @author Cqm
         */
        addTabLinks: {
            conditional: false, // (conf.wgAction === 'view'),
            exec: function () {
                var $li = $('.WikiHeader > nav > ul > li');
                $li = !!conf.wgUserName ? $li.first() : $li.last();
                $li.children('ul')
                    .append(
                        $('<li>')
                            .addClass('subnav-2-item')
                            .append(
                                $('<a>')
                                    .addClass('subnav-2a')
                                    .attr('href', mw.util.wikiGetlink('RuneScape:About'))
                                    .text('About us')
                            ),
                        $( '<li>' )
                            .addClass('subnav-2-item')
                            .append(
                                $('<a>')
                                    .addClass('subnav-2a')
                                    .attr('href', mw.util.wikiGetlink('RuneScape:Policies'))
                                    .text('Policies')
                            )
                    );
            }
        },
 
        /**
         * Rewrites pagetitle for profile masthead.
         *
         * Uses {{DISPLAYTITLE:title}} magic word on other pages which affects search engine results
         * whereas this version does not. As it's only for user pages, who cares?
         * 
         * Used by [[Template:Title]].
         *
         * @author Sikon (Wookieepeedia)
         * @author Cook Me Plox
         * @author Cblair91
         * @author Cqm
         */
        pageTitle: {
            conditional: (
                conf.wgAction === 'view' &&
                [2, 3].indexOf(conf.wgNamespaceNumber) > -1
            ),
            exec: function () {
                var $title = $('#title-meta');
 
                if (!$title.length) {
                    return;
                }
 
                $('.masthead-info > hgroup > h1').text( $title.text() );
            }
        },
 
        /**
         * Add dismiss function to sitenotice on [[Special:RecentChanges]].
         * Dimiss link is always found on [[MediaWiki:Recentchangestext]] to make
         * it easier to add the function as it is included in the area refreshed
         * by AjaxRC.
         *
         * Original author unknown
         *
         * @author Quarenon
         * @author Cqm
         */
        siteNoticeDismiss: {
            conditional: (conf.wgCanonicalSpecialPageName === 'RecentChanges'),
            exec: function () {
                // use the same cookie as monobook's sitenotice dismiss
                var cookie = $.cookie('dismissSiteNotice');
 
                if (cookie === ('1.' + $('#rcsitenotice-id').text())) {
                    return;
                }
 
                // the sitenotice is within the area refreshed by AjaxRC
                // so add the css to the head as inline css will just be removed with each refresh
                mw.util.addCSS('#rcSitenotice { display: block; }');
 
                function dismiss() {
                    // dismiss link coded into [[MediaWiki:Recentchangestext]]
                    // to stop it disappearing with AjaxRC refreshes
                    $('.rcsitenotice-dismiss-link').click(function () {
                        mw.util.addCSS('#rcSitenotice{ display:none; }' );
                        $.cookie('dismissSiteNotice', '1.' + $('#rcsitenotice-id').text(), {
                            expires: 90,
                            path: '/'
                        });
                    });
                }
 
                dismiss();
 
                // add to ajaxCallAgain function array
                window.ajaxCallAgain = window.ajaxCallAgain || [];
                window.ajaxCallAgain.push(dismiss);
            }
        }
    };
 
    var loaded = [];
 
    // stripped down version of [[MediaWiki:Common.js]] loader
    // this is only designed to have functions in each include
    // imports should be done in [[MediaWiki:Common.js]] to cut down on http requests
    function init() {
        $.each(includes, function (k, v) {
            var check = $.isFunction(v.conditional) ? v.conditional() : v.conditional;
 
            if (check) {
                // used for tracking which includes are loading
                loaded.push('oasis.' + k);
 
                if (v.exec) {
                    v.exec();
                }
            }
        } );
 
        // this should always be defined
        // but just in case ResourceLoader develops a quirk
        rs.loaded = (rs.loaded || []).concat(loaded);
    }
 
    $(init);
 
}(this.jQuery, this.mediaWiki, this.rswiki = this.rswiki || {}));