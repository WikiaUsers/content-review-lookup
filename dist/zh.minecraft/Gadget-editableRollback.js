$( function() {
'use strict';

$( '.mw-rollback-link > a' ).after( $( '<span>' ).addClass( 'edit-rollback' ).prop( 'title', wgULS('编辑回退摘要', '編輯回退摘要') ) );
$( '#mw-content-text .edit-rollback' ).on( 'click', function() {
    var rollbackLink = $( this ).prev().prop( 'href' );
    var name = decodeURIComponent( rollbackLink.match( /&from=(.+)&token/ )[1].replace( /\+/g, ' ' ) );
    OO.ui.prompt( '回退摘要：', {
        textInput: {
            value: wgULS( '回退[[Special:Contribs/' + name + '|' + name + ']]（[[User talk:' + name + '|讨论]]）所做的编辑', '回退[[Special:Contribs/' + name + '|' + name + ']]（[[User talk:' + name + '|討論]]）所做的編輯' )
        }
    } ).done( function( result ) {
        if ( result !== null ) {
            window.location = rollbackLink + '&summary=' + encodeURIComponent( result );
        }
    } );
} );
} );