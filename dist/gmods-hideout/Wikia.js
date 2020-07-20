var background = [
    '#06030c url(https://images.wikia.nocookie.net/robyns-little-land/images/0/0b/WikiBackground.png) 50% -30px/cover no-repeat fixed',
	'url("https://images.wikia.nocookie.net/robyns-little-land/images/5/5c/WikiBackground2.jpg") 0 0 / cover no-repeat fixed rgb(6, 3, 12)'
	];
	
var final = background[Math.floor(Math.random() * background.length)];
$('body.skin-oasis').css({
   'background' : final
});