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
            ['LOR','Legends of Runeterra'],
            ['WR','Wild Rift'],
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
    /* Config for [[MediaWiki:Common.js/avatarGridfiltering.js]] */
    avatarGridContainer = '#avatar-grid';
    avatarGridFilters = {
        'search': 'search',
        'availability': ['- Доступность -',
            ['Available','• Доступные'],
            ['Legacy','• Архив'],
            ['Unavailable','• Недоступные'],
            ['Temporary','• Временные'],
            ['Unlocked','• За создание учетной записи'],
            ['Unreleased','• Невыпущенные']
        ],
        'source': ['- Источник -',
            ['Store','• Магазин Riot'],
            ['Riot','• Награда от Riot'],
            ['Missions','• Задания'],
            ['Bundle','• Наборы'],
            ['Code','• Промоакции'],
            ['Account Creation','• Создание учетной записи'],
        ],
        'release': ['- Год -',
            ['2022release', '• 2022'],
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
 
	/* 
		Блок кода для слайдера образов (Шаблон:Образы)
		Автор: Benutzerin:TheTimebreaker (League of Legends DE)
	*/
    $(document).on("click", "span.show", function () {
	    if(!$('#item-' + this.id).is($('.skinviewer-active-tab'))) {
	        $(".skinviewer-active-tab").removeClass('skinviewer-active-tab');
	        $(".skinviewer-tab-container > div").hide();
	        $('#item-' + this.id).addClass('skinviewer-active-tab');
	        $('#item-' + this.id).fadeIn();
	        $('.lazyimg-wrapper img').trigger("onload");
	        $(window).scroll(); //backup lazyimg fix
	    }
	});
/* End of mw.loader.using callback */
});

/**
 * Добавляет сообщение на Рельс 
*/
window.AddRailModule = [{prepend: true}];
 
/* Custom Tooltips for use with the Tooltips/code.js */
window.tooltips_list = [
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
 
window.tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true,
    noCSS: true
};

/* См. [[Шаблон:Skill Tabs]] */
mw.hook("wikipage.content").add(function($content) {
	$($content).find(".fliptext-container").each(addFlip);
    
    function addFlip() {
    	var textBlocks = $(this).children("span");
    	$(textBlocks[0]).show();
    	$(textBlocks[0]).on("click", function($event) {
    		$event.preventDefault();
    		$(this).hide();
    		$(textBlocks[1]).show();
    	});
    	$(textBlocks[1]).on("click", function($event) {
    		$event.preventDefault();
    		$(this).hide();
    		$(textBlocks[0]).show();
    	});
    }
});
/* DO NOT ADD CODE BELOW THIS LINE */