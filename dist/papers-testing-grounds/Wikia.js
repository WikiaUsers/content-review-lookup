// 19:49, September 4, 2012 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY User:Rappy_4187
// If you use this on your wiki, you assume responsibility for
// ensuring compliance with Wikia’s ToU
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons
 
    rights["Paperluigi ttyd"]     = ["Bureaucrat","Administrator","King of Epicness"],
    rights["Sci100"]              = ["Son of Rigon"];
 
     // END List of Accounts Given Extra User Rights Icons
 
  // BEGIN Script to Remove Old Rights Icons & Insert New
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[user].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
  // END Script to Remove Old Rights Icons & Insert New
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});

PurgeButtonText = 'Purge';
ajaxPages = ["Special:WikiActivity","Special:Log"];
 
importArticles( {
    type: "script",
    articles: [
        "external:dev:PurgeButton/code.js",
        "external:dev:RevealAnonIP/code.js",
        "external:dev:DupImageList/code.js",
]
});

function colorswitchalpha()
{
document.getElementById("csa") .style.color="red";
document.getElementById("csa") .style.background="white";
}

function season2switch()
{
document.getElementById("season1") .innerHTML="{{GR Nav 2}}";
}

importScriptPage('SpoilerAlert/code.js', 'dev');
SpoilerAlert = {
    isSpoiler: function () {
        return Boolean($('.spoiler').length);
    }
};

function substUsername() {
	$('.insertusername').html(wgUserName);
}