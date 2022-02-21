/* Any JavaScript here will be loaded for all users on every page load. */

/* FlashAnchored script (slightly modified), from terraria.fandom.com */

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

	// Flash the element
	obj.css('transition','');
	obj.css('box-shadow', '');
	setTimeout(function(){
		obj.css('transition','box-shadow 1000ms ease-in'); 
		obj.css('box-shadow','0 0 10px var(--theme-page-text-color)');
		setTimeout(function(){
			obj.css('transition', 'box-shadow 1000ms ease-in');
			obj.css('box-shadow', '');
		},3000);
	},1);
}