/* Any JavaScript here will be loaded for all users on every page load. */

/*<pre>*/

/* Include Global Anime-Common.js Information */
importScriptURI('http://anime.wikia.com/index.php?title=MediaWiki:Anime-Common.js&action=raw&ctype=text/javascript&dontcountme=s&templates=expand');

/* Any JavaScript here will be loaded for all users on every page load. */

// Import Scripts
window.wwImportArticles = {
  type: 'script',
  debug: false,
  articles: [
    'MediaWiki:UserTags/inactiveUsers.js',    // MediaWiki:Wikia.js/userRightsIcons.js appears to override, needs merg
    'MediaWiki:UserTags/userRightsIcons.js',  // puts things like "ADMINISTRATOR" or "CRAZY PERSON" tags on talk pages
    'MediaWiki:UserTags/code.js',             // user tags like "INACTIVE", "ADMINISTRATOR" or "CRAZY PERSON" on talk pages
  ]
};

importScriptPage('PurgeButton/code.js', 'dev');
importScriptPage('AjaxRC/code.js', 'dev');

//Clock Config
// Display 24 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2H:%2M:%2S (UTC) - %{January;February;March;April;May;June;July;August;September;October;November;December}m %2d, %Y (%{Sun;Mon;Tue;Wed;Thu;Fri;Sat}w)';
importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js/Time.js",
    ]
});

/* Any JavaScript here will be loaded for all users on every page load. */
jQuery('.achievementbox').mouseover(function() {
   jQuery("div", this).show();
})
 
jQuery('.achievementbox').mouseout(function() {
   jQuery("div", this).hide();
})
 
var ShowHideConfig = { autoCollapse: 0 };
importScriptPage('ShowHide/code.js', 'dev');
 
importScriptPage('Countdown/code.js', 'dev');
 
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://assassinscreed.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
 
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
} );
 
// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
var AjaxRCRefreshText = 'Auto-refresh';
var ajaxRefresh = 30000;