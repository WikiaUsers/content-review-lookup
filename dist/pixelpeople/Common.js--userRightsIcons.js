/* Any JavaScript here will be loaded for all users on every page load. */

//DISCLAIMER: This template is written by User:Rappy_4187, Aion Wiki
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

    // ROLLBACK
 
  rights["Tsangerbot"]              = ["Bot"],
  rights["Sumone's bot"]              = ["Bot"],

    // ROLLBACK
 
  rights[""]              = ["Rollback"],
  
    // CHAT MODERATOR

  rights[""]    = ["Chat Moderator"],

    // MODERATOR

  rights[""]              = ["Moderator"];
 
    // ADMINISTRATOR

  rights["X37X37"]     = ["Administrator"];

    // BUREAUCRAT

  rights["Tsanger"]      = ["Bureaucrat"];

    // FOUNDER

  rights["Sumone10154"]          = ["Founder"];

    // INACTIVE

  rights["Sumone10154"]              = ["Inactive"];

    // COUNCILOR

  rights[""]              = ["Councilor"];
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.tag').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
      $('<span class="tag" style="font-family:Calibri,sans-serif; margin:0 4px; background-color:#4AB500; border-left:3px solid #FFF; border-right:3px solid #FFF; padding:0 4px 1px; text-align:center; font-size:125%; float:left !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup')
    }
  }
});
 
// </source>