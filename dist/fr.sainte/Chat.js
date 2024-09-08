importArticles({
    type: "script",
    articles: [ 
       'u:kocka:MediaWiki:Emoticons.js'
  ]
});

window.kockaEmoticons = {
    vocab: {
        emoticons: "Émoticônes",
        close: "Fermer"
    },
    help: "Sélectionnez un émoticône en cliquant dessus."
};


//adds link to Emoticons and Chat rules
var link = '<a class="chatlink" href="http://communaute.wikia.com/wiki/project:Règles_du_tchat" target="_blank">Règles du tchat</a>'
$('.public.wordmark').first().append(link);