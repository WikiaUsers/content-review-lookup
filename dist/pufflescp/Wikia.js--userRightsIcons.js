// <source lang="JavaScript">

// WRITTEN BY User:Rappy_4187
// If you use this on your wiki, you assume responsibility for ensuring 
// compliance with Wikia's Terms of Use: http://www.wikia.com/Terms_of_Use

function addMastheadTags() {
  var rights = {};
    rights["NFD Tool"] = ["Deletion Tool","Verified"],
    rights["Batreeq"] = ["Founder","Puffles Wiki Staff","Verified"],

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