importArticles({
    type: 'script',
    articles: [
        'u:dev:LastEdited/code.js',
    ]
});

var background1 = "http://i.imgur.com/qkm8EJN.jpg";
var background2 = "http://i.imgur.com/YW2jhVD.jpg"
var background3 = "http://i.imgur.com/y7jsVFC.jpg"
var background4 = "http://i.imgur.com/FxEyzFg.jpg"
var background5 = "http://i.imgur.com/f5ZeirT.jpg"
var background6 = "http://i.imgur.com/QL9AUBw.jpg"
var min = 1;
var max = 7;
var number = Math.floor(Math.random() * (max - min)) + min;
var $background = "$background" + number;

$('.mediawiki').css('background', 'url("http://i.imgur.com/qkm8EJN.jpg") !important' );