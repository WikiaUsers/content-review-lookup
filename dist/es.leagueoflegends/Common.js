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
        parse: '{'+'{Tooltip/Challenge|<#param#>|challenge=<#challenge#>}}'}
];
 
window.tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true,
    noCSS: true
};


importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MassCategorization/code.js',
    ]
});

/********************************* Prueba *********************************/

/*********************** Zeri ***********************/

/*** En las 4 mayores regiones y torneos internacionales ***/

/* 2022 */
mw.hook('dev.chart').add(function() {
	const zeriEn2022_1 = document.getElementById('Zeri_en_2022');
	if (!zeriEn2022_1) return;
	zeriEn2022_1.innerHTML = '<canvas id="myChart"></canvas>';

	const data = {
		labels: [
    		'Victorias',
    		'Derrotas'
			],
			
		datasets: [{
    		label: 'Zeri obtuvo una tasa de victorias del 56.1% en un total de 462 juegos.',
    		data: [259, 203],
    		backgroundColor: [
    			'#63FF74',
    			'#63BAFF'
    			],
    		hoverOffset: 4
		}]
	};

	const config = {
		type: 'doughnut',
		data: data,
		options: {}
	};
  
	new Chart(
		document.getElementById('myChart'),
		config
	);
})

/* DO NOT ADD CODE BELOW THIS LINE */