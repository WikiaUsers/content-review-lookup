//События с заданиями: Список заданий
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
	var imgTypes = ['для заповедника', 'для фермы', 'за алмазы', 'заборы дорожки', 'за ваучеры', 'за монеты', 'награды', 'природа', 'сезонные', 'статуи'];
	elem.addEventListener('click', function(){
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
					var localLevel = +task.lastChild.lastChild.firstChild.textContent;
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
	var taskTable = document.querySelector("#hidelevels");
	var btnCon = document.createElement("span");
	btnCon.style = "float: right;";
	btnCon.innerHTML = 'Введите ваш текущий уровень: <input type="number" min="1" max="1000" style="width: 50px;"><button class="game-button">Показать</button>';
	taskTable.before(btnCon);
	addClickTaskEvent(btnCon);
}

if (document.body.className.includes('page-Украшения')) {
	var decoImgActive = [false, false, false, false, false, false, false, false, false, false];
	var decoTable = document.querySelector("#deco-changed");
	var decoChanger = document.createElement("span");
	decoChanger.id = "deco-changer";
	decoChanger.style = "float: right;";
	decoChanger.innerHTML = 'Выберите, какие типы украшений показать:<span class="click-box"><img alt="Украшения для заповедника" src="https://static.wikia.nocookie.net/hayday/images/1/17/%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B4%D0%BB%D1%8F_%D0%B7%D0%B0%D0%BF%D0%BE%D0%B2%D0%B5%D0%B4%D0%BD%D0%B8%D0%BA%D0%B0.png/revision/latest?cb=20231031062423&amp;path-prefix=ru" decoding="async" loading="lazy" width="139" height="125" data-image-name="Украшения для заповедника.png" data-image-key="%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B4%D0%BB%D1%8F_%D0%B7%D0%B0%D0%BF%D0%BE%D0%B2%D0%B5%D0%B4%D0%BD%D0%B8%D0%BA%D0%B0.png" data-relevant="0" data-src="https://static.wikia.nocookie.net/hayday/images/1/17/%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B4%D0%BB%D1%8F_%D0%B7%D0%B0%D0%BF%D0%BE%D0%B2%D0%B5%D0%B4%D0%BD%D0%B8%D0%BA%D0%B0.png/revision/latest?cb=20231031062423&amp;path-prefix=ru" class=" ls-is-cached lazyloaded"></span><span class="click-box"><img alt="Украшения для фермы" src="https://static.wikia.nocookie.net/hayday/images/c/cb/%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B4%D0%BB%D1%8F_%D1%84%D0%B5%D1%80%D0%BC%D1%8B.png/revision/latest?cb=20231031062438&amp;path-prefix=ru" decoding="async" loading="lazy" width="155" height="150" data-image-name="Украшения для фермы.png" data-image-key="%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B4%D0%BB%D1%8F_%D1%84%D0%B5%D1%80%D0%BC%D1%8B.png" data-relevant="1" data-src="https://static.wikia.nocookie.net/hayday/images/c/cb/%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B4%D0%BB%D1%8F_%D1%84%D0%B5%D1%80%D0%BC%D1%8B.png/revision/latest?cb=20231031062438&amp;path-prefix=ru" class=" ls-is-cached lazyloaded"></span><span class="click-box"><img alt="Украшения за алмазы" src="https://static.wikia.nocookie.net/hayday/images/e/e9/%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B7%D0%B0_%D0%B0%D0%BB%D0%BC%D0%B0%D0%B7%D1%8B.png/revision/latest?cb=20231031062453&amp;path-prefix=ru" decoding="async" loading="lazy" width="152" height="121" data-image-name="Украшения за алмазы.png" data-image-key="%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B7%D0%B0_%D0%B0%D0%BB%D0%BC%D0%B0%D0%B7%D1%8B.png" data-relevant="0" data-src="https://static.wikia.nocookie.net/hayday/images/e/e9/%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B7%D0%B0_%D0%B0%D0%BB%D0%BC%D0%B0%D0%B7%D1%8B.png/revision/latest?cb=20231031062453&amp;path-prefix=ru" class=" ls-is-cached lazyloaded"></span><span class="click-box"><img alt="Украшения заборы дорожки" src="https://static.wikia.nocookie.net/hayday/images/a/a1/%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B7%D0%B0%D0%B1%D0%BE%D1%80%D1%8B_%D0%B4%D0%BE%D1%80%D0%BE%D0%B6%D0%BA%D0%B8.png/revision/latest?cb=20231031062509&amp;path-prefix=ru" decoding="async" loading="lazy" width="148" height="145" data-image-name="Украшения заборы дорожки.png" data-image-key="%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B7%D0%B0%D0%B1%D0%BE%D1%80%D1%8B_%D0%B4%D0%BE%D1%80%D0%BE%D0%B6%D0%BA%D0%B8.png" data-relevant="1" data-src="https://static.wikia.nocookie.net/hayday/images/a/a1/%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B7%D0%B0%D0%B1%D0%BE%D1%80%D1%8B_%D0%B4%D0%BE%D1%80%D0%BE%D0%B6%D0%BA%D0%B8.png/revision/latest?cb=20231031062509&amp;path-prefix=ru" class=" ls-is-cached lazyloaded"></span><span class="click-box"><img alt="Украшения за ваучеры" src="https://static.wikia.nocookie.net/hayday/images/a/ab/%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B7%D0%B0_%D0%B2%D0%B0%D1%83%D1%87%D0%B5%D1%80%D1%8B.png/revision/latest?cb=20231031062525&amp;path-prefix=ru" decoding="async" loading="lazy" width="137" height="155" data-image-name="Украшения за ваучеры.png" data-image-key="%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B7%D0%B0_%D0%B2%D0%B0%D1%83%D1%87%D0%B5%D1%80%D1%8B.png" data-relevant="1" data-src="https://static.wikia.nocookie.net/hayday/images/a/ab/%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B7%D0%B0_%D0%B2%D0%B0%D1%83%D1%87%D0%B5%D1%80%D1%8B.png/revision/latest?cb=20231031062525&amp;path-prefix=ru" class=" ls-is-cached lazyloaded"></span><span class="click-box"><img alt="Украшения за монеты" src="https://static.wikia.nocookie.net/hayday/images/3/31/%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B7%D0%B0_%D0%BC%D0%BE%D0%BD%D0%B5%D1%82%D1%8B.png/revision/latest?cb=20231031062543&amp;path-prefix=ru" decoding="async" loading="lazy" width="128" height="115" data-image-name="Украшения за монеты.png" data-image-key="%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B7%D0%B0_%D0%BC%D0%BE%D0%BD%D0%B5%D1%82%D1%8B.png" data-relevant="0" data-src="https://static.wikia.nocookie.net/hayday/images/3/31/%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B7%D0%B0_%D0%BC%D0%BE%D0%BD%D0%B5%D1%82%D1%8B.png/revision/latest?cb=20231031062543&amp;path-prefix=ru" class=" ls-is-cached lazyloaded"></span><span class="click-box"><img alt="Украшения награды" src="https://static.wikia.nocookie.net/hayday/images/e/e4/%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D0%BD%D0%B0%D0%B3%D1%80%D0%B0%D0%B4%D1%8B.png/revision/latest?cb=20231031062557&amp;path-prefix=ru" decoding="async" loading="lazy" width="145" height="156" data-image-name="Украшения награды.png" data-image-key="%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D0%BD%D0%B0%D0%B3%D1%80%D0%B0%D0%B4%D1%8B.png" data-relevant="1" data-src="https://static.wikia.nocookie.net/hayday/images/e/e4/%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D0%BD%D0%B0%D0%B3%D1%80%D0%B0%D0%B4%D1%8B.png/revision/latest?cb=20231031062557&amp;path-prefix=ru" class=" ls-is-cached lazyloaded"></span><span class="click-box"><img alt="Украшения природа" src="https://static.wikia.nocookie.net/hayday/images/0/05/%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D0%BF%D1%80%D0%B8%D1%80%D0%BE%D0%B4%D0%B0.png/revision/latest?cb=20231031062650&amp;path-prefix=ru" decoding="async" loading="lazy" width="124" height="157" data-image-name="Украшения природа.png" data-image-key="%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D0%BF%D1%80%D0%B8%D1%80%D0%BE%D0%B4%D0%B0.png" data-relevant="0" data-src="https://static.wikia.nocookie.net/hayday/images/0/05/%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D0%BF%D1%80%D0%B8%D1%80%D0%BE%D0%B4%D0%B0.png/revision/latest?cb=20231031062650&amp;path-prefix=ru" class=" ls-is-cached lazyloaded"></span><span class="click-box"><img alt="Украшения сезонные" src="https://static.wikia.nocookie.net/hayday/images/7/7a/%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D1%81%D0%B5%D0%B7%D0%BE%D0%BD%D0%BD%D1%8B%D0%B5.png/revision/latest?cb=20231031062707&amp;path-prefix=ru" decoding="async" loading="lazy" width="129" height="137" data-image-name="Украшения сезонные.png" data-image-key="%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D1%81%D0%B5%D0%B7%D0%BE%D0%BD%D0%BD%D1%8B%D0%B5.png" data-relevant="0" data-src="https://static.wikia.nocookie.net/hayday/images/7/7a/%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D1%81%D0%B5%D0%B7%D0%BE%D0%BD%D0%BD%D1%8B%D0%B5.png/revision/latest?cb=20231031062707&amp;path-prefix=ru" class=" ls-is-cached lazyloaded"></span><span class="click-box"><img alt="Украшения статуи" src="https://static.wikia.nocookie.net/hayday/images/7/7b/%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D1%81%D1%82%D0%B0%D1%82%D1%83%D0%B8.png/revision/latest?cb=20231031063257&amp;path-prefix=ru" decoding="async" loading="lazy" width="105" height="163" data-image-name="Украшения статуи.png" data-image-key="%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D1%81%D1%82%D0%B0%D1%82%D1%83%D0%B8.png" data-relevant="0" data-src="https://static.wikia.nocookie.net/hayday/images/7/7b/%D0%A3%D0%BA%D1%80%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D1%8F_%D1%81%D1%82%D0%B0%D1%82%D1%83%D0%B8.png/revision/latest?cb=20231031063257&amp;path-prefix=ru" class=" ls-is-cached lazyloaded"></span><span id="deco-button"><button class="game-button">Показать</button></span>';
	decoTable.before(decoChanger);
	
	var typesDecos = decoChanger.querySelectorAll('span.click-box');
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
	var decoSubmit = decoChanger.querySelector('#deco-button button');
	//decoSubmit.innerHTML = '<button class="game-button">Показать</button>';
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

//интересные факты заглавная
function hideFact(fact) {
	fact.style.display="none";
	fact.style.left="0";
	fact.style.zIndex="1";
}
function updateFact(facts, oldIndx){
	facts[oldIndx].style.left="300px";
	facts[oldIndx].style.zIndex="100";
	randIndx = Math.floor(Math.random()*facts.length);
	console.log(randIndx);
	while (randIndx === oldIndx) {
		randIndx = Math.floor(Math.random()*facts.length);
		console.log(randIndx);
	}
	facts[randIndx].style.display="block";
	setTimeout(hideFact, 1000, facts[oldIndx]);
	setTimeout(updateFact, 15000, facts, randIndx);
}

var facts = document.querySelectorAll(".mainpage-fact");

if (facts.length>0) {
	var factError = document.querySelector(".mainpage-fact-error");
	factError.style.display = "none";
	var randIndx=Math.floor(Math.random()*facts.length);
	console.log(randIndx);
	facts[randIndx].style.display="block";
	setTimeout(updateFact, 15000, facts, randIndx);
}


//noimage
var linksToNewImg = document.querySelectorAll('.mw-parser-output a');
//console.log(linksToNewImg);
if (linksToNewImg.length>0) {
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

// События с заданиями: эффект мыши
if (document.body.className.includes('page-События_с_заданиями')) {
	var sobytieRoads = document.querySelectorAll(".sobytie .road");
	sobytieRoads.forEach(function(road){
		var roadPolosa = road.querySelector(".polosa");
		var points = road.querySelectorAll(".points");
		
		var nowPoint = document.createElement("div");
		nowPoint.className = "now-point hayday";
		nowPoint.style.left="-50px";
		nowPoint.innerHTML = '<svg width="20px" height="13px"><polygon points="0,13 10,0 20,13" fill="white"/></svg>';
		var nowPointText = document.createTextNode("0");
		nowPoint.append(nowPointText);
		road.append(nowPoint);
		
		var numPoint = 0;
		road.addEventListener("pointermove", function(){
			var rect = road.getBoundingClientRect();
			var mouseX = event.pageX-rect.left+road.scrollLeft;
			roadPolosa.style.width=mouseX+"px";
			nowPoint.style.left = (Math.floor(mouseX)-25)+"px";
			
			if (mouseX<150){
				numPoint = Math.floor((points[0].textContent / 150)*mouseX);
			} else if (mouseX > (points.length-1)*300+150) {
				numPoint = points[points.length-1].textContent;
			} else {
				var i = Math.floor((mouseX-150)/300);
				numPoint = Math.floor(((+points[i+1].textContent-Number(points[i].textContent))/300)*(mouseX-i*300-150)+Number(points[i].textContent));
			}
			//console.log(numPoint, points[0].textContent, mouseX);
			nowPointText.textContent = String(numPoint);
		});
		
		road.addEventListener("pointerout", function(){
			roadPolosa.style.width="100%";
			nowPointText.textContent = "0";
			nowPoint.style.left = "-50px";
		});
	});
}


// linkJs 
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Links.js'
    ]
});
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = 'https://static.wikia.nocookie.net/hayday/images/7/7d/Нет_картинки.gif/revision/latest?cb=20231204095429&format=original&path-prefix=ru';
window.pPreview.defimage = 'https://static.wikia.nocookie.net/hayday/images/e/ed/Загрузка.gif/revision/latest?cb=20231127121344&format=original&path-prefix=ru';
window.pPreview.RegExp.noinclude = ['.ignor', '.portable-infobox', '.sobytie .item p'];
window.pPreview.delay = 1000;
window.pPreview.tlen = 200;
window.pPreview.apid = false;
window.pPreview.RegExp.iimages = ['Xp.png', 'Монета.png', 'Алмаз.png', 'Ваучеры.png', 'Часы.png', 'Репутация.png', 'Помогите.gif'];