// For user rights that dont show up
// <source lang="JavaScript">
 
// Code from Terraria Wiki
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // FOUNDERS
 
  rights["Cococrash11"]         = ["Founder"],
 
    // BUREAUCRATS
 
  rights["KidProdigy"]      = ["Bureaucrat","Admin"],
  rights["Cococrash11"]      = ["Bureaucrat","Admin"],
 
    // BOTS
 
  rights["Wikia"]   = ["Bot"];

    // AUTOMATED EDIT-MAKING ACCOUNTS

  rights["Default"]  = ["Automated"];
  rights["MediaWiki default"]  = ["Automated"]
 
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
 
// </source>