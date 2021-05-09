/* Any JavaScript here will be loaded for all users on every page load. */

/* TOOLTIPS 
----first number represents description; blank = no description, 2 = has desc----
----second number represents number of effects
*/

window.tooltips_debug = false;
window.tooltips_config = {
    noCSS: true,
}
window.tooltips_list = [
        {
        classname: 'specialization-tooltip',
        parse: '{' + '{SpecializationTile/Tooltip|2=<#row#>|name=<#name#>|3=<#icon#>|level=<#level#>|description=<#description#>|author=<#author#>|effect=<#effect#>|effect2=<#effect2#>|effect3=<#effect3#>|effect4=<#effect4#>|effect5=<#effect5#>|leveluppoints=<#leveluppoints#>|specname=<#specname#>|investmentreq=<#investmentreq#>|investmentreq2=<#investmentreq2#>|notice=<#notice#>}}',
    },  {
        classname: 'specialization-tooltip2',
        parse: '{' + '{SpecializationTile2/Tooltip|1=<#col#>|2=<#row#>|name=<#name#>|3=<#icon#>|level=<#level#>|description=<#description#>|author=<#author#>|effect=<#effect#>|effect2=<#effect2#>|effect3=<#effect3#>|effect4=<#effect4#>|effect4=<#effect5#>|leveluppoints=<#leveluppoints#>|specname=<#specname#>|investmentreq=<#investmentreq#>|investmentreq2=<#investmentreq2#>|note=<#note#>|notice=<#notice#>}}',
    },  {
        classname: 'skill',
        parse: '{' + '{Template:Skill/Tooltip|name=<#name#>|cooldown=<#cooldown#>|damage=<#damage#>|healing=<#healing#>|attribute=<#attribute#>|description=<#description#>|spcost=<#spcost#>|spadd=<#spadd#>|effect1=<#effect1#>|effect1icon=<#effect1icon#>|effect2=<#effect2#>|effect2icon=<#effect2icon#>|effect3=<#effect3#>|effect3icon=<#effect3icon#>|effect4=<#effect4#>|effect4icon=<#effect4icon#>|effect5=<#effect5#>|effect5icon=<#effect5icon#>|effect6=<#effect6#>|effect6icon=<#effect6icon#>|notice=<#notice#>|bonuseffect1=<#bonuseffect1#>|bonuseffect1icon=<#bonuseffect1icon#>|bonuseffect2=<#bonuseffect2#>|bonuseffect2icon=<#bonuseffect2icon#>|bonuseffect3=<#bonuseffect3#>|bonuseffect3icon=<#bonuseffect3icon#>}}'
    },  {
        classname: 'item',
        parse: '{' + '{\#lsth:<#link#>}}'
    }
];