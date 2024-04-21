/* Any JavaScript here will be loaded for all users on every page load. */

/* tooltips, from https://dev.fandom.com/wiki/Tooltips */
window.tooltips_config = {
    waitForImages: true,
    noCSS: true,
};

window.tooltips_list = [
	{
        classname: 'custom-tooltip',
        parse: '{'+'{<#template#>}'+'}',
    }
];