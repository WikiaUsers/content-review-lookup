/* RSS feed tweaks by User:KettleMeetPot */

function RSSfeed() {
  if ( wgPageName == "Rain_of_the_Ghosts_Wiki" ) {
    $(".j br:first-child").remove();
    $(".j div:first-child").remove();
    $(".wikiaRss dd b:nth-child(2) a:first-child").text("full article >").attr("style","float:right; margin-right:10px");
    var primer = $(".wikiaRss dd > b:nth-child(2)").html().replace(/\[/g,"").replace(/\]/g,"");
    $(".wikiaRss dd > b:nth-child(2)").html(primer);
  }
}
addOnloadHook(RSSfeed);


/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
	'w:dev:Countdown/code.js',
        // ...
    ]
});

/* Collapsible classes
 * See w:c:dev:ShowHide for info and attribution
 */
 
importScriptPage('ShowHide/code.js', 'dev');
 
// Auto-refresh Special:RecentActivity
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges"];
importScriptPage('AjaxRC/code.js', 'dev');
 
/* Wikia Side Rail Social Icons
 * By: [[Madnessfan34537]]
 */
 
function SocialIcons() {
 
    var userArray = wgPageName.split(":");
 
    $('.WikiaRail').prepend('<div style="right:-20px; top:108px; position: absolute;"><div style="position: absolute;" class="SocialIcon"><div style="float:right;"><a href="https://twitter.com/RainoftheGhosts"><img src="https://images.wikia.nocookie.net/rainoftheghosts/images/f/f3/Twitter_icon.png"></a></div></div><div style="position: absolute; margin-top:40px" class="SocialIcon"><div style="float:right;"><a href="http://rainoftheghosts.tumblr.com/"><img src="https://images.wikia.nocookie.net/rainoftheghosts/images/e/e0/Tumblr_icon.png"></a></div></div></div>');
 
}
 
        if (mw.config.get("wgNamespaceNumber") != "user") {
		addOnloadHook(SocialIcons);
 
}

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
 
mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
});
} );

/* 
////////////////////////////////////////////////////////////////////
// THE BELOW CODE ADDS CUSTOM BUTTONS TO THE JAVASCRIPT EDIT TOOLBAR
////////////////////////////////////////////////////////////////////
*/
 
if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/rainoftheghosts/images/b/bd/Book_button.png",
     "speedTip": "Book",
     "tagOpen": "{{book|",
     "tagClose": "}}",
     "sampleText": "number"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/rainoftheghosts/images/5/50/Chapter_button.png",
     "speedTip": "Chapter",
     "tagOpen": "{{c|",
     "tagClose": "}}",
     "sampleText": "number"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/rainoftheghosts/images/8/85/Ref_button.png",
     "speedTip": "Reference tag",
     "tagOpen": "{{Ref|",
     "tagClose": "}}",
     "sampleText": "number"};
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/rainoftheghosts/images/b/b6/AG_button.png",
     "speedTip": "Ask Greg reference",
     "tagOpen": "<ref name=\"\id\"\>{{askgreg|",
     "tagClose": "|2014-MONTH-DAY}}</ref>",
     "sampleText": "QID"};
 
}