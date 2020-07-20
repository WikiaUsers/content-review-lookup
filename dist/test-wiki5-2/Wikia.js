// WRITTEN BY A USER
// If you use this on your wiki, you assume responsibility for
// ensuring compliance with Wikia’s ToU
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons
 
 
    rights["Durvenson"]                = ["Admin", "Wiki Friend"];
    rights["PhilippL"]                 = ["", "Wiki Bully"];
 
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
 
$(function() {
    var loc = window.location.href;
    var username = (wgTitle == "Contributions") ? loc.substring(loc.lastIndexOf("/")+1) : wgTitle;
    $('.tabs-container > ul.tabs').append('<li data-id="listusers"><a href="/wiki/Special:ListUsers/' + username + '">User List</a></li>');
});

$(".UserProfileMasthead .masthead-info hgroup h1:contains('PhilippL')").html("PhilippL - The Founder");

$(".UserProfileMasthead .masthead-info hgroup h1:contains('AStranger195')").html("TheStranger834");

$(".UserProfileMasthead .masthead-info hgroup h1:contains('IAmAwesome2')").html("IAmSoAwesome2");

//*******************

$(".UserProfileMasthead .masthead-avatar img:contains('https://vignette.wikia.nocookie.net/lllioliol/images/d/df/Badge-love-0.png/revision/latest?cb=20150622122107')").html("https://vignette.wikia.nocookie.net/lllioliol/images/d/df/Badge-love-0.png/revision/latest?cb=20150622122107");