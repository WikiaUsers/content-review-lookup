/* Custom JavaScript functionality for [[Template:Extra Effect]]. */
(function () {
	function init() {
		
		// This hook ensures that we init again on live preview
		mw.hook("wikipage.content").add(function (
			/** @type {HTMLElement[]} */ contents
		) {
			for (const content of contents) {
				content.querySelectorAll(".srw-extra-effect-wrapper").forEach(/** @param {HTMLElement} wrapper */ wrapper => {
					
					const $wrapper = $(wrapper)
					
					/** @type {HTMLSpanElement} */
					const effectToggle = wrapper.querySelector('.srw-extra-effect.toggle-tooltip');
					
					// show on hover, if not already shown
					effectToggle.addEventListener('mouseover', () => {
						if (effectToggle.classList.contains('mw-collapsible-toggle-collapsed')) {
							effectToggle.click();
							
							let tooltipContent = $wrapper.children('.mw-collapsible-content');
							$wrapper.css({ position: 'unset' }); // make tooltip offset to page not toggle
							tooltipContent.css({ top: '', right: '', left: '', 'max-width': '' }); // remove any prev values for proper positioning and resizing
							let parentRect = effectToggle.offsetParent.getBoundingClientRect();
							let toggleRect = effectToggle.getBoundingClientRect();
							let wrapperWidth = Math.floor($wrapper.outerWidth());
							if ((toggleRect.left - parentRect.left) < (parentRect.width / 2)) {
								tooltipContent.css({
									top: toggleRect.top - parentRect.top,
									left: toggleRect.left - parentRect.left + wrapperWidth / 2,
								});
								let contentRect = tooltipContent[0].getBoundingClientRect();
								if (contentRect.right > parentRect.right) {
									tooltipContent.css('max-width', tooltipContent.outerWidth() + contentRect.left);
								}
							} else {
								tooltipContent.css({
									top: toggleRect.top - parentRect.top,
									right: parentRect.right - toggleRect.right + wrapperWidth / 2,
								});
								let contentRect = tooltipContent[0].getBoundingClientRect();
								if (contentRect.left < 0) {
									tooltipContent.css('max-width', tooltipContent.outerWidth() + contentRect.left);
								}
							}
						}
					});
					
					// hide on hover exit, if not already hidden
					effectToggle.addEventListener('mouseleave', () => {
						if (effectToggle.classList.contains('mw-collapsible-toggle-expanded')) {
							effectToggle.click();
						}
					});
				});
			}
		});
	}

	function onLoad() {
		// @ts-ignore
		if ("dev" in window && window.dev.extraEffectLoaded) {
			console.debug("ExtraEffect script already loaded, aborting...");
			return;
		}

		//@ts-ignore
		window.dev = window.dev || {}; //@ts-ignore
		window.dev.extraEffectLoaded = true;

		init();
	}

	// The document cannot change readyState between the if and else
	if (document.readyState == "loading") {
		document.addEventListener("readystatechange", onLoad);
	} else {
		onLoad();
	}
})();