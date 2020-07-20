/* Any JavaScript here will be loaded for all users on every page load. */
 
/* TOOLTIPS 
----first number represents description; blank = no description, 2 = has desc----
----second number represents number of effects
*/
 
var tooltips_debug = false;
var tooltips_list = [
        {
        classname: 'item-tooltip',
        parse: '{' + '{Template:Item tip|1=<#name#>|2=<#color#>|3=<#text#>|4=<#text2#>|o=<#obtain#>|o1=<#obtain1#>|o1a=<#a#>|o1b=<#b#>|o1c=<#c#>|o1d=<#d#>|o2=<#obtain2#>}}',
    },  {
        classname: 'enemy-tooltip',
        parse: '{' + '{Template:Enemy tip|1=<#name#>|2=<#codename#>|3=<#dura#>|4=<#atk#>|5=<#def#>|6=<#rist#>}}',
    },  {
        classname: 'character-tooltip',
        parse: '{' + '{Template:Character tip|1=<#name#>|2=<#class#>|3=<#rarity#>|4=<#faction#>|5=<#left#>|6=<#top#>|width=<#width#>}}'
    },
];