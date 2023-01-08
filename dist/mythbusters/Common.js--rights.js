// Created by Rappy 4187
// Adapted by Hairrazerrr
// Version 1.0

$(function() {
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

  var rights = {
   "Adam Savage":                            ["Bureaucrat (Adopter)"],
   "Ochristi":                               ["Inactive Bureaucrat"],
   "Latiasfan001":                           ["Admin"],
   "Hairrazerrr":                            ["Rollback"],
 //Bots
   "SavBot":                                 ["IRC Bot"],
   "ZammyBot":                               ["AWB"]
  }

  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

  if (typeof rights[wgTitle] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.group').remove();

    for(var i=0;i<rights[wgTitle].length;i++) {
      // add new rights
      $('.masthead-info hgroup').append('<span class="group">' + rights[wgTitle][i] + '</span>');
    }
  }
});