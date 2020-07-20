window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};


importArticle({
    type: 'script',
    article: 'w:c:dev:UserTags/code.js'
});

function addMastheadTags() {
    var rights  = {},
        user    = "";
 
    rights["Runningfireclawheart"]  = ["Admin", "Bureaucrat", "Active"];
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
 
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[user].length; i < len; i++) {
 
        $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
}
 
$(function() {
    if ($('#UserProfileMasthead')) {
        addMastheadTags();
    }
});

importScriptPage('MediaWiki:WallGreetingButton/code.js', 'dev');