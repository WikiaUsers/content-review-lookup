// Has the Navigation templates set to be hidden by default
var ShowHideConfig = { autoCollapse: 0 };
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:ShowHide/code.js',
        'u:dev:CollapsibleInfobox/code.js', //for examples on [[CollapsibleInfobox]]
        'MediaWiki:Maintenance.js'
    ]
});