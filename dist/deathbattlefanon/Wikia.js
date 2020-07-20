//==============
// AbuseLogRC
//==============

abuseLogRC_interval = 15;
abuseLogRC_entries = 10;
abuseLogRC_showTo = 'sysop';
abuseLogRC_order = 'newer';
abuseLogRC_position = 'before';
abuseLogRC_collapsible = true;
abuseLogRC_userInfo = true;
abuseLogRC_users = new Array(
    'I\'m Lynda',
    'Tonygameman',
    'DENSTIFY1',
    'BakaLord',
    'Simbiothero',
    'UTC Scrappy',
    'Vrokorta',
    'UltimateDespairDaniel',
    'End Bringer Nyx',
    'Raiando',
    'BonBooker',
    'Zinniax-13',
    "Sharaku Jr.",
    "BangJang96",
    "IcyChill1",
    "Zacisawesome101",
    "Halloween7",
    "Zinniax-13",
    "Inkriel",
    "Cletus16"
);

//=====================
// Cancel Edit button
//=====================

$(function addCancel () {
  if (typeof(wgIsEditPage) !== 'undefined') { 
    $('<span id="cancelbutton" class="button" style="margin-top:2px, text-decoration: none;"><a id="cancelbuttontext" href="/wiki/'+ wgPageName +'"><span style="color:#FFFFFF; text-decoration:none;">Cancel Edit</span></a></span>').prependTo('#EditPageHeader h2');
}});

/**
 *********** Masthead Tags ****************************************************
 *********** Description: Settings for tags in User Profile Masthead **********
*/

//===================================
// Inactive Users Configurations
//===================================

InactiveUsers = { 
    months: 6, // Users will be marked as gone after six months of zero edits
    text: 'Inactive'
};

//================================================
// Makes ProfileTags not override InactiveUsers
//================================================

mw.hook('dev.profile-tags').add(function() {
    importScriptPage("MediaWiki:InactiveUsers/code.js", 'dev');
});

/**
 ******** End of Masthead Tags *************************************************
*/

//========================================== 
// Adds a "Logs" tab to User Mastheads
//==========================================

$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "/wiki/Special:Log/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Logs</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});

//==========
// RailWAM
//==========

window.railWAM = {logPage:"Project:WAM Log"};