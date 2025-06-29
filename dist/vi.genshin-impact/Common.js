/************************************************************************/
/* Any JavaScript here will be loaded for all users on every page load. */
/************************************************************************/

// Modifying redirect button from WikiEditor's source mode
mw.hook('ext.CodeMirror.ready').add(() => {
	$( '#wpTextbox1' ).on('wikiEditor-toolbar-buildSection-advanced', ( event, section ) => {
		// The exact paths are available in `jquery.wikiEditor.toolbar.config.js` file of the extension
		section.groups.insert.tools.redirect.action.options.pre = '#REDIRECT [[';
		section.groups.insert.tools.redirect.action.options.post = ']]\n\n[[Thể loại:Trang Đổi Hướng]]';
	});
});

// Custom script settings
window.dev = window.dev || {};
window.dev.BetterUpload = {
	'default': '==Giấy Phép==\n{{Fairuse}}',
	redirectFormat: '#redirect [[Tập tin:%TARGET%]]\n[[Thể loại:Trang Đổi Hướng]]'
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
			
			// [[T:tt]]'s toggle effect
			$wrapper.append(popup.$element);
			$toggle.on('click', ()=> { popup.toggle() });
			
			// [[T:Extra Effect]]'s hover effect
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