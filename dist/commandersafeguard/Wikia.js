/* Randomize wiki logo*/
$(function() {
    var images = [
 'https://images.wikia.nocookie.net/__cb20140618163032/commandersafeguard/images/9/9f/Commander_safeguard_logo.png',
 'https://images.wikia.nocookie.net/__cb20140618163032/commandersafeguard/images/2/2f/Commander_safeguard_logo2.png',
 'https://images.wikia.nocookie.net/__cb20140618163033/commandersafeguard/images/5/5d/Commander_safeguard_logo3.png',
 'https://images.wikia.nocookie.net/__cb20140618163033/commandersafeguard/images/c/c6/Commander_safeguard_logo4.png',
 'https://images.wikia.nocookie.net/__cb20140618163033/commandersafeguard/images/4/47/Commander_safeguard_logo5.png',
 'https://images.wikia.nocookie.net/__cb20/commandersafeguard/images/8/89/Wiki-wordmark.png'
];
 
    $('h1.wordmark a img').attr('src', images[Math.floor(Math.random() * images.length)]);
});
 
/* Ends randomized wiki logo */