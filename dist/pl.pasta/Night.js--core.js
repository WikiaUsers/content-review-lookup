$(document).ready(function(){

function loadScript(scripturl) {
$('head').append('<script src="' + scripturl + '"></script>');
}

//loadScript('/wiki/MediaWiki:Night.js/ActivityRefresh.js?action=raw');
loadScript('/wiki/MediaWiki:Night.js/GoToTop.js?action=raw');
//loadScript('/wiki/MediaWiki:Night.js/messages.js?action=raw');
loadScript('/wiki/MediaWiki:Night.js/prelock.js?action=raw');
//loadScript('/wiki/MediaWiki:Night.js/wttinfo.js?action=raw');
loadScript('/wiki/MediaWiki:Night.js/nnav.js?action=raw');
loadScript('/wiki/MediaWiki:Night.js?action=raw');

// ActivityRefresh
//elapsedTime=60*2;

// Messages
/*$_msg.search = 'Szukaj...';
$_msg.createawiki = 'Stwórz wiki';
$_msg.gototop = 'Wróć na górę';
$_msg.contribute = 'Wnieś wkład<span class="drop"><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="chevron"></span><ul class="WikiaMenuElement"></ul>';
nmsginit();
$('.contribute .WikiaMenuElement').load('/wiki/MediaWiki:ContributeMenu?action=raw');
*/
});