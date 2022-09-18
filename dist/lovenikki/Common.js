/* Any JavaScript here will be loaded for all users on every page load. */

// 1. AjaxRC configuration option
var ajaxRefresh = 30000;
 
// 2. AjaxRC import statement
importScriptPage('AjaxRC/code.js','dev');

preloadTemplates_subpage = "syntax";
preloadTemplates_subpage = "case-by-case";

((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;

// Discord config options

window.DiscordBannerSettings = {
    bannerStyle: '2',
    inviteLink: 'adGyDwNGyK',
    prependToRail: false
};

// Custom Tooltip CSS removal

window.tooltips_config = {
    noCSS: true,
}