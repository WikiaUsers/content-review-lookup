// Etiqueta para usuarios inactivos por mas de 3 meses
InactiveUsers = { text: 'Inactivo' };
importScriptPage('InactiveUsers/code.js', 'dev');

/* Color a miembros de la administración (automático) 
highlight = {
selectAll: true,
chatmoderator: '#FF0000',
sysop: '#FF0000',
bureaucrat: '#FF0000'  
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:HighlightUsers/code.js',
    ]
});

( para por isto a funcionar, apague esta frase, modifique as cores se desejar e ponha este s´´imbolo na 1 frase
*/