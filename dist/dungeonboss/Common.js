

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement. */

/* Script imports. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxUndo/code.js',
        'u:dev:LastEdited/code.js',
        'u:dev:PurgeButton/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:RevealAnonIP/code.js',      
        'u:dev:SkinSwitchButton/code.js',
        'u:dev:MediaWiki:Countdown/code.js'
    ]
});

/* Scripts which are imported via [[MediaWiki:ImportJS]]
Common.js/gridfiltering.js
dev:Tooltips.js
*/

/* Ajax pages. */
ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special;Statistics","Special:WikiActivity","Special:Contributions","Blog:Recent posts"];
importScriptPage('AjaxRC/code.js', 'dev');
/* End. */

/* Config for [[w:c:dev:Tooltips/Tooltips.js]] */
var tooltips_list = [
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
 
var tooltips_config = {
    offsetX: 15,
    offsetY: 15,
    waitForImages: true,
    noCSS: true,
};
/* End. */