importArticles({
    type: "script",
    articles: [ 
       'u:kocka:MediaWiki:Emoticons.js'
  ]
});
 
window.kockaEmoticons = {
    vocab: {
        emoticons: "Smileys",
        close: "Fermer"
    },
    help: "Sélectionnez un émoticône en cliquant dessus."
};
 
 
//adds link to Emoticons and Chat rules
var link = '<a class="chatlink" href="http://fr.wiki-mes-clans-lgdc.wikia.com/wiki/Wiki_Wiki_Mes_clans_lgdc:R%C3%A8gles_du_Tchat" target="_blank">Règles du tchat</a>'
$('.public.wordmark').first().append(link);