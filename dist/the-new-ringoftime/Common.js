/* Any JavaScript here will be loaded for all users on every page load. */

window.highlightUsersConfig = {
    colors: {
        'sysop': mw.config.get('wgSassParams')["color-links"],
        'staff': '#da0da0',
        'helper': '#bf6240',
        'vstf': '#f77f77',
        'bot': '#a400a4'
        },
    styles: {
        'sysop': 'font-weight: bold;',
        'staff': 'font-weight: bold;',
        'helper': 'font-weight: bold;',
        'vstf': 'font-weight: bold;',
        'bot': 'font-weight: bold;'
    }
};

importArticles({
    type: 'script',
    articles: [
    'u:dev:MediaWiki:HighlightUsers/code.js'
    ]
});