/* ここにあるすべてのJavaScriptは携帯機器版サイトの利用者に影響します */

var skinnom = mw.config.get('skin');
console.log("Skin: ",skinnom);

if ((skinnom === "mercury") || (skinnom === "fandommobile")) {
	var elements = document.getElementsByClassName('Desktop-nomi');

	for (var i = 0; i < elements.length; i++) {
		elements[i].style.display = 'none';
	}
}else{
	var elements = document.getElementsByClassName('Mobile-nomi');

	for (var i = 0; i < elements.length; i++) {
		elements[i].style.display = 'none';
	}
}