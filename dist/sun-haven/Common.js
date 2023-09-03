/* Any JavaScript here will be loaded for all users on every page load. */

/* -------- Tooltips & Page Preview Configuration ---------- */
// Initialize configuration for LinkPreview
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });

// The URL of the image to show when No Image is available.
//window.pPreview.defimage = 'https://wikia.nocookie.net/someimage';

// IMPORTANT: This should include any classes defined in tooltips_list below
// This prevents the page preview from displaying when custom tooltips are applied. Be sure to include the '.'
window.pPreview.RegExp.iparents = [
	'.food-link',
	'.npc-link',
	'.location-link',
	'.crop-link'
];

/* Custom Tooltips for use with the Tooltips/code.js */
// Currently in Testing.
// To display a tooltip, the classname must be present on the element
// i.e. any <div> with class="food-link" will display the Tooltip/Food template on hover
var tooltips_list = [
    {   classname: 'food-link',
        parse: '{'+'{Tooltip/Food/data|<#name#>}}'
    },
    {   classname: 'npc-link',
        parse: '{'+'{Tooltip/NPC/data|<#name#>}}'
    },
    {   classname: 'location-link',
        parse: '{'+'{Tooltip/location/data|<#name#>}}'
    },
    {   classname: 'crop-link',
        parse: '{'+'{Tooltip/crop/data|<#name#>}}'
    },
];
 
var tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true,
    noCSS: true
};

window.tooltips_list = tooltips_list;
window.tooltips_config = tooltips_config;

/* ------------------------------------------------------- */