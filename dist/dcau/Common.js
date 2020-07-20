$(function STemplateUI() {
    $(".ogg_player .image").remove();
});

/* Auto-refreshing recent changes */
window.ajaxPages = [
    "Special:WikiActivity",
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions"
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* Admin highlights */
highlight = {
    sysop: '#0148c2'
};

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */

if (wgNamespaceNumber == 110) {
    addOnloadHook(disableOldForumEdit);
}

function disableOldForumEdit() {
    if (typeof(enableOldForumEdit) != 'undefined' && enableOldForumEdit) {
        return;
    }
    if (!document.getElementById('old-forum-warning')) {
        return;
    }

    if (skin == 'oasis') {
        $('#WikiaPageHeader .wikia-menu-button a:first').html('Archived').removeAttr('href');
        return;
    }

    if (!document.getElementById('ca-edit')) {
        return;
    }
    var editLink = null;
    if (skin == 'monobook') {
        editLink = document.getElementById('ca-edit').firstChild;
    } else {
        return;
    }


    editLink.removeAttribute('href', 0);
    editLink.removeAttribute('title', 0);
    editLink.style.color = 'gray';
    editLink.innerHTML = 'Archived';

    $('span.editsection-upper').remove();

}

/*//////////////////////////////////////////////////////////////////
// THE BELOW CODE ADDS CUSTOM BUTTONS TO THE JAVASCRIPT EDIT TOOLBAR
//////////////////////////////////////////////////////////////////*/

if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/youngjustice/images/d/dc/Image_Button.png",
        "speedTip": "Insert filebox template",
        "tagOpen": "\{\{Filebox\r| description = ",
        "tagClose": "\r| episode     = \r| film        = \r| show        = \r| source      = \r| origin      = \r| license     = screenshot\r\}\}",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/youngjustice/images/1/1d/Copyrights_needed_Button.png",
        "speedTip": "Uncredited image tag",
        "tagOpen": "\{\{subst:ukn|",
        "tagClose": "}}",
        "sampleText": "both"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/youngjustice/images/c/ce/Ep_ref_Button.png",
        "speedTip": "Episode/issue reference tag",
        "tagOpen": "<ref name=\"\">{{ep ref|",
        "tagClose": "|number}}</ref>",
        "sampleText": "series"
    };
}

/* Adds icons to page header bottom border
 * by: [[User:The 888th Avatar]], adapted to new header by [[User:Thailog]]
 */

$(function() {
    if ($('.wds-community-header').length) {
        $('#PageHeader').prepend(
            $('#icons').attr('style', 'position: absolute; right: 0px;')
        );
    } else {
        $('.WikiaPageHeader').append($('#icons'));
        $('#icons').css({
            'position': 'absolute',
            'right': '0',
            'bottom': '-2em'
        }).show();
    }
});