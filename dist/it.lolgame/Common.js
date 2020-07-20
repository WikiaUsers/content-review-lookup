/* Scripts which are imported via [[MediaWiki:ImportJS]]
//Common.js/CustomTab.js
Common.js/DynamicStats.js
Common.js/gridfiltering.js
Common.js/itemGridfiltering.js
Common.js/levelselect.js
Common.js/levelselect2.js
Common.js/StatWheel.js
//Common.js/tabviewenhancements.js
dev:DiscordModule/code.js
dev:OggPlayer.js
dev:Tooltips.js
*/

mw.loader.using( ['mediawiki.util', 'jquery.client'], function () {
/* Begin of mw.loader.using callback */

    /* Username replace function ([[Template:USERNAME]])           *
     * Inserts user name into <span class="insertusername"></span> */
    $(function() {
        if(typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $("span.insertusername").text(mw.config.get('wgUserName'));
    });
    
    /* Config for [[MediaWiki:Common.js/gridfiltering.js]] */
    gridContainer = '#champion-grid';
    gridFilters = {
        'search': 'search',
        'role': ['- Role -',
            ['Controller','Controller'],
            ['Catcher','• Catcher'],
            ['Enchanter','• Enchanter'],
            ['Fighter','Fighter'],
            ['Diver','• Diver'],
            ['Juggernaut','• Juggernaut'],
            ['Mage','Mage'],
            ['Artillery','• Artillery'],
            ['Battlemage','• Battlemage'],
            ['Burst','• Burst'],
            ['Marksman','Marksman'],
            ['Slayer','Slayer'],
            ['Assassin','• Assassin'],
            ['Skirmisher','• Skirmisher'],
            ['Specialist','Specialist'],
            ['Tank','Tank'],
            ['Vanguard','• Vanguard'],
            ['Warden','• Warden']
        ],
        'type': ['- Attacktype -',
            ['Melee','Melee'],
            ['Ranged','Ranged']
        ]
    };
    
    /* Config for [[MediaWiki:Common.js/itemGridfiltering.js]] */
    itemGridContainer = '#item-grid';
    itemGridFilters = {
        'search': 'search',
        'modes' : ['- Game Modes - ',
            ['Classic 5v5', '• Classic 5v5'],
            ['Classic 3v3', '• Classic 3v3'],
            ['ARAM', '• ARAM'],
            ['FGM', '• FGM Exclusive']
        ]
    };
/* End of mw.loader.using callback */
});

/* Custom Tooltips for use with the Tooltips/code.js */
var tooltips_list = [
    {   classname: 'ability-icon',
        parse: '{'+'{Tooltip/Ability|champion=<#champion#>|ability=<#ability#>}}'},
    {   classname: 'buff-icon', 
        parse: '{'+'{Tooltip/Buff|<#param#>}}'},
    {   classname: 'champion-icon',
        parse: '{'+'{Tooltip/Champion|champion=<#champion#>|skin=<#skin#>|variant=<#variant#>}}'},
    {   classname: 'glossary',
        parse: '{'+'{Tooltip/Glossary|<#param#>}}'},
    {   classname: 'item-icon', 
        parse: '{'+'{Tooltip/Item|<#param#>}}'},
    {   classname: 'mastery-icon', 
        parse: '{'+'{Tooltip/Mastery|<#param#>}}'},
    {   classname: 'passive-progression', 
        parse: '{'+'{Tooltip/Progression|<#size#>|<#values#>|<#levels#>|type=<#type#>|formula=<#formula#>}}'},
    {   classname: 'rune-icon', 
        parse: '{'+'{Tooltip/Rune|<#param#>}}'},
    {   classname: 'skin-icon', 
        parse: '{'+'{Tooltip/Skin|champion=<#champion#>|skin=<#skin#>|variant=<#variant#>}}'},
    {   classname: 'skinloading-icon', 
        parse: '{'+'{Tooltip/Skin/Loading|champion=<#champion#>|skin=<#skin#>|variant=<#variant#>}}'},
    {   classname: 'spell-icon', 
        parse: '{'+'{Tooltip/Spell|<#param#>}}'},
    {   classname: 'tooltip-sandbox', 
        parse: '{'+'{Tooltip/Sandbox|<#v1#>|<#v2#>|<#v3#>|<#v4#>|<#v5#>|<#v6#>}}'}
];
 
var tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true,
    noCSS: true
};

/* Flip Text */
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

/* Toggleable skill tabs */
mw.hook('wikipage.content').add(function(elem) {
    $(elem).find('.skill-tabs:not(.made-skill-tabs)').each(function() {
        var tabs = $(this).addClass('made-skill-tabs');
        var dts = $(this).find('> dt');
        if(dts.length === 2) tabs.addClass('toggle-tabs');
        dts.each(function(i) {
            var dt = $(this);
            if(i > 0) {
                dt.addClass('hidden-tab').find('+ dd').addClass('hidden-tab');
                dt.prepend($('<span class="prev-tab" title="Click to cycle through the information.">«</span>').mousedown(function(e) {
                    e.preventDefault();
                }).click(function() {
                    dts.addClass('hidden-tab').find('+ dd').addClass('hidden-tab');
                    $(dts[i-1]).removeClass('hidden-tab').find('+ dd').removeClass('hidden-tab');
                }));
            }
            if(i < dts.length-1) {
                dt.append($('<span class="next-tab" title="Click to cycle through the information.">»</span>').mousedown(function(e) {
                    e.preventDefault();
                }).click(function() {
                    dts.addClass('hidden-tab').find('+ dd').addClass('hidden-tab');
                    $(dts[i+1]).removeClass('hidden-tab').find('+ dd').removeClass('hidden-tab');
                }));
            }
        });
    });
});

/* DO NOT ADD CODE BELOW THIS LINE */