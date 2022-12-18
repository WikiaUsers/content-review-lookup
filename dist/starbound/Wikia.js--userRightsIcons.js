// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // FOUNDER
 
  rights["Dak47922"]   = ["Founder","Bureaucrat","Admin","Councilor"],
 
    // BUREAUCRATS
 
  rights["****"]       = ["Bureaucrat","Administrator"],
 
    // ADMINISTRATORS
 
  rights["****"]       = ["Administrator","Councilor"],
  rights["****"]       = ["Administrator"],
  rights["****"]       = ["Administrator"],
  rights["****"]       = ["Administrator"],
  rights["****"]       = ["Administrator"],
 
    // ROLLBACK
 
  rights["****"]                       = ["Rollback","Chat Moderator"],
  rights["****"]                       = ["Rollback","Chat Moderator"],
  rights["****"]                       = ["Rollback","Chat Moderator"],
  rights["Sank_Your_Battleship"]       = ["Rollback"],
  rights["****"]                       = ["Rollback"],
 
    // TEST ACCTS, BOTS, & AWB
 
  rights["WikiaBot"]   = ["Wikia Bot"]; 
  rights["Wikia"]      = ["Wikia Bot"];
  rights["****"]       = ["Bot"];
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    if (typeof rights[wgTitle] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
            // add new rights
            $('<span class="tag" style="margin-left:10px;">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
        }
    }
});
 
// </source>