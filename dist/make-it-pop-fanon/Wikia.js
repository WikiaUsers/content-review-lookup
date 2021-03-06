//Thank you to the Ben 10 Fan Fiction Wiki
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS 
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons
 
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
 
/* Warning alert */
window.SpoilerAlert = {
    isSpoiler: function () {
        return -1 != $.inArray('Warning', wgCategories);
    }
};
importScriptPage('MediaWiki:WarningAlert/code.js');
 
$(document).ready(function() {
    var newSection = '<section id="activities" class="module"><h1>' +
      'What is New?' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Specials}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});

importScriptPage('BackToTopButton/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});