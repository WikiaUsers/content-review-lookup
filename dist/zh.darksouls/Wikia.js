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


/************************/
/*** CATEGORY SORTING ***/
/************************/

if ((wgPageName == "Category:Dark_Souls:_Standard_Weapons") || (wgPageName == "Category:Dark_Souls:_Unique_Weapons") || (wgPageName == "Category:Dark_Souls:_Demon_Weapons") || (wgPageName == "Category:Dark_Souls:_Dragon_Weapons")) {
    $("td h3").filter(function() { return $(this).text() === "A"; }).html("Axes");
    $("td h3").filter(function() { return $(this).text() === "B"; }).html("Bows");
    $("td h3").filter(function() { return $(this).text() === "C"; }).html("Crossbows");
    $("td h3").filter(function() { return $(this).text() === "D"; }).html("Curved Greatswords");
    $("td h3").filter(function() { return $(this).text() === "E"; }).html("Curved Swords");
    $("td h3").filter(function() { return $(this).text() === "F"; }).html("Daggers");
    $("td h3").filter(function() { return $(this).text() === "G"; }).html("Gauntlets");
    $("td h3").filter(function() { return $(this).text() === "H"; }).html("Great Hammers");
    $("td h3").filter(function() { return $(this).text() === "I"; }).html("Greataxes");
    $("td h3").filter(function() { return $(this).text() === "J"; }).html("Greatswords");
    $("td h3").filter(function() { return $(this).text() === "K"; }).html("Halberds");
    $("td h3").filter(function() { return $(this).text() === "K cont."; }).html("Halberds cont.");
    $("td h3").filter(function() { return $(this).text() === "L"; }).html("Hammers");
    $("td h3").filter(function() { return $(this).text() === "M"; }).html("Katanas");
    $("td h3").filter(function() { return $(this).text() === "N"; }).html("Spears");
    $("td h3").filter(function() { return $(this).text() === "O"; }).html("Straight Swords");
    $("td h3").filter(function() { return $(this).text() === "O cont."; }).html("Straight Swords cont.");
    $("td h3").filter(function() { return $(this).text() === "P"; }).html("Thrusting Swords");
    $("td h3").filter(function() { return $(this).text() === "Q"; }).html("Ultra Greatswords");
    $("td h3").filter(function() { return $(this).text() === "R"; }).html("Whips");
    $("td h3").filter(function() { return $(this).text() === "R cont."; }).html("Whips cont.");
    $("td h3").filter(function() { return $(this).text() === "S"; }).html("Small Shields");
    $("td h3").filter(function() { return $(this).text() === "T"; }).html("Medium Shields");
    $("td h3").filter(function() { return $(this).text() === "U"; }).html("Greatshields");
}

var SocialMediaButtons = { 
 position: "bottom",
 colorScheme: "color",
 buttonSize: "55px"
};
importScriptPage('SocialIcons/code.js','dev');