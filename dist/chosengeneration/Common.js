/* Import */
PurgeButtonText = 'Refresh';
importScriptPage('PurgeButton/code.js', 'dev');
 
InactiveUsers = { days: 30 };
importScriptPage('InactiveUsers/code.js', 'dev');

importScriptPage('http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js')
importScriptPage('https://code.jquery.com/jquery-1.10.2.js')
importScriptPage('http://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js')
importScriptPage('http://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js')

importArticles({
    type: "script",
    articles: [
 "w:c:outcast:MediaWiki:wikia.js/Slider.js"
 ]
});

 
/*********************************************************************************/
/* sliders using jquery by Dragon Age wiki User:Tierrie . All credit goes to him. */
/*********************************************************************************/
 
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://monsterhunter.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
 
mw.loader.using( ['jquery.ui.tabs'], function() { 
$(document).ready(function() {
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
});
 
/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = ( function() {
        var reCache = {};
        return function( element, className ) {
                return ( reCache[className] ? reCache[className] : ( reCache[className] = new RegExp( "(?:\\s|^)" + className + "(?:\\s|$)" ) ) ).test( element.className );
        };
})();