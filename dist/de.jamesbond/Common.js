/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

window.lastEdited = {
    avatar: false,
    size: false,
    diff: false,
    comment: false,
    time: 'timestamp',
    lang: 'de'
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:LastEdited/code.js'
    ]
});