/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página */
// Auto-positioning de tooltips flotantes, para [[T:tt]]
mw.loader.using('oojs-ui-widgets').then(() => {
	mw.hook('wikipage.content').add((contents)=>{
		if (contents instanceof Element || contents instanceof NodeList) {contents = $(contents);}
		if (!contents || !(contents instanceof jQuery) || contents.length===0) {return;}
		let toggle = $('body').hasClass('gadget-toggle-tooltip');
		contents
		.find('.custom-tt-wrapper.mw-collapsible')
		.each((_, wrapper) => {
			const $wrapper = $(wrapper);
			const isEE = $wrapper.hasClass('giw-extra-effect-wrapper');
			const hover = !toggle || isEE;
			const classes = $wrapper.attr('class').replace(/mw-collapsible|mw-made-collapsible/g, '');
			
			const content = $wrapper.children('.mw-collapsible-content').html();
			$wrapper.children('.mw-collapsible-content').remove();
			
			const toggleCont = $wrapper.children('.toggle-tooltip').html();
			$wrapper.children('.toggle-tooltip').replaceWith(toggleCont);
			const $toggle = $('<span>', {
				'class': 'custom-tt toggle-tooltip'+(isEE ? ' giw-extra-effect' : ''),
				html: $wrapper.html().replace(/mw-collapsible-toggle(-collapsed|-expanded)? ?/g, '')
			});
			const popup = new OO.ui.PopupWidget({
				$content: $('<div>', { html: content }),
				$container: $('.page__main'),
				anchor: !isEE,
			});
			if (isEE) { popup.$element.find('.oo-ui-popupWidget-popup').toggleClass('giw-extra-effect', true); }
			
			const newWrap = $('<span>', {
				'class': classes,
				attr: { 'data-tt-text': $wrapper.attr('data-tt-text') },
				html: [ $toggle, popup.$element ]
			});
			$wrapper.replaceWith(newWrap);
			
			let time = null;
			$toggle.on('click', ()=> {
				newWrap.toggleClass('cutom-tt-forceStay');
				popup.toggle(newWrap.hasClass('cutom-tt-forceStay'));
			});
			$toggle.add(popup.$element).on('mouseover mouseout', (e) => {
				if (newWrap.hasClass('cutom-tt-forceStay')) {clearTimeout(time); return;}
				else if (time) { clearTimeout(time); }
				time = setTimeout(()=>{
					popup.toggle(e.type==='mouseout' ? false : true);
				}, e.type==='mouseout' ? 250 : 0);
			});
		});
	});
});