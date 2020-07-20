/* Any JavaScript here will be loaded for all users on every page load. */
/* Don't edit this page if you don't know what you're doing */

// *********
// IRC Login
// *********

$(function() {
	var nick = (wgUserName == null) ? ('CoDWikian' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_'); 
	$('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=wikia-cod&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="950" height="400" style="border:0;"></iframe>');
});


// ********************
// Show/hide for tables
// ********************

importScriptPage('ShowHide/code.js', 'dev');


// *****************
// Template:Username
// *****************

$(document).ready(function(){
  if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace === null || wgUserName === null) {return;}
  $(".insertusername").each(function(){
    $(this).html(wgUserName);
  });
});

importArticle({type:'script', article:'w:c:dev:UserBadges/code.js'});

window.UserBadgesJS = {
	inactive: 30, // Inactive if no edits in this many days, 0=disabled
	gone: {}, // List of users who have formally left but it hasn't been 'inactive' days yet
	groups: { bureaucrat:1, patroller:1, rollback:1, chatmoderator:1 },
	stopBlocked: true, // Don't display any non-custom badges for blocked users
	newusers: true, // Tag non-autoconfirmed users (MW1.19 only)
	nonusers: true, // Tag global Wikia accounts that have never edited anything
	custom: { '900bv': ['Brit scum', 'in need of toothpaste'], 'TheAmazingBBP': ['xXxL33T5C0P3ZxXx', '420BL4Z3ITF4G1T', 'i♥lia&alexis', '#rekinskrubs'], 'Weejoh- -': ['Belgian', 'OG Bunchie', 'ClassyMofo', 'Weed-loving metrosexual', 'hipster hater'], 'Slopijoe': ['Grand Tsar of Anime'] },
	names: {} // Badge display names
}