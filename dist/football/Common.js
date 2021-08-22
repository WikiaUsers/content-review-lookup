/* Any JavaScript here will be loaded for all users on every page load. */
// ============================================================
// displayTimer
// ============================================================
 
var refreshDate;
 
function addDate() {
    var UTCDate = ((new Date()).toUTCString()).replace("GMT", "(UTC)");
    $('#showdate').empty().append('<span style="font-weight: bold; text-transform: none;"><a title="Purge the server cache and update the contents of this page." href="' + wgArticlePath.replace('$1', wgPageName.replace(/ /g, '_')) + '?action=purge">' + UTCDate.substring(5) + '</a></span>');
    window.clearTimeout(refreshDate);
    refreshDate = window.setTimeout(addDate, 1000);
}

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

function onloadhookcustom() {
    var replace = document.getElementById("OnlineChat");
    if (replace !== null) {
        var getvalue = replace.getAttribute("class");
    }
}

/* Ping mods in the chat with the command "!mods" */
//Message Wall Posts Tags
var messageWallUserTags = {
    'Dean27': 'Admin'
};
window.messageWallTagColor = '#034400';
 
var messageWallTagColor = window.messageWallTagColor || '#034400';
 
$(function() {
    for (var name in messageWallUserTags) {
        $('a.subtle[href$="Message_Wall:' + name + '"]').after('<span style="color:' + messageWallTagColor + ';margin-left:-2px;font-size:10px;vertical-align:top;">(' + messageWallUserTags[name] + ')</span>');
    }
});

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
   the content area. It's a simple little idea that 
   traces back to at least an idea by [[User:Cqm]], if 
   not earlier. */

var newElement = [
 '<section class="2022FIFAWorldCupGradient module">',
 '   <h1><a href="https://football.fandom.com/wiki/2022_FIFA_World_Cup">2022 FIFA World Cup</a></h1>',
 '   <div id=features style="margin-top: -16px; padding: 0; width: 100%;">',
 '         <tr style="line-height: 15px; text-align: center; font-size: 14px;">',
 '            <td>',
 '                 This is the place to be for all the news about 2022 FIFA World Cup. From the qualification to the final in Lusail. You can view all the teams and groups, the topscorers, the players with the most assists, players who are inform, all the stadiums and a lot more.<br><a href="2022 FIFA World Cup">Go to the page</a><br>Go to the <a href="http://football.wikia.com/wiki/Match_Center">Match Center</a> for upcoming matches. ',
 '            </td>',
 '         </tr>',
 '   </div>',
 '</section>'
 ].join('');
 
$('#WikiaRail').append(newElement);

/*
* Mark for NoInfobox
* Adds a button to the toolbar that automatically adds {{NoInfobox}} to the top of a page
* so that users can quickly mark pages which doesn't have an infobox
* @author Ozuzanna
*/

if (mediaWiki.config.get("wgAction") === "view" && 
    mediaWiki.config.get("wgNamespaceNumber") !== -1 && 
    mediaWiki.config.get("wgUserName") !== null) {

    $('.tools').append('<li><a id="NoInfobox-link" style="cursor: pointer;">NoInfobox</a></li><li><a id="NoContentInInfobox-link" style="cursor: pointer;">NoContentInInfobox</a></li>');
    $('#NoInfobox-link').click(function() {
        new mw.Api().post({
            format: 'json',
            action: 'edit',
            title: mw.config.get('wgPageName'),
            token: mw.user.tokens.get('editToken'),
            summary: 'Adding {{NoInfobox}} because of missing infobox',
            nocreate: '',
            prependtext: '{{NoInfobox}}'
        }).done(function(d) { 
            if (!d.error) {
                console.log('Adding template successful!');
                location.reload();
            } else {
                console.log('Failed to add template: '+d.error.code);
            }
        }).fail(function() {
            console.log('Failed to add template!');
        });
    });
}

/*
* Mark for NoContentInInfobox
* Adds a button to the toolbar that automatically adds {{NoContentInInfobox}} to the top of a page
* so that users can quickly mark pages which have an empty infobox
* @author Ozuzanna
* Changed to this template by 2Actimv
*/

if (mediaWiki.config.get("wgAction") === "view" && 
    mediaWiki.config.get("wgNamespaceNumber") !== -1 &&
    mediaWiki.config.get("wgUserName") !== null) {

    $('#NoContentInInfobox-link').click(function() {
        new mw.Api().post({
            format: 'json',
            action: 'edit',
            title: mw.config.get('wgPageName'),
            token: mw.user.tokens.get('editToken'),
            summary: 'Adding {{NoContentInInfobox}} because of empty infobox',
            nocreate: '',
            prependtext: '{{NoContentInInfobox}}'
        }).done(function(d) { 
            if (!d.error) {
                console.log('Adding template successful!');
                location.reload();
            } else {
                console.log('Failed to add template: '+d.error.code);
            }
        }).fail(function() {
            console.log('Failed to add template!');
        });
    });
}

/* Imports */
importArticles({
	type: 'script',
	articles: [
        'u:dev:!mods/code.js',
        'u:dev:AjaxRC/code.js',             // AjaxRC
        'u:dev:BackToTopButton/code.js',    // Back to top button
        'u:dev:Countdown/code.js',          // Countdown long dates
        'u:dev:LastEdited/code.js',         // Last Edit Information
        'u:dev:SearchSuggest/code.js',      // SearchSuggest
        'u:zh.pad:MediaWiki:CountDown.js'   // Countdown
	]
}, {
	type: 'style',
	article: 'u:zh.pad.wikia.com:MediaWiki:CountDown.css'
});

window.lastEdited = {
    avatar: false,
    position: 'top',
    size: false,
    diff: true,
    comment: false,
    time: true
};