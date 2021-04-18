/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
var ajaxPages = ["Служебная:WikiActivity","Служебная:RecentChanges","Служебная:Watchlist","Служебная:Log","Служебная:Contributions"];
var ajaxRefresh = 30000;
var AjaxRCRefreshText = 'Авто-обновление';
var AjaxRCRefreshHoverText = 'Автоматически обновляет страницу каждые '+ajaxRefresh/1000+' секунд' ;
 
PurgeButtonText = 'Обновить';
importArticles({
    type: "script",
    articles: [
	"MediaWiki:NamespaceParser.js",                            // Обрезание префиксов неймспейсов
	"w:c:ru.bleach:MediaWiki:BackToTop.js",                    // Кнопка возврата вверх
	"w:c:dev:PurgeButton/code.js",                             // Кнопка очистки кеша
	"w:c:dev:AjaxRC/code.js",                                  // Автообновление ленты
//	"w:c:ru.sword-art-online:MediaWiki:Countdown.js",          // Таймер обратного отсчета
	"w:c:ru.sword-art-online:MediaWiki:Toggle.js",             // Переключение картинок в инфобоксе
	"MediaWiki:GoogleAnalytics.js",                            // Google Analitics 
	"MediaWiki:Wikificator.js",                                // Wikificator + UnTagger
	"w:c:ru.sword-art-online:MediaWiki:StandardEditSummary.js" // Быстрое описание правки 
   ]
});
$.getScript('http://ru.sword-art-online.wikia.com/wiki/MediaWiki:SamogotTagGallery.js?action=raw');

// Скрытие спойлера
$('<a>').attr('href','#').attr('class','showspoiler').text('Читать далее...').insertAfter('.showspoiler').click(function(){var p=$(this).parent().next();$(this).remove();p.slideDown();return false;});$('span.showspoiler').remove();

// Скрытие блоков инфобоксов
$('.infobox tbody.hide td').hide();
$('.infobox tbody.hide').hover(function(){$('td',this).fadeIn()},function(){$('td',this).fadeOut()})

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