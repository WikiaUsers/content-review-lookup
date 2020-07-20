// 20:46, January 31, 2013 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY User:Rappy_4187
// If you use this on your wiki, you assume responsibility for
// ensuring compliance with Wikia’s ToU
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
  var rights = {};
 
 // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
   // REVIEWERS
 
 rights["Spongebob456"]                               = ["<a href=\" http://spongebob.wikia.com/index.php?title=SpongeBob_SquarePants:Assessment/review/episodes\"><span style=\" color:white;\">Reviewer</span></a>"],
 rights["Number Hunter"]                                     = ["<a href=\" http://spongebob.wikia.com/index.php?title=SpongeBob_SquarePants:Assessment/review/episodes\"><span style=\" color:white;\">Reviewer</span></a>"];
 
// END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
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
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});