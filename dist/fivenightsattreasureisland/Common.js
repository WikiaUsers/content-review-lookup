/* Any JavaScript here will be loaded for all users on every page load. */

function addMastheadTags() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // GROUP 2
 
  rights["GhastlyOwl"] = ["Retired Founder"];
  rights["General Phychodash"] = ["Developer","Voice Actor","Wiki Coder"];
  rights["Saturn the Pixel Gamer"] = ["Developer","Sound Provider"];
 
 if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
       $('.UserProfileMasthead .masthead-info span.tag').remove();
       for( var i=0, len=rights[user].length; i < len; i++) {
         $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});