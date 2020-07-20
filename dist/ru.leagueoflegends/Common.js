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
        'search': 'search',
        'game': ['- Игра -',
            ['LOL','League of Legends'],
            ['TFT','Teamfight Tactics'],
            ['TFT1','- Набор 1 - Войны фракций'],
            ['TFT2','- Набор 2 - СНС'],
            ['TFT3','- Набор 3 - Галактики'],
            ['LOR','Legends of Runeterra'],
            ['WR','Wild Rift']
        ],
        'role': ['- Роль -',
            ['Манипулятор','Манипулятор'],
            ['Ловец','- Ловец'],
            ['Чародей','- Чародей'],
            ['Воин','Воин'],
            ['Ныряльщик','- Ныряльщик'],
            ['Джаггернаут','- Джаггернаут'],
            ['Маг','Маг'],
            ['Маг-артиллерист','- Артиллерист'],
            ['Боевой маг','- Боевой маг'],
            ['Маг-подрывник','- Подрывник'],
            ['Стрелок','Стрелок'],
            ['Истребитель','Истребитель'],
            ['Убийца','- Убийца'],
            ['Дуэлянт','- Дуэлянт'],
            ['Уникум','Уникум'],
            ['Танк','Танк'],
            ['Штурмовик','- Штурмовик'],
            ['Хранитель','- Хранитель']
        ],
        'type': ['- Дальность -',
            ['Ближний','Ближний бой'],
            ['Дальний','Дальний бой']
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
    {   classname: 'item-lua-icon', 
        parse: '{'+'{Tooltip/Item/Lua|<#param#>}}'},
    {   classname: 'mastery-icon', 
        parse: '{'+'{Tooltip/Mastery|<#param#>}}'},
    {   classname: 'pp-tooltip',
        parse: '{'+'{Tooltip/Pp|<#size#>|<#values#>|values1=<#values1#>|values2=<#values2#>|label1=<#label1#>|label2=<#label2#>|displayformula=<#displayformula#>|useformula=<#useformula#>|key1=<#key1#>|key2=<#key2#>|start=<#start#>|end=<#end#>|round1=<#round1#>|round2=<#round2#>}}'},
    {   classname: 'pp-tooltip2',
        parse: '{'+'{Tooltip/Pp2|bot_values=<#bot_values#>|top_values=<#top_values#>|start=<#start#>|finish=<#finish#>|bot_label=<#bot_label#>|top_label=<#top_label#>|displayformula=<#displayformula#>|useformula=<#useformula#>|bot_key=<#bot_key#>|top_key=<#top_key#>|bot_round=<#bot_round#>|top_round=<#top_round#>|top_fill=<#top_fill#>}}'},
    {   classname: 'passive-progression', 
        parse: '{'+'{Tooltip/Pp|tLabel=<#tLabel#>|bLabel=<#bLabel#>|tVal=<#tVal#>|bVal=<#bVal#>|tKey=<#tKey#>|bKey=<#bKey#>|tRound=<#tRound#>|bRound=<#bRound#>|size=<#size#>|start=<#start#>|end=<#end#>|formula=<#formula#>|formulalabel=<#formulalabel#>}}'},
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
    {   classname: 'tft-icon', 
        parse: '{'+'{Tooltip/TFT|<#param#>|set=<#set#>|type=<#type#>}}'},
    {   classname: 'lor-icon', 
        parse: '{'+'{Tooltip/LoR|<#param#>}}'},
    {   classname: 'lor-card-icon', 
        parse: '{'+'{Tooltip/LoRCard|<#param#>}}'},
    {   classname: 'tooltip-sandbox', 
        parse: '{'+'{Tooltip/Sandbox|<#v1#>|<#v2#>|<#v3#>|<#v4#>|<#v5#>|<#v6#>|v7=<#v7#>|v8=<#v8#>|v9=<#v9#>|v10=<#v10#>|v11=<#v11#>|v12=<#v12#>}}'}
];
 
var tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true,
    noCSS: true
};
 
/*** Flip Text ***/
mw.hook('wikipage.content').add(function(elem) {
    $(".flipText2").hide();
    $(".flipText1, .flipText2").click(function() {
        $(".flipText1, .flipText2").toggle();
    });
});
 
$(document).ready(function() {
    $(".flipText2").hide();
    $(".flipText1, .flipText2").click(function() {
        $(".flipText1, .flipText2").toggle();
    });
});

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
                dt.prepend($('<span class="prev-tab" title="Щелкните для просмотра следующей вкладки.">«</span>').mousedown(function(e) {
                    e.preventDefault();
                }).click(function() {
                    dts.addClass('hidden-tab').find('+ dd').addClass('hidden-tab');
                    $(dts[i-1]).removeClass('hidden-tab').find('+ dd').removeClass('hidden-tab');
                }));
            }
            if(i < dts.length-1) {
                dt.append($('<span class="next-tab" title="Щелкните для просмотра следующей вкладки.">»</span>').mousedown(function(e) {
                    e.preventDefault();
                }).click(function() {
                    dts.addClass('hidden-tab').find('+ dd').addClass('hidden-tab');
                    $(dts[i+1]).removeClass('hidden-tab').find('+ dd').removeClass('hidden-tab');
                }));
            }
        });
    });
});

/* Skinviewer: loading fix */
$(window).load(function() {
    $('.lazyimg-wrapper img').trigger("onload");
});
 
/* Skinviewer: Skinselektor onclick ([[Модуль:SkinData:skinslider]]) */
$(document).on("click", "span.show", function () {
    if (!$('#item-' + this.id).is($('.skinviewer-active-tab'))) {
        $(".skinviewer-active-tab").removeClass('skinviewer-active-tab');
        $(".skinviewer-tab-container > div").hide();
        $('#item-' + this.id).addClass('skinviewer-active-tab');
        $('#item-' + this.id).fadeIn();
        $('.lazyimg-wrapper img').trigger("onload");
        $(window).scroll(); //backup lazyimg fix
    }
});
 
/* DO NOT ADD CODE BELOW THIS LINE */