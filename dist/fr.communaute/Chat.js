importArticles({
    type: "script",
    articles: [ 
       'u:dev:MediaWiki:EmoticonsWindow/code.js'
  ]
});

//adds link to Emoticons and Chat rules
var link = '<a class="chatlink" href="http://communaute.wikia.com/wiki/project:Règles_du_tchat" target="_blank">Règles du tchat</a>'
$('.public.wordmark').first().append(link);