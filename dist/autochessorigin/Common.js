/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Tooltips.js',
    ]
});

var tooltips_config = {
    offsetX: 10,
    offsetY: 10,
    waitForImages: true,
    noCSS: true,
}

var tooltips_list = [
    {   classname: 'sinergia',
        parse: '{'+'{<#sinergia#>|tt=<#tt#>|show=no}}'},
    {   classname: 'equipamento',
        parse: '{'+'{<#equipamento#>|tt=<#tt#>|show=no}}'},
    {   classname: 'peca',
        parse: '{'+'{<#peca#>|tt=<#tt#>|show=no}}'},
    
];