/* Any JavaScript here will be loaded for all users on every page load. */
highlight = {
    selectAll: true,
    sysop: '#0000FF',
    bot: 'white',
    users: {
        'Nekonomeow': 'pink',
        'ScaleWiz': 'orange',
        'Gregor00': 'cyan',
        'Tallismin': 'white',
        'Firstngin': 'lightgreen'
    }
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:HighlightUsers/code.js'
    ]
});

importScriptPage('Translator/Translator.js', 'dev');