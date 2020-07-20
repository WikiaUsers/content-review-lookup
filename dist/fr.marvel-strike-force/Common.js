/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

var tooltips_list = [
    {
        classname: 'pokemon-tooltip',
        parse: '{' + '{#ifeq:{' + '{Pokémon Data/Dex|name=<#pokemon#>}}|???|{' + '{#ifeq:{' + '{Pokémon Data/Dex With Modifier|name=<#pokemon#>}}|???|{' + '{#ifexist:Modèle:Pokémon Tooltip/<#pokemon#>|{' + '{Pokémon Tooltip/<#pokemon#>}}|<div align="center" style="width:128px"><#pokemon#><br>[[File:<#pokemon#>.png|64px]]</div>}}|{' + '{Pokémon Tooltip v2|pokemon=<#pokemon#>|modifier=<#modifier#>}}}}|{' + '{Pokémon Tooltip v2|pokemon=<#pokemon#>|modifier=<#modifier#>}}}}',
        delay: 250,
    },
    {
        classname: 'other-tooltip',
        parse: '{' + '{#ifexist:Modèle:Pokémon Tooltip/<#name#>|{' + '{Pokémon Tooltip/<#name#>}}|<div align="center" style="width:128px"><#name#><br>[[File:<#name#>.png|64px]]</div>}}',
        delay: 250,
    },
    {
        classname: 'support-pokemon-tooltip',
        parse: '{' + '{Support_Pokémon_Tooltip|pokemon=<#pokemon#>|modifier=<#modifier#>|megamodifier=<#megamodifier#>|level=<#level#>|SL=<#sl#>|RML=<#rml#>|MSU=<#msu#>|SS=<#ss#>|mega=<#mega#>}}',
        delay: 250,
    },
    {
        classname: 'skill-tooltip',
        parse: '{' + '{#ifeq:{' + '{Skill Data/ID|name=<#skill#>}}|???|No such skill|{' + '{Skill Tooltip|skill=<#skill#>}}}}',
        delay: 250,
    },
    {
        classname: 'page-tooltip',
        parse: '{' + '{:<#page#>}}',
        delay: 250,
    },
    {
        classname: 'type-tooltip',
        parse: '{' + '{Type Tooltip|type=<#type#>}}',
        delay: 250,
    },
    {
        classname: 'pokemon-tooltip has-redlinks',
        delay:250,
    }
];
 
var tooltips_config = {
    offsetX: 10,
    offsetY: 10,
    waitForImages: false,
};