batchDeleteDelay = 1000;
massCategorizationDelay = 1000;
massRedirectDelay = 1000;
massRenameDelay = 1000;
massRenameSummary = 'automatic';
nullEditDelay = 1000;
importArticles({
    type: 'script',
    articles: [
        "u:dev:AjaxBatchDelete/code.2.js",
        "u:dev:MassCategorization/code.js",
        "u:dev:MassRedirect/code.1.js",
        "u:dev:MassRename/code.js",
        "u:dev:MassNullEdit/code.js",
        "u:dev:AutoEditPages/code.js",
        "u:dev:NullEditButton/code.js",
        "u:dev:PowerPageMaker/code.js",
        "u:dev:CategoryRenameAuto-update/code.js",
        "u:dev:ListFiles/code.js",
        "u:dev:FixWantedFiles/code.js",
        "u:dev:DupImageList/code.js",
        "u:dev:RevealAnonIP/code.js",
        "u:dev:DynamicImages/code.js",
        "u:dev:BackToTopButton/code.js",
        "w:c:re-monster:MediaWiki:Common.js/InsertUsername.js",
        "w:c:re-monster:MediaWiki:Common.js/Usernames.js",
    ]
});

window.tooltips_list = [
    {
        classname: 'unit-tooltip',
        parse: '{'+'{Unit-Tooltip|<#param#>}}',
    }, {
        classname: 'skill-tooltip',
        parse: '{'+'{Skill-Tooltip|<#param#>}}',
    }, {
        classname: 'equipment-tooltip',
        parse: '{'+'{Equipment-Tooltip|<#param#>}}',
    }, {
        classname: 'common-tooltip',
        parse: '{'+'{Common-Tooltip|<#param#>}}',
    }
];
window.tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true
};

/* set last tab as active tab at portable-infobox */
mw.hook('wikipage.content').add(function(elem) {
    var $tabbernav = $(elem).find('.portable-infobox .tabbernav li');
    if ($tabbernav.length) {
        $tabbernav.first().removeClass('tabberactive');
        $tabbernav.last().addClass('tabberactive');
    }
 
    var $tabbertab = $(elem).find('.portable-infobox .tabbertab');
    if ($tabbertab.length) {
        $tabbertab.first().css('display', 'none');
        $tabbertab.last().css('display', 'block');
    }
});