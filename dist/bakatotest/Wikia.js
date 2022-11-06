/*Social Icons*/
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "default"
};
importScriptPage('SocialIcons/code.js','dev');
/*Ends Social Icons*/

/* Randomize wiki logo*/
$(function() {
    var images = [
'https://images.wikia.nocookie.net/__cb20141203034405/bakatotest/images/d/d9/Baka_to_test_winter_logo.png',
'https://images.wikia.nocookie.net/__cb20141203034322/bakatotest/images/8/89/Wiki-wordmark.png'
];
 
    $('h1.wordmark a img').attr('src', images[Math.floor(Math.random() * images.length)]);
});
/* Ends randomized wiki logo */