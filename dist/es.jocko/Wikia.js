// Menúes desplegables con hover
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: true
}; 
// FastDelete
fdButtons[fdButtons.length] = {
	'summary': ' ',
	'label': 'Borrar este artículo'
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:AutoEditDropdown/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:TopEditors/code.js',
        'u:dev:FastDelete/code.js'
    ]
});
function addMastheadTags() {
  var rights = {};
 
    rights["Jockø "]         = ["Lechero"];
 
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