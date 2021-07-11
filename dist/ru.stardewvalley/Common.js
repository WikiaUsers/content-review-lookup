/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
//Стиль кнопки назад
window.BackToTopModern = true;
$(document).ready(function() {
	// Кнопка "Назад" для нового оформления
$('<a class="wds-button wds-is-secondary" title="Наверх" id="backToTop"><svg class="wds-icon wds-icon-small" viewBox="0 0 284.929 284.929"><g><path d="M282.082,195.285L149.028,62.24c-1.901-1.903-4.088-2.856-6.562-2.856s-4.665,0.953-6.567,2.856L2.856,195.285 C0.95,197.191,0,199.378,0,201.853c0,2.474,0.953,4.664,2.856,6.566l14.272,14.271c1.903,1.903,4.093,2.854,6.567,2.854 c2.474,0,4.664-0.951,6.567-2.854l112.204-112.202l112.208,112.209c1.902,1.903,4.093,2.848,6.563,2.848 c2.478,0,4.668-0.951,6.57-2.848l14.274-14.277c1.902-1.902,2.847-4.093,2.847-6.566 C284.929,199.378,283.984,197.188,282.082,195.285z"/></g></svg></a>').prependTo('.fandom-sticky-header > .wiki-tools');
var btn = $('#backToTop');
btn.on('click', function(e) {
	e.preventDefault();
	$('html, body').animate({scrollTop:0}, '10');
});

	// Виджет Твиттера
var theme, bgcol;
if($('body').hasClass('theme-fandomdesktop-dark')) {theme = "dark"; bgcol = "333"}
if($('body').hasClass('theme-fandomdesktop-light')) {theme = "light"; bgcol = "fff"}
$("<a>", {
 "class": "twitter-timeline",
 "data-lang": "ru",
 "data-theme": theme,
 "data-height": "500",
 "href": "https://twitter.com/ConcernedApe?ref_src=twsrc%5Etfw'>Tweets by ConcernedApe"
 }).appendTo(".SV-widget td");
$("<script async>").attr({ 
      "type": "text/javascript", 
      "src": "https://platform.twitter.com/widgets.js",
      "charset": "utf-8"
    }).appendTo(".SV-widget td");

	// Виджет саундтрека
$('div.SV-widget').each(function(i,el){
var $this = $(el),
	album = $this.attr('data-src'),
	w = $this.attr('data-width'),
    h = $this.attr('data-height');
$this.html('<iframe style="border: 0; width: '+w+'; height: '+h+';" src="https://bandcamp.com/EmbeddedPlayer/album='+album+'/size=large/bgcol='+bgcol+'/linkcol=2ebd35/artwork=small/transparent=true/" seamless><a href="https://concernedape.bandcamp.com/album/stardew-valley-ost">Stardew Valley OST by ConcernedApe</a></iframe>');
});
});