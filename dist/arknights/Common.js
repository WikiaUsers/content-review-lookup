/* Any JavaScript here will be loaded for all users on every page load. */
 
/* TOOLTIPS 
----first number represents description; blank = no description, 2 = has desc----
----second number represents number of effects
*/

window.tooltips_list = [
        {
        classname: 'item-tooltip',
        parse: '{' + '{Template:Item tip|1=<#name#>|2=<#color#>|3=<#text#>|4=<#text2#>|o=<#obtain#>|o1=<#obtain1#>|o1a=<#a#>|o1b=<#b#>|o1c=<#c#>|o1d=<#d#>|o2=<#obtain2#>|title=<#title#>|link=<#link#>}}',
    },  {
        classname: 'enemy-tooltip',
        parse: '{' + '{Template:Enemy tip|1=<#name#>|2=<#codename#>|3=<#dura#>|4=<#atk#>|5=<#def#>|6=<#rist#>|title=<#title#>|link=<#link#>}}',
    },  {
        classname: 'character-tooltip',
        parse: '{' + '{Template:Character tip|1=<#name#>|2=<#class#>|3=<#rarity#>|4=<#faction#>|5=<#left#>|6=<#top#>|title=<#title#>|link=<#link#>}}',
    },	{
        classname: 'collection-tooltip',
        parse: '{' + '{Template:Collection tip|1=<#name#>|2=<#text1#>|3=<#text2#>|e=<#event#>|q=<#quality#>|c=<#condition#>|n=<#note#>}}',
    },	{
        classname: 'furniture-tooltip',
        parse: '{' + '{Template:Furniture tip|1=<#name#>|2=<#text1#>|3=<#text2#>|title=<#title#>|a=<#ambience#>|t1=<#type#>|t2=<#theme#>|s=<#set#>|o=<#obtain#>|o1a=<#obtain1a#>|o1b=<#obtain1b#>|o1c=<#obtain1c#>}}',
    },	{
        classname: 'outfit-tooltip',
        parse: '{' + '{Template:Outfit tip|1=<#name#>|2=<#text1#>|3=<#text2#>|4=<#text3#>|m=<#model#>|s1=<#skin#>|i=<#illustrator#>|s2=<#series#>|o=<#obtain#>}}',
    },	{
        classname: 'glossary',
        parse: '{' + '{Template:Glossary tip|1=<#name#>|2=<#text1#>|3=<#text2#>|4=<#text3#>|title=<#title#>}}',
    }
];