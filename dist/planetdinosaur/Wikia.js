importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});
 
importScriptPage('SpoilerAlert/code.js', 'dev');
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons - Must list all tags
 
    rights["EpicPrime"] = ["Administrator", "Bureaucrat", "Rollback", "Moderator"];
    rights["Kabilan29"] = ["Administrator", "Bureaucrat", "Retired"];
    rights["CavanWikia"] = ["EpicPrime's Alt Account"];
 
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

// Add link to Rules to Wiki-Nav
// @author: http://c.wikia.com/wiki/User:UltimateSupreme
$("<li><a>").addClass('subnav-2-item')
	.find('a')
		.attr({
			'href': '/wiki/Planet Dinosaur Wiki:Rules',
			'class': 'subnav-2a'
		})
		.text('Rules').end()
	.appendTo($('.WikiHeader nav ul li.marked ul'));