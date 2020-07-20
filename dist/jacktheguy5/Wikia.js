function addMastheadTags() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // GROUP 2

  rights["Jacktheguy5"]     = ["Founder", "Manager Of All Administrators", "God of this Wiki"];
  rights["Auron~Guardian"] = ["B-Crat", "Editing Master", "Achievement Earner", "Coding Legend"];
  rights["Tanhamman"] = ["B-Crat", "Expert At Achievements", "Page Adding Genius"];
  rights["Nicko756"] = ["B-Crat", "Chat Moderator", "Veteran At Adding and Editing Pages"];


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