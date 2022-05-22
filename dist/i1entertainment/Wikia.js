// AutoEditDropdown config - http://dev.wikia.com/wiki/AutoEditDropdown
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: true
};
// END AutoEditDropdown config
window.DisplayClockJS = '%2I:%2M:%2S %p, %b %2d, %Y (UTC)';
importArticles({
    type: 'script',
    articles: [
        'u:dev:AutoEditDropdown/code.js',
		'u:dev:DisplayClock/code.js',
    ]
});
 
// Augmentation for CSS plural.
// Everything is plural by default, need to tag nodes which shouldn't be.
// "1 Like"
if (mediaWiki.config.get('wgNamespaceNumber') === 2000 && mediaWiki.config.get('wgUserLanguage') === 'en') {
jQuery(function($) {
    'use strict';
    $('#Forum.Board .thread .activity > .posts').each(function() {
        var txt = this.textContent || this.innerText;
        if (/^\s*1\s/.test(txt)) {
            this.className += ' one';
        }
    });
});
}
 
function addMastheadTags() {
  var rights = {};
 
/* Note by DreadHydrus: I've put the codes beyond this line into a comment annotation due to the fact that some parts of it is preventing access to VisualEditor in the iSurv1vor wiki. I do not know which specific code that is causing it since its a custom configuration I'm not familiar with nor know if the editor, Whoisrob, had the code to actually work as intended.

   // BEGIN Script to Remove Old Rights Icons & Insert New
 
    var user;
    if (wgCanonicalSpecialPageName == "Contributions") {
      user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { user = wgTitle; }
 
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
 
$(window).load(function() {
    $('#WikiaRail').append($('<section></section>', {
        id:'sitenotice',
        html:'' //insert your html here
    }));
});
*/