 
// **************************************************
// TabView Mobile Compatibility and Edit Buttons
// **************************************************
/* 
+function(a,b,c,d){function e(a){var b=a[p],c=typeof b,e=c==m;if(g(b)?(u=b,t=q,e=r):c==l&&v.push(b),e)return e;try{a[p]=d}catch(f){}try{delete a[p],a[p]=d}catch(f){}}function f(){t=q;var a=0,b=v;for(v=[];a<b.length;a++)try{b[a]()}catch(c){}}function g(a){try{if(a&&((a.name||a.displayName||"").toString().toLowerCase()==o||k!=typeof a.$$&&k!=typeof a.addStyle&&k!=typeof a.addScript))return q}catch(b){}return r}function h(){return t}function i(a){var b=typeof a,c=b==l,d=a===!0;if(c||"object"==b||d)if(d||g(a))f();else if(c)if(t)try{a()}catch(e){}else v.push(a)}function j(){return u=u||a[n]||b[n],!t&&!u&&z++<50?setTimeout(j,20):void f()}var k="undefined",l="function",m="boolean",n="wikiMod",o="wikimod",p="onWikiModReady",q=!0,r=!1,s=c.defineProperty,t=r,u,v=[],w,x,y=0,z=0;if(x=e(a)?a:d,x=e(b)?b:x,x&&typeof x[p]==m&&v.length){var A=v;for(v=[];y<A.length;y++)try{x[p]=A[y]}catch(B){}try{if(x[p]=f,x[p]!==f&&typeof x[p]==m)return j()}catch(B){}}if(!x){w={get:h,set:i,enumerable:q,configurable:r};try{s(a,p,w),k==typeof b[p]&&s(b,p,w)}catch(B){}}j()}(this,window,Object);
*/ 

/* Any JavaScript here will be loaded for all users on every page load. */

/*** Background ***/

if( $('#drawabackground').length ) {
   var champName = document.getElementById("championName").textContent;
   champName = champName.replace(/[^a-zA-Z]/g, "");
   $ ('.WikiaPageBackground').after('<div class="backdrop ' + champName + '"><div class="backdropfade"></div></div>')
}

/* Custom Tooltips for use with the Tooltips/code.js */
var tooltips_list = [
    {   classname: 'ability-icon',
        parse: '{'+'{Tooltip/Ability|champion=<#champion#>|ability=<#ability#>}}'},
    {   classname: 'buff-icon', 
        parse: '{'+'{Tooltip/Buff|<#param#>}}'},
    {   classname: 'champion-icon',
        parse: '{'+'{Tooltip/Champion|champion=<#champion#>|skin=<#skin#>|variant=<#variant#>}}'},
    {   classname: 'glossary',
        parse: '{'+'{Tooltip/Glossary|<#param#>}}'},
    {   classname: 'item-icon', 
        parse: '{'+'{Tooltip/Item|<#param#>}}'},
    {   classname: 'mastery-icon', 
        parse: '{'+'{Tooltip/Mastery|<#param#>}}'},
    {   classname: 'pp-tooltip',
        parse: '{'+'{Tooltip/Pp|<#size#>|<#values#>|values1=<#values1#>|values2=<#values2#>|label1=<#label1#>|label2=<#label2#>|displayformula=<#displayformula#>|useformula=<#useformula#>|key1=<#key1#>|key2=<#key2#>|start1=<#start1#>|start2=<#start2#>|end1=<#end1#>|end2=<#end2#>|round1=<#round1#>|round2=<#round2#>}}'},
    {   classname: 'pp-tooltip2',
        parse: '{'+'{Tooltip/Pp2|bot_values=<#bot_values#>|top_values=<#top_values#>|start=<#start#>|finish=<#finish#>|bot_label=<#bot_label#>|top_label=<#top_label#>|displayformula=<#displayformula#>|useformula=<#useformula#>|bot_key=<#bot_key#>|top_key=<#top_key#>|bot_round=<#bot_round#>|top_round=<#top_round#>|top_fill=<#top_fill#>}}'},
    {   classname: 'rune-icon', 
        parse: '{'+'{Tooltip/Rune|<#param#>}}'},
    {   classname: 'skin-icon', 
        parse: '{'+'{Tooltip/Skin|champion=<#champion#>|skin=<#skin#>|variant=<#variant#>}}'},
    {   classname: 'skinloading-icon', 
        parse: '{'+'{Tooltip/Skin/Loading|champion=<#champion#>|skin=<#skin#>|variant=<#variant#>}}'},
    {   classname: 'chroma-icon', 
        parse: '{'+'{Tooltip/Chroma|champion=<#champion#>|skin=<#skin#>|chromas=<#chromas#>}}'},
    {   classname: 'avatar-icon', 
        parse: '{'+'{Tooltip/Icon|<#param#>}}'},
    {   classname: 'esports-icon', 
        parse: '{'+'{Tooltip/Icon|<#param#>}}'},
    {   classname: 'ward-icon', 
        parse: '{'+'{Tooltip/Ward|<#param#>}}'},
    {   classname: 'spell-icon', 
        parse: '{'+'{Tooltip/Spell|<#param#>}}'},
    {   classname: 'channel-tooltip', 
        parse: '{'+'{Tooltip/Channel|<#param#>|interrupts=<#interrupts#>|damage=<#damage#>|disarm=<#disarm#>|root=<#root#>|nearsight=<#nearsight#>|silence=<#silence#>|death=<#death#>|attacking=<#attacking#>|casting=<#casting#>|abilities=<#abilities#>|items=<#items#>|consume=<#consume#>|moving=<#moving#>|spells=<#spells#>}}'},
    {   classname: 'sandbox-tooltip', 
        parse: '{'+'{Tooltip/Sandbox|<#v1#>|<#v2#>|<#v3#>|<#v4#>|<#v5#>|<#v6#>|v7=<#v7#>|v8=<#v8#>|v9=<#v9#>|v10=<#v10#>|v11=<#v11#>|v12=<#v12#>}}'},
    {   classname: 'tft-icon', 
        parse: '{'+'{Tooltip/TFT|<#param#>|set=<#set#>|type=<#type#>}}'},
    {   classname: 'rp-icon', 
        parse: '{'+'{Tooltip/RP|<#param#>}}'},
    {   classname: 'lor-tooltip', 
        parse: '{'+'{Tooltip/LOR|<#param#>}}'}
];
 
var tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true,
    noCSS: true
};

mw.loader.using( ['mediawiki.util', 'jquery.client'], function () {
/* Begin of mw.loader.using callback */

    /* Config for [[MediaWiki:Common.js/gridfiltering.js]] */
    wowRosterGridContainer = '#wow-grid';
    wowRosterGridFilters = {
        'search': 'search',
        'faction': ['- Faction -',
            ['Alliance','Alliance'],
            ['Horde','Horde']
        ],
        'gender': ['- Gender -',
            ['Female','♀ Female'],
            ['Male','♂ Male']
        ],
        'race': ['- Race -',
            ['Blood Elf','Blood Elf'],
            ['Dark Iron','Dark Iron Dwarf'],
            ['Draenei','Draenei'],
            ['Dwarf','Dwarf'],
            ['Gnome','Gnome'],
            ['Goblin','Goblin'],
            ['Highmountain','Highmountain Tauren'],
            ['Human','Human'],
            ['Kul Tiran','Kul Tiran'],
            ['Lightforged','Lightforged Draenei'],
            ['Maghar','Mag\'har Orc'],
            ['Mechagnome','Mechagnome'],
            ['Night Elf','Night Elf'],
            ['Nightborne','Nightborne Elf'],
            ['Orc','Orc'],
            ['Pandaren','Pandaren'],
            ['Tauren','Tauren'],
            ['Troll','Troll'],
            ['Undead','Undead'],
            ['Void Elf','Void Elf'],
            ['Vulpera','Vulpera'],
            ['Worgen','Worgen'],
            ['Zandalari','Zandalari Troll']
        ],
        'class': ['- Class -',
            ['DK','Death Knight'],
            ['DH','Demon Hunter'],
            ['DR','Druid'],
            ['HU','Hunter'],
            ['MA','Mage'],
            ['MO','Monk'],
            ['PA','Paladin'],
            ['PR','Priest'],
            ['RO','Rogue'],
            ['SH','Shaman'],
            ['TK','Tinker'],
            ['WL','Warlock'],
            ['WR','Warrior']
        ],
        'role': ['- Role -',
            ['Healer','Healer'],
            ['Melee','Melee DPS'],
            ['Ranged','Ranged DPS'],
            ['Tank','Tank'],
        ],
        'armour': ['- Armour -',
            ['Cloth','Cloth'],
            ['Leather','Leather'],
            ['Mail','Mail'],
            ['Plate','Plate'],
        ],
        'profession': ['- Profession -',
            ['Gathering','-- Gathering --'],
            ['Enchanting','Enchanting'],
            ['Fishing','Fishing'],
            ['Herbalism','Herbalism'],
            ['Mining','Mining'],
            ['Skinning','Skinning'],
            ['Production','-- Production --'],
            ['Alchemy','Alchemy'],
            ['Blacksmithing','Blacksmithing'],
            ['Cooking','Cooking'],
            ['Engineering','Engineering'],
            ['Inscription','Inscription'],
            ['Jewelcrafting','Jewelcrafting'],
            ['Leatherworking','Leatherworking'],
            ['Tailoring','Tailoring']
        ]
    };
    
/* End of mw.loader.using callback */
});