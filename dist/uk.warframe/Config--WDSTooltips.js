// Налаштування для https://warframe.fandom.com/uk/wiki/MediaWiki:WDSTooltips.js

var wds_tooltips_list = [
	{
    classname: 'simple-tooltip',
    parse: '{'+'{#invoke:Підказки|getTip|<#param#>|<#param2#>|<#param3#>}}',
  },
];
var wds_tooltips_config = {
    events: ['CustomEvent'],
    offsetX: 10,
    offsetY: 10,
    waitForImages: true
};