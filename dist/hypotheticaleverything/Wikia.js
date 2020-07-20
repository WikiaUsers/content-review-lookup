window.wikiaBarTools = 
    [
        {
            link: '/wiki/Special:Chat',
            title: 'Chat'
        },
        {
            link: 'javascript:test();',
            title: 'Test'
        }
    ];

if (window.wikiaBarTools){
    var tools = window.wikiaBarTools;
    for (var t = 0; t < tools.length; t++){
        var link = tools[t].link,
            title = tools[t].title;
        var toolHTML = '<li class="overflow"><a href="' + link + '" title="' + title + '">' + title + '</a></li>';
        $('.WikiaBarWrapper').find('.tools').append(toolHTML);
    }
}