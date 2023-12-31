/* Scripts which are imported via [[MediaWiki:ImportJS]]
Mediawiki:Common.js/DynamicStats.js
Mediawiki:Common.js/gridfiltering.js
Mediawiki:Common.js/itemGridfiltering.js
Mediawiki:Common.js/writemGridfiltering.js
Mediawiki:Common.js/avatarGridfiltering.js
Mediawiki:Common.js/esportsGridfiltering.js
Mediawiki:Common.js/levelselect.js
Mediawiki:Common.js/levelselectWR.js
Mediawiki:Common.js/StatWheel.js
Mediawiki:Common.js/StickyHeader.js
Mediawiki:Common.js/DynamicFontSize.js
Mediawiki:Common.js/Banner.js
Mediawiki:Common.js/rosterFilter.js
Mediawiki:Common.js/CustomTab.js
dev:InactiveUsers/code.js
dev:InputUsername/code.js
dev:OggPlayer.js
dev:Tooltips.js
//dev:DiscordModule/code.js //not working yet
dev:EditorColorPicker.js
Common.js/OggPlayerDownload.js
*/

mw.loader.using( ['mediawiki.util', 'jquery.client'], function () {
/* Begin of mw.loader.using callback */

    /* Config for [[MediaWiki:Common.js/gridfiltering.js]] */
    gridContainer = '#champion-grid';
    gridFilters = {
        'search': 'search',
        /*'game': ['- Game -',
            ['LOL','League of Legends'],
            ['TFT','Teamfight Tactics'],
            ['TFT1','• Set 1 - Faction Wars'],
            ['TFT2','• Set 2 - Rise of the Elements'],
            ['TFT3','• Set 3 - Galaxies'],
            ['TFT3.5','• Set 3.5 - Galaxies II'],
            ['TFT4','• Set 4 - Fates'],
            ['LOR','Legends of Runeterra'],
            ['WR','Wild Rift']
        ],*/
        'role': ['- Class -',
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
        'type': ['- Range type -',
            ['Melee','Melee'],
            ['Ranged','Ranged']
        ]
    };
    
    /* Config for [[MediaWiki:Common.js/itemGridfiltering.js]] */
    itemGridContainer = '#item-grid';
    itemGridFilters = {
        'search': 'search',
        'modes' : ['- Game Modes - ',
            ['classic sr 5v5', '• Classic SR 5v5'],
            ['aram', '• ARAM'],
            ['FGM', '• FGM']
        ]
    };
    
    /* Config for [[MediaWiki:Common.js/writemGridfiltering.js]] */
    writemGridContainer = '#writem-grid';
    writemGridFilters = {
        'search': 'search',
        'modes' : ['- Game Modes - ',
            ['classic sr 5v5', '• Classic SR 5v5'],
            ['aram', '• ARAM'],
            ['duel', '• Duel'],
            ['FGM', '• FGM']
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
            ['2021release', '• 2021'],
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
window.tooltips_list = [
    {   classname: 'ability-icon',
        // parse: '{'+'{Tooltip/Ability|champion=<#champion#>|ability=<#ability#>|variant=<#variant#>|game=<#game#>}}',
        parse: function parse(elem) {
        	if (window.tooltips_ability_icon_detail) {
        		return '{' + '{Tooltip/Ability|champion=' + $(elem).data('champion') + '|ability=' + $(elem).data('ability') + '|variant=' + $(elem).data('variant') + '|game=' + $(elem).data('game') + '|detail=true}}';
        	}
    		return '{' + '{Tooltip/Ability|champion=' + $(elem).data('champion') + '|ability=' + $(elem).data('ability') + '|variant=' + $(elem).data('variant') + '|game=' + $(elem).data('game') + '}}';
        }
    },
    {   classname: 'buff-icon', 
        parse: '{'+'{Tooltip/Buff|<#param#>|buff=<#buff#>|variant=<#variant#>|game=<#game#>}}'},
    {   classname: 'champion-icon',
        parse: '{'+'{Tooltip/Champion|champion=<#champion#>|skin=<#skin#>|variant=<#variant#>|game=<#game#>}}'},
    {   classname: 'glossary',
        parse: '{'+'{Tooltip/Glossary|<#param#>|tip=<#tip#>|game=<#game#>}}'},
    {   classname: 'item-icon', 
        parse: '{'+'{Tooltip/Item|item=<#item#>|enchantment=<#enchantment#>|variant=<#variant#>|game=<#game#>}}'},
    {   classname: 'mastery-icon', 
        parse: '{'+'{Tooltip/Mastery|<#param#>|mastery=<#mastery#>|variant=<#variant#>}}'},
    {   classname: 'pp-tooltip',
        parse: '{'+'{Tooltip/Pp|bot_values=<#bot_values#>|top_values=<#top_values#>|start=<#start#>|finish=<#finish#>|bot_label=<#bot_label#>|top_label=<#top_label#>|displayformula=<#displayformula#>|useformula=<#useformula#>|bot_key=<#bot_key#>|top_key=<#top_key#>|bot_round=<#bot_round#>|top_round=<#top_round#>|top_fill=<#top_fill#>}}'},
    {   classname: 'rune-icon', 
        parse: '{'+'{Tooltip/Rune|<#param#>|rune=<#rune#>|variant=<#variant#>|game=<#game#>}}'},
    {   classname: 'skin-icon', 
        parse: '{'+'{Tooltip/Skin|champion=<#champion#>|skin=<#skin#>|variant=<#variant#>|game=<#game#>}}'},
    {   classname: 'skinloading-icon', 
        parse: '{'+'{Tooltip/Skin/Loading|champion=<#champion#>|skin=<#skin#>|variant=<#variant#>|game=<#game#>}}'},
    {   classname: 'chroma-icon', 
        parse: '{'+'{Tooltip/Chroma|champion=<#champion#>|skin=<#skin#>|chromas=<#chromas#>|game=<#game#>}}'},
    {   classname: 'avatar-icon', 
        parse: '{'+'{Tooltip/Icon|<#param#>|icon=<#icon#>}}'},
    {   classname: 'esports-icon', 
        parse: '{'+'{Tooltip/Icon|<#param#>|icon=<#icon#>}}'},
    {   classname: 'ward-icon', 
        parse: '{'+'{Tooltip/Ward|<#param#>|ward=<#ward#>}}'},
    {   classname: 'spell-icon', 
        parse: '{'+'{Tooltip/Spell|spell=<#spell#>|variant=<#variant#>|game=<#game#>}}'},
    {   classname: 'sandbox-tooltip', 
        parse: '{'+'{Tooltip/Sandbox|<#v0#>|<#v1#>|<#v2#>|<#v3#>|<#v4#>|<#v5#>|<#v6#>|<#v7#>|<#v8#>|<#v9#>|<#v10#>|<#v11#>|<#v12#>}}'},
    {   classname: 'tft-icon', 
        parse: '{'+'{Tooltip/TFT|<#param#>|set=<#set#>|type=<#type#>}}'},
    {   classname: 'rp-icon', 
        parse: '{'+'{Tooltip/RP|<#param#>|rp=<#rp#>}}'},
    {   classname: 'wc-icon', 
        parse: '{'+'{Tooltip/WC|wc=<#wc#>}}'},
    {   classname: 'lor-tooltip', 
        parse: '{'+'{Tooltip/LOR|<#param#>}}'},
    {   classname: 'challenge-tooltip', 
        parse: '{'+'{Tooltip/Challenge|<#param#>|challenge=<#challenge#>}}'},
    {
    classname: 'profile-icons-v1',
    parse: '{{Tooltip/Profile-Icons/V1|<#id#>}}'
}
];
 
window.tooltips_config = {
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

/* ItemComparisonForm */
window.itemComparisonFormPages = [
	'League_of_Legends_Wiki:Lane_Lookup',
];

// Custom context menu to allow downloading of ext-audiobutton files.

var menu = document.createElement("div");

menu.setAttribute("id", "context-menu");
menu.innerHTML = '<ul><li><a href="#">Download</a></li></ul>';
document.getElementsByTagName('body')[0].appendChild(menu);

document.onclick = function(e){
    menu.style.display = 'none';
}

var buttons = document.querySelectorAll('a.ext-audiobutton');
for (var i = 0; i < buttons.length; i++) {
	buttons[i].oncontextmenu = function(e){
		e.preventDefault();
		var y = e.pageY - 30;
		menu.style.left = e.pageX + 'px';
		menu.style.top = y + 'px';
		menu.style.display = 'block';
		menu.getElementsByTagName("a")[0].href = this.previousElementSibling.getElementsByTagName("source")[0].src;
		menu.getElementsByTagName("a")[0].download = "";
 }
}

/* DO NOT ADD CODE BELOW THIS LINE */