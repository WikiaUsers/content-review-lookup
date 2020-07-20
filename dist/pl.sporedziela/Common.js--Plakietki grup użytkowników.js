// 07:55, May 27, 2011 (UTC)
// <source lang="JavaScript">

// CODE WRITTEN BY USER:RAPPY_4187

 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

  // Założyciel
 
  rights["Jutka64"]            = ["Biurokrata", "Zalożyciel"],
 
  // Biurokrata
 
  rights["Kamil Trzoch"]            = ["Biurokrata", "Administrator"],
 
  // Administrator
 
  rights["Nikusia12"]     = ["Administrator"],
 
  // Rollback
 
  rights["Timler"]               = ["Rollback"],
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // Usunięcie poprzednich opisów grup
    $('.UserProfileMasthead .masthead-info span.group').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
      $('<span class="group">' + rights[wgTitle][i] +
        '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 
// </source>