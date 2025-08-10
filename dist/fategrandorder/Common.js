/************************************************************************/
/* Any JavaScript here will be loaded for all users on every page load. */
/************************************************************************/

// Custom script settings
window.dev = window.dev || {};
window.dev.BetterUpload = {
	'default': '==Licensing==\n{{Fairuse}}',
	redirectFormat: '#redirect [[File:%TARGET%]]\n[[Category:Redirect Pages]]'
};

window.railWAM = {
    logPage:"Project:WAM Log"
};

// Auto-positioning of floating tooltips, mainly for [[Template:Tooltip]]
mw.loader.using('oojs-ui-widgets').then(() => { // make sure the PopupWidget library is loaded
	mw.hook('wikipage.content').add((contents)=>{ // hydrate any content inserted
		if (contents instanceof Element || contents instanceof NodeList) {contents = $(contents);}
		if (!contents || !(contents instanceof jQuery) || contents.length===0) {return;}
		contents
		.find('.custom-tt-wrapper.mw-collapsible')
		.each((_, wrapper) => {
			const
			$wrapper = $(wrapper),
			isEE = $wrapper.hasClass('giw-extra-effect-wrapper'),
			$toggle = $('<span>', {
				'class': 'custom-tt toggle-tooltip'+(isEE ? ' giw-extra-effect' : ''),
				html: $wrapper.find('.mw-collapsible-toggle').html()
			}),
			$content = $wrapper.find('.mw-collapsible-content'),
			popup = new OO.ui.PopupWidget({
				$content: $('<div>', { html: $content.html() }),
				$container: $('.page__main'),
				anchor: !isEE,
			});
			
			// Remove default collapsible
			$wrapper.toggleClass(['mw-collapsible', 'mw-made-collapsible', 'mw-collapsed'], false);
			$wrapper.find('.mw-collapsible-toggle').replaceWith($toggle);
			$content.remove();
			
			// [[Template:Tooltip]]'s toggle effect
			$wrapper.append(popup.$element);
			$toggle.on('click', ()=> { popup.toggle() });
			
			// [[Template:Extra Effect]]'s hover effect
			if (isEE) {
				popup.$element.find('.oo-ui-popupWidget-popup').toggleClass('giw-extra-effect', true);
				let time;
				$toggle.add(popup.$element).on('mouseover mouseout', (e) => {
					if (time) { clearTimeout(time); }
					time = setTimeout(()=>{
						popup.toggle(e.type==='mouseout' ? false : true);
					}, e.type==='mouseout' ? 250 : 0);
				});
			}
		});
	});
});