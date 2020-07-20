/* Umieszczony tutaj kod JavaScript dotyczyć będzie tylko administratorów */
window.fdButtons = [];
 
window.fdButtons.push(
    {
        summary: 'Zgłoszone do usunięcia',
        label: 'Usuń'
    }
);
importArticles({
    type: 'script',
    articles: [
        'u:dev:FastDelete/code.js'
    ]
});