// Автор Equazcion: http://terraria.gamepedia.com/User:Equazcion
 
$(function(){

if (window.location.hash.length > 0){
	var hash = window.location.hash.replace(/^#/, '');
	var element = document.getElementById(hash);
	flash($(element));
}

window.onhashchange = function () {
	var hash = window.location.hash.replace(/^#/, '');
	var element = document.getElementById(hash);
	flash($(element));
}
var hash;

function findFlashable(obj){
	var flashable = [  'p', 'tr', 'h1', 'h2', 'h3', 'h4', 'h5', 'li', 'div' ];
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

	// Проверяет возможность подсветки элемента, иначе подсвечивает родительский элемент
	var obj = findFlashable(obj);

	// Если элемент уже подсвечен, возвращает его к фоновому цвету, который был до этого
	var $flashed = $('.flashed');
	var scrub = $flashed.attr('data-oldBg');
	$flashed.css('background-color',scrub);

	// Запоминает старый цвет фона в атрибутивной таблице элемента, где подсвечивается
	var oldBg = obj.css('background-color');
	obj.addClass('flashed').attr('data-oldBg',oldBg);

	// Подсветка элемента
	obj.css('transition','');
	obj.css('background-color','#fff');
		setTimeout(function(){
		obj.css('transition','background-color 150ms ease-in');
		obj.css('background-color','#66CCFF');
		setTimeout(function(){
			obj.css('transition','background-color 1000ms ease-out');
			setTimeout(function(){
				obj.css('background','#FFE3D5');
				setTimeout(function(){
					obj.css('transition','');
				},1000);
			},20);
		},150);
	},1);
}

});