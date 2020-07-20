// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
  var   rights = {},
        user;
 
  // BEGIN List of Accounts Given Extra User Rights Icons - Must list all tags

   // Founder

    rights["The Necromancer0"]        = ["Valar","Admin","Bureaucrats"];
 
   // Semi-Admins

    rights["Gandalf7000"]   = ["Maiar","Semi-Admin"];

   // ADMINS

    

   // BOT

    rights["The Necromancer0 Bot"]  = ["Bot"];

   // ROLLBACKS 

    rights["OakenShield224"]       = ["Noldor,Rollbacker"];
 

   // DISCUSSION MODERATORS

    

  // END List of Accounts Given Extra User Rights Icons
 
  // BEGIN Script to Remove Old Rights Icons & Insert New
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { user = wgTitle; }
 
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