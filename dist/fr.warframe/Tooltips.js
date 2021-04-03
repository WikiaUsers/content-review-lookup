var tooltips_list = [
	{
		classname: 'ability-tooltip',
		parse: '{' + '{Tooltip/Ability|<#param#>|<#param2#>}}',
	},
	{
		classname: 'arcane-tooltip',
		parse: '{' + '{Tooltip/Arcane|<#param#>|<#name#>}}',
	},
	{
		classname: 'avionic-tooltip',
		parse: '{' + '{Tooltip/Avionic|<#param#>|<#param2#>}}',
	},
	{
		classname: 'damagetype-tooltip',
		parse: '{' + '{Tooltip/DamageType|<#param#>|<#param2#>}}',
	},
	{
		classname: 'dropchance-tooltip',
		parse: '{' + '{Tooltip/DropChance|<#param#>|<#param2#>}}',
	},
	{
		classname: 'enemy-tooltip',
		parse: '{' + '{Tooltip/Enemy|<#param#>|<#param2#>}}',
	},
	{
		classname: 'mod-tooltip',
		parse: '{' + '{Tooltip/Mod|<#param#>}}',
	},
	{
		classname: 'pet-tooltip',
		parse: '{' + '{Tooltip/Pet|<#param#>|<#param2#>}}',
	},
	{
		classname: 'relic-tooltip',
		parse: '{' + '{Tooltip/Relic|<#param#>}}',
	},
	{
		classname: 'weapon-tooltip',
		parse: '{' + '{Tooltip/Weapon|<#param#>|<#param2#>|<#param3#>}}',
	},
	{
		classname: 'warframe-tooltip',
		parse: '{' + '{Tooltip/Warframe|<#param#>|<#param2#>}}',
	},
	{
		classname: 'test-tooltip',
		parse: '{' + '{Tooltip/Test|<#param#>|<#param2#>|<#param3#>|<#param4#>}}',
	},
	{
		classname: 'zoneRP-perso-tooltip',
		parse: '{' + '{Tooltip/ZoneRP/Personnage|<#param#>}}',
	}
];

var tooltips_config = {
	offsetX: 10,
	offsetY: 10,
	waitForImages: true
};