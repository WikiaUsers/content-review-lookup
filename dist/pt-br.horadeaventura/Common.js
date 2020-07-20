importArticles({
    type: 'script',
    articles: [
        /** HDA WIKI **/
        'MediaWiki:Menu.js',
        'MediaWiki:Icon-lte-ie7.js',
        'MediaWiki:PortalSlider.js',
        'MediaWiki:Common.js/Tab.js',

        /** DEV **/
        'u:dev:MediaWiki:UserTags/code.js',
        'u:dev:MediaWiki:TopEditors/code.js',
        'u:dev:MediaWiki:YoutubePlayer/code.js',
    ]
});

/** PARCEIROS **/
$(function() {
    var newSection = '<section id="activities" class="module"></section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Sidebar}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});