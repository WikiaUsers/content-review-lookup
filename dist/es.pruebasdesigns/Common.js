mw.loader.using( ['mediawiki.util', 'jquery.client'], function () {
/* Begin of mw.loader.using callback */

    /* Auto updating recent changes opt-in
     * See w:c:dev:AjaxRC for info & attribution 
     */
    AjaxRCRefreshText = 'Auto-refresh';
    AjaxRCRefreshHoverText = 'Automatically refresh the page';
    ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

    /* Username replace function ([[Template:USERNAME]]) 
     * Inserts user name into <span class="insertusername"></span>
     * Originally by User:Splarka
     * New version by User:Spang
     * Fixed with JS provided by User:Grunny, thanks!
     */
    $(function() {
        if(typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $("span.insertusername").text(mw.config.get('wgUserName'));
    });
    
    /* Config for [[MediaWiki:Common.js/gridfiltering.js]] */
gridContainer = '#champion-grid';
gridFilters = {
	'champion': 'search',
	'role': [ '- Role -',
		['Mage','Mage'],
		['Tank','Tank'],
		['Marksman','Marksman'],
		['Controller','Controller'],
		['Fighter','Fighter'],
		['Slayer','Slayer'],
	],
	'type': [ '- Attacktype -',
		['Melee','Melee'],
		['Ranged','Ranged'],
	],
};
/* End of mw.loader.using callback */
});

/* Custom Tooltips for use with the Tooltips/code.js */
var tooltips_list = [
    {
        classname: 'cc-tooltip', 
        parse: '{'+'{Crowd_control_info|<#type#>}}',
    },
    {
        classname: 'skin-icon', 
        parse: '{'+'{Tooltip/Skin|<#param#>}}',
    },
    {
        classname: 'skinloading-icon', 
        parse: '{'+'{Tooltip/Skin/Loading|<#param#>}}',
    },
    {
        classname: 'champion-icon',
        parse: '{'+'{Tooltip/Champion|<#champion#>|<#skin#>}}',
    },
    {
        classname: 'ability-icon',
        parse: '{'+'{Tooltip/Ability|<#champion#>|<#ability#>}}',
    },
    {
        classname: 'item-icon', 
        parse: '{'+'{Tooltip/Item|<#param#>}}',
    },
    {
        classname: 'mastery-icon', 
        parse: '{'+'{Tooltip/Mastery|<#param#>}}',
    },
    {
        classname: 'spell-icon', 
        parse: '{'+'{Tooltip/Spell|<#param#>}}',
    },
    {
        classname: 'passive-progression', 
        parse: '{'+'{Tooltip/Progression|<#size#>|<#values#>|<#levels#>|type=<#type#>|formula=<#formula#>}}',
    },
    {
        classname: 'tooltip-sandbox', 
        parse: '{'+'{Tooltip/Sandbox|<#v1#>|<#v2#>|<#v3#>|<#v4#>|<#v5#>|<#v6#>}}',
    }
];
 
var tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true
};

/*** Flip Text ***/
(function() {
    function addHook() {
        $(".flipText1").show();
        $(".flipText2").hide();
        $(".flipText1, .flipText2").off();
        $(".flipText1, .flipText2").click(function(e) {
           $(e.target).closest('span#container.container').children().toggle();
        });
    }
    $(addHook);
    mw.hook('wikipage.content').add(addHook);
}());

/* DO NOT ADD CODE BELOW THIS LINE */