importArticles({
    type: "script",
    articles: [ 
       'u:kocka:MediaWiki:Emoticons.js'
  ]
});

window.kockaEmoticons = {
    vocab: {
        emoticons: "�motic�nes",
        close: "Fermer"
    },
    help: "S�lectionnez un �motic�ne en cliquant dessus."
};


//adds link to Emoticons and Chat rules
var link = '<a class="chatlink" href="http://communaute.wikia.com/wiki/project:R�gles_du_tchat" target="_blank">R�gles du tchat</a>'
$('.public.wordmark').first().append(link);