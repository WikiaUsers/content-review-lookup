/* Talk page buttons to article headers in addition to comments button
 * by: [[User:The 888th Avatar]] from Avatar Wiki
 */

$(function() {
	if (skin == "oasis" || skin == "wikia") {
		if (wgNamespaceNumber == 0 && wgTitle !== "Sam and Cat Wiki") {
			$('a.wikia-button.comments.secondary').after('<a href="/wiki/Talk:' + wgPageName + '" class="wikia-button secondary" style="margin:2px 10px 0 0;">Talk</a>');
		}
		if (wgNamespaceNumber == 114) {
			var galleryWithoutNamespace = wgPageName.substring("5","999");
			$('a.wikia-button.comments.secondary').after('<a href="/wiki/Gallery_talk:' + galleryWithoutNamespace + '" class="wikia-button secondary" style="margin:2px 10px 0 0;">Talk</a>');
		}
	}
});