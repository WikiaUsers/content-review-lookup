/* Scripts which are imported via [[MediaWiki:ImportJS]]
Common.js/gridfiltering.js
dev:Tooltips.js
dev:Countdown/code.js
dev:LastEdited/code.js
dev:RevealAnonIP/code.js
dev:ReferencePopups/code.js
dev:AjaxUndo/code.js
*/

/* Ajax pages. */
// TODO check what this is, a few pages no longer exist after migration it UCP
// ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special;Statistics","Special:WikiActivity","Special:Contributions","Blog:Recent posts"];
//importScriptPage('AjaxRC/code.js', 'dev');
/* End. */

/* Config for [[w:c:dev:Tooltips/Tooltips.js]] */
window.tooltips_list = [
    {   classname: 'hero-tooltip',
        parse: '{'+'{Tooltip/Hero|<#hero#>}}',
    },
    {   classname: 'ability-tooltip',
        parse: '{'+'{Tooltip/Ability|<#ability#>}}',
    },
    {   classname: 'skin-tooltip',
        parse: '{'+'{Tooltip/Skin|<#skin#>}}',
    },
    {   classname: 'rune-tooltip',
        parse: '{'+'{Tooltip/Rune|<#rune#>}}',
    },
    {   classname: 'effect-tooltip',
        parse: '{'+'{Tooltip/Effect|<#effect#>}}',
    },
    {   classname: 'evo-tooltip',
        parse: '{'+'{Tooltip/Evo|<#evo#>}}',
    },
    {   classname: 'tip-tooltip',
        parse: '{'+'{Tooltip/Tip|<#heading#>|<#text#>|<#image#>}}',
    },
    {   classname: 'sandbox-tooltip', 
        parse: '{'+'{Tooltip/Sandbox|<#v1#>|<#v2#>|<#v3#>|<#v4#>|<#v5#>|<#v6#>|v7=<#v7#>|v8=<#v8#>|v9=<#v9#>|v10=<#v10#>|v11=<#v11#>|v12=<#v12#>}}'}    
];
 
window.tooltips_config = {
    offsetX: 15,
    offsetY: 15,
    waitForImages: true,
    noCSS: true,
};
/* End. */