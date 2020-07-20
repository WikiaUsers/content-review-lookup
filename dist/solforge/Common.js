// Tooltips
// Source: http://dev.wikia.com/wiki/Tooltips
    // Main Config
var tooltips_config = {
    offsetX: 5,
    offsetY: 10,
    waitForImages: true,
    events: ['CustomEvent'],
};
 
    // Creating custom tooltip types
var tooltips_list = [
    {
        classname: 'basic-tooltip',
        delay: 500,
        onHide: function(handle) { $(this).html($(handle).html()) },
    }, {
        classname: 'card-tooltip',
        parse: '{'+'{DisplayCardTT|<#name#>}}',
    }, {
        classname: 'deck-tooltip',
        parse: '{'+'{DisplayDeckTT|<#name#>}}',
    },
];