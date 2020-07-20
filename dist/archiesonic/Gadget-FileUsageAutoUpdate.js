if (mw.config.get('wgCanonicalSpecialPageName') === 'Movepage' && (/File:/).test(mw.config.get('wgTitle'))) {
    window.importArticles({
        type: 'script',
        articles: 'w:c:dev:FileUsageAuto-update/code.js'
    });
}