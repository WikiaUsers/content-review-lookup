/*Викификатор*/

function addWikifButton() {
        var toolbar = (document.getElementById('cke_toolbar_source_1') || document.getElementById('toolbar') ) // Monobook+Modern
        if (!toolbar) return
        var i = document.createElement('img')
        i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png'
        i.alt = i.title = 'викификатор'
        i.onclick = Wikify
        i.style.cursor = 'pointer'
        toolbar.appendChild(i)
}
if (wgAction == 'edit' || wgAction == 'submit') {
        importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript')
        addOnloadHook(addWikifButton)
}

window.ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
];
window.AjaxRCRefreshText = 'Автообновление страницы';
PurgeButtonText = 'Обновить';
 
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Common.js/BackToTop.js',
        'u:dev:AjaxPatrol/code.js',
        'u:dev:AjaxRC/code.js'
    ]
});

//При поддержке Goha.ru и значок 12+
$(".WikiaPageContentWrapper").append("<div class='revcopyright'><a href='http://goha.ru' class='goha'></a><a class='twelve'></a></div>");

//Powernicks
function Powernick() {
    $("a").each(function(){
  if( $.trim($(this).text()) == "Microstyle" ){
    $(this).html("<span class='Bureaucrat' title='Бюрократ'>Microstyle</span>");
  }
  if ( $.trim($(this).text()) == "Soviya" ){
    $(this).html("<span class='Bureaucrat' title='Бюрократ'>Soviya</span>");
  }
});
}
//Using setTimeout for WikiaRail
$(window).load(function() {
    setTimeout(Powernick(), 300);
});