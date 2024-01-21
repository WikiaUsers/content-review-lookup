// События с заданиями: Список заданий
var inputLevel = document.querySelector("#inputlevel");
if (inputLevel) {
inputLevel.innerHTML = '<input type=number min=1 max=1000 style="width: 50px;" /><button>Показать</button>';


document.querySelector("#inputlevel button").onclick = function() {
	//document.querySelector('#hidelevels').innerHTML = 'test';
	var level = Number(document.querySelector("#inputlevel input").value);
	if (level > 0) {
		var rows = document.querySelectorAll('#hidelevels tbody tr');
		for (var i = 0; i < rows.length; i++) {
			var minTxt = rows[i].querySelector("td:nth-child(3)").textContent.trim();
			//console.log(minTxt)
			if (minTxt.includes('(')) {
				var min = 36;
			} else {
				var min = Number(minTxt);
			}
			var maxTxt = rows[i].querySelector("td:nth-child(4)").textContent.trim();
			var max = Number(maxTxt);
			if (max == 0) {
				max = 1000;
			}
			
			//console.log('min:' + min + ', max:' + max)
			if (level >= min && level <= max) {
				rows[i].style="display: table-row;"
			} else {
				rows[i].style="display: none;"
			}
		}
	}
}}
//noimage
var linksToNewImg = document.querySelectorAll('.mw-parser-output a');
//console.log(linksToNewImg);
if (linksToNewImg) {
for (var i = 0; i < linksToNewImg.length; i++) {
	//var title = linksToNewImg[i].title;
	var href = linksToNewImg[i].href;
	//console.log(title);
	if (href.includes('wpDestFile=')){
		//console.log(true);
		linksToNewImg[i].innerHTML = '<img src="https://static.wikia.nocookie.net/hayday/images/7/7d/Нет_картинки.gif/revision/latest?cb=20231204095429&format=original&path-prefix=ru" style="width:150px; height:auto;" alt="Нет картинки" />';
		//var ret = document.createElement('img');
		//ret.src = 'https://static.wikia.nocookie.net/hayday/images/7/7d/Нет_картинки.gif/revision/latest?cb=20231204091935&format=original&path-prefix=ru';
		//ret.width = 150;
		//linksToNewImg[i].replaceWith();
	}
}}



// linkJs 
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Links.js'
    ]
});
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = 'https://static.wikia.nocookie.net/hayday/images/e/ed/Загрузка.gif/revision/latest?cb=20231127121344&format=original&path-prefix=ru';
window.pPreview.defimage = 'https://static.wikia.nocookie.net/hayday/images/e/ed/Загрузка.gif/revision/latest?cb=20231127121344&format=original&path-prefix=ru';
window.pPreview.RegExp.noinclude = ['.ignor', '.portable-infobox', '.sobytie .item p'];
window.pPreview.delay = 1000;
window.pPreview.tlen = 200;
window.pPreview.RegExp.iimages = [new RegExp('.*')];