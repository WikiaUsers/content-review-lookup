window.fdButtons = [];
 
window.fdButtons.push(
    {
        summary: 'Erfüllt nicht die Anforderungen für neue Artikel',
        label: 'Anf.'
    },
     {
        summary: 'Löschantrag',
        label: 'Antrag.'
    },
    {
        summary: 'Regelverstoß',
        label: 'Regel.'
    },
    {
        summary: 'Nicht mehr benötigt',
        label: 'NMB'
    },
    {
        summary: 'Vandalismus',
        label: 'V'
    },
    {
        summary: 'Spam',
        label: 'S'
    }
);

importArticles( {
    type: 'script',
    articles: [
        'u:dev:FastDelete/code.js'
    ]
} );