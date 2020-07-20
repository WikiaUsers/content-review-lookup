// <source lang="JavaScript">
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
    var rights = {};
 
    // BEGIN List of Accounts Given Extra User Rights Icons
 
    rights["Doctor Bugs"]              = ["Administrator","Chat Moderator"],
    rights["DoubleDeputy D"]           = ["Administrator","Chat Moderator"],
    rights["SilentGlaive"]             = ["Administrator","Bureaucrat","Chat Moderator"],
    rights["Webkinz Mania"]            = ["Administrator","Bureaucrat","Chat Moderator"],
    rights["XoTulleMorXo"]             = ["Administrator","Bureaucrat","Chat Moderator","Wiki Founder"],
    rights["Jasonnguyen2606"]          = ["Rollback"],
    rights["ProfessorDuck"]            = ["Rollback"],
    rights["Randommixer"]              = ["Rollback"],
    rights["Adventuretimegurl123"]     = ["Rollback"],

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