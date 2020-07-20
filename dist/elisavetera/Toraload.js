if (mw.config.get('wgPageName') == "Special:Torus") {
    importScriptPage('MediaWiki:Torus.js', 'monchbox');
    $('.global-navigation').remove();
}