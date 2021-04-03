/* Any JavaScript here will be loaded for all users on every page load. */
//Auto change theme by month function
/*
importArticle({
    type: 'style',
    article: 'MediaWiki:' + [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ][new Date().getMonth()] + '.css'
});
*/



/* Custom Tooltips for use with the Tooltips/code.js */
var tooltips_list = [{
       classname: 'card-icon',
       parse: '{'+'{Tooltip/Card|<#card#>}}'
   },{
       classname: 'character-icon',
       parse: '{'+'{Tooltip/Card2|<#card2#>}}'
   },{
       classname: 'panel-icon',
       parse: '{'+'{Tooltip/Panel|<#panel#>}}'
   },{
       classname: 'fieldevents-icon',
       parse: '{'+'{Tooltip/FieldEvents|<#fieldevents#>}}'
   },
];


/*
importArticle({
    type: 'script',
    article: [
        'u:clashofclans:MediaWiki:Common.js/Protection.js'
    ]
});
*/