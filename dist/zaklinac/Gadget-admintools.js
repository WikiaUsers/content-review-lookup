// Config
window.WHAMDeleteReason = 'Vyčištění';
window.WHAMBlockReason = '[[Help:Vandalism|Vandalství]]';

// Import
importArticles({
    type: 'script',
    articles:   [
        'u:dev:WHAM/code.2.js',
        'u:dev:AjaxPatrol/code.js',
        'u:dev:AjaxBatchDelete/code.js',
        'u:dev:MassRename/code.js',
        'u:dev:AjaxUndo/code.js',
        'u:dev:RevealAnonIP/usercode.js'
    ]
});