/* Any JavaScript here will be loaded for all users on every page load. */
 
// Written by User:Rappy_4187, Aion Wiki
// Currently maintained by ~=(iNate)=~
// Last Updated November 7, 2012  (UTC)
// <source lang="JavaScript">
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // ROLLBACK
 
  rights[""]              = ["Rollback"],
  
    // CHAT MODERATOR
 
  rights["Nonsense Fantasy"]    = ["Chat Moderator"],
 
    // MODERATOR
 
  rights[""]              = ["Moderator"];
 
    // ADMINISTRATOR
 
  rights["Htm14"]     = ["Administrator"];
 
    // BUREAUCRAT
 
  rights["Brodensson"]          = ["Bureaucrat"];
  rights["Izuru57"]      = ["Bureaucrat"];
 
    // INACTIVE
 
  rights[""]              = ["Inactive"];
 
    // COUNCILOR
 
  rights[""]              = ["Councilor"];
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.tag').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
      $('<span class="tag" style="font-family:Gang of Three,sans-serif; margin:0 4px; background-color:#222229; border:5px solid #267F00; padding:0 4px 1px; text-align:center; font-size:125%; float:right !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 
// </source>