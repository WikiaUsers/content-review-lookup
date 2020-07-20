/* Any JavaScript here will be loaded for all users on every page load. */

/* TOOLTIPS 
----first number represents description; blank = no description, 2 = has desc----
----second number represents number of effects
*/

var tooltips_debug = false;
var tooltips_list = [
        {
        classname: 'specialization-tooltip',
        parse: '{' + '{SpecializationTile/Tooltip|2=<#row#>|name=<#name#>|3=<#icon#>|level=<#level#>|description=<#description#>|author=<#author#>|effect=<#effect#>|effect2=<#effect2#>|effect3=<#effect3#>|effect4=<#effect4#>|effect5=<#effect5#>|leveluppoints=<#leveluppoints#>|specname=<#specname#>|investmentreq=<#investmentreq#>|investmentreq2=<#investmentreq2#>|notice=<#notice#>}}',
    },  {
        classname: 'specialization-tooltip2',
        parse: '{' + '{SpecializationTile2/Tooltip|1=<#col#>|2=<#row#>|name=<#name#>|3=<#icon#>|level=<#level#>|description=<#description#>|author=<#author#>|effect=<#effect#>|effect2=<#effect2#>|effect3=<#effect3#>|effect4=<#effect4#>|effect4=<#effect5#>|leveluppoints=<#leveluppoints#>|specname=<#specname#>|investmentreq=<#investmentreq#>|investmentreq2=<#investmentreq2#>|note=<#note#>|notice=<#notice#>}}',
    },  {
        classname: 'specialization',
        parse: '{' + '{Specialization|1=<#name#>|2=<#stats#>|3=<#description#>}}',
    },  {
        classname: 'dungeon',
        parse: '<div style="{{Equipment/Style|width=300px|padding=12px}}"><div style="font-size:115%"><#name#></div>[[File:Hr.png|300px|link=]]<br/><div style="margin-top:-3px">Level Requirement: <#levels#><br/>Modes: <#modes#></div>[[File:Hr.png|300px|link=]]<#resetinfo#></div>',
    },  {
        classname: 'dungeon2',
        parse: '<div style="{{Equipment/Style|width=300px|padding=12px}}"><div style="font-size:115%"><#name#></div>[[File:Hr.png|300px|link=]]<br/><div style="margin-top:-3px">Level Requirement: <#levels#><br/>Modes: <#modes#></div>[[File:Hr.png|300px|link=]]<div style="margin-top:-3px; margin-bottom:-3px">Advanced Requirement: <#levels2#><br/>Advanced Modes: <#modes2#></div>[[File:Hr.png|300px|link=]]<#resetinfo#></div>',
    },  {
        classname: 'zone',
        parse: '<div style="{{Equipment/Style|width=200px|padding=12px}}"><div style="font-size:115%"><#name#></div>[[File:Hr.png|200px|link=]]<br/><div style="margin-top:-3px">Type: <#type#><br/>Level Range: <#levels#></div></div>',
    },  {
        classname: 'questreward',
        parse:'<div style="{{Equipment/Style|width=80px|padding=6px}}"><#text#></div>',
        delay:50
    },  {
        classname: 'skill',
        parse: '{' + '{Template:Skill/Tooltip|name=<#name#>|cooldown=<#cooldown#>|damage=<#damage#>|healing=<#healing#>|attribute=<#attribute#>|description=<#description#>|spcost=<#spcost#>|spadd=<#spadd#>|healeffect=<#healeffect#>|dot=<#dot#>|dotduration=<#dotduration#>|debuff=<#debuff#>|debuff2=<#debuff2#>|debuff3=<#debuff3#>|debuffduration=<#debuffduration#>|buff=<#buff#>|buff2=<#buff2#>|buff3=<#buff3#>|buffduration=<#buffduration#>|notice=<#notice#>|bonuseffect=<#bonuseffect#>|bonuseffect2=<#bonuseffect2#>}}'
    },  {
        classname: 'meleebuff',
        parse: '<div style="{{Equipment/Style|width=200px|padding=8px}}">DMG dealt to Bosses +20%<br/>DMG dealt to Elites +10%<br/>DMG taken from Bosses -15%<br/>DMG taken from Elites -10%</div>',
    },  {
        classname: 'npc-multiple',
        parse: '{' + '{Template:NPC/MultipleCoordinateTT|<#1#>|<#2#>|<#3#>|<#4#>|<#5#>|<#6#>|<#7#>|<#8#>|<#9#>|<#10#>|<#11#>|<#12#>|ttwidth=<#ttwidth#>}}',
    },
];