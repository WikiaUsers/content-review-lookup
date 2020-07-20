/**
 * Name:        CancelButton
 * Version:     v3.1
 * Author(s):   TK-999
 *              Rappy 4187
 *              KockaAdmiralac <1405223@gmail.com>
 *              Rail01 <rail01@pm.me>
 * Description: Adds a Cancel button for the source/Classic editors.
 */
require(['wikia.window', 'mw'], function(window, mw) {
    // Double loading prevention
    if (
        !mw.config.get('wgIsEditPage') ||
        window.CancelButtonLoaded
    ) {
        return;
    }
    window.CancelButtonLoaded = true;

    mw.util.addCSS('#cancbutton { margin-top: 2px }'); 
    mw.hook('dev.fetch').add(function(fetch) {
        fetch('cancel').then(function(msg) {
            var button = document.createElement('a');
            button.classList.add('button');
            button.id = 'cancbutton';
            button.href = mw.util.getUrl();
            button.textContent = window.CancelButtonText || msg;

            document.querySelector('#EditPageHeader h2')
                    .appendChild(button);
        });
    });

    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:Fetch.js'
    });
});