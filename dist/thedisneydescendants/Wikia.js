/* Przycisk galerii */
$(function() {
  if($('#showgallerybutton').length) {
    $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="wikia-button comments" href="/wiki/Galeria:'+ encodeURIComponent(wgPageName) +'" title="Zdjęcia galerii"><img src="https://images.wikia.nocookie.net/vestroia/pl/images/7/74/Galeria.png" style="vertical-align:middle;" /> Galeria</a>');
  }
  if(wgNamespaceNumber == 116 || $('#showarticlebutton').length) {
    $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="wikia-button comments" href="/wiki/'+ encodeURIComponent(wgTitle) +'" title="Powrót do oryginalnego artykułu"><img src="https://images.wikia.nocookie.net/vestroia/pl/images/f/f2/Powrót.gif" style="vertical-align:middle;" /> Powrót</a>');
  }
});
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // Rangi użytkowników
 
  rights["Rafi862"]                  = ["Strażnik"];
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // Usunięcie poprzednich opisów grup
    $('.UserProfileMasthead .masthead-info span.group').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
$('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
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