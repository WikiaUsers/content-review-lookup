
// *************************************************
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
// *************************************************
 
    $(function(){
	var newTitle = $("#title-meta").html();
	if (!newTitle) return;
	var edits = $("#user_masthead_since").text();
	$(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
	$(".#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});


// *********
// IRC LOGIN
// *********

$(function() {
    if ($('#IRClogin').length) {
        if (typeof wgUserName == 'undefined') {
            var nick = 'Wikian' + Math.floor(Math.random() * 100);
        } else {
            var nick = wgUserName.replace(/ /g, "_");
        }
        $('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=wikia-mlp&prompt=true" width="660" height="400" style="border:0;"></iframe>');
    }
});



// *********
// CVNIRC LOGIN
// *********

$(function() {
    if ($('#CVNIRClogin').length) {
        if (typeof wgUserName == 'undefined') {
            var nick = 'Wikian' + Math.floor(Math.random() * 100);
        } else {
            var nick = wgUserName.replace(/ /g, "_");
        }
        $('#CVNIRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=cvn-wikia-mlp&prompt=true" width="660" height="400" style="border:0;"></iframe>');
    }
});


// ***************************************
// Ajax-refresh (code from pcj of WoWWiki)
// ***************************************
var ajaxPages = ["Special:RecentChanges", "Special:Log", "Special:AbuseLog"];
var AjaxRCRefreshText = 'Auto-Refresh';
importScriptPage('MediaWiki:AjaxRC.js');


// ********************************************
// Implement edit restriction on chat feature
// Written by Foodbandlt for Sonic News Network
// ********************************************
//importScriptPage('MediaWiki:ChatEditRestriction.js');


// *****************************************
// Disallow editing of designated emote page
// Written by Foodbandlt
// *****************************************
//importScriptPage('MediaWiki:EmoteEditing.js');

importScript('MediaWiki:LiveImage.js');