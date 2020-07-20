importArticles({
    type: "script",
    articles: [ 
       'MediaWiki:Common.js/Requests.js'
  ]
});

$('.centralhelpbox').click(function(){
    window.location = $(this).find('a').get(0).href
});

//bandeau langues sur le forum
$(function(){ if ($('#forum-display').length ) { $('#forum-display').insertBefore('#WikiaFooter'); } });

// Custom edit buttons
if (mw.toolbar) {
    mw.toolbar.addButton(
        'https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png',
        'Redirection',
        '#REDIRECTION [[',
        ']]',
        'Insérer texte',
        'mw-editbutton-redirect'
    );
    
    mw.toolbar.addButton(
        'https://vignette.wikia.nocookie.net/naruto/images/9/96/Button_aquote.png/revision/latest?cb=20141212182610&path-prefix=fr',
        'Ajouter des guillemets',
        '«&nbsp;',
        '&nbsp;»',
        '',
        'mw-editbutton-guillemets'
    );
}