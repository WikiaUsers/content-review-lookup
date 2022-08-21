importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:PageCreator/code2.js',
    ]
});

window.pageCreatorConfig = {
    namespaces: [0, 114],
    useUsernameAndLinks: false,
    useAvatar: false,
    useTimestamp: false,
    useUTC: false,
    useTimeago: true
};

if($('#page-creator').length) {
   $('<div class="page-creator-upon-moving>'+$('#page-creator').html()+'</div>').appendTo('#creator-holder');
   $('#page-creator').remove();
};

mw.hook('PageCreator.render').add(function($pageCreator) {
    $('<div>', {
        'class': 'page-creator-upon-moving'
    }).append($pageCreator).appendTo('#creator-holder');
});