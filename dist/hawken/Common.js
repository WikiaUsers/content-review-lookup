/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: 'script',
    articles: [
        //...
        'w:c:dev:DISPLAYTITLE/code.js',
        //...
    ]
});

//Mech Calculator
//importScript('MediaWiki:Common.js/MechCalculator.js');

//START OF MECH EXTRAS POPUP WINDOWS - MECH PAGES ONLY
$('#show').click(function () {
var $popup = $('#popup'),
display = $popup.css('display');
$popup.css('display', 'block');
var $fade = $('#fade'),
display = $fade.css('display');
$fade.css('display', 'block');
});
$('#hide').click(function () {
var $popup = $('#popup'),
display = $popup.css('display');
$popup.css('display', 'none');
var $fade = $('#fade'),
display = $fade.css('display');
$fade.css('display', 'none');
});
$('#parts').click(function () {
var $partsContainer = $('#partsContainer'),
display = $partsContainer.css('display');
$partsContainer.css('display', 'block');
});
$('#exitParts').click(function () {
var $partsContainer = $('#partsContainer'),
display = $partsContainer.css('display');
$partsContainer.css('display', 'none');
});
//END OF MECH EXTRAS POPUP WINDOWS

//START OF MECH PARTS STOCK/ELITE SWAP - MECH PAGES ONLY
$('#swapStock').click(function () {
var $stock = $('#stock'),
display = $stock.css('display');
$stock.css('display', 'none');
var $elite = $('#elite'),
display = $elite.css('display');
$elite.css('display', 'block');
var $swapElite = $('#swapElite'),
display = $swapElite.css('display');
$swapElite.css('display', 'block');
var $swapStock = $('#swapStock'),
display = $swapStock.css('display');
$swapStock.css('display', 'none');
});
$('#swapElite').click(function () {
var $stock = $('#stock'),
display = $stock.css('display');
$stock.css('display', 'block');
var $elite = $('#elite'),
display = $elite.css('display');
$elite.css('display', 'none');
var $swapStock = $('#swapStock'),
display = $swapStock.css('display');
$swapStock.css('display', 'block');
var $swapElite = $('#swapElite'),
display = $swapElite.css('display');
$swapElite.css('display', 'none');
});
//END OF MECH PARTS STOCK/ELITE SWAP

//START OF MECH SELECTOR POPUP WINDOW - MECH PAGES ONLY (NOW DEFUNCT DUE TO DEATH OF VERBATIM)
/*$('#all').click(function () {
var $mechs = $('#mechs'),
display = $mechs.css('display');
$mechs.css('display', 'block');
var $fade = $('#fade'),
display = $fade.css('display');
$fade.css('display', 'block');
});
$('#close').click(function () {
var $mechs = $('#mechs'),
display = $mechs.css('display');
$mechs.css('display', 'none');
var $fade = $('#fade'),
display = $fade.css('display');
$fade.css('display', 'none');
});
$('#topNavAll').click(function () {
var $mechsTop = $('#mechsTop'),
display = $mechsTop.css('display');
$mechsTop.css('display', 'block');
var $fade = $('#fade'),
display = $fade.css('display');
$fade.css('display', 'block');
});
$('#closeTop').click(function () {
var $mechsTop = $('#mechsTop'),
display = $mechsTop.css('display');
$mechsTop.css('display', 'none');
var $fade = $('#fade'),
display = $fade.css('display');
$fade.css('display', 'none');
});*/
//END OF MECH SELECTOR POPUP WINDOW

//START OF QUICK NAVIGATION SHOW/HIDE FUNCTION
$('#hideQuickNav').click(function () {
var $content = $('#content'),
display = $content.css('display');
$content.css('display', 'none');
var $showQuickNav = $('#showQuickNav'),
display = $showQuickNav.css('display');
$showQuickNav.css('display', 'block');
});
$('#showQuickNav').click(function () {
var $content = $('#content'),
display = $content.css('display');
$content.css('display', 'block');
var $showQuickNav = $('#showQuickNav'),
display = $showQuickNav.css('display');
$showQuickNav.css('display', 'none');
});
//END OF QUICK NAVIGATION SHOW/HIDE FUNCTION