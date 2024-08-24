// Navegação (Créditos a Five Nights at Freddy's Wiki)
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});

// Monobook
$(function() {
 $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="button secondary" href="/wiki/'+ encodeURIComponent(wgPageName) +'?useskin=monobook">Monobook</a>');
 });