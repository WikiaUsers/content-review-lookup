/* Any JavaScript here will be loaded for all users on every page load. */
window.railWAM = {
    logPage:"Project:WAM Log",
    lang: 'en',
    showChange: "true,false",
};

window.AddSectionButtonText = "Add new section";

window.ItemsToAdd = [{
    'Name': 'Sample Page',
    'Page': '',
    'Description': 'You should edit this'
}];

window.AffectsSidebar = true;

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:CodeEditor.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AddButtonsPhoto/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxEdit.js',
        
        importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:View_Source/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Flags/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:PortableCSSPad/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ToggleDebugMode/code.js',
    ]
});
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MassProtect/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxBatchDelete.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxUndo/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxBatchUndelete.js',
    ]
});