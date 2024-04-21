/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: 'script',
    articles: [ 
        'u:dev:Standard_Edit_Summary/code.js'
    ]
});

$(function() {
	// MW content hooks
	// These will be run every time the MW parser adds content to a page, which occurs
	// on page load, as well as when reloading parts of the page for using the
	// "Preview content without reloading" in the editor.

	// synopsis: Functionality for [[Template:Hover gif]]
	mw.hook('wikipage.content').add(function($content) {
		$content.find(".hover-gif img").each(function(i, obj) {
		  var $canvas = $("<canvas width='" + $(obj).attr("width") + "' height='" + $(obj).attr("height") + "'></canvas>");
		  $(obj).parent().append($canvas);
		  var ctx = $canvas[0].getContext("2d");
		  var img = new Image();
		  img.onload = function() {
		    ctx.drawImage(img, 0, 0);
		  };
		  img.src = obj.src;
		});
	});
});