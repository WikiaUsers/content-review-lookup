
//<source lang="javascript">
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // FOUNDER - Totaldrama100
 
  rights["Totaldrama100"]      = ["Administrator","Bureaucrat","Rollback","Chat Moderator"];
 
    // ADMINSTRATORS
 
  rights["Bljones2013"]      = ["Administrator","Bureaucrat"];
 
    // ADMINISTRATORS
 
  rights["Drfizwuz997xlol"]     = ["Administrator","Bureaucrat"];
 
    // ADMINISTRATORS
 
 rights["Heatherxcodyfan"]       = ["Chat Moderator"]; 
 
    // CHAT MODERATOR
 
    // FORMER ADMINS AND MANAGERS
 
  rights["Tyler.woodward.125"]       = ["Former Administrator","Former Rollback","Former Chat Moderator","BLOCKED"],
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.group').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
      $('<span class="group">' + rights[wgTitle][i] +
        '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
//</source>