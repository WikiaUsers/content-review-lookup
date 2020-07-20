// User rights (please list users in alphabetical order)
// Code adapted from http://admintools.wikia.com/wiki/MediaWiki:Wikia.js/userRightsIcons.js

$(function() {
  var rights = {};

      rights["CCWChatBot"] = ["Bot"];
      rights["DMC-12"] = ["Bot"];
      rights["Dserbot"] = ["Bot"];
      rights["Mothernature2010"] = ["Co-founder"]; // Requested by TheWWC

// Script to Remove Old Rights 
  if (typeof rights[wgTitle] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[wgTitle].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag">' + rights[wgTitle][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
  // END Script to Remove Old Rights
 
});