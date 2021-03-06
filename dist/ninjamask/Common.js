/* Scripts which are imported via [[MediaWiki:ImportJS]]
Mediawiki:Common.js/DynamicStats.js
Mediawiki:Common.js/gridfiltering.js
Mediawiki:Common.js/itemGridfiltering.js
Mediawiki:Common.js/avatarGridfiltering.js
Mediawiki:Common.js/esportsGridfiltering.js
Mediawiki:Common.js/levelselect.js
Mediawiki:Common.js/StatWheel.js
Mediawiki:Common.js/StickyHeader.js
Mediawiki:Common.js/DynamicFontSize.js
Mediawiki:Common.js/Banner.js
Mediawiki:Common.js/rosterFilter.js
Mediawiki:Common.js/CustomTab.js
dev:DiscordModule/code.js
dev:InputUsername/code.js
dev:OggPlayer.js
dev:RCStats.js
dev:Tooltips.js
dev:TabViewEditLinks/code.js
dev:WikiManager_Nameplate.js
*/
mw.loader.using( ['mediawiki.util', 'jquery.client'], function () {
/* Begin of mw.loader.using callback */
    /* Config for [[MediaWiki:Common.js/gridfiltering.js]] */
    gridContainer = '#champion-grid';
    gridFilters = {
        'search': 'search',
        'game': ['- Game -',
            ['LOL','League of Legends'],
            ['TFT','Teamfight Tactics'],
            ['TFT1','• Set 1 - Faction Wars'],
            ['TFT2','• Set 2 - Rise of the Elements'],
            ['TFT3','• Set 3 - Galaxies'],
            ['LOR','Legends of Runeterra'],
            ['WR','Wild Rift']
        ],
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
            ['ARAM', '• ARAM'],
            ['FGM', '• FGM Exclusive']
        ]
    };
    
    /* Config for [[MediaWiki:Common.js/avatarGridfiltering.js]] */
    avatarGridContainer = '#avatar-grid';
    avatarGridFilters = {
        'search': 'search',
        'availability': ['- Availability -',
            ['Available','• Available'],
            ['Legacy','• Legacy'],
            ['Unavailable','• Unavailable'],
            ['Temporary','• Temporary'],
            ['Unlocked','• Account Creation'],
            ['Unreleased','• Unreleased']
        ],
        'source': ['- Source -',
            ['Store','• Client Store'],
            ['Riot','• Riot Distribution'],
            ['Missions','• Missions'],
            ['Bundle','• Bundles'],
            ['Code','• Code Redemption'],
            ['Account Creation','• Account Creation'],
            ['Merch Store','• Merch Store']
        ],
        'release': ['- Year -',
            ['2020release', '• 2020'],
            ['2019release', '• 2019'],
            ['2018release', '• 2018'],
            ['2017release', '• 2017'],
            ['2016release', '• 2016'],
            ['2015release', '• 2015'],
            ['2014release', '• 2014'],
            ['2013release', '• 2013'],
            ['2012release', '• 2012'],
            ['2011release', '• 2011'],
            ['2010release', '• 2010'],
            ['2009release', '• 2009']
        ]
    };
    
    /* Config for [[MediaWiki:Common.js/esportsGridfiltering.js]] */
    esportsGridContainer = '#esports-grid';
    esportsGridFilters = {
        'search': 'search',
        'region': ['- Region -',
            ['INT','International Team'],
            ['NA','North America'],
                ['US','• North America'],
            ['EU','Europe'],
                ['DK','• Denmark'],
                ['DE','• Germany'],
                ['FR','• France'],
                ['LT','• Lithuania'],
                ['ES','• Spain'],
                ['SW','• Sweden'],
                ['UA','• Ukraine'],
                ['UK','• United Kingdom'],
            ['BR','Brazil'],
            ['CN','China'],
            ['KR','South Korea'],
            ['LAN','Latin American North'],
                ['CO','• Colombia'],
                ['CR','• Costa Rica'],
                ['MX','• Mexico'],
                ['PE','• Peru'],
            ['LAS','Latin America South'],
                ['AR','• Argentina'],
                ['CL','• Chile'],
            ['OCE','Oceania'],
                ['AU','• Australia'],
            ['JP','Japan'],
            ['RU','Russia'],
            ['SEA','South East Asia'],
                ['ID','• Indonesia'],
                ['HK','• Hong Kong'],
                ['MY','• Malaysia'],
                ['PH','• Philippines'],
                ['SG','• Singapore'],
                ['TH','• Thailand'],
                ['TW','• Taiwan'],
                ['VN','• Vietnam'],
            ['TR','Turkey']
        ],
        'tournament': ['- Tournament -',
            ['International','International'],
                ['MSI','• Mid-Season Invitational'],
                ['Worlds','• World Championship'],
                ['All-Star','• All-Stars'],
                ['Rift Rivals','• Rift Rivals'],
            ['Regional','Regional'],
                ['NALCS','• NA Championship Series'],
                ['EULCS','• EU Championship Series'],
                ['CBLOL','• CBLoL - Campeonato Brasileiro'],
                ['CLS','• CLS - Copa Latinoamérica Sur'],
                ['CNC','• CNC - Circuito Nacional Chile'],
                ['GPL','• GPL - Garena Premier League'],
                ['LAN','• LAN - Latin America Cup'],
                ['LCK','• LCK - Champions Korea'],
                ['LCL','• LCL - Continental League (RU)'],
                ['LJL','• LJL - Japan League'],
                ['LMS','• LMS - Master Series (SEA)'],
                ['LPL','• LPL - Pro League (China)'],
                ['LLN','• LLN - Liga Latinoamérica Norte'],
                ['OPL','• OPL - Oceanic Pro League'],
                ['TCL','• TCL - Turkey Champions League'],
                ['VCS','• VCS - Vietnam Championship Series'],
            ['Special','Special'],
                ['OGN','• OGN Invitational (KR)'],
                ['SLTV','• SLTV Star Series (RU)'],
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
    {   classname: 'pp-tooltip',
        parse: '{'+'{Tooltip/Pp|<#size#>|<#values#>|values1=<#values1#>|values2=<#values2#>|label1=<#label1#>|label2=<#label2#>|displayformula=<#displayformula#>|useformula=<#useformula#>|key1=<#key1#>|key2=<#key2#>|start1=<#start1#>|start2=<#start2#>|end1=<#end1#>|end2=<#end2#>|round1=<#round1#>|round2=<#round2#>}}'},
    {   classname: 'pp-tooltip2',
        parse: '{'+'{Tooltip/Pp2|bot_values=<#bot_values#>|top_values=<#top_values#>|start=<#start#>|finish=<#finish#>|bot_label=<#bot_label#>|top_label=<#top_label#>|displayformula=<#displayformula#>|useformula=<#useformula#>|bot_key=<#bot_key#>|top_key=<#top_key#>|bot_round=<#bot_round#>|top_round=<#top_round#>|top_fill=<#top_fill#>}}'},
    {   classname: 'rune-icon', 
        parse: '{'+'{Tooltip/Rune|<#param#>}}'},
    {   classname: 'skin-icon', 
        parse: '{'+'{Tooltip/Skin|champion=<#champion#>|skin=<#skin#>|variant=<#variant#>}}'},
    {   classname: 'skinloading-icon', 
        parse: '{'+'{Tooltip/Skin/Loading|champion=<#champion#>|skin=<#skin#>|variant=<#variant#>}}'},
    {   classname: 'chroma-icon', 
        parse: '{'+'{Tooltip/Chroma|champion=<#champion#>|skin=<#skin#>|chromas=<#chromas#>}}'},
    {   classname: 'avatar-icon', 
        parse: '{'+'{Tooltip/Icon|<#param#>}}'},
    {   classname: 'esports-icon', 
        parse: '{'+'{Tooltip/Icon|<#param#>}}'},
    {   classname: 'ward-icon', 
        parse: '{'+'{Tooltip/Ward|<#param#>}}'},
    {   classname: 'spell-icon', 
        parse: '{'+'{Tooltip/Spell|<#param#>}}'},
    {   classname: 'sandbox-tooltip', 
        parse: '{'+'{Tooltip/Sandbox|<#v0#>|<#v1#>|<#v2#>|<#v3#>|<#v4#>|<#v5#>|<#v6#>|<#v7#>|<#v8#>|<#v9#>|<#v10#>|<#v11#>|<#v12#>}}'},
    {   classname: 'tft-icon', 
        parse: '{'+'{Tooltip/TFT|<#param#>|set=<#set#>|type=<#type#>}}'},
    {   classname: 'rp-icon', 
        parse: '{'+'{Tooltip/RP|<#param#>}}'},
    {   classname: 'lor-tooltip', 
        parse: '{'+'{Tooltip/LOR|<#param#>}}'}
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