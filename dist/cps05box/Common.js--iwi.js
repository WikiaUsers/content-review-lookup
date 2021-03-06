/* for [[Template:IWI]] */

function iwi(data) {
	var a = data.query.pages;
	console.log(data);
	if (typeof a["-1"] === "undefined") {
		for (var pageid in a) {
			var b = a[pageid].imageinfo[0],
				c = a[pageid].title;
			$('span.interwiki-image[data-filename="' + encodeURIComponent(c.substr(c.indexOf(":") + 1)) + '"]' + (typeof b.thumbwidth !== "undefined" ? '[data-resize="' + b.thumbwidth + '"]' : '[data-resize=""]')).replaceWith('<img src="' + (typeof b.thumburl !== "undefined" ? b.thumburl : b.url) + '" />');
		}
	}
}
$(".interwiki-image").each(function(i) {
	$(this).attr("id", "interwiki-image_" + i);
	if ($(this).attr("data-wiki").length > 0 && $(this).attr("data-filename").length > 0) {
		var s = $("<script />")
			.attr({
				"src": "http://" + $(this).attr("data-wiki") + ".wikia.com/api.php?action=query&format=json&callback=iwi&titles=File:" + $(this).attr("data-filename") + "&prop=imageinfo&iiprop=size|url" + (!isNaN($(this).attr("data-resize")) && $(this).attr("data-resize").length > 0 ? "&iiurlwidth=" + $(this).attr("data-resize") : ""),
				"onload": "function() {this.parentNode.removeChild(this);}"
			});
		$("head").append(s);
	}
});