// <source lang="JavaScript">
// WRITTEN BY USER:RAPPY_4187
 
$(function() {
  var rights = {};
 
  rights["BiggestShip65"]   = ["Lead Coder","The Shark"],

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
// END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS