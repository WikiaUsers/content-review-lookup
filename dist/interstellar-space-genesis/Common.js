/* Any JavaScript here will be loaded for all users on every page load. */


/* Configuration for dev:Tooltips.js */
var tooltips_config = {
    waitForImages: true,
    noCSS: true,
};

var tooltips_list = [
    {
        classname: 'isg-small-tooltip',
        parse: '{'+'{<#template#>|show=tip}}',
    },
    {
        classname: 'isg-medium-tooltip',
        parse: '{'+'{<#template#>|show=tip}}',
    },
    {
        classname: 'isg-large-tooltip',
        parse: '{'+'{<#template#>|show=tip}}',
    },
    {
        classname: 'isg-dynamic-tooltip',
        parse: '{'+'{<#template#>|show=tip|size=<#size#>}}',
    },
    {
        classname: 'isg-wiki-tooltip',
        parse: '<#wiki#>',        
    }
];

window.tooltips_config = {
    waitForImages: true,
    noCSS: true,
};


window.tooltips_list = [
    {
        classname: 'isg-small-tooltip',
        parse: '{'+'{<#template#>|show=tip}}',
    },
    {
        classname: 'isg-medium-tooltip',
        parse: '{'+'{<#template#>|show=tip}}',
    },
    {
        classname: 'isg-large-tooltip',
        parse: '{'+'{<#template#>|show=tip}}',
    },
    {
        classname: 'isg-dynamic-tooltip',
        parse: '{'+'{<#template#>|show=tip|size=<#size#>}}',
    },
    {
        classname: 'isg-wiki-tooltip',
        parse: '<#wiki#>',        
    }
];