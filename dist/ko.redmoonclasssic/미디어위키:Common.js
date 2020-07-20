/**
 * Any JavaScript here will be loaded for all users on every page load.
 */

/**
 * Tooltips
 * @docs: w:dev:Tooltips
 */
 
// module options
var tooltips_config = {
    offsetX: 0,
    offsetY: 0
};

// make tooltips stay visible at the bottom of pages
var tooltips_debug = false;
 
// tooltip types
var tooltips_list = [
    {
        classname: 'tooltip-skill',
        parse: '{'+'{:<#skill#>}}',
    },
    {
        classname: 'tooltip-item',
        parse: '{'+'{:<#item#>}}',
    }
];