$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // Nalepki ;d
 
  rights["Pan Cube"]                 = ["Obiekt SCP", "Kostka"],
  rights["Bot Kostki"]               = ["Bot"],
  rights["KrzychPL111"]              = ["Rollback"],
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // Usunięcie poprzednich opisów grup
    $('.UserProfileMasthead .masthead-info span.group').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
$('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 
// </source>