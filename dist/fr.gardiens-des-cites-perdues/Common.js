/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

/** Modèles **/
/// Modèle 'Username'
 
// Remplace <insert name here> avec le nom de l'utilisateur qui parcours la page.
// Requiert de copier {{USERNAME}}.
 
function substUsername() {
        $('.insertusername').text('<a href=\"/wiki/Modèle:USERNAME\" style=\"color: #d5d4d4\">' + wgUserName + '</a>');
        $('.insertusername:hover').css('text-decoration', 'none');
}
 
 function substUsernameTOC() {
        var toc = document.getElementById('toc');
        var userpage = document.getElementById('pt-userpage');
 
        if( !userpage || !toc )
                return;
 
        var username = userpage.firstChild.firstChild.nodeValue;
        var elements = getElementsByClass('toctext', toc, 'span');
 
        for( var i = 0; i < elements.length; i++ )
                elements[i].firstChild.nodeValue = elements  [i].firstChild.nodeValue.replace('<insert name here>', username);
}
$(function() { $('.insertusername').text(wgUserName); });

/// Customisation

// Imports

importArticles({
    type: 'script',
    articles: [
        'w:c:dev:UserTags/code.js',
        'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
    ]
});

// AddRailModule (Dev Wiki)

window.AddRailModule = [{prepend: true}];

//================================
//          jQuery Slider
//================================

// Code from http://dragonage.wikia.com/wiki/MediaWiki:Common.js created by "Tierrie"
// see also http://onepiece.wikia.com/wiki/MediaWiki:Common.js/slider.js

mw.loader.using(["jquery.cookie"]);

mw.loader.using(["jquery.ui.tabs"], function() {
  $(".portal_vtab").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
  $(".portal_vtab > ul > li").removeClass("ui-corner-top").addClass("ui-corner-left");

  var $tabs = $("#portal_slider").tabs({
    fx: {
      opacity: "toggle",
      duration: 100
    }
  });

  $(".portal_sliderlink").click(function() { // binding click event
    $tabs.tabs("select", this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $(".portal_next").click(function() { // binding click event
	var selected = $tabs.tabs("option", "selected");
    $tabs.tabs("select", selected + 1); // switch to next tab
    return false;
  });
  $(".portal_prev").click(function() { // binding click event
	var selected = $tabs.tabs("option", "selected");
    $tabs.tabs("select", selected - 1); // switch to previous tab
    return false;
  });
});