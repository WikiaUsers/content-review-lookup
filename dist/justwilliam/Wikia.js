/* <pre><nowiki> */

$(document).ready(function()
{
	// A big thanks to [tardis.wikia.com/wiki/user:The_Librarian The Librarian] on [[w:c:tardis|tardis wiki]] who first pointed out the problem this code will fix.  This restores normal upload form since the popup one ignores source and license policy. Adapted from http://es.pokemon.wikia.com/wiki/MediaWiki:Wikia.js via Wookieepedia.
	$('a.wikia-button.upphotos').unbind('click',UploadPhotos.showDialog);
});

// Welcome notification message
// from sourcepedia.wikia.com
// removed for preload testing