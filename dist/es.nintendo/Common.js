/*** Añadir botón para editar el mensaje de bienvenida del muro ***/
 
importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});

/***Etiquetas de usuario personalizadas ***/

if (wgCanonicalNamespace == "User" || wgCanonicalNamespace == "Muro" || wgCanonicalNamespace == "Usuario_Blog" || wgPageName.indexOf("Especial:Contribuciones") != -1){
importScript('MediaWiki:Common.js/userRightsIcons.js');
}