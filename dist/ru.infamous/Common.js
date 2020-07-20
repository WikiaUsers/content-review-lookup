/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
// AjaxRC configuration
var ajaxPages = ["Служебная:Watchlist", "Служебная:Contributions", "Служебная:WikiActivity", "Служебная:RecentChanges", "Служебная:NewPages"];
var AjaxRCRefreshText = 'Автообновление страницы';
var PurgeButtonText = 'Обновить';
// Import
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:AjaxRC/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:Standard_Edit_Summary/code.js'
    ]
});


/**
 * Random article widget
 * By Wildream
 */

$(function() {
    $.get(wgServer + '/api.php?action=query&list=random&rnlimit=1&rnnamespace=0&format=json', function(data) {
        var randomArticleTitle = data.query.random[0].title;
        $('#random-article-container').html('<h2>' + randomArticleTitle + '</h2><div id="random-article-img"></div><br /><div id="random-article-description"></div><div id="random-article-link"></div>');
        $('#random-article-img').load(mw.config.get('wgServer') + "/wiki/" + encodeURIComponent(randomArticleTitle) + " #mw-content-text img:first", function() {
            //I'm just trying to avoid adding any additional styles into wiki's css, so...  
            $('#random-article-img img').css({
                'width': '100%',
                'height': '100%'
            });
        });
        $('#random-article-description').load(mw.config.get('wgServer') + "/wiki/" + encodeURIComponent(randomArticleTitle) + " meta[name='description']", function() {
            $('#random-article-description').html($('#random-article-description meta[name="description"]').attr('content') + ' (<a href="' + mw.config.get('wgServer') + '/wiki/' + encodeURIComponent(randomArticleTitle) + '">читать дальше</a>)');
        });
    });
});