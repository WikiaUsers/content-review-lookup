/* Any JavaScript here will be loaded for all users on every page load. */
$(function(){
	importArticles({
	    type: 'script',
	    articles: [
	        'u:dev:MediaWiki:ReferencePopups/code.js',
	    ]
	}).then(function() {
		// Since ReferencePopups does its own async loading we need to wait
		// until the "module" is loaded before we can use it via jQuery
		$.when(window.dev.ReferencePopups.Popup).done(function() {
			// Loop through all the Glossary template elements on the page,
			// load a summary via Open Graph protocol metadata and place it in a
			// popup
			//
			// See also:
			//  * https://ogp.me/
			$("span[data-glossary]").each(function() {
				var $this = $(this);
				var slug = $this.data('glossary');
				var root = "https://sixpackpedia.org/glossary/entry/";
				$.getJSON(root + "json/" + slug + "/", function(data) {
					var src = data["og:image"];
					var href = root + slug + ".html";
					var title = data["og:title"];
					var description = data["og:description"];
					var content =
						"<div class='glossary-popup'><img src='" + src + "'>" +
						"<small>SixPackPedia</small><p><a href='" + href +
						"'>" + title + "</a></p><p>" + description +
						"</p></div>";
					$this.referencePopup({"content": content});
				});
			});
		});
	})
});