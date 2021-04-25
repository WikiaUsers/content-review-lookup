/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/**
 * This one fixes #forum-display position.
 */
$(function () {
    if ($('#forum-display').length) {
        $('#forum-display').insertBefore('#WikiaFooter');
    }
});

$('.centralhelpbox').click(function(){
    window.location = $(this).find('a').get(0).href;
});

// Автоматические аватары на заглавной
!function( mw, $ ) {
    'use strict';
    if ( !mw.config.get( 'wgIsMainPage' ) ) return;
 
    $( '.mainpage-avatar' ).each( function() {
        var $this_elem = $( this ).empty(),
            data_obj = {
                id: {
                    action: 'query',
                    list: 'users',
                    ususers: $( this ).attr( 'data-name' ),
                    format: 'json'
                },
                avatar: {
                    controller: 'UserProfile',
                    method: 'getUserData',
                    tab: 'avatar',
                    format: 'json'
                }
            };
 
        $.get( '/ru/api.php', data_obj.id, function( d ) {
            data_obj.avatar.userId = d.query.users[ 0 ].userid;
 
            $.post( '/ru/wikia.php', data_obj.avatar, function ( t ) {
                $( '<img />', {
                    src: t.userData.avatar,
                    width: '55px',
                    height: '55px',
                    style: 'cursor: pointer;'
                })
                .click( function() { window.open( '/ru/wiki/User:' + data_obj.id.ususers, '_blank' )})
                .appendTo( $this_elem );
            });
        });
    });
}( this.mediaWiki, this.jQuery );