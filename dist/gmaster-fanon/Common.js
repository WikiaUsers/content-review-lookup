/* Any JavaScript here will be loaded for all users on every page load. */
if ( ['sysop', 'bureaucrat'].some(group => mw.config.get('wgUserGroups').includes(group)) ) {
    importArticles({
        type: 'script',
        articles: [
            'dev:MassCategorization/code.js'
        ]
    });
}