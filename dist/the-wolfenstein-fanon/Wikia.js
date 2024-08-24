function addMastheadTags() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS

    // GROUP 2

  rights["MrDelirious"]      = ["Rising Star", "Color Sergeant"];
  rights["Techman129"]       = ["The Tech Guy"];
  rights["Xeno Fighter 451"] = ["Gott F�hrer"];
  rights["Nikki Lee 1999"]   = ["Minister of the Interior"];
  rights["XenoBot451"]       = ["Bot"]
  
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
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