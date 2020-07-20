// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187, WOW Wiki
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // BUREAUCRATS
 
//  rights["Jspoelstra"]         = ["Bureaucrat", "Check User", "Councilor"],


    // ADMINS
  rights["F90-1"]                 = ["Admin", "Councilor", "Wikia Star"],

//  rights["Agent c"]                 = ["Admin", "Councilor", "Wikia Star"],


    // INACTIVE ADMINS

//  rights["Ausir"]                   = ["Inactive Admin"],


    // MODERATORS

//  rights["JASPER42"]                  = ["Moderator"],

    // INACTIVE MODERATORS
 
    // PATROLLERS

//  rights["69.l25"]                    = ["Patroller"],
  

    // INACTIVE PATROLLERS

//  rights["Charcoal121"]               = ["Inactive Patroller"],
  

    // INACTIVE CHAT MODERATORS

//  rights["Miss.Nicolle"]           = ["Inactive Chat Moderator"];


  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.tag').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
      $('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 
// </source>