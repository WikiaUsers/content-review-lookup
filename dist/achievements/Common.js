/* Any JavaScript here will be loaded for all users on every page load. */

/* Add UTC clock above articles */
importScript('MediaWiki:Common.js/displayTimer.js');

function addTwitterButton() {
   $('#twitter-button').append('<a href="http://twitter.com/tawatson101" class="twitter-follow-button" data-show-count="false">Follow Terry</a><script src="https://platform.twitter.com/widgets.js" type="text/javascript"></script>');
}
$(addTwitterButton);

/* Standard Edit Summaries */
importScriptPage('Standard_Edit_Summary/code.js', 'dev');