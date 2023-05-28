/* Tooltips 
*/

window.tooltips_list = [
        {
        classname: 'status-effect-tooltip',
        parse: '{' + '{Template:Status effect tip|1=<#name#>|2=<#type#>|3=<#color#>|4=<#desc#>}}',
    }, {
        classname: 'character-tooltip',
        parse: '{' + '{Template:Character tip|1=<#name#>|2=<#role#>|3=<#star#>|4=<#element#>|5=<#affilation#>|6=<#left#>|7=<#top#>|title=<#title#>|link=<#link#>}}',
    }
];