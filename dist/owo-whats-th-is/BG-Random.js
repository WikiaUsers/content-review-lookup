// The base code is courtesy of BranDaniMB

var wallpaper = ["https://images4.alphacoders.com/735/thumb-1920-73558.jpg","http://blog.hdwallsource.com/wp-content/uploads/2016/03/wonderful-anime-city-wallpaper-42585-43595-hd-wallpapers.jpg"];
var bg = wallpaper[Math.floor(Math.random() * wallpaper.length)];

$('.mediawiki').css({
   'background-image' : 'url("'+bg+'")',
   'background-color' : '#000',
   'background-size' : 'cover',
   'background-attachment' : 'fixed',
   'background-repeat' : 'no-repeat'
});