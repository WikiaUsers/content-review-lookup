/* ここにあるすべてのJavaScriptは、すべてのページ読み込みですべての利用者に対して読み込まれます */

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