$(document).ready(function() {
    var newSection = '<section id="sidebar" class="module"><h1>' +
      'Co nowego?' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Sidebar}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#sidebar').append(code);
    });
});

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

/* Przycisk galerii */
$(function() {
  if($('#showgallerybutton').length) {
    $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="wikia-button comments" href="/wiki/Galeria:'+ encodeURIComponent(wgPageName) +'" title="Zdjęcia galerii"><imgsrc="https://images.wikia.nocookie.net/vestroia/pl/images/7/74/Galeria.png" style="vertical-align:middle;" /> Galeria</a>');
  }
  if(wgNamespaceNumber == 114 || $('#showarticlebutton').length) {
    $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="wikia-button comments" href="/wiki/'+ encodeURIComponent(wgTitle) +'" title="Powrót do oryginalnego artykułu"><img src="https://images.wikia.nocookie.net/vestroia/pl/images/f/f2/Powrót.gif" style="vertical-align:middle;" /> Powrót</a>');
  }
});
$('.WikiHeader > nav > ul > li:first-child > ul').append('<li><a class="subnav-2a" href="/wiki/Project:Zasady">Zasady</a></li>');
 
$( function () {
	if ( !document.getElementById( 'ca-skins' ) ) {
		$( '<li id="ca-skins" title="Kliknij, aby zobaczyć stronę na skórce MonoBook"><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=monobook">Obejrzyj na Monobooku </a>' ).appendTo( '#GlobalNavigation' );
	}
} );