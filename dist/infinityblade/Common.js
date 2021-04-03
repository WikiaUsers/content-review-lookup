/* <source lang="javascript"> */

InactiveUsers = { 
	months: 2
};

importArticles({
    type: "script",
    articles: [
        'MediaWiki:Common.js/GamePreference.js',
        'w:c:dev:InactiveUsers/code.js'
    ]
});

var isStaff = ($.inArray("rollback", wgUserGroups) != -1 ||
$.inArray("sysop", wgUserGroups) != -1 ||
$.inArray("bureaucrat", wgUserGroups) != -1);

// Convert "A Wikia contributor" in Comments to IP address
// from User:Monchoman45
function AnonIP() {
	var list = document.getElementsByTagName('a');
	for(var i in list) {
		if(list[i].href && list[i].href.indexOf('Special:Contributions/') && list[i].innerHTML == 'Annon-ymous Contributor') {
			list[i].innerHTML = list[i].href.substring(list[i].href.lastIndexOf('/') + 1, list[i].href.length);
		}
	}
}

// Ajax auto-refresh
// http://dev.wikia.com/wiki/AjaxRC
ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Log','Special:Contributions','Special:AbuseLog','Special:NewPages'];
AjaxRCRefreshText = 'Auto-refresh';
if (isStaff) {
    $(AnonIP);
    ajaxCallAgain = [AnonIP];
}
importScript('MediaWiki:Common.js/ajaxRefresh.js');
// END of ajax auto-refresh

/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */
 
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}
/* Countdown feature from Community Wiki */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

var messageWallUserTags = {
    'Slayingthehalcyon': 'Panthenoite • Admin',
    'Arctic_Blue': 'Elder • Bureaucrat',
    'Cheese_Ausar': 'Elder • Bureaucrat',
    'Darth_Siris': 'Blademaster • Chat Mod',
    'Ninjablademaster': 'Blademaster – Chat Mod • Bloodmage – RollBack',
    'Mugen_Galath': 'Panthenoite • Admin',
    'Bashihbk01': 'Bloodmage – RollBack'
};

window.messageWallTagColor = 'black';
 
importArticles({
    type: 'script',
    articles: [
        //other scripts,
        'u:dev:MessageWallUserTags/code.js'
    ]
});

/* Any JavaScript here will be loaded for all users on every page load. */
$(function() {
			$("li").click(function(open) {
			  e.preventDefault();
			  $("li").removeClass("selected");
			  $(this).addClass("selected");
			});
		});
 
 
/* IRClogin div */
$(function() {
    if ($('#IRClogin').length) {
        if (typeof wgUserName == 'undefined') {
            var nick = 'wgusername' + Math.floor(Math.random() * 100);
        } else {
            var nick = wgUserName.replace(/ /g, "_");
        }
        $('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=wikia-infinitybladechat&prompt=true" width="660" height="400" style="border:0;"></iframe>');
    }
});