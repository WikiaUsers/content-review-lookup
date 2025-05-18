/* Custom JavaScript functionality for [[Template:Extra Effect]]. */
mw.loader.using('jquery', ()=>{
	'use strict';
	
	// Double load prevention
	window.dev = window.dev || {};
	if (window.dev.extraEffectLoaded) {return;}
	else {window.dev.extraEffectLoaded = true;}
	
	mw.hook('wikipage.content').add((contents)=>{
		if (contents instanceof Element || contents instanceof NodeList) {contents = $(contents);}
		if (!contents || !(contents instanceof jQuery) || contents.length===0) {return;}
		contents
		.find('.giw-extra-effect-wrapper')
		.each((_, wrapper) => {
			const $wrapper = $(wrapper);
			const effectToggle = wrapper.querySelector('.giw-extra-effect.toggle-tooltip');
			
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
	});
});