/************************************************************************/
/* Any JavaScript here will be loaded for all users on every page load. */
/************************************************************************/

// Modifying redirect button from WikiEditor's source mode
mw.hook('ext.CodeMirror.ready').add(() => {
	$( '#wpTextbox1' ).on('wikiEditor-toolbar-buildSection-advanced', ( event, section ) => {
		// The exact paths are available in `jquery.wikiEditor.toolbar.config.js` file of the extension
		section.groups.insert.tools.redirect.action.options.pre = '#REDIRECT [[';
		section.groups.insert.tools.redirect.action.options.post = ']]\n\n[[Category:Redirect Pages]]';
	});
});

// Custom script settings
window.dev = window.dev || {};
window.dev.BetterUpload = {
	'default': '==Licensing==\n{{Fairuse}}',
	redirectFormat: '#redirect [[File:%TARGET%]]\n[[Category:Redirect Pages]]'
};

// Fix the search field not updating when ctrl+f with text selected (should be removed when/if fandom fixes it in native)
if (['edit', 'submit'].includes(mw.config.get('wgAction'))) {
	mw.hook('ext.CodeMirror.ready').add((cmDOM, cm)=>{
		cmDOM.find('.cm-content').get(0).addEventListener('keydown', (e)=>{
			if (e.key.toLowerCase()==='f' && e.ctrlKey) {
				const
				selected = cm.view.state.sliceDoc(
					cm.view.state.selection.main.from,
					cm.view.state.selection.main.to
				),
				search = cmDOM.find('.cdx-text-input__input[name="search"]');
				
				if (search.length>0 && selected.length>0) { search.val(selected); }
			}
		}, { capture: true });
	});
}

// Auto-positioning of floating tooltips, mainly for [[T:tt]]
mw.loader.using('oojs-ui-widgets').then(() => { // make sure the PopupWidget library is loaded
	mw.hook('wikipage.content').add((contents)=>{ // hydrate any content inserted
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
			
			// Remove default collapsible
			const newWrap = $('<span>', {
				'class': classes,
				attr: { 'data-tt-text': $wrapper.attr('data-tt-text') },
				html: [
					$toggle,
					popup.$element
				]
			});
			$wrapper.replaceWith(newWrap);
			
			// Functionality
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