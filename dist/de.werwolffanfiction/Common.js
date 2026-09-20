/* 1. Benutzername in {{USERNAME}} einfügen */
$(function() {
    var userName = mw.config.get('wgUserName');
    if (userName) {
        $('.insertusername').text(userName);
    }
});

/* 2. Nach-Oben-Scroll-Button in der WikiaBar */
(function() {
    var toolbarWrapper = document.querySelector('#WikiaBar .tools') 
                      || document.querySelector('#WikiaBar .wikia-bar-anon');
    if (!toolbarWrapper || document.querySelector('#custom-back-to-top')) return;

    var backToTopBtn = document.createElement('li');
    backToTopBtn.id = 'custom-back-to-top';
    backToTopBtn.classList.add('custom', 'wikiabar-button');
    
    backToTopBtn.innerHTML = '<a href="#" class="wds-button wds-is-secondary" style="font-weight: bold;">NACH OBEN ▲</a>';

    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    toolbarWrapper.appendChild(backToTopBtn);
})();

/* 3. Skript für einklappbare Tabellen & Navboxen */
mw.loader.using(['mediawiki.util', 'jquery.client'], function () {
    importScriptPage('MediaWiki:CollapsibleTables.js', 'dev');
});

/* 4. Tastenkombinationen-Button und Modal aus der WikiaBar entfernen */
mw.hook('wikia.bar.render').add(function () {
    $('#WikiaBar .wikia-bar-shortcuts, #WikiaBar [data-id="shortcuts"]').remove();
});