/* Импорт JS-страниц Fixes.js, Scroll.js, RefTooltips.js */
importArticles({
	    type: 'script',
	    articles: [
	        "u:ru.wikicorporate:MediaWiki:Fixes.js",
	        "u:ru.wikicorporate:MediaWiki:Scroll.js",
	        "u:ru.wikicorporate:MediaWiki:RefTooltips.js"
	    ]
	});

/* Конфигурация для dev:AddRailModule */
window.AddRailModule = [{page: 'Template:CodeRail', maxAge: 0}];

/* Наведение */
window.tooltips_list = [
    {
        classname: 'custom-tooltip-parse',
        parse: '{| class="tt-table"\n|style="color: #DEA400"|<b><#name#></b>\n|-\n|<#effect#>\n|{'+'{#if:{'+'{'+'{Условие|}}}|-\n{'+'{!}}<#condition#>\n{'+'{!}}|}}{'+'{#if:{'+'{'+'{Цена|}}}|-\n{'+'{!}}Стоимость ({'+'{Политическая власть||22px}}): {'+'{Цвет|Y|<#cost#>}}\n{'+'{!}}|}}{'+'{#if:{'+'{'+'{Описание|}}}|-\n{'+'{!}}<div style="border-top: 2px dashed #A2A2A2; background: #7B7B7B; width: 60px"></div>\n{'+'{!}}-\n{'+'{!}}style="white-space: normal"{'+'{!}}<#name#>\n|-}}\n|}',
    },
]