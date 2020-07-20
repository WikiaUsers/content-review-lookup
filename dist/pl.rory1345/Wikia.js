/* Przycisk mapy */
$(function() {
  if($('#showmapbutton').length) {
    $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="wikia-button comments" href="/wiki/Mapa:'+ encodeURIComponent(wgPageName) +'" title="Mapa"><img src="https://images.wikia.nocookie.net/vestroia/pl/images/5/5a/Thiago-Silva-Palm-Google-Maps.png" style="vertical-align:middle;" /> Mapa</a>');
  }
  if(wgNamespaceNumber == 114 || $('#showarticlebutton').length) {
    $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="wikia-button comments" href="/wiki/'+ encodeURIComponent(wgTitle) +'" title="Powrót do oryginalnego artykułu"><img src="https://images.wikia.nocookie.net/vestroia/pl/images/f/f2/Powrót.gif" style="vertical-align:middle;" /> Powrót</a>');
  }
});

$(document).ready(function() {
    var newSection = '<section id="sidebar" class="module">' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Sidebar}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#sidebar').append(code);
    });
});

/* ikonka ładowania */
jQuery(document).ready(function($) {  

// site preloader -- also uncomment the div in the header and the css style for #preloader
$(window).load(function(){
	$('#preloader').fadeOut('slow',function(){$(this).remove();});
});

});