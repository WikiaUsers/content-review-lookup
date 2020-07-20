/* Add a tag for "bureaucrat" to user profile header when bureaucrats category present
 * by: [[User:Technology Wizard]]
 */ 
$(document).ready(function() {
	if (-1 < $.inArray("Bureaucrats", wgCategories)) {
		$('.masthead-info hgroup').append('<span class="tag">Bureaucrat</span>');
	}
});
 
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');
 
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:AutoEditDropdown/code.js',
        'w:c:dev:FixMultipleUpload/code.js',
        'w:c:dev:AutoEditDropdown/code.js',
    ]
});

/* <pre><nowiki> */
 
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color"
};
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Common.js/displayTimer.js',
        'u:dev:ListAdmins/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:MiniComplete/code.js',
        'u:dev:SocialIcons/code.js'
    ]
});
 
 
window.UserTagsJS = {
	modules: {},
	tags: {}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = false;
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat']
};
 


$('#WikiaArticle').prepend('<div style="color:#012c57;font-family:Comic Sans MS;padding:10px;background-image: -ms-linear-gradient(left, #FFFFFF 0%, #FFFFFF 100%); background-image: -moz-linear-gradient(left, #FFFFFF 0%, #FFFFFF 100%); background-image: -o-linear-gradient(left, #8BADCE 0%, #8BBBDF 100%); background-image: -webkit-gradient(linear, left top, right top, color-stop(0, #8BADCE), color-stop(1, #8BBBDF)); background-image: -webkit-linear-gradient(left, #8BADCE 0%, #8BBBDF 100%); background-image: linear-gradient(to right, #8BADCE 0%, #8BBBDF 100%);text-align:center;margin-left:auto;margin-right:auto;margin-bottom:20px;"><a href="http://walk-off-the-earth.wikia.com/Main_Page" style=color:white;background:#536872;font-weight:600></a> <span style=font-weight:600>Welcome to Walk Off The Earth Wiki! If you have any questions, report them to the queries page.</span></div>');
 

 /*</nowiki></pre>*/
 
 
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons - Must list all tags
    rights["%E1%B8%A0w%E1%BA%B5ine_%E1%B8%B8%D9%8D%D9%8Dk%C6%A8_%C4%B9i%C4%B8e_%CF%BE%E1%BB%81%D0%BB%C8%91%E1%BB%81d"]   = ["Technician"];
    rights["Ḡwẵine_Ḹٍٍkƨ_Ĺiĸe_Ͼềлȑềd"]        = ["Technician"];
    rights["Ḡwẵine_Ḹٍٍkƨ_Ĺiĸe_Ͼềлȑềd"]        = ["Technician"];
    rights["Ḡwẵine Ḹٍٍkƨ Ĺiĸe Ͼềлȑềd"]        = ["Technician"];
    rights["Ḡwẵine Ḹٍٍkƨ Ĺiĸe Ͼềлȑềd"]        = ["Technician"];
    rights["Gwaine-looks-like-cenred"]        = ["Technician"];
 
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
 
 
// Auto-refresh Special:RecentActivity
 
AjaxRCRefreshText = 'Auto-refresh';  
AjaxRCRefreshHoverText = 'Automatically refresh the page';  
importScriptPage('AjaxRC/code.js', 'dev');  
var ajaxPages =["Special:RecentChanges", "Special:WikiActivity"];