/* ######################################################################### */
/* ### JavaScript here is loaded for all users.                          ### */
/* ######################################################################### */

// ============================================================
// BEGIN Template:Games
// ============================================================

// Description: Add icons to article title
// Credit:      User:Porter21 (http://fallout.wikia.com)

function addTitleIcons () {
   var iconBar = $('#va-titleicons');
   var previewBar = $('#va-titleicons-preview');
 
   if (skin != 'monobook' && skin != 'oasis' && skin != 'wikia') {
      return;
   }
 
   if (iconBar.length > 0 && $('a', previewBar).length > 0) {
      if (skin == 'oasis' || skin == 'wikia') {
         var articleDiv = $('#WikiaArticle');
 
         if (articleDiv.length > 0) {
            iconBar.css('display', 'block').prependTo(articleDiv);
         }
      } else if (skin == 'monobook') {
         var firstHeading = $('#firstHeading').css('position', 'relative');
 
         if (firstHeading.length > 0) {
            iconBar.css('display', 'block').appendTo(firstHeading.css('padding-right', previewBar.width() + 25));
         }
      }
 
      $('#va-titleicons-more').append('<img width="0" height="0" class="va-titleicons-chevron" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">');
 
      iconBar.hover(
         function () {
            $(this).addClass('va-titleicons-hover');
         }, function () {
            $(this).removeClass('va-titleicons-hover');
         });
   }
}

jQuery(function($) {
   if (skin == 'monobook' || skin == 'oasis' || skin == 'wikia') {
      addTitleIcons();
   }
});

// ============================================================
// END Template:Games
// ============================================================

// ============================================================
// BEGIN Collapsible tables
// ============================================================

// Description: Allow tables to be collapsible
// Credit:      This script is from Wikipedia. Please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
//              Customized for Fallout Wiki by User:Porter21

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */

var hasClass = (function () {
   var reCache = {};
   return function (element, className) {
      return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
   };
})();

// ============================================================
// BEGIN ArchiveTool
// ============================================================

// Description: Add tool for easier talk page archiving
// Credit:      User:Dantman (original), User:Porter21 (Oasis & Monobook support)

var ArchiveToolConfig = { 
   archiveListTemplate: 'Archives',
   archivePageTemplate: 'Archivepage',
   archiveSubpage: 'Archive',
};
importScriptPage('ArchiveTool/code.js', 'dev');

// ============================================================
// END ArchiveTool
// ============================================================

// ============================================================
// BEGIN Facebook Fanbox
// ============================================================

// Description: Integrate Facebook Fanbox into Wiki
// Credit:      User:edricteo (http://redwall.wikia.com)

function fBox() {
   $('#Wikifbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=104178646292440&amp;connections=10&amp;stream=1" align="top" frameborder="0" width="300" height="550" scrolling="no" />');
}

$(fBox);