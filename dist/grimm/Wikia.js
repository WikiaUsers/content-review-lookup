// <source lang="JavaScript">
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons - Must list all tags

   // STAFF
 
   // BUREAUCRATS

    rights["Gaarmyvet"]   = ["Bureaucrat","Admin"],
    rights["WesenZoo"]   = ["Bureaucrat","Admin"];

   // ADMINS

   // BOT

    rights["BlutBot"]  = ["Bot"];

   // FEATURED USER
 
   // IMAGE WIZARDS

   // ROLLBACK MODS

   // ROLLBACKS

   // CHAT MODERATORS 
 
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
 
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});

window.UserBadgesJS = {
	inactive: 30, // Inactive if no edits in this many days, 0=disabled
	stopBlocked: true, // Don't display any non-custom badges for blocked users
	nonusers: true, // Tag global Wikia accounts that have never edited anything
}

importArticle({type:'script', article:'w:c:dev:UserBadges/code.js'});
 
// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
// </source>