importArticles({
    type: 'script',
    articles: [
        'w:c:dev:AutoEditDropdown/code.js'
    ]
});
// Tag (w:c:five-nights-at-trasure-island)
 
$(function addMastheadTags() {
  if ($('#UserProfileMasthead')) {
    var rights = {};
// Burócratas
    rights["Wikia"]  = ["Test"];
 
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
  }
});
 
$(".image-resize").each(function() {
	var a = $(this).children(".image-resize-new").text().split("_")
		img = $(this).find("img");
	if (!isNaN(Number(a[1])) && !isNaN(Number(a[1]))) {
		img.attr({
			width: a[0],
			height: a[1]
		});
	}
});
 
var WikiaNotificationMessage = ""; importScriptPage('WikiaNotification/code.js', 'dev');
 
var SocialMediaButtons = { 
	position: 'top',
	colorScheme: 'color',
	buttonSize: 'default'
};
importScriptPage('SocialIcons/code.js','dev');
importArticles({
    type: 'script',
    articles: [
        'u:dev:FloatingToc/code.js',
        'u:dev:DisableBotMessageWalls/code.js'
    ]
});
 
function addMastheadTags() {}
  var rights = {};
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
 
// Disable votes when a thread is closed.
$(function() {
    if ($(".deleteorremove-infobox").is('*')) {
        $('input[name="wpVote"]').attr('disabled','disabled')
                                 .attr('value','Votación finalizada');
    }
});