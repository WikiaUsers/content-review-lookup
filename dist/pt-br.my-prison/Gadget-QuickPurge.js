// Para evitar a confirmação de limpeza de cache (purge)
// Exportado de My Prison Wiki (EN)

/* Baseado no QuickPurge da Fandom Developers Wiki */

(function() {
    'use strict';

    if (mw.config.get('wgAction') === "purge") {
        var api = new mw.Api();

        document.body.style.opacity = '0.5'; 
        
        api.post({
            action: 'purge',
            forcelinkupdate: true,
            titles: mw.config.get('wgPageName')
        }).then(function() {
            location.href = mw.util.getUrl(mw.config.get('wgPageName'));
        }).catch(function() {
            document.body.style.opacity = '1';
        });
        
        return; 
    }

    if (window.quickPurgeLoaded) return;
    window.quickPurgeLoaded = true;

    var api = new mw.Api();

    function purgePage(title) {
        // Mensagem traduzida para PT-BR
        mw.notify('Limpando o cache...', { tag: 'quickPurge', autoHide: false });
        api.post({
            action: 'purge',
            forcelinkupdate: true,
            titles: title
        }).then(function() {
            location.href = mw.util.getUrl(title);
        });
    }

    $(document).on("click", 'a[href*="action=purge"], a[href*="Special:Purge"]', function(e) {
        if (e.ctrlKey || e.metaKey || e.shiftKey) return;

        var url = new URL(e.currentTarget.href);
        var page = url.searchParams.get('title') || url.searchParams.get('page');

        if (!page && url.pathname.includes('Special:Purge/')) {
            page = decodeURIComponent(url.pathname.split('Special:Purge/')[1]);
        }
        
        page = page || mw.config.get('wgPageName');

        if (page) {
            e.preventDefault();
            purgePage(page);
        }
    });
})();