/* Define variables */
var autoCollapse = 2,
    collapseCaption = 'hide',
    expandCaption = 'show',
    maxHeight = 300,
    scripts = [],
    users = ['ownslo', 'michaelcong'];
    
/* importArticles - basic scripts for all pages */
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Common.js/mastheadBoxes.js', /* Masthead ranks ~ EditedByOwnslo */
        'u:dev:DiscordIntegrator/code.js', /* DiscordWidget */
        'u:dev:TopEditors/code.js', /* Top Editors */
    ]
});

/* configuration section for tooltips */
var tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true,
    noCSS: true,
};
 
var tooltips_list = [
    {
        classname: 'monster-tooltip',
        parse: '{'+'{Tooltip/Monster|<#monster#>}}'
    },
];
 
/* end of configuration section for tooltips */