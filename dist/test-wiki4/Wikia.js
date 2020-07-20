// WRITTEN BY A USER
// If you use this on your wiki, you assume responsibility for
// ensuring compliance with Wikia’s ToU
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons
 
    rights["PawzFan"]                   = ["Blocked", "Banned from Chat"];
    rights["Durvenson"]                 = ["Founder", "Inactive", "Disabled Account"];
    rights["WikiaBot"]                  = ["Staff", "Global Bot"];
    rights["PhilippL"]                  = ["Admin", "Bureaucrat", "Active",];
    rights["An unknown anonymous user"] = ["Blocked across the Wikia network!"];
    rights["SpongeFreddy777"]           = ["Wikia Expert"];
    rights["Josephyr"]                  = ["Wikia Star", "Volunteer Spam Task Force"];
    rights["Rex8"]                      = ["Banned", "RUT EDITOR", "Blocked 4ever/forever"];
    rights["Wikia"]                     = ["Global Bot", "Wikia"];
    rights["Default"]                   = ["Global Bot"];
    rights["Abuse filter"]              = ["Global Bot"];
    rights["Test User"]                 = ["Autoconfirmed user", "Emailconfirmed user"];
    rights["ABC"]                       = ["ABC Lover"];
    rights["Angela"]                    = ["Founder of Wikia"];
    rights["Brandon Rhea"]              = ["Wikia Staff", "Wikia Utilities", "Checkuser-global"];
    rights["Flightmare"]                = ["Helper", "Councilor", "Wikia Utilities"];
    rights["LilGreenYoshi"]             = ["Admin", "Bureaucrat", "Master", "Backturner", "Foreimager"];
  // END List of Accounts Given Extra User Rights Icons
 
  // BEGIN Script to Remove Old Rights Icons & Insert New
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[user].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
  // END Script to Remove Old Rights Icons & Insert New
 
}
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});
 
// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
// </source>

//************
// Test
//************

$(document).ready(function(){
    if ($('table.mw-userrights-groups').length) {
        $('table.mw-userrights-groups tr:nth-child(2) td:nth-child(2)').append('<input type="checkbox" checked="checked" id="personalcheckbox" /><label for="personalcheckbox">  Wiki Friend</label>');
    }
});

pageNames = [
    'Hello'
];
pageData = [
    'This is a special page that will say: "Hi!"<br /><br /><button class="button" onclick="document.getElementById(\'hi\').innerHTML = \'Hi! :)\'">Say Hi!</button><br/><p id="hi" style="font-weight: bold;"></p>'
];
pagePurpose = [
    'A special page that says: Hi!'
];
importScriptPage('CreateSpecialPage/code.js','dev');

$(".SearchInput #AdvancedSearch label:last-child").prepend("<br /><label for='mw-search-ns2001u'><input name='ns2001u' type='checkbox' id='mw-search-ns2001u'> Test</label>");

if(skin == 'monobook') {
	$('#toolbar').append('<div id="fnr">Hello</div>');
} else if(skin == 'oasis') {
	$('#cke_toolbar_source_1').append('<div id="fnr">Hello</div>');
}
$('#fnr').css({'cursor':'pointer'}).click(function(){
	alert("Hi!");
});

$("#iframe").append("<iframe src='http://my-miis.wikia.com/wiki/My_Miis_Wiki'></iframe>");

$("#text").append("<input type='text' />");

$(".new-reply .toolbar").append("<button class='secondary' style='display: inline-block;position:relative;top:-9px;' onclick='location.reload();'>Cancel</button>");