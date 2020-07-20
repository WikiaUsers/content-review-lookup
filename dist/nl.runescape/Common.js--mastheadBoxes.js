// <source lang="JavaScript">
//As found on elderscrolls.wikia.com/MediaWiki:Common.js/masthead.js

// Adapted by Rappy 4187
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // ADMINISTRATOR
 rights["Joeytje50"]                         = ["ADMINISTRATOR"],
 rights["Quilafa"]                           = ["ADMINISTRATOR"],
 rights["Ruderion"]                          = ["ADMINISTRATOR"],
 rights["Zorak plorak"]                      = ["ADMINISTRATOR"],

   // AWB
 rights["XsBot"]                             = ["AWB"],

    // BOT
  rights["DRSBot"]                           = ["BOT"],
  rights["GEBot"]                            = ["BOT"],
  rights["MarkvA bot"]                       = ["BOT"],
  rights["SmackBot"]                         = ["BOT"],
  rights["Wikia"]                            = ["BOT"],

    // BUREAUCRAAT
  rights["Aaarto"]                           = ["BUREAUCRAAT"],
  rights["Darth Stefan"]                     = ["BUREAUCRAAT"],
  rights["Xbabyx140"]                        = ["BUREAUCRAAT"],
  rights["Xsdvd"]                            = ["BUREAUCRAAT"];
 
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