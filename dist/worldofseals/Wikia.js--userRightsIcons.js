// <source lang="JavaScript">

// WRITTEN BY User:Batreeqah
// If you use this on your wiki, you assume responsibility for ensuring 
// compliance with Wikia's Terms of Use: http://www.wikia.com/Terms_of_Use

function addMastheadTags() {
  var rights = {};
    rights["Batreeqah"] = ["Co-Founder","Admin"],
    rights["The_Director_of_PSA"] = ["Founder","Admin"],
    rights["TTwilightPerry"] = ["Co-Founder","Admin"],

    rights["Do not change this line"] = ["null"];

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

// </source>