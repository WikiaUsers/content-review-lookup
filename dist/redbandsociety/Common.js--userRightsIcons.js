// 18:08, September 5, 2012 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY User:Rappy_4187
// If you use this on your wiki, you assume responsibility for
// ensuring compliance with Wikia’s ToU
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons


    // BUREAUCRATS

    rights["Blittany"]       = ["Bureaucrat", "Administrator"];
    rights["Scarecrows"]       = ["Bureaucrat", "Administrator"];


    // ADMINISTRATORS

    rights["AudreyHepburnfan"]       = ["Administrator"];
    rights["Naya_Rivera"]       = ["Administrator"];
    rights["TheFemaleBoss"]       = ["Administrator"];


    // SPAM TEAM AND CHAT MODERATORS
    rights["DanielTravel"]       = ["Spam Team"]; 
    rights["GinaSays16"]       = ["Spam Team"]; 
    rights["REBƎLReloaded"]       = ["Spam Team"]; 


        
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
 
// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
// </source>