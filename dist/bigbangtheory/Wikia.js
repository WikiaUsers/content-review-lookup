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