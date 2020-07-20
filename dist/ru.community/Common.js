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
                    controller: 'UserProfilePage',
                    method: 'getLightboxData',
                    tab: 'avatar',
                    format: 'json'
                }
            };
 
        $.get( '/api.php', data_obj.id, function( d ) {
            data_obj.avatar.userId = d.query.users[ 0 ].userid;
 
            $.post( '/wikia.php', data_obj.avatar, function ( t ) {
                $( '<img />', {
                    src: $( t.body ).find( 'img.avatar' ).attr( 'src' ),
                    width: '55px',
                    height: '55px',
                    style: 'cursor: pointer;'
                })
                .click( function() { window.open( '/wiki/User:' + data_obj.id.ususers, '_blank' )})
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
mw.hook('wikipage.content').add(function ($content) {
if ($content.find('.wiki-infobox-input').length) {
        var arr, lang,
            mwc = mw.config.get('wgWikiaBaseDomainRegex'),
            wiki = $content.find('.wiki-infobox-input').first().text(),
            baseDomain = (/\.(fandom\.com|wikia\.org|wikia\.com)/.exec(wiki) || wiki)[1],
            rwiki = new RegExp('^(.*?)\.' + mwc.wgWikiaBaseDomainRegex, 'i');
        // retarget baseDomain
        baseDomain = baseDomain.split(new RegExp(mwc.wgWikiaBaseDomainRegex)).length > 1 ? baseDomain.replace('wikia.com', 'fandom.com') : 'fandom.com';
        // strip head and tail
        wiki = wiki.replace(/^https?:\/\/|^\/\/|\/wiki.*$/g, '');
        // lang.wiki/lang
        wiki = wiki.replace(rwiki, '$1');
        // test fandom/lang
        arr = wiki.split('/');
        lang = arr[1] || '';
        // test lang.wikia
        arr = wiki.split('.');
        lang = (!lang && arr.length > 1) ? arr[0] : lang;
        // make '/lang'
        lang = lang ? '/' + lang : lang;
        wiki = 'https://' + arr.pop().replace(/\/.*/, '') + '.' + baseDomain + lang;
        $.ajax({
            url: wiki + '/api.php',
            data: {
                action: 'query',
                meta: 'siteinfo',
                siprop: 'wikidesc',
                format: 'json'
            },
            dataType: 'jsonp',
            jsonp: 'callback',
            crossDomain: true,
            type: 'GET',
            success: function (data) {
                var cityId = data.query.wikidesc.id;
                $.ajax({
                    url: 'https://community.fandom.com/api/v1/Wikis/Details/',
                    data: {
                        ids: cityId
                    },
                    dataType: 'json',
                    type: 'GET',
                    success: function (wikiinfo) {
                        $content.find('.wiki-infobox-wordmark').html(
                            $('<img>', {src: wikiinfo.items[cityId].wordmark}).get(0).outerHTML
                        );
                        $content.find('.wiki-infobox-articles').text(wikiinfo.items[cityId].stats.articles);
                    }
                });
            }
        });
    }
});