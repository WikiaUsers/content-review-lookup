/* Color a miembros de la administración (automático) */
highlight = {
selectAll: true,
chatmoderator: '#01FF5F',
rollback: '#00BFFF',
sysop: '#D4CA13',
bot: '#5F5E5E',
bureaucrat: '#A8278A'  
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