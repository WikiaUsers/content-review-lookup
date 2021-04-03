/* Any JavaScript here will be loaded for all users on every page load. */

<syntaxhighlight lang="javascript">
/* operate for [[Template:EmbedMusic]] */
 
$(".swf-cp-domain").each(function() {
	if (String(Number($(this).attr("data-src"))) != "NaN") {
		$(this).html('<embed src="http://media1.clubpenguin.com/play/v2/content/global/music/' + $(this).attr("data-src") + '.swf' + '" style="display: inline; width: 0px; height: 0px; margin: 0px; padding: 0px;" />');
	}
});