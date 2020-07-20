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
        mw.hook('ve.activationComplete').add(function () {
            $('.ve-active.ve-not-available .WikiaSiteWrapper').css('width', '100%');
            mw.util.addCSS('.ve-active.ve-not-available .oo-ui-toolbar.ve-ui-toolbar-floating { display: none; }');
        });
    }

    if (editable) {
        if (ucp) {
            ucpInit();
        } else {
            legacyInit();
        }
    }
})();