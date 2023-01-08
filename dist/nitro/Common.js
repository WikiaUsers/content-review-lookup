// User Tags
$.get(
    mw.util.wikiScript('load'),
    {
        mode: 'articles',
        articles: 'MediaWiki:Custom-user-tags.json',
        only: 'styles'
    },
    function (d) {
        window.UserTagsJS = JSON.parse(
            d.replace(/\/\*.*\*\//g, '')
        );
    }
);