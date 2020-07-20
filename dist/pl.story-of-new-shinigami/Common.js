/*<pre>*/
/* Początek Common.js */

/* Import skryptów */
importArticles({
    type: "script",
    articles: [
      "MediaWiki:Common.js/chatango.js", /* Chatango i fejsbuk*/
      "MediaWiki:Common.js/userRightsIcons.js", /* Opisy grup userów w profilu użytkownika + Info o nieaktywności */
      "MediaWiki:Common.js/sourceButtons.js", /* Dodatkowe przyciski w trybie źródła */
      "MediaWiki:Common.js/wandalizm.js", /* Skrypt odpowiadający za system zgłaszania wandali - oryginał by RuneScape Wiki */
      "MediaWiki:Common.js/es.js", /* Rozwijane opisy zmian */
      "MediaWiki:Common.js/extraRollbacks.js", /* Dodatkowe przyciski szybkiego cofania zmian - by Monchoman45 */ 
      "MediaWiki:Common.js/dodajLicencję.js", /* Łatwe dodawanie licencji do przesłanych obrazków */
      "MediaWiki:Common.js/showhide.js", /* Zwijane tabele */
      "MediaWiki:Common.js/facebookRozwijany.js", /* Rozwijany z prawej strony panel fejsbuka */
      "w:c:dev:SearchButtonV2/code.js", /* Nowe opcje wyszukiwania */
      "w:c:dev:DupImageList/code.js" /* Lista duplikatów obrazków */
   ]
});
/* Koniec importu skryptów */

/* Zmiana "użytkownik wikii" na numer IP, tylko dla modów, adminów i biuroli */
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
importScriptPage('RevealAnonIP/code.js', 'dev');
/* END Zmiana "użytkownik wikii" na numer IP */

/* Sliders using jquery - by Tierrie */
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
wsl.loadScript("http://dragonage.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
 
$(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
/* END Sliders using jquery - by Tierrie */

/* Koniec Common.js */
/*</pre>*/