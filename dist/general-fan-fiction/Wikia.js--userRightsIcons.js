// <source lang="JavaScript">
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
    var rights = {};
 
    // BEGIN List of Accounts Given Extra User Rights Icons
 
    rights["InsaneHippo"]           = ["Feminist"],
    rights["CamTheWoot"]    = ["Administrator","Bureaucrat","Chat Moderator","Wikia *STAR*"],
    rights["Bloxxasourus"]           = ["Administrator","Chat Moderator"],
    rights["KatieTheAndreaFan"]    = ["Administrator","Chat Moderator"],
    rights["DarkShadow667"]        = ["Administrator","Chat Moderator", "Story Critic"],
    rights["GhostWolf716"]    = ["Administrator","Chat Moderator","FAGGOT"],
    rights["GRANDMASTA"]    = ["Administrator","Chat Moderator"],
    rights["Riley Heligo"]    = ["Gorrister Harrington"],
    rights["SilentGlaive"]    = ["Chat Moderator"],
    rights["RazorWolfz"]    = ["Chat Moderator"],

    // END List of Accounts Given Extra User Rights Icons

    rights["Non-existent User"]  = ["Do not remove this line"];
 
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
 
// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
// </source>