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
        'u:dev:FastDelete/code.js',
        'u:dev:LastEdited/code.js',
        'u:dev:SkinSwitchButton/code.js',
        'u:dev:InactiveUsers/code.js',
        'u:dev:ViewRemoved/code.js',
        'w:c:dev:TopEditors/code.js',
        'u:dev:Mediawiki:Status/code.js'
    ]
});