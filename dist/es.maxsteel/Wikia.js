/* Importar */

importArticles({
    type: 'script',
    articles: [
        'u:dev:AutoEditDropdown/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:TopEditors/code.js',
        'u:dev:FastDelete/code.js'
    ]
});
/* Color a miembros de la administración (automático) */
highlight = {
selectAll: true,
chatmoderator: '#F8F8FF',
rollback: '#A52A2A',
sysop: '#AFEEEE',
bot: '#3CB371',
bureaucrat: '#32CD32'  
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:HighlightUsers/code.js',
    ]
});
 
/* Iconos sociales */
var SocialMediaButtonsNamespaces = [0, 6, 14, 500, 1201];
var SocialMediaButtons = {
        position: "top",
        colorScheme: "dark",
        buttonSize: "default"
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:SocialIcons/code.js'
    ]
});