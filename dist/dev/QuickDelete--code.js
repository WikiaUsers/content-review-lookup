/**
 * Quick Delete
 * Deletes all the pages in a specific category
 *
 * @author: [[w:User:.jun]]
 */
(function ($, mw) {
    'use strict';
    var config = mw.config.get([
        'wgServer',
        'wgScriptPath',
        'wgNamespaceNumber',
        'wgTitle',
        'wgUserGroups'
    ]),
    edittoken = mw.user.tokens.values.editToken,
    category = window.category || window.categories,
    deletionDelay = window.quickDeleteDelay || 500;

    if (
        window.QuickDeleteLoaded ||
        [14].indexOf(config.wgNamespaceNumber) === -1 ||
        !/sysop|content-moderator|content-volunteer|staff|helper|wiki-manager|content-team-member|soap/.test(config.wgUserGroups.join())
    ) {
        return;
    }
    window.QuickDeleteLoaded = true;
 
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    mw.hook('dev.i18n').add(function(i18no) {
    i18no.loadMessages('QuickDelete').then(function(i18n) {
 
    if (
        typeof category === 'undefined' || 
        category.indexOf(config.wgTitle) !== -1
    ) {
        $('.page-header__contribution-buttons').append(
            $('<a>', {
                class: 'wds-is-squished wds-button wds-is-secondary deleteAll',
                title: i18n.msg('buttonTitle').plain(),
                text: i18n.msg('buttonText').plain()
            })
        );
    }
    $( '.deleteAll').click( checkDeletion );
 
    function checkDeletion () {
        $.showCustomModal( i18n.msg('reasonHead').escape(), i18n.msg('reasonBody').escape() + '<input style="border:1px solid #aaa;-moz-border-radius:4px;border-radius:4px;padding:2px;width:250px" type="text" id="wpDelReason"><hr>' + i18n.msg('reasonAlert').escape(), {
            id: 'deleteModal',
            width: 650,
            buttons: [ {
                defaultButton: true,
                message: i18n.msg('msgDel').escape(),
                handler: function () {
                    deleteAll();
                }
            }, {
                message: i18n.msg('msgCancel').escape(),
                handler: function () {
                    cancelDeletion();
                }
            } ]
        } );
    }
 
    function deleteAll () {
        cancelDeletion();
        var delItems = [];
        var deleteURL;
        var counter = 0;
        $( '#mw-pages .mw-content-ltr li' ).each( function () {
            delItems.push( $( this ).text() );
        } );
        $( '.gallery .gallerytext > a' ).each( function () {
            delItems.push( $( this ).attr( 'title' ).replace( / /g, '_' ) );
        } );
        var reason = $( '#wpDelReason' ).val() || window.reason || i18n.msg('defaultReason').plain();
        if ( delItems.length > 0 ) {
            var deletionInterval = setInterval(function () {
                if (counter === delItems.length) {
                    clearInterval(deletionInterval);
                } else {
                    deleteURL = config.wgServer + config.wgScriptPath + '/api.php?action=delete&title=' + encodeURIComponent( delItems[ counter ] ) + '&token=' + encodeURIComponent( edittoken ) + '&reason=' + encodeURIComponent( reason );
                    $.post( deleteURL );
                    counter++;
                }
            }, deletionDelay);
 
            $.showCustomModal( i18n.msg('doneHead').escape(), i18n.msg('doneBody').escape(), {
                id: 'deleted',
                width: 450,
                buttons: [ {
                    defaultButton: true,
                    id: 'refresh',
                    message: i18n.msg('msgRf').escape(),
                    handler: function () {
                        window.location.reload();
                    }
                } ]
            } );
        } else if ( delItems.length === 0 ) {
            $.showCustomModal( i18n.msg('emptyHead').escape(), i18n.msg('emptyBody').escape(), {
                id: 'no-delItems',
                width: 450,
                buttons: [ {
                    defaultButton: true,
                    message: 'OK',
                    handler: function () {
                        $( '#no-delItems' ).closeModal();
                    }
                } ]
            } );
        }
    }
 
    function cancelDeletion () {
        $( '#deleteModal' ).closeModal();
    }
});});
} ) ( jQuery, mediaWiki );