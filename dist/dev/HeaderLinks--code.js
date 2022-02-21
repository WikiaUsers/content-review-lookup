/**
 * HeaderLinks
 *
 * This adds an icon to header tags which alters the url to target that header
 * which can be copied and pasted into chat or discussions for easier linking
 * without having to dig it out of the ToC.
 *
 * @author  Cqm
 * @link    <https://dev.wikia.com/wiki/HeaderLinks> Documentation
 * @version 1.1.2
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
    var headerLinks = {
        /**
         * Loading function
         */
        init: function() {

            var headers = $('.mw-headline');

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
                    'h1:hover .mw-header-link,h2:hover .mw-header-link,h3:hover .mw-header-link,h4:hover .mw-header-link,h5:hover .mw-header-link,h6:hover .mw-header-link{opacity:0.5 !important;}' +
                    '.mw-headline .mw-header-link:hover{opacity:1 !important;}'
                );

                headers.each(function() {

                    var $a = $('<a>')
                        .attr('title', i18n.msg('text').plain())
                        .append(
                            $('<img>')
                            .attr({
                            	height: '20',
                                width: '20',
                                src: '//upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Ambox_padlock_gray.svg/20px-Ambox_padlock_gray.svg.png'
                            })
                        ),
                        $span = $('<span>')
                        .attr('class', 'mw-header-link')
                        .append($a)
                        .css({
                            'float': 'right',
                            'opacity': '0',
                            'transition': 'opacity 0.3s linear'
                        }),
                        $h = $(this);

                    $a.attr('href', '#' + $h.attr('id'));
                    $h.append($span);

                });
                if (window.HeaderLinksCopyOnClick) {
                	$('.mw-header-link > a').click(function() {
                		var $temp = $('<input>');
						$('body').append($temp);
						$temp.val('[[' + mw.config.get('wgPageName') + $(this).attr('href') + ']]').select();
						document.execCommand('copy');
						$temp.remove();
                	});
                }
            }
            mw.hook('dev.i18n').add(function(i18n) {
                i18n.loadMessages('HeaderLinks').then(init);
            });
            importArticle({
                type: 'script',
                article: 'u:dev:MediaWiki:I18n-js/code.js'
            });
        }
    };

    $(headerLinks.init);
}(jQuery, mediaWiki));