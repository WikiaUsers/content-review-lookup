// By Equazcion: https://terraria.fandom.com/wiki/UserProfile:Equazcion
 
if (window.location.hash.length > 0){
	var hash = window.location.hash.replace(/\./g,'\\.');
	flash($(hash));
} 

window.onhashchange = function () {
	var hash = window.location.hash.replace(/\./g,'\\.');
	flash($(hash));
}
var hash;

function findFlashable(obj){ 
	var flashable = [ 'tr', 'h1', 'h2', 'h3', 'h4', 'h5', 'li', 'div' ];
	if ($.inArray(obj.prop('tagName'), flashable) < 0){ 
		var newObj;
		$.each(flashable, function(data, val){
			newObj = obj.closest(val); 
			if (newObj.length > 0) { return false; }
		});
		return newObj;
	} else {
		return obj;
	}
}

function flash(obj){
	
	var supplied = obj;
	
	// Check if the element is suitable for flashing, otherwise find a suitable parent 
	var obj = findFlashable(obj);

	// If an element is already flashed, revert it to its prior background color
	var $flashed = $('.flashed');
	var scrub = $flashed.attr('data-oldBg');
	$flashed.css('background-color',scrub);

	// Record old background color in a data attribute of the element we're about to flash 
	var oldBg = obj.css('background-color');
	obj.addClass('flashed').attr('data-oldBg',oldBg);

	// Flash the element
	obj.css('transition','');
	obj.css('background-color','#fff');
		setTimeout(function(){
		obj.css('transition','background-color 150ms ease-in'); 
		obj.css('background-color','#66CCFF');
		setTimeout(function(){
			obj.css('transition','background-color 1000ms ease-out'); 
			setTimeout(function(){
				obj.css('background','#FFBE46'); 
				setTimeout(function(){
					obj.css('transition','background-color 1000ms ease-out');
					obj.css('background-color', oldBg);
				},4000);
			},20);
		},150);
	},1);
}