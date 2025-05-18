/************************************************************************/
/* Any JavaScript here will be loaded for all users on every page load. */
/************************************************************************/

// Modifying redirect button from WikiEditor's source mode
$( '#wpTextbox1' ).on( 'wikiEditor-toolbar-buildSection-advanced', ( event, section ) => {
	// The exact paths are available in `jquery.wikiEditor.toolbar.config.js` file of the extension
	section.groups.insert.tools.redirect.action.options.pre = '#REDIRECT [[';
	section.groups.insert.tools.redirect.action.options.post = ']]\n\n[[Thể loại:Trang đổi hướng]]';
} );

// Custom script settings
window.dev = window.dev || {};
(window.dev.BetterUpload = {}).redirectFormat = {
	'default': '==Giấy Phép==\n{{Fairuse}}',
	redirectFormat: '#REDIRECT [[Tập tin:%TARGET%]]\n[[Thể loại:Trang đổi hướng]]'
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