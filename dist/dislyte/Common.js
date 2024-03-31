/* Tooltips 
*/
/* No use for these atm: {{4=<#element#>|5=<#role#>|link=<#link#>}}' */
window.tooltips_list = [
        {
        classname: 'glossary',
        parse: '{' + '{Template:Status effect tip|1=<#name#>|2=<#type#>|3=<#color#>|4=<#desc#>|title=<#title#>|tipname=<#tipname#>|boxwidth=<#boxwidth#>}}',
    },  {
        classname: 'item-tooltip',
        parse: '{' + '{Template:Item tip|1=<#name#>|2=<#color#>|3=<#desc#>|4=<#flavortext#>|title=<#title#>}}',
    },  {
    	classname: 'esper-tooltip',
        parse: '{' + '{Template:Esper tip|1=<#name#>|2=<#god#>|3=<#star#>}}',
    }
];

$( document ).ready(function() {
  $(".flipText2").hide();
  $(".flipText1, .flipText2").click(function() {
        $(".flipText1, .flipText2").toggle()
  });
});