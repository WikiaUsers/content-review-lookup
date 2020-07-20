importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SmoothGlobalNav/code.js',
    ]
});

// Sidebar
$(function(){
    $('<span class=\"monobook-sidebar-module\"></span>')
    .appendTo('.wds-tabs')
    .load('/index.php?title=MediaWiki:Sidebar&action=render');
});

// Logotypy
$(function(){
    $('<div class=\"logotypy\"></div>')
    .appendTo('#WikiaFooter')
    .load('/index.php?title=Template:Logotypy&action=render');
});

// Narzędzia
$('.narzedzia')
    .prepend($('<li class="zmiany">')
    .append($('<a>', { 
        href: '/wiki/Specjalna:Zmiany_w_linkujących/'+wgPageName, 
        text: 'Zmiany w linkujących' 
    }))
);

$('.narzedzia')
    .prepend($('<li class="linkujace">')
    .append($('<a>', { 
        href: '/wiki/Specjalna:Linkujące/'+wgPageName, 
        text: 'Linkujące' 
    }))
);