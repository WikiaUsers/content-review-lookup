/**
 * HeaderLinks
 *
 * This adds an icon to header tags which alters the url to target that header
 * which can be copied and pasted into chat or discussions for easier linking
 * without having to dig it out of the ToC.
 *
 * @author  Cqm, Gabonnie
 * @link    <https://dev.fandom.com/wiki/HeaderLinks> Documentation
 * @version 1.1.3
 *
 * @comment Does not work on file pages, due to different header tag structure.
 * @comment Does not work on Special:TagsReport, due to headers not having ids.
 */
/*global
    mediaWiki:true
*/
/*jshint
    browser:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
    immed:true, indent:4, jquery:true, latedef:true, newcap:true,
    noarg:true, noempty:true, nonew:true, onevar:true, plusplus:true,
    quotmark:single, strict:true, trailing:true, undef:true, unused:true
*/
(function($, mw) {
    'use strict';
	
	if (window.HeaderLinksLoaded) { return; }
	window.HeaderLinksLoaded = true;
    const headerLinks = {
        /**
         * Loading function
         */
        init: function() {
            const headers = $('.mw-headline');
            // abort if no headers exist
            if (!headers.length) {
                return;
            }
            // don't load twice
            if ($('.mw-header-link').length) {
                return;
            }
            headerLinks.addLinks(headers);
        },
        /**
         * Inserts link icons and associated CSS
         */
        addLinks: function(headers) {
            // append css to head
            // easier than importing such a small amount of code
            function init(i18n) {
                mw.util.addCSS(
                    '.mw-header-link { float: right; }' +
                    '.mw-header-link a { opacity: 0; transition: opacity .3s; }' +
                    ':is(h1,h2,h3,h4,h5,h6):hover .mw-header-link a { opacity: .5; }' +
                    '.mw-headline .mw-header-link a:is(:hover,:focus) { opacity: 1; }'
                );
                headers.each(function() {
                    const $a = $('<a>')
                        .attr('title', i18n.msg('text').plain())
                        .html('<svg class="wds-icon wds-icon-small"><use href="#wds-icons-link-small"></use></svg>'),
                        $span = $('<span>')
                        .attr('class', 'mw-header-link')
                        .append($a),
                        $h = $(this);
                    $a.attr('href', '#' + $h.attr('id'));
                    $h.append($span);
                });
                if (window.HeaderLinksCopyOnClick || window.HeaderLinksCopyAsURL || window.HeaderLinksCustomPrefix || window.HeaderLinksCopyAsID) {
                    $('.mw-header-link > a').click(function() {
                        const pageName = mw.config.get('wgPageName');
                        const hash = $(this).attr('href');
                        let link;
                        
                        if (window.HeaderLinksCustomPrefix) {
                            // custom URL prefix: https://example.com/Article#section
                            const prefix = window.HeaderLinksCustomPrefix.replace(/\/$/, '');
                            link = prefix + '/' + pageName + hash;
                        } else if (window.HeaderLinksCopyAsID) {
                            // id format: https://wiki.fandom.com/?curid=123#section
                            const id = mw.config.get('wgArticleId');
                            link = mw.config.get('wgServer') + '/?curid=' + id + hash;
                        } else if (window.HeaderLinksCopyAsURL) {
                            // full url format: https://wiki.fandom.com/wiki/Article#section
                            link = window.location.origin + mw.config.get('wgArticlePath').replace('$1', pageName) + hash;
                        } else {
                            // default: [[Article#section]]
                            link = '[[' + pageName + hash + ']]';
                        }
                        
                        if (navigator.clipboard && navigator.clipboard.writeText) {
                            navigator.clipboard.writeText(link);
                        } else {
                            // for old browsers without clipboard api
                            const $temp = $('<input>');
                            $('body').append($temp);
                            $temp.val(link).select();
                            document.execCommand('copy');
                            $temp.remove();
                        }
                    });
                }
            }
            mw.hook('dev.i18n').add(function(i18n) {
                i18n.loadMessages('HeaderLinks').then(init);
            });
            importArticles({
                type: 'script',
                article: 'u:dev:MediaWiki:I18n-js/code.js'
            });
        }
    };
    $(headerLinks.init);
}(jQuery, mediaWiki));