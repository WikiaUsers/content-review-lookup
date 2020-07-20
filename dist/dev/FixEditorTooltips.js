(function () {
    var ucp = mw.config.get('wgVersion') !== '1.19.24';
    
    function legacyEditor () {
        window.dev.fetch('WikiaPhotoGallery-add-gallery|Videos-add-video').then(function (d) {
            $('#mw-editbutton-wpg').attr('title', d()[0]);
            $('#mw-editbutton-vet').attr('title', d()[1]);
        });
    }
    
    function ucpEditor () {
        window.dev.fetch('Cite-ve-toolbar-group-label').then(function (msg) {
            mw.hook('ve.activationComplete').add(function () {
                $('.ve-test-toolbar-cite > span[role="button"]').attr('title', 'Cite');
            }); 
        });
    }
    
    function init () {
        var editable = ucp ? mw.config.get('wgIsProbablyEditable') : mw.config.get('wgAction') === 'edit';
    
        if (editable) {
            if (ucp) {
                ucpEditor();
            } else {
                legacyEditor();
            }
        }
    }
    
    mw.hook('dev.fetch').add(init);
    if (ucp) {
        mw.loader.load('https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=MediaWiki:Fetch.js');
    } else {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:Fetch.js'
        });
    }
})();