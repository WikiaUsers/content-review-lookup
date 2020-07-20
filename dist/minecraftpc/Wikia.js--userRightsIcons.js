// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_418
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // FOUNDER
 
  rights["652Graystripe"] = ["Founder","Bureaucrat","Master"],
 
    // BUREAUCRATS
 
  rights["****"]       = ["Bureaucrat","Administrator"],
 
    // ADMINISTRATORS
 
  rights["Jeff16306"]  = ["Administrator",,"CSS/JS"],
  rights["****"]       = ["Administrator"],
  rights["****"]       = ["Administrator"],
  rights["****"]       = ["Administrator"],
  rights["****"]       = ["Administrator"],
 
    // ROLLBACK
 
  rights["****"]       = ["Rollback","Chat Moderator"],
  rights["****"]       = ["Rollback","Chat Moderator"],
  rights["****"]       = ["Rollback","Chat Moderator"],
  rights["****"]       = ["Rollback"],
  rights["****"]       = ["Rollback"],
 
    // TEST ACCTS, BOTS, & AWB
 
  rights["WikiaBot"]   = ["Wikia Bot"]; 
  rights["Wikia"]      = ["Wikia Bot"];
  rights["652Graystripe's_Bot"]       = ["Bot"];
 
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