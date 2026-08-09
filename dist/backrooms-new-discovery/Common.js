// [[Category:Internal]]

// Template dependencies
mw.hook("wikipage.content").add(function() {
	
	// [[Module:CSS]]; [[Template:CSS]]
	$("span.import-css").each(function() {
		const css = mw.util.addCSS($(this).attr("data-css"));
		$(css.ownerNode).addClass("import-css")
			.attr("data-css-hash", $(this).attr("data-css-hash"))
			.attr("data-from", $(this).attr("data-from"))
			.attr("data-wait", $(this).attr("data-wait"))
			.attr("data-portal", $(this).attr("data-portal"));
		
		const wait = $(this).attr("data-wait");
		const portal = $(this).attr("data-portal");
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
	
	// [[Template:Audio]] toggle
	$(".t-audio").each(function() {
		const toggle = $(this).attr("data-toggle");
		const toggleFunction = $(this).attr("data-toggle-function");
		const fadeSteps = Math.round(250 * toggleFunction.replace(/fade-(in|out)-/, ""));
		if (toggle != "none") {
			$(".t-audio-toggle-" + toggle).click(function () {
				const audio = $(`.t-audio-toggle-${toggle} audio`)[0];
				switch (true) {
					case toggleFunction.includes("time"):
						audio.currentTime = toggleFunction.replace("time-", "");
						audio.play();
						break;
					case toggleFunction.includes("fade-in"):
						audio.play();
						(function loop(i) {
							setTimeout(() => {
								console.log((-i + fadeSteps) / fadeSteps);
								if (--i > -1) loop(i);
						    }, 4);
						})(fadeSteps - 1);
						break;
					case toggleFunction.includes("fade-out"):
						audio.play();
						(function loop(i) {
							setTimeout(() => {
								console.log((i) / fadeSteps);
								if (--i > -1) loop(i);
						    }, 4);
						})(fadeSteps - 1);
						break;
					default:
						audio.paused ? audio.play() : audio.pause();
						break;
				}
			});
		}
	});
}};