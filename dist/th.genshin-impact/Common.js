/************************************************************************/
/* Any JavaScript here will be loaded for all users on every page load. */
/************************************************************************/

// Modifying redirect button from WikiEditor's source mode
$( '#wpTextbox1' ).on( 'wikiEditor-toolbar-buildSection-advanced', ( event, section ) => {
	// The exact paths are available in `jquery.wikiEditor.toolbar.config.js` file of the extension
	section.groups.insert.tools.redirect.action.options.pre = '#REDIRECT [[';
	section.groups.insert.tools.redirect.action.options.post = ']]\n\n[[Category:หน้าเปลี่ยนทาง]]';
} );

// Custom script settings
window.dev = window.dev || {};
(window.dev.BetterUpload = {}).redirectFormat = {
	'default': '==การอนุญาตใช้สิทธิ==\n{{Fairuse}}',
	redirectFormat: '#redirect [[File:%TARGET%]]\n[[Category:หน้าเปลี่ยนทาง]]'
};

// Fix the search field not updating when ctrl+f with text selected (should be removed when/if fandom fixes it in native)
if (['edit', 'submit'].includes(mw.config.get('wgAction'))) {
	mw.hook('ext.CodeMirror.ready').add((cmDOM, cm)=>{
		cmDOM.find('.cm-content').get(0).addEventListener('keydown', (e)=>{
			if (e.key.toLowerCase()==='f' && e.ctrlKey) {
				const	selected = cm.view.state.sliceDoc(
							cm.view.state.selection.main.from,
							cm.view.state.selection.main.to
						),
						search = cmDOM.find('.cdx-text-input__input[name="search"]');
				if (search.length>0 && selected.length>0) {
					search.val(selected);
				}
			}
		}, { capture: true });
	});
}

// Auto-positioning of floating tooltips, mainly for [[T:tt]]
mw.hook('wikipage.content').add((contents)=>{
	if (contents instanceof Element || contents instanceof NodeList) {contents = $(contents);}
	if (!contents || !(contents instanceof jQuery) || contents.length===0) {return;}
	contents
	.find('.custom-tt-wrapper.mw-collapsible')
	.each((_, wrapper) => {
		const
		$wrapper = $(wrapper),
		effectToggle = wrapper.querySelector('.mw-collapsible-toggle'),
		effectTooltip = wrapper.querySelector('.mw-collapsible-content'),
		positionTooltip = () => {
			if (effectToggle.classList.contains('mw-collapsible-toggle-collapsed')) {return;}
			$wrapper.css({ position: 'unset' }); // make tooltip offset to page not toggle
			effectTooltip.setAttribute('style', ''); // remove any prev values for proper positioning and resizing
			let parentRect = effectToggle.offsetParent.getBoundingClientRect();
			let toggleRect = effectToggle.getBoundingClientRect();
			if ((toggleRect.left - parentRect.left) < (parentRect.width / 2)) {
				effectTooltip.setAttribute('style', `
					top: ${Math.floor(toggleRect.top - parentRect.top)}px;
					left: ${Math.floor(toggleRect.left - parentRect.left + toggleRect.width / 2)}px;
					max-height: calc(98vh - ${Math.max(0, Math.floor(toggleRect.top))}px);
					max-width: calc(98vw - ${Math.max(0, Math.floor(toggleRect.left))}px);
				`);
				effectTooltip.classList.add('custom-tt-toright');
				if (effectTooltip.classList.contains('custom-tt-toleft')) {effectTooltip.classList.remove('custom-tt-toleft');}
			} else {
				effectTooltip.setAttribute('style', `
					top: ${Math.floor(toggleRect.top - parentRect.top)}px;
					right: ${Math.floor(parentRect.right - toggleRect.right + toggleRect.width / 2)}px;
					max-height: calc(98vh - ${Math.max(0 , Math.floor(toggleRect.top))}px);
					max-width: calc(98vw - ${Math.max(0 , Math.floor(toggleRect.right))}px);
				`);
				effectTooltip.classList.add('custom-tt-toleft');
				if (effectTooltip.classList.contains('custom-tt-toright')) {effectTooltip.classList.remove('custom-tt-toright');}
			}
		};
		
		// normal tooltip click
		effectToggle.addEventListener('click', positionTooltip);
		window.addEventListener('resize', positionTooltip);
		window.addEventListener('scroll', positionTooltip);
		
		// [[T:Extra Effect]]'s hover effect
		if (wrapper.classList.contains('giw-extra-effect-wrapper')) {
			wrapper.addEventListener('mouseover', () => {
				if (effectToggle.classList.contains('mw-collapsible-toggle-collapsed') && (effectToggle.matches(':hover')||effectTooltip.matches(':hover'))) {
					effectToggle.click();
					positionTooltip();
				}
			});
			wrapper.addEventListener('mouseleave', () => {
				setTimeout(()=>{
					if (effectToggle.classList.contains('mw-collapsible-toggle-expanded') && !effectToggle.matches(':hover') && !effectTooltip.matches(':hover')) {
						effectToggle.click();
					}
				}, 250);
			});
		}
	});
});