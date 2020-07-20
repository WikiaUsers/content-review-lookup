/*back to top***/
importScriptPage('BackToTopButton/code.js', 'dev');


/* Custom Tooltips for use with the Tooltips/code.js */
var tooltips_list = [
    {
        classname: 'shipsdata-equip',
        parse: '{|style="white-space:nowrap;"\n!Parameter:\n|<#parameter#>\n|-\n!Lc:\n|{'+'{lc:<#parameter#>}}\n|-\n!Uc:\n|{'+'{uc:<#parameter#>}}\n|-\n!PAGENAME:\n|{'+'{PAGENAME}}\n|}',
    }
];
 
var tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true
};