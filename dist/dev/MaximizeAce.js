/* MaximizeAce by Sophiedp */
(function() {
    if (window.MaximizeAceLoaded) {
        return;
    }
    window.MaximizeAceLoaded = true;
    var ucp = mw.config.get('wgVersion') !== '1.19.24';
    var editable = ucp ? mw.config.get('wgIsProbablyEditable') : mw.config.get('wgAction') === 'edit';
 
    function fixResize () {
        if (document.querySelector('.editpage-sourcewidemode-off')) {
            document.querySelector('.editpage-widemode-trigger').click();
        }
 
        var Ace = ace.edit('editarea');
        Ace.setValue(Ace.getValue().replace(/\n{2}$/, ''), -1);
        Ace.resize();
    }
 
    function loadCSS () {
        var styles = importArticle({
            type: 'style',
            article: 'u:dev:MediaWiki:MaximizeAce.css'
        });

        if (styles[0]) styles[0].onload = fixResize;
        else fixResize();
    }

    function legacyInit () {
        if (document.body.classList.contains('codeeditor')) {
            ace.require(['ace/ace'], loadCSS);
        } else {
            mw.hook('dev.codeeditor.session').add(loadCSS);
        }
    }

    function ucpInit () {
        if ((mw.config.get('wgAction') === 'edit' || mw.config.get('wgAction') === 'submit') && mw.config.get('wgPageContentModel') !== 'wikitext') {
            mw.util.addCSS('.WikiaSiteWrapper { width: 100% !important; }');
        }  else {
            mw.hook('ve.activationComplete').add(function () {
                if (mw.config.get('wgPageContentModel') !== 'wikitext') {
                    $('body').addClass('ve-codeeditor');
                    mw.util.addCSS('\
                        .ve-codeeditor .WikiaSiteWrapper,\
                        .ve-codeeditor .ve-ui-summaryPanel {\
                            width: 100% !important;\
                        }\
                        .ve-codeeditor .oo-ui-toolbar {\
                            display: none;\
                        }\
                    ');
                }
            });
        }
    }

    if (editable) {
        if (ucp) {
            mw.loader.using('mediawiki.util').then(ucpInit);
        } else {
            legacyInit();
        }
    }
})();