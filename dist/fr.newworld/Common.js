/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

/**
 * Tooltips
 */
window.tooltips_config = {
	waitForImages: true,
	noCSS: true,
}
window.tooltips_list = [
	{
		classname: 'ability-tooltip',
		parse: '{'+'{Tooltip/Capacité|nom=<#nom#>|image=<#image#>|description=<#description#>|recharge=<#recharge#>}}',
	}
];