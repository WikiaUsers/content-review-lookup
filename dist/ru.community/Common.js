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

/**
  * Additional wiki data for wiki infobox.
  * @author: Fngplg
  * Written for http://ru.wikies.wikia.com
  * Data this script provides:
  * * Wiki's wordmark
  * * Article count
  * Usage:
  * In order to load data to the page, you must add the element with class 'wiki-infobox-input' with the wiki url inside to the page:
  * <span class="wiki-infobox-input">[URL]</span>
  * Output wil be returned to elements with next class names:
  * * wiki-infobox-wordmark
  * * wiki-infobox-articles
  *
  */
!function( $, mw ) {
	if ( $('.wiki-infobox-input').length === 0 ) return;

	var wiki = $( '.wiki-infobox-input a' ).attr( 'href' ).replace( /\/?wiki\/?/, '' );

    $.ajax({
        url: wiki + '/api.php',
        data: {
            action: 'query',
            meta: 'siteinfo',
            siprop: 'variables',
            titles: 'File:Wiki-wordmark.png',
            prop: 'imageinfo',
            iiprop: 'url',
            format: 'json'
        },
        dataType: 'jsonp',
        jsonp: 'callback',
        crossDomain: true,
        type: 'GET',
        success: function (data) {
            var cityId = 0,
            	wm = data.query.pages[ Object.keys( data.query.pages )[ 0 ] ].imageinfo[ 0 ].url;

			$('.wiki-infobox-wordmark').html( $('<img />', {src: wm}).get(0).outerHTML );

            $.each( data.query.variables, function( i, v ) {
            	if ( v.id === "wgCityId" ) cityId = v[ '*' ];
            });

			if ( cityId === 0 ) return;

            $.ajax({
                url: 'https://community.fandom.com/api/v1/Wikis/Details/',
                data: {
                    ids: cityId
                },
                dataType: 'json',
                type: 'GET',
                success: function (wikiinfo) {
                    $('.wiki-infobox-articles').text(wikiinfo.items[cityId].stats.articles);
                }
            });
        }
    });
}( this.jQuery, this.mediaWiki );