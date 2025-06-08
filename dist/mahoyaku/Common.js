/* Any JavaScript here will be loaded for all users on every page load. */

var oggPlayerButtonOnly = false;

/* Custom Tooltips for use with the Tooltips/code.js */
var tooltips_list = [
    {   classname: 'trait',
        parse: '{'+'{Tooltip/Traits|trait=<#trait#>|japanese=<#jp#>|english=<#en#>}}'},
    {   classname: 'buff-icon', 
        parse: '{'+'{Tooltip/Buff|<#param#>}}'},
    {   classname: 'glossary',
        parse: '{'+'{Tooltip/Glossary|<#param#>}}'},
    {   classname: 'item-icon', 
        parse: '{'+'{Tooltip/Item|<#param#>}}'},
    {   classname: 'mastery-icon', 
        parse: '{'+'{Tooltip/Mastery|<#param#>}}'},
    {   classname: 'avatar-icon', 
        parse: '{'+'{Tooltip/Icon|<#param#>}}'},
    {   classname: 'esports-icon', 
        parse: '{'+'{Tooltip/Icon|<#param#>}}'},
    {   classname: 'ward-icon', 
        parse: '{'+'{Tooltip/Ward|<#param#>}}'},
    {   classname: 'spell-icon', 
        parse: '{'+'{Tooltip/Spell|<#param#>}}'},
    {   classname: 'tooltip-sandbox', 
        parse: '{'+'{Tooltip/Sandbox|<#v1#>|<#v2#>|<#v3#>|<#v4#>|<#v5#>|<#v6#>|v7=<#v7#>|v8=<#v8#>|v9=<#v9#>|v10=<#v10#>|v11=<#v11#>|v12=<#v12#>}}'}
];
 
var tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true,
    noCSS: true
};