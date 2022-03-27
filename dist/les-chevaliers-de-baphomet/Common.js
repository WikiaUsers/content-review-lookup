/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 

 // END import Onlyifediting-functions
 // ============================================================

/* Scripts importés */
importArticles({
    type: 'script',
    articles: [
        'u:dev:ReferencePopups/code.js', /* Références en pop-up */
        'u:dev:MiniComplete/code.js', /* Suggestions avec les double-crochets et double-accolades */
        'u:dev:WallGreetingButton/code.js' /* Bouton Modifier accueil mur */
    ]
});