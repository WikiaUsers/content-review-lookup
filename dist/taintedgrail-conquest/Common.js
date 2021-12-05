/* Any JavaScript here will be loaded for all users on every page load. */
/* Custom tooltip classes*/
window.tooltips_list = [
   {
       classname: 'item-tooltip',
       parse: '{{ItemTable|<#item#>}}',
   },
   {
       classname: 'card-tooltip',
       parse: '{{CardTooltip|<#name#>|<#add#>}}',
   },
   	{
		classname: 'custom-tooltip',
		parse: '{{CustomTooltip|<#var1#>|<#var2#>|<#var3#>}}',
	}
];