/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

/* Imports */
importArticles({
    type: "script",
    articles: [
        // Countdown long dates
        "w:c:dev:Countdown/code.js",
        // Back to top button
        "w:c:dev:BackToTopButton/code.js"
    ]
});

/* SearchSuggest */
importArticles({
    type: 'script',
    articles: [
        'u:dev:SearchSuggest/code.js'
    ]
});

/* Adds cancel button above edit screen */
 
importScriptPage('MediaWiki:Wikia.js/cancelButton.js', 'admintools');

// Adding "My Contributions" to user menu. 
// Function: Adds "My Contributions" to the UserDropdownMenu.
function UserContribsMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent (wgUserName) +'">My Contributions</a></li>');
}
 
addOnloadHook(UserContribsMenuItem);
 
function onloadhookcustom() {
  var replace = document.getElementById("OnlineChat");
if (null != replace) {
    var getvalue = replace.getAttribute("class");
  }
}

//Message Wall Posts Tags
var messageWallUserTags = {
    'Recoded_NL': 'Admin',
    '2Actimv': 'Admin',
    'Dean27': 'Admin'
};
window.messageWallTagColor = '#034400';
 
var messageWallTagColor = window.messageWallTagColor || '#034400';
 
(function($) {
    for (var name in messageWallUserTags) {
        $('a.subtle[href$="Message_Wall:' + name + '"]').after('<span style="color:' + messageWallTagColor + ';margin-left:-2px;font-size:10px;vertical-align:top;">(' + messageWallUserTags[name] + ')</span>');
    }
}(jQuery));
//


/* Wiki Notification 
   
   This is actually a ToU violation as it's outside the 
   page content area.  It's also not really that necessary
   since the wiki has been revamped to include the World
   Cup more prominently.

function addPageBottom() {
        $("#WikiaRail").append('<div class="Actimv" style="position:fixed; bottom:2.5em; right:0.5em; z-index:999; width:130px; border-radius: 4px; box-shadow: 0px 0px 5px black; background-color: #0FB200; text-align:left; padding:10px; font-family: standard; font-size: 118%; color: white;"><b><a href="/wiki/2014 FIFA World Cup" style="color: yellow;">The 2014 FIFA World<br />Cup</a> is this year! <a href="/wiki/User_blog:2Actimv/2014_FIFA_World_Cup:_An_Introduction_and_Analyse_of_the_Teams" style="color: yellow;">Want<br />to learn more about it?</a></b></div>');
}
 
$(addPageBottom);


   Conversely, the following kind of notification system
   is allowed by the ToU because it happens wholly within
   the content area. if 
   not earlier. */

var newElement = [
 '<section class="module">',
 '   <h1><a href="http://total-movies.wikia.com/wiki/Category:Films">Films</a></h1>',
 '   <div id=features style="margin-top: -16px; padding: 0; width: 100%;">',
 '         <tr style="line-height: 15px; text-align: center; font-size: 14px;">',
 '            <td>',
 '                 There are several features on the wiki. There is a <a href="http://total-movies.wikia.com/wiki/Category:Upcoming_films">Upcoming films</a> to see upcoming films. ',
 '            </td>',
 '         </tr>',
 '   </div>',
 '</section>'
 ].join('');
 
$('#WikiaRail').append(newElement);