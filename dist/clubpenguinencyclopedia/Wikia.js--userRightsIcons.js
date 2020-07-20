// <source lang="JavaScript">
 
// WRITTEN BY USER:Batreeqah
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  // NOTE!!! Make sure the last line has a semi-colon (;) rather than a comma (,)
 
 
  rights["Penguin_Frost"] = ["Founder","Leader","Staff","Bureaucrat"];
  rights["Batreeqah"] = ["Staff","Administrator","Bureaucrat"];
  rights["Khantar07"] = ["Staff","Administrator","Bureaucrat"]'
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.tag').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
      $('<span class="tag">' + rights[wgTitle][i] +
        '</span>&nbsp;').appendTo('.masthead-info hgroup');
    }
  }
});
 
// </source>