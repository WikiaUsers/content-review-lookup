// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187, WOW Wiki
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // ARCHMAGE and BUREAUCRATS
 
  rights["Gothic Neko"]         = ["Archmage", "Ordo Hereticus", "Tea connoisseur"],

    // RP-PLAYERS

  rights["Agent c"]          = ["Role Player"],

    // SPECIAL SNOWFLAKE

  rights["Dragonborn96"]          = ["Special Snowflake"],

    // SISTER OF BATTLE

  rights["Limmiegirl"]          = ["Adepta Sororitas"],

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