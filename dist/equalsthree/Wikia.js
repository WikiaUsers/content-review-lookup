//Custom user rights icons on userpages
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
 
importScriptPage('RelatedDiscussionsModule/code.js', 'dev'); 
 
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons - Must list all tags
 
    rights["TheWigglesandSmosh"] = ["Head Admin"];
 
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
 
/** Automatically drops down the menu when you hover the edit button **/
 
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:AutoEditDropdown/code.js'
    ]
});
 
 
 
// Namespaces in header
$(function NamespacesInHeader() {
	if(wgCanonicalNamespace != '' && wgCanonicalNamespace != 'Talk') {
		$('#WikiaPageHeader h1').html(wgFormattedNamespaces[wgNamespaceNumber] + ':' + wgTitle);
	}
});
 
 
//Get rid of disgusting popup image uploader
$(".upphotos").click(function linkToUploader() {
   window.location.href='http://equalsthree.wikia.com/wiki/Special:Upload';
});
 
/* <pre> */
 
/* Fixes user wikia.js and wikia.css files not loading in Oasis after upgrade to MediaWiki 1.19 (from rs.wikia.com) */
if (!$('script[src*="title=User:'+wgUserName+'/wikia.js"]').length) {
    importScript('User:' + wgUserName + '/wikia.js');
}
 
if (!$('link[href*="title=User:'+wgUserName+'/wikia.css"]').length) {
    importStylesheet('User:' + wgUserName + '/wikia.css');
}