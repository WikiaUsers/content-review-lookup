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

//========================
// Article rating module
//========================

window.ArticleRating = {
  title: {
    'Category:What-If? Combatants': 'Rate this combatant page',
    'Category:Official Death Battle Combatants': 'Rate this combatant page',
    'Category:What-If? Death Battles': 'Rate this battle',
    'Category:What-If? Death Battles that came true': 'Rate this battle',
  },
  values: ['Much room for improvement', 'Meh', 'Average', 'Good', 'Marvelous'],
  starSize: [24, 24],
  starColor: ['#ccc', '#ffba01'],
  starStroke: '#000',
  exclude: ['Blacklist'],
  excludeCats: ['Site maintenance', 'Community', 'Site administration'],
  location: 'top-rail'
};

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


//========================================
// WikiActivity link in activity module
// By Wither
//========================================

!function() {
    var rwaLink = String("<a class='RWA_Link' href='/wiki/Special:WikiActivity'>More activity</a>");
    $(".WikiaRail .activity-module").append(rwaLink);
} ();