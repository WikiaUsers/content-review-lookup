importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:PageCreator/code2.js',
    ]
});

if($('#page-creator').length) {
   $('<div class="kreator">'+$('#page-creator').html()+'</div>').appendTo('#article-comments-counter-header');
   $('#page-creator').remove();
}