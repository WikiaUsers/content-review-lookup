$(document).ready(function()
{
    if (wgPageName == "Custom_Armor_Set_Comparison") {
        importScript("MediaWiki:CustomArmorSet.js");
    }
    
    if (wgPageName == "Armor_Piece_Comparison") {
        importScript("MediaWiki:ArmorSearch.js");
    }
});

/*****************/
/*** MAIN PAGE ***/
/*****************/

if (wgPageName == "Dark_Souls_Wiki") {
    document.getElementById("mw-content-text").style.padding = "0px";
    importScript("MediaWiki:Portal.js");
}