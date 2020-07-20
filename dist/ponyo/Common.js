/* Any JavaScript here will be loaded for all users on every page load. */


/* Display a raw text list of files on Special:UnusedFiles */
if (mediaWiki.config.get("wgPageName") === "Special:UnusedFiles") {
	$(function () {
		var str = "";
		$('.gallerytext > a').each(function () {
			str += decodeURIComponent(this.href.substring(this.href.indexOf("File"))) + "\n";
		});
		var $textarea = $('<textarea style="width: 95%; height: 100px"></textarea>');
		$textarea.val(str);
		$('.gallery').before($textarea);
	});
}