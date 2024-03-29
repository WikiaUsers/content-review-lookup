/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */

if (mw.config.get('wgNamespaceNumber') == 110) {
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