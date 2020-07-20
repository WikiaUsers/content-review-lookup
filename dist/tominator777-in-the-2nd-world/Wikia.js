function addMastheadTags() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // GROUP 2
 
 
    rights["Auron~Guardian"] = ["Administrator", "Bureaucrat", "MMORPG Fan","Twitter manager", "Skype admin"];
    rights["Lumoshi"] = ["Administrator", "Luma"];
    rights["Nightmare9188"] = ["Administrator", "Bureaucrat", "Knight"];
    rights["Nicko756"] = ["Administrator"];
    rights["SpongeyTube ALT"] = ["Administrator", "Spongey Dude"];
    rights["SpongeFreddy777"] = ["Chat Mod", "Taco","Twitter manager", "Skype admin"];
 
 
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