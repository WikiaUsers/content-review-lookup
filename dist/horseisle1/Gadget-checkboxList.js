// <nowiki>
$(function () {
	if ($("ul.checklist, div.checklist > ul, body:not(.ns-120) ul:has(span[data-achievement-id])").length ||
        (mw.config.get('wgAction') === 'edit' && mw.config.get('wgPageContentModel') === 'wikitext')) {
		mw.loader.load( 'ext.gadget.checkboxList-core' );
	}
})
// </nowiki>