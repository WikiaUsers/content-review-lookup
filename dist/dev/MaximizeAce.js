/* MaximizeAce by Sophiedp */
(function() {
    if (
    	window.MaximizeAceLoaded ||
    	!['edit', 'submit'].includes(mw.config.get('wgAction')) ||
    	mw.config.get('wgPageContentModel') === 'wikitext'
    ) {
        return;
    }
    window.MaximizeAceLoaded = true;
    
    $('.resizable-container').css({
    	'max-width': 'unset',
    	'width': '100%'
    });
    $('.page-side-tools__wrapper').hide();
})();