/* global mediaWiki */
(function ($, mw, mwConfig) {
    "use strict";
    mediaWiki.loader.using(['mediawiki.util', 'mediawiki.api', 'jquery.cookie'], function () {
        var api = new mediaWiki.Api(),
            cookie = $.cookie('dismissSiteNotice');

        // Dismissable Sitenotice for oasis
        // @author: UltimateSupreme

        if (mwConfig.skin === 'oasis' && mwConfig.wgAction === 'view' && mwConfig.wgNamespaceNumber > -1) {
            api.get({
                action: 'parse',
                page: 'Template:Sitenotice',
                prop: 'text'
            }, {
                ok: function (json) {
                    $('#WikiHeader').append(json.parse.text['*']);

                    // Show if cookie not found
                    if (cookie !== ('1.' + $('#sitenotice-id').text())) {
                        mw.util.addCSS('#sitenotice-box {display: block;}');

                        // Dismiss functionality
                        $('#sitenotice-dismiss-link').click(function () {
                            mw.util.addCSS('#sitenotice-box {display: none;}');
                            $.cookie('dismissSiteNotice', '1.' + $('#sitenotice-id').text(), {
                                expires: 30,
                                path: '/'
                            });
                        });
                    }
                }
            });
        }

        // Spoiler Warning For forms
        if (mwConfig.wgAction === 'formedit') {
            api.get({
                action: 'parse',
                page: 'Template:EditPageNotice',
                prop: 'text'
            }, {
                ok: function (json) {
                    $('#mw-content-text').prepend(json.parse.text['*']);
                }
            });
        }
    });

    $(function () {
        if (mwConfig.skin === 'oasis' || mwConfig.skin === 'wikia') {
            if (mwConfig.wgNamespaceNumber > 0 && mwConfig.wgNamespaceNumber % 2 === 1 && /^.+\/Archive \d+$/.test(mwConfig.wgTitle)) {
                // Archive pages are not meant to be edited so lower the priority of the edit button.
                var $edit = $('#WikiaPageHeader .wikia-menu-button a:first');
                $edit.find('img').remove();
                $('<li>').append($edit).appendTo($('#WikiaPageHeader .wikia-menu-button .WikiaMenuElement'));
                $('<a href="#">Archive Page</a>').prependTo('#WikiaPageHeader .wikia-menu-button').click(function () {
                    $(this).parent().find('> .drop').click();
                });
                $('#WikiaPageHeader .wikia-menu-button .WikiaMenuElement #ca-edit').css({
                    color: '#999',
                    fontStyle: 'italic'
                }).attr({
                    title: "This page is an archive and should not be edited."
                });

                if (mwConfig.wgAction === 'edit') {
                    var $n = $('<li>This is an archive, it is <strong>NOT</strong> a talkpage. Please refrain from editing it without a good reason.</li>');
                    $('#EditPageEditor .editpage-notices ul').empty().append($n);
                }
            }
        }
    });
})(jQuery, mediaWiki, mediaWiki.config.values);