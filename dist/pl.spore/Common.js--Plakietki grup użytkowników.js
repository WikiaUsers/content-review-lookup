// 07:55, May 27, 2011 (UTC)
// <source lang="JavaScript">

// CODE WRITTEN BY USER:RAPPY_4187

 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

  // Założyciel
 
  rights["Lukasznaw"]           = ["Założyciel"],
 
  // Biurokrata
 
  rights["PiotrekD"]            = ["Biurokrata", "Administrator"],
 
  // Administrator
 
  rights["CreatureCreator"]     = ["Administrator"],
 
  // Rollback
 
  rights["Exe19"]               = ["Rollback"],
  rights["Rzymianin"]           = ["Rollback", "Moderator czatu"],
  rights["SMiki55"]             = ["Rollback"];
 
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