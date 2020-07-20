// AutoEditDropdown config - http://dev.wikia.com/wiki/AutoEditDropdown
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: true
};

window.DisplayClockJS = '%2I:%2M:%2S %p, %B %2d, %Y (UTC)';

importArticles({
    type: 'script',
    articles: [
        'w:c:dev:AutoEditDropdown/code.js',
		'w:c:dev:DisplayClock/code.js',
		'w:c:dev:ExtendedNavigation/code.js',
        'w:c:dev:FixMultipleUpload/code.js'
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
 
}
 
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