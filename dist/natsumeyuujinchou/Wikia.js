/* Social media buttons */

var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark",
	buttonSize: "default"
};
importScriptPage('SocialIcons/code.js','dev');
 
var SocialMediaButtonsNamespaces = [0, 6, 14, 500, 1201];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "default",
	wikiTwitterAccount: "default"
};


/* Randomize wiki logo*/
$(function() {
    var images = [
 'https://images.wikia.nocookie.net/__cb20140615155225/natsumeyuujinchou/images/5/56/Natsume_yuujinchou_logo1.png',
 'https://images.wikia.nocookie.net/__cb20140615155225/natsumeyuujinchou/images/9/91/Natsume_yuujinchou_logo2.png',
 'https://images.wikia.nocookie.net/__cb20140615155229/natsumeyuujinchou/images/a/a3/Natsume_yuujinchou_logo3.png',
 'https://images.wikia.nocookie.net/__cb20140925025134/natsumeyuujinchou/images/e/e6/Natsume_yuujinchou_logo5.png',
 'https://images.wikia.nocookie.net/__cb20140925025135/natsumeyuujinchou/images/e/e4/Natsume_yuujinchou_logo6.png',
 'https://images.wikia.nocookie.net/__cb20140925025136/natsumeyuujinchou/images/6/65/Natsume_yuujinchou_logo7.png',
 'https://images.wikia.nocookie.net/__cb20140925025136/natsumeyuujinchou/images/1/19/Natsume_yuujinchou_logo8.png',
 'https://images.wikia.nocookie.net/natsumeyuujinchou/images/5/5d/Natsume_blue_logo.png',
 'https://images.wikia.nocookie.net/__cb25/natsumeyuujinchou/images/8/89/Wiki-wordmark.png'
];
 
    $('h1.wordmark a img').attr('src', images[Math.floor(Math.random() * images.length)]);
});
 
/* Ends randomized wiki logo */