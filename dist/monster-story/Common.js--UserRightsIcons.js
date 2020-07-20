// Written by User:RAPPY_4187, Aion Wiki
// Currently maintained by Trellar
// Last Updated August 15, 2012  (UTC)
// <source lang="JavaScript">
 
$(function() {
  var rights = {};
 
// BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
  
  rights["Knj00"]        = ["Admin", "Image Fairy"];
  rights["Sylvandyr"]     = ["Admin","Paradox :P","Wiki Sage"];
 
// END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.tag').remove();
 
    var str_to_append = "";

    for( var i=0; i < rights[wgTitle].length; i++) {
      // add new rights
      str_to_append += ((i == 0) ? "" : "&nbsp; ") + "<span class=\"tag\">" + 
                       rights[wgTitle][i] + "</span>";
    }

    $(str_to_append).appendTo('.masthead-info hgroup');
  }
});
 
// </source>