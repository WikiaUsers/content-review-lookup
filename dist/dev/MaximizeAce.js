/* MaximizeAce by Sophiedp */
(function() {
    if (window.MaximizeAceLoaded || !mw.config.get('wgIsProbablyEditable')) {
        return;
    }
    window.MaximizeAceLoaded = true;

    function init () {
        if (
        	(
        		mw.config.get('wgAction') === 'edit' ||
        		mw.config.get('wgAction') === 'submit'
        	) 
        	&& mw.config.get('wgPageContentModel') !== 'wikitext'
        ) {
            mw.util.addCSS('.WikiaSiteWrapper { width: 100% !important; }');
        } else {
            mw.hook('ve.activationComplete').add(function () {
                if (mw.config.get('wgPageContentModel') !== 'wikitext') {
                    $('body').addClass('ve-codeeditor');
                    mw.util.addCSS('\
                        .ve-active .ve-codeeditor .WikiaSiteWrapper,\
                        .ve-active .ve-codeeditor .ve-ui-summaryPanel {\
                            width: 100% !important;\
                        }\
                        .ve-active .ve-codeeditor .oo-ui-toolbar {\
                            display: none;\
                        }\
                    ');
                }
            });
        }
    }

    mw.loader.using('mediawiki.util').then(init);
})();