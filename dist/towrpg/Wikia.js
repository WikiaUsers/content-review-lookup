/*<pre><nowiki>*/
$(document).ready(function()
{
	// Restores normal upload form since the popup one ignores source and license policy. Adapted from http://es.pokemon.wikia.com/wiki/MediaWiki:Wikia.js.
	$('a.wikia-button.upphotos').unbind('click',UploadPhotos.showDialog);
});
/*</nowiki></pre>*/