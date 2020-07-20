/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/* js-based syntax for [[Template:MusicPlay]] */
 
$(function() {
	// <span class="MusicPlay" data-repeat="repeat">File:FILENAME</span>
	function MusicPlay() {
		if ([2, 3, 10, 500].indexOf(mw.config.get("wgNamespaceNumber")) > -1) { // namespace: ["User", "User talk", "Template", "User blog"]
			// file names array (includes the File: prefix)
			var titles = [];
 
			// all elements that require
			$("span.MusicPlay").each(function() {
				var slash = $(this).html().replace(/_/g," ").split("/"); // for dealing with old syntax, at least for now
				$(this).html(slash.length == 1 ? slash[0] : "File:" + decodeURIComponent(slash[slash.length-1]));
				var a = encodeURIComponent($(this).html());
				if (titles.indexOf(a) == -1) {
					titles.push(a);
				}
				$(this).attr("data-src", a);
			});
			$.getJSON("/api.php?action=query&format=json&prop=imageinfo&iiprop=mime|metadata|url&titles=" + titles.join("|") + "&cb=" + new Date().getTime(), function(data) {
				var a = data.query.pages;
				window.a = a;
				for (var pageid in a) {
					// if file exists
					if (pageid > 0) {
						// if is .ogg
						if (a[pageid].imageinfo[0].mime == "application/ogg") {
							var embed =
								$('<embed />').attr({
									"src": a[pageid].imageinfo[0].url,
									"type": "application/ogg",
									"height": "0",
									"width": "0",
									"class": "MusicPlay"
								});
							/*
								could use for looping, if specified:
								a[pageid].imageinfo[0].metadata.[i/* 'i' has property 'length'*\/].value
							*/
							$('span[data-src="' + encodeURIComponent(a[pageid].title.replace(/&/g,"&amp;")) + '"].MusicPlay').replaceWith(embed);
						}
					} else {
						// file doesn't exist- modify 'span.MusicPlay' element
						$('span[data-src="' + encodeURIComponent(a[pageid].title) + '"].MusicPlay').each(function() {
							var errorFilename = a[pageid].title.replace(/"/g,"\\");
							$(this).html(
								'<!-- MusicPlay Error: couldn\'t find file named "' + errorFilename + '" -->'
							);
							console.error('MusicPlay Error: couldn\'t find file named "' + errorFilename + '"');
						});
					}
				}
			});
		}
	}
	if (mw.config.get("wgAction") == "edit") {
		// when ?action=edit
		$(window).on("EditPageAfterRenderPreview", function() {
			MusicPlay();
		});
	} else if ($("span.MusicPlay").length > 0) {
		// not in the editor but 'span.MusicPlay' exists
		MusicPlay();
	}
});