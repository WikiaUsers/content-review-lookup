/**
 * Ajax Fast Delete
 * @author Grunny
 * @version 2.1
 * @notes Original FastDelete code was written by Splarka, and later modified by uberfuzzy and Grunny.
 *
 * This version adapted for use on courage.wikia.com by RyaNayR.
 */

(function($) {
    "use strict";

    // Don't load twice...
    if (typeof window.wkAjaxFastDelete !== 'undefined') {
        return false;
    }

    window.wkAjaxFastDelete = {
        version: '2.1',
        init: function() {

            if (wgNamespaceNumber === -1 || !window.fdButtons) {
                return;
            }
            var deleteButtons = '';
            switch (skin) {
                case 'monobook':
                    if (!$('#ca-delete').length) {
                        return;
                    }
                    for (var i = 0; i < fdButtons.length; i++) {
                        deleteButtons += '<li><a style="cursor: pointer;" title="Ajax delete'
                            + '" data-id="fastdelete">' + fdButtons[i].label + '</a></li>';
                    }
                    $('#p-cactions > .pBody > ul').append(deleteButtons);
                    break;

                case 'oasis':
                case 'wikia':
                    if (!$('a[data-id="delete"]').length) {
                        return;
                    }
                    for (var i = 0; i < fdButtons.length; i++) {
                        deleteButtons += '<a class="wikia-button fastDelete" title="Quick Delete'
                            + '" data-id="fastdelete" style="margin: 3px 0 0 13px;">'
                            + fdButtons[i].label + '</a>';
                    }
                    switch (wgNamespaceNumber) {
                        case 1:
                        case 5:
                        case 7:
                        case 9:
                        case 11:
                        case 13:
                        case 14:
                        case 15:
                        case 111:
                        case 401:
                            $('header.WikiaPageHeader > h2').before(deleteButtons);
                            break;
                        case 2:
                        case 3:
                            if ($('#UserProfileMasthead').length) {
                                $('div.UserProfileActionButton').append(deleteButtons);
                            } else {
                                $('div.WikiaUserPagesHeader > ul.wikia-avatar').after(deleteButtons);
                            }
                            break;
                        case 500:
                        case 502:
                            $('div.WikiaUserPagesHeader > h1').after(deleteButtons);
                            break;
                        default:
                            $('.wikia-button.comments.secondary.talk').after(deleteButtons);
                            break;
                    }
                    break;
            }
            if ($('a[data-id="fastdelete"]').length) {
                $('a[data-id="fastdelete"]').click(function() {
                    wkAjaxFastDelete.ajaxDeleteAPage($(this).attr('data-summary'));
                });
            }
        },
        ajaxDeleteAPage: function(deleteReason) {
            var url = wgServer + wgScriptPath
                + '/api.php?action=query&prop=info&intoken=delete&titles='
                + encodeURIComponent(wgPageName) + '&format=json';
            $.getJSON(url, function(data) {
                var editToken = data.query.pages[wgArticleId].deletetoken,
                    url = wgServer + wgScriptPath + '/api.php?action=delete&title='
                    + encodeURIComponent(wgPageName) + '&reason=&format=json&token='
                    + encodeURIComponent(editToken);
                $.post(url, function() {
                    document.location.reload();
                });
            });
        }
    };
    $(document).ready(wkAjaxFastDelete.init);
}(jQuery));