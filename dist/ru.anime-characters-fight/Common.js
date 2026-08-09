window.AddRailModule = [
    { page: 'Template:RailModule1', prepend: true },
    'Template:RailModule2',
    'Template:NewPagesModule',
];

if (document.querySelector('[id^="dev-wds-icons-"]')) {
    mw.hook('dev.wds').add(function (wds) {
        wds.render(mw.util.$content);
    });
    importArticle({ type: 'script', article: 'u:dev:MediaWiki:WDSIcons/code.js' });
}