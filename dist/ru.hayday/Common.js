// События с заданиями: Список заданий
function addClickTaskEvent(elem) {
	var btn = elem.querySelector('button');
	btn.addEventListener("click", function() {
		var level = Number(elem.querySelector("input").value);
		if (level > 0) {
			var rows = document.querySelectorAll('#hidelevels tbody tr');
			for (var i = 0; i < rows.length; i++) {
				var minTxt = rows[i].querySelector("td:nth-child(3)").textContent.trim();
				//console.log(minTxt)
				var min;
				if (minTxt.includes('(')) {
					min = 36;
				} else {
					min = Number(minTxt);
				}
				var maxTxt = rows[i].querySelector("td:nth-child(4)").textContent.trim();
				var max = Number(maxTxt);
				if (max == 0) {
					max = 1000;
				}
			
				//console.log('min:' + min + ', max:' + max)
				if (level >= min && level <= max) {
					rows[i].style="display: table-row;";
				} else {
					rows[i].style="display: none;";
				}
			}
		}
	});
}
// украшения
function addClickDecos(elem, list) {
	var btn = elem.querySelector('button');
	var imgTypes = ['для заповедника', 'для фермы', 'за алмазы', 'заборы дорожки', 'за ваучеры', 'за монеты', 'награды', 'природа', 'сезонные', 'статуи'];
	btn.addEventListener('click', function(){
		var rows = document.querySelectorAll('#deco-changed tbody tr');
		rows.forEach(function(row){
			var cell = row.querySelector("td:nth-child(7)");
			var typesOfDeco = cell.querySelectorAll('a');
			var z = 1;
			typesOfDeco.forEach(function(link){
				var type = link.title.slice(10);
				var index = imgTypes.indexOf(type);
				if (list[index]) {
					z *= 0;
				}
			});
			if (z === 0 || !list.includes(true)) {
				row.style='display: table-row;';
			} else {
				row.style='display: none;';
			}
		});
	});
}

//сортировка заданий скачек 320
function derbyAutoSort(input) {
	//console.log(input);
	input.addEventListener("input", function(){
		//console.log("input");
		var level = +(input.value);
		if (level) {
			var tables = document.querySelectorAll(".derby-grid");
			//console.log(level);
			tables.forEach(function(table){
				var tasks = table.querySelectorAll('.derby-task');
				tasks.forEach(function(task){
					//console.log(task);
					var localLevel = +task.lastChild.lastChild.textContent;
					if (localLevel > level) {
						task.style.display = "none";
					} else {
						task.style.display = "flex";
					}
				});
			});
		}
		
	});
}

// добавление кнопок
if (document.body.className.includes('page-События_с_заданиями')) {
	var eventsInputLevel = document.querySelector("#inputlevel");
	eventsInputLevel.innerHTML = '<input type=number min=1 max=1000 style="width: 50px;" /><button class="game-button">Показать</button>';
	addClickTaskEvent(eventsInputLevel);
}

if (document.body.className.includes('page-Украшения')) {
	var decoImgActive = [false, false, false, false, false, false, false, false, false, false];
	
	var typesDecos = document.querySelectorAll('#deco-changer span.click-box');
	typesDecos.forEach(function(span, i) {
		span.addEventListener('click', function() {
			//alert(link.innerHTML);
			if (decoImgActive[i]) {
				decoImgActive[i] = false;
				span.style.background = 'transparent';
			} else {
				decoImgActive[i] = true;
				span.style.background = '#88888830';
			}
		});
	});
	var decoSubmit = document.querySelector('#deco-changer #deco-button');
	decoSubmit.innerHTML = '<button class="game-button">Показать</button>';
	addClickDecos(decoSubmit, decoImgActive);
}

if (document.body.className.includes('page-Скачки')) {
	var derbySortSpan = document.createElement("span");
	derbySortSpan.id = "derby-sort";
	derbySortSpan.style = "float: right;";
	var derbySortTxt = document.createTextNode("Введите ваш уровень: ");
	var derbyInput = document.createElement("input");
	derbyInput.type = "number";
	derbyInput.min = 1;
	derbyInput.max = 1000;
	derbyInput.style.width = "50px";
	derbySortSpan.append(derbySortTxt, derbyInput);
	
	var derbyPlace = document.querySelectorAll(".derby-grid")[0];
	derbyPlace.before(derbySortSpan);
	derbyPlace.style.clear = "right";
	
	//console.log(derbyPlace, derbySortSpan);
	
	derbyAutoSort(derbyInput);
}

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