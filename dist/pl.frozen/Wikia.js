importScriptPage('MediaWiki:Snow.js','c');

/* Przycisk galerii */
$(function() {
  if($('#showgallerybutton').length) {
    $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="wikia-button comments" href="/wiki/Galeria:'+ encodeURIComponent(wgPageName) +'" title="Zdjęcia galerii"><img src="https://images.wikia.nocookie.net/vestroia/pl/images/e/e4/Galeria1.png" style="vertical-align:middle;" /> Galeria</a>');
  }
  if(wgNamespaceNumber == 112 || $('#showarticlebutton').length) {
    $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="wikia-button comments" href="/wiki/'+ encodeURIComponent(wgTitle) +'" title="Powrót do oryginalnego artykułu"><img src="https://images.wikia.nocookie.net/vestroia/pl/images/d/df/Powrót1.gif" style="vertical-align:middle;" /> Powrót</a>');
  }
});
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // Strażnicy fanonu
 
  rights["Mrats"]                    = ["Strażnik fanonu"],
  rights["Rafi862"]                  = ["Strażnik fanonu"],
  rights["PinkieStyle"]              = ["Strażnik fanonu"];
 
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

/* SocialIcon */
function SocialIcons() {
 
    var userArray = wgPageName.split(":");
 
    $('.WikiaRail').prepend('<div style="right:-1px; top:108px; position: absolute;"><div style="position: absolute;" class="SocialIcon"><div style="float:right;"><a href="https://www.facebook.com/pages/Kraina-lodu-Wiki/374023686092336"><img src="http://i.imgur.com/1oztOw6.png"></a></div></div></div></div>');
 
}
 
        if (mw.config.get("wgNamespaceNumber") != "user") {
		addOnloadHook(SocialIcons);
 
}