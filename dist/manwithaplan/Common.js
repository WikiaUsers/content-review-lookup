/* Any JavaScript here will be loaded for all users on every page load. */

var tooltips_list = [{
    classname: 'tooltip-icon-person',
    parse: '{' + '{tooltip|<#character#>|<#actor#>|<fullname>|<#gender#>|<#appeared#>}}',
}];
importScriptPage('MediaWiki:Tooltips.js', 'dev');

window.BackToTopModern = true;
window.BackToTopSpeed = 500;