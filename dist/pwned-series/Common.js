/* Any JavaScript here will be loaded for all users on every page load. */

window.tooltips_config = {
    noCSS: true,
}

window.tooltips_list = [
{
    classname: 'TrophyToolTip',
    parse: '{'+'{TrophyToolTip|Name=<#name#>}}',   // '+' makes MediaWiki ignore the template on the page with settings
},
{
	classname: 'GemstoneToolTip',
	parse:'{'+'{GemToolTip|Name=<#name#>}}'
},
]

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Nuke/code.js', // Nuke Module
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AdminDashboard_JS-Button/code.js', // JS access on dashboard
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:User Admin Tools.js', // QOL Admin Tools
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MassProtect/code.js', // Mass Protect Pages
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Reconstitution.js', // Reverse Nuke
    ]
});

importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:Modal.js' // Template for modal
});

mw.hook('dev.modal').add(function(modal) {
    // `modal` object is the library's exported object, same as window.dev.modal.
});