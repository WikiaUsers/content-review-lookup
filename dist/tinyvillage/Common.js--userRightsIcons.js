/* Any JavaScript here will be loaded for all users on every page load. */

// Written by User:Rappy_4187, Aion Wiki
// Currently maintained by Trellar
// Last Updated September 5, 2012  (UTC)
// <source lang="JavaScript">
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // Dino Custodian
 
//  rights["RobinCarr"] = ["Dino Custodian"];
//  rights["Don Joan"] = ["Dino Custodian"];
  rights["Eppidiah"] = ["Dino Custodian"];
//  rights["MissT732"] = ["Dino Custodian"]; already become admin
  rights["Ladysarah27"] = ["Dino Custodian"];

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