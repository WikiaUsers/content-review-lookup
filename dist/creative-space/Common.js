// [[Category:Internal]]

// For [[Module:CSS]]; [[T:CSS]] dependency (credits to the Backrooms Wiki)
mw.hook("wikipage.content").add(function() {
	$("span.import-css").each(function() {
		var css = mw.util.addCSS($(this).attr("data-css"));
		$(css.ownerNode).addClass("import-css")
			.attr("data-css-hash", $(this).attr("data-css-hash"))
			.attr("data-from", $(this).attr("data-from"))
			.attr("data-wait", $(this).attr("data-wait"))
			.attr("data-portal", $(this).attr("data-portal"));
		
		var wait = $(this).attr("data-wait");
		var portal = $(this).attr("data-portal");
		var portalOpened = false;
		
		if (wait != "none") {
			css.disabled = true;
			var timer = setTimeout(() => css.disabled = false, wait);
		}
		
		if (portal != "none") {
			css.disabled = true;
			$(".t-css-portal-" + portal).click(function() {
				css.disabled = !css.disabled;
				portalOpened = true;
			});
		}
		
		$(".theme-toggler").click(function() {
			switch (true) {
				case wait != "none":
					if (timer || css.disabled == false) {
						clearTimeout(timer);
						timer = false;
						css.disabled = true;
					} else css.disabled = false;
					break;
				case portal != "none":
					if (portalOpened) css.disabled = !css.disabled;
					break;
				default:
					css.disabled = !css.disabled;
					break;
			}
		});
	});
	
	// Template:Audio toggle
	$(".t-audio").each(function() {
		var toggle = $(this).attr("data-toggle");
		if (toggle != "none") {
			$(".t-audio-toggle-" + toggle).click(function () {
				var audio = $(`.t-audio-toggle-${toggle} audio`)[0];
				audio.paused ? audio.play() : audio.pause();
			});
		}
	});
});