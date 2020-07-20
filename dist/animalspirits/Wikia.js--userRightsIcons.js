// User rights (please list users in alphabetical order)
// Code adapted from http://admintools.wikia.com/wiki/MediaWiki:Wikia.js/userRightsIcons.js
 
$(function() {
  var rights = {};
 
      rights["RestrictedAccess"] = ["Co-founder"]; 
 
// Script to Remove Old Rights 
  if (typeof rights[wgTitle] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.group').remove();
 
      for( var i=0, len=rights[wgTitle].length; i < len; i++) {
 
        // add new rights
        $('<span class="group">' + rights[wgTitle][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
  // END Script to Remove Old Rights
 
});