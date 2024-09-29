console.log(document.body);

//проверка body
var intervaleditCount = setInterval(editcountcalc, 500);

function editcountcalc(){if (document.body) {clearInterval(intervaleditCount);


// добавление кнопок
//события с заданиями
if (document.body.className.includes('page-События_с_заданиями')) {
	var taskTable = document.querySelector("#hidelevels");
	var btnCon = document.createElement("span");
	btnCon.style = "float: right;";
	btnCon.innerHTML = 'Введите ваш текущий уровень: <input type="number" min="1" max="1000" style="width: 50px;"><button class="game-button">Показать</button>';
	taskTable.before(btnCon);
	addClickTaskEvent(btnCon);
	
	/* функции */
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

}

//украшения
if (document.body.className.includes('page-Украшения')) {
	var decoTable = $("#deco-changed");
	var rows = $('#deco-changed>tbody>tr');
	var sorter = $('<div id="#deco-sorter">Выберите тэги:<br>'+
	'<span class="checker-tag"><input type="checkbox" id="tag-nature"/><label for="tag-nature"> Природа<img src="https://static.wikia.nocookie.net/hayday/images/0/05/Украшения_природа.png/revision/latest?cb=20231031062650&path-prefix=ru" title="Природа"/></label></span><br>'+
	'<span class="checker-tag"><input type="checkbox" id=""/><label for=""> <img src=""/ title=""></label></span><br>'+
	'<span class="checker-tag"><input type="checkbox" id="tag-seasonal"/><label for="tag-seasonal"> Сезонные<img src="https://static.wikia.nocookie.net/hayday/images/7/7a/Украшения_сезонные.png/revision/latest?cb=20231031062707&path-prefix=ru"/ title="Сезонные"></label><br>'+
	'<span class="checker-tag-theme"><input type="checkbox" id="tag-christmas"/><label for="tag-christmas"> Рождество</label></span><br>'+
	'<span class="checker-tag-theme"><input type="checkbox" id="tag-summer"/><label for="tag-summer"> Лето</label></span><br>'+
	'<span class="checker-tag-theme"><input type="checkbox" id="tag-"/><label for="tag-"> </label></span><br>'+
	'</span><br>'+
	'<span class="checker-tag"><input type="checkbox" id=""/><label for=""> <img src=""/ title=""></label></span><br>'+
	'</div>');
	decoTable.before(sorter);
	
	decoTags = [];
	console.log(rows);
	for(var i=0;i<rows.length;i++){
		var row = $('#deco-changed>tbody>tr:nth-child('+String(i+1)+')');
		var tags = row.attr('data-tags');
		decoTags[i]=tags;
	}
}

//скачки 320
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
	
	/* функции */
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

}

// список продуктов
if (document.body.className.includes('page-Список_продуктов')) {
	var plURL = new URL(window.location.href);
	var plURLBuild = plURL.searchParams.get('build') ? parseInt(plURL.searchParams.get('build'), 36).toString(2) : null;
	var plURLStar = plURL.searchParams.get('star') ? parseInt(plURL.searchParams.get('star'), 36).toString(2) : null;
	var plURLLevel = parseInt(plURL.searchParams.get('level')) ? parseInt(plURL.searchParams.get('level')) : 0;
	var plURLSave = plURL.searchParams.get('save') ? 1 : 0;
	//console.log(plURLBuild);
	//setTimeout(productListAddScroll, 2000);
	//pl — productsList, список продуктов
	//элементы
	var plTable = document.querySelector("#products-list");
	var plRows = plTable.querySelectorAll('tr');
	var plParams = document.querySelector('#products-list-settings');
	var plLevel = plParams.querySelector('#products-list-level');
	var plBuild = plParams.querySelector('#products-list-buildings');
	var plBuildSelect = plBuild.querySelector('.select-all');
	var plStar = plParams.querySelector('#products-list-star');
	var plStarSelect = plStar.querySelector('.select-all');
	var plClear = plParams.querySelector('#products-list-clear');
	var plSave = plParams.querySelector('#products-list-save');
	plSave.innerHTML = '<input type="checkbox"/>';
	var plSaveInp = plSave.querySelector('input');
	var plIsSave;
	if (plURLSave){
		plIsSave = true;
		plSaveInp.checked = true;
	} else {
		plIsSave = false;
		plSaveInp.checked = false;
	}
	
	//кнопки/ввод
	plLevel.innerHTML = '<input type="number" min="1" max="1000" style="width: 50px;" />';
	var plLevelInp = plLevel.querySelector('input');
	if(plURLLevel){
		plLevelInp.value = plURLLevel;
		plRows.forEach(function(row, i){
			if(i){
				var tds = row.querySelectorAll('td');
				var rowLvl = tds[1].innerText.includes(')') ? 34.3 : +tds[1].innerText.trim();
				//console.log(level, rowLvl);
				if (rowLvl>plURLLevel&&plURLLevel){
					row.style.display='none';
				} else {
					row.style.display='table-row';
				}
			}
		});
	}
	
	
	plClear.innerHTML = '<button class="game-button">Сбросить</button>';
	var plClearBtn = plClear.querySelector('button');
	
	plBuildSelect.innerHTML = '<button class="game-button">Снять выбор</button>';
	var plBuildBtn = plBuildSelect.querySelector('button');
	plStarSelect.innerHTML = '<button class="game-button">Выбрать всё</button>';
	var plStarBtn = plStarSelect.querySelector('button');
	var plBuildIsAll = true;
	var plStarIsAll = false;
	
	//выбор зданий
	var plBuildNames = [];
	var plBuildList = [];
	var plBuildAll = plBuild.querySelectorAll('.click-box');
	
	var plStarList = [];
	var plStarAll = plStar.querySelectorAll('.click-box');
	
	var plURLUseBuild;
	if(plURLBuild){
		while(plURLBuild.length<plBuildAll.length){plURLBuild='0'+plURLBuild}
		plURLBuild=plURLBuild.split('');
		plURLUseBuild=true;
	}else{plURLBuild=[];plURLUseBuild=false;}
	
	plBuildAll.forEach(function(span, i) {
		img = span.querySelector('img');
		img.ondragstart = function() { return false; };
		build = img.title;
		plBuildNames.push(img.title);
		
		if(plURLUseBuild){
			if(+plURLBuild[i]){
				plBuildList.push(true);
				span.style.background = '#88888830';
			} else {
				plBuildList.push(false);
				span.style.background = 'transparent';
				plStarAll[i].style.display='none';
				plCheckBuilds(false, plBuildNames[i], plRows, 1000);
			}
		} else {
			plBuildList.push(true);
			plURLBuild.push(1);
			span.style.background = '#88888830';
		}
		span.addEventListener('click', function() {
			var x;
			var level = +plLevelInp.value;
			if(!level){level=1000;}
			if (plBuildList[i]) {
				plURLBuild[i]=0;
				plBuildList[i] = false;
				span.style.background = 'transparent';
				plStarAll[i].style.display='none';
				x = 1;
				plBuildList.forEach(function(is, i){if(is){x*=0}else{x*=1}});
				if(x){plBuildIsAll=false;plBuildBtn.textContent = 'Выбрать всё';}
			} else {
				plURLBuild[i]=1;
				plBuildList[i] = true;
				span.style.background = '#88888830';
				plStarAll[i].style.display='inline-block';
				x = 1;
				plBuildList.forEach(function(is, i){
					if(!is){x*=0}else{x*=1}
					//console.log(plBuildNames[i], x, is);
				});
				if(x){plBuildIsAll=true;plBuildBtn.textContent = 'Снять выбор';}
			}
			plCheckBuilds(plBuildList[i], plBuildNames[i], plRows, level);
			if (plIsSave){plSaveSet({url: plURL, build: plURLBuild});}
		});
	});
	
	//время с мастерством
	var plURLUseStar;
	if(plURLStar){
		while(plURLStar.length<plStarAll.length){plURLStar='0'+plURLStar}
		plURLStar=plURLStar.split('');
		plURLUseStar=true;
	}else{plURLStar=[];plURLUseStar=false;}
	
	plStarAll.forEach(function(span, i) {
		img = span.querySelector('img');
		img.ondragstart = function() { return false; };
		//plStarList.push(false);
		
		if(plURLUseStar){
			if(+plURLStar[i]){
				plStarList.push(true);
				span.style.background = '#88888830';
				plCheckStar(true, plBuildNames[i], plRows);
			} else {
				plStarList.push(false);
				span.style.background = 'transparent';
			}
		} else {
			plStarList.push(false);
			plURLStar.push(0);
			span.style.background = 'transparent';
		}
		//span.style.display='none';
		span.addEventListener('click', function() {
			if (plStarList[i]) {
				plStarList[i] = false;
				span.style.background = 'transparent';
				plURLStar[i] = 0;
			} else {
				plStarList[i] = true;
				span.style.background = '#88888830';
				plURLStar[i] = 1;
			}
			plCheckStar(plStarList[i], plBuildNames[i], plRows);
			if (plIsSave){plSaveSet({url: plURL, star: plURLStar});}
		});
	});
	
	//сохранение настроек
	plSaveInp.addEventListener('change', function(e){
		plIsSave = e.target.checked;
		if (plIsSave){
			plSaveSet({url: plURL, build: plURLBuild, star: plURLStar, level: plURLLevel});
		} else {
			plURL.searchParams.delete('build');
			plURL.searchParams.delete('star');
			plURL.searchParams.delete('level');
			plURL.searchParams.delete('save');
			history.replaceState({},'',plURL);
		}
	});
	
	//кнопки
	plBuildBtn.addEventListener('click', function(){
		var level = +plLevelInp.value;
		if (!level){level=1000;}
		if(plBuildIsAll){
			plBuildIsAll = false;
			plBuildBtn.textContent = 'Выбрать всё';
			plBuildAll.forEach(function(span, i){span.style.background = 'transparent';});
			plStarAll.forEach(function(span, i){span.style.display='none';});
			plRows.forEach(function(row, i){
				if (i) {
					row.style.display = 'none';
				}
			});
			plBuildList = plBuildList.map(function(){return false;});
			plURLBuild = plURLBuild.map(function(){return 0;});
			if (plIsSave){plSaveSet({url: plURL, build: plURLBuild});}
		} else {
			plBuildIsAll = true;
			plBuildBtn.textContent = 'Снять выбор';
			plBuildAll.forEach(function(span, i){span.style.background = '#88888830';});
			plStarAll.forEach(function(span, i){span.style.display='inline-block';});
			plRows.forEach(function(row, i){
				if(i){
					var tds = row.querySelectorAll('td');
					var rowLvl = tds[1].innerText.includes(')') ? 34.3 : +tds[1].innerText.trim();
					if(rowLvl<=level||!level){row.style.display='table-row';}
				}
			});
			plBuildList = plBuildList.map(function(){return true;});
			plURLBuild = plURLBuild.map(function(){return 1;});
			if (plIsSave){plSaveSet({url: plURL, build: plURLBuild});}
		}
		//console.log(plBuildList);
	});
	plStarBtn.addEventListener('click', function(){
		if(plStarIsAll){
			plStarIsAll = false;
			plStarBtn.textContent = 'Выбрать всё';
			plStarAll.forEach(function(span, i){span.style.background='transparent';});
			plRows.forEach(function(row, i){
				if (i) {
					var tds = row.querySelectorAll('td');
					var build = tds[2].firstChild.title;
					//console.log('inner:'+tds[2].innerText, 'content:'+tds[2].textContent);
					var j = plBuildNames.indexOf(build);
					//console.log('build '+build, 'index '+j, 'value '+plStarList[j]);
					var standardTime = row.querySelector('.standard-time');
					var starTime = row.querySelector('.star-time');
					var standardVigoda = row.querySelector('.standard-vigoda');
					var starVigoda = row.querySelector('.star-vigoda');
					if (plStarList[j]){
						starTime.style.display = 'none';
						standardTime.style.display = 'table-cell';
						row.insertBefore(standardTime, starTime);
						row.append(starTime);
						starVigoda.style.display = 'none';
						standardVigoda.style.display = 'table-cell';
						row.insertBefore(standardVigoda, starVigoda);
						row.append(starVigoda);
					}
				}
			});
			plStarList = plStarList.map(function(){return false;});
			plURLStar = plURLStar.map(function(){return 0;});
			if (plIsSave){plSaveSet({url: plURL, star: plURLStar});}
		} else {
			plStarIsAll = true;
			plStarBtn.textContent = 'Снять выбор';
			plStarAll.forEach(function(span, i){span.style.background='#88888830';});
			plRows.forEach(function(row, i){
				if (i) {
					var tds = row.querySelectorAll('td');
					var build = tds[2].firstChild.title;
					//console.log('inner:'+tds[2].innerText, 'content:'+tds[2].textContent);
					var j = plBuildNames.indexOf(build);
					//console.log('build '+build, 'index '+j, 'value '+plStarList[j]);
					var standardTime = row.querySelector('.standard-time');
					var starTime = row.querySelector('.star-time');
					var standardVigoda = row.querySelector('.standard-vigoda');
					var starVigoda = row.querySelector('.star-vigoda');
					if (!plStarList[j]){
						starTime.style.display = 'table-cell';
						standardTime.style.display = 'none';
						row.insertBefore(starTime, standardTime);
						row.append(standardTime);
						starVigoda.style.display = 'table-cell';
						standardVigoda.style.display = 'none';
						row.insertBefore(starVigoda, standardVigoda);
						row.append(standardVigoda);
					}
				}
			});
			plStarList = plStarList.map(function(){return true;});
			plURLStar = plURLStar.map(function(){return 1;});
			if (plIsSave){plSaveSet({url: plURL, star: plURLStar});}
		}
	});
	
	//сброс
	plClearBtn.addEventListener('click', function(){
		plBuildAll.forEach(function(span, i){span.style.background = '#88888830';});
		plStarAll.forEach(function(span, i){span.style.background = 'transparent';span.style.display='inline-block';});
		plLevelInp.value='';
		var plBuildIsAll = true;
		var plStarIsAll = false;
		plStarBtn.textContent = 'Выбрать всё';
		plBuildBtn.textContent = 'Снять выбор';
		plRows.forEach(function(row, i){
			if (i){
				row.style.display='table-row';
				var tds = row.querySelectorAll('td');
				var build = tds[2].firstChild.title;
				//console.log('inner:'+tds[2].innerText, 'content:'+tds[2].textContent);
				var j = plBuildNames.indexOf(build);
				//console.log('build '+build, 'index '+j, 'value '+plStarList[j]);
				var standardTime = row.querySelector('.standard-time');
				var starTime = row.querySelector('.star-time');
				var standardVigoda = row.querySelector('.standard-vigoda');
				var starVigoda = row.querySelector('.star-vigoda');
				if (plStarList[j]){
					starTime.style.display = 'none';
					standardTime.style.display = 'table-cell';
					row.insertBefore(standardTime, starTime);
					row.append(starTime);
					starVigoda.style.display = 'none';
					standardVigoda.style.display = 'table-cell';
					row.insertBefore(standardVigoda, starVigoda);
					row.append(starVigoda);
				}
			}
		});
		plStarList = plStarList.map(function(){return false;});
		plBuildList = plBuildList.map(function(){return true;});
		plURLStar = plURLStar.map(function(){return 0;});
		plURLBuild = plURLBuild.map(function(){return 1;});
		plURLLevel = 0;
		if (plIsSave){plSaveSet({url: plURL, star: plURLStar, build: plURLBuild, level: 0});}
	});
	
	//уровень
	plLevelInp.addEventListener('input', function(){
		var level = +plLevelInp.value;
		if(level){
			plURLLevel = level;
			plRows.forEach(function(row, i){
				if(i){
					var tds = row.querySelectorAll('td');
					var rowLvl = tds[1].innerText.includes(')') ? 34.3 : +tds[1].innerText.trim();
					var build = tds[2].firstChild.title;
					var j = plBuildNames.indexOf(build);
					//console.log(level, rowLvl);
					if ((rowLvl>level&&level)||!plBuildList[j]){
						row.style.display='none';
					} else {
						row.style.display='table-row';
					}
				}
			});
		}
		if (plIsSave){plSaveSet({url: plURL, level: plURLLevel});}
	});
	
	console.log(plBuildList, plStarList, plBuildNames);
	
	/* функции */
	function plCheckBuilds(value, zd, rows, lvl) {
		rows.forEach(function(row, i) {
			if (i) {
				var tds = row.querySelectorAll('td');
				var build = tds[2].firstChild.title;//.innerText.trim().replace(/\n/g, ' ');
				var rowLvl = tds[1].innerText.includes(')') ? 34.3 : +tds[1].innerText.trim();
				//console.log(value, tds[2], tds[2].firstChild, build, zd);
				if (build == zd) {
					if (value) {
						if(rowLvl<=lvl||!level){row.style.display='table-row';}
					} else {
						row.style.display='none';
					}
				}
			}
		});
	}
	function plCheckStar(value, zd, rows) {
		rows.forEach(function(row, i) {
			if (i) {
				var tds = row.querySelectorAll('td');
				var build = tds[2].firstChild.title;
				if (build == zd) {
					var standardTime = row.querySelector('.standard-time');
					var starTime = row.querySelector('.star-time');
					var standardVigoda = row.querySelector('.standard-vigoda');
					var starVigoda = row.querySelector('.star-vigoda');
					if (value) {
						starTime.style.display = 'table-cell';
						standardTime.style.display = 'none';
						row.insertBefore(starTime, standardTime);
						row.append(standardTime);
						starVigoda.style.display = 'table-cell';
						standardVigoda.style.display = 'none';
						row.insertBefore(starVigoda, standardVigoda);
						row.append(standardVigoda);
					} else {
						starTime.style.display = 'none';
						standardTime.style.display = 'table-cell';
						row.insertBefore(standardTime, starTime);
						row.append(starTime);
						starVigoda.style.display = 'none';
						standardVigoda.style.display = 'table-cell';
						row.insertBefore(standardVigoda, starVigoda);
						row.append(starVigoda);
					}
				}
			}
		});
	}
	function plSaveSet(params){
		if(params.build){params.url.searchParams.set('build', parseInt(params.build.join(''), 2).toString(36));}
		if(params.star){params.url.searchParams.set('star', parseInt(params.star.join(''), 2).toString(36));}
		if(params.level){params.url.searchParams.set('level', params.level);}
		params.url.searchParams.set('save', 1);
		history.replaceState({},'',params.url);
	}

}

//перелистывание
var rotateds = document.querySelectorAll('.rotated-box');
if (rotateds.length) {
	rotateds.forEach(function(rotatedBox, index){
		var pageWidth = (+getComputedStyle(rotatedBox).width.slice(0, -2)) / 2;
		console.log(index, pageWidth);
		
		var rotatesRight = 0;
		var rotatesLeft = 0;
		var movesRight = 0;
		var movesLeft = 0;
		var isMoved = false;
		var isPicked = false;
		
		var rotated = rotatedBox.firstElementChild;
		
		var allPages = rotated.children;
		var activeSide = rotated.lastElementChild;
		
		var strlLeft = rotatedBox.querySelector('.to-left');
		strlLeft.innerHTML = '<img src="https://static.wikia.nocookie.net/hayday/images/9/97/Стрелка_влево.png/revision/latest/scale-to-width-down/40?cb=20240815141934&path-prefix=ru"/>';
		strlLeft.querySelector('img').ondragstart = function() { return false; };
		
		var strlRight = rotatedBox.querySelector('.to-right');
		strlRight.innerHTML = '<img src="https://static.wikia.nocookie.net/hayday/images/b/b7/Стрелка_вправо.png/revision/latest/scale-to-width-down/40?cb=20240815141954&path-prefix=ru"/>';
		strlRight.querySelector('img').ondragstart = function() { return false; };
		
		allPages = Array.from(allPages);
		allPages.splice(-1, 1);
		var page = 1;
		var maxPage = Math.floor(allPages.length / 2) - 1;
		var isMouse = false;
		
		allPages.forEach(function(elem,i){
			elem.style.visibility = 'hidden';
		});
		
		activeSide.append(allPages[2].firstElementChild);
		activeSide.append(allPages[3].firstElementChild);
	
		rotatedBox.addEventListener('mouseenter', function(){isMouse = true;});
		rotatedBox.addEventListener('mouseleave', function(){isMouse = false;});
	
		rotated.onpointerdown = function(event){
			if(event.target.localName != 'img'){
				isPicked = true;
				rotated.setPointerCapture(event.pointerId);
				var rect = rotated.getBoundingClientRect();
				
				var clickX = event.pageX-rect.left;
				console.log(clickX, event);
				if (clickX < pageWidth && !rotatesRight&&!rotatesLeft && page > 0 && !movesRight && event.isPrimary && event.button === 0) {
					// схвачена левая страница
					console.log('pick up left', isMoved, isPicked);	
					
					rotated.onpointermove = function(event) {
						if (!isMoved){
							isMoved = true;
							isPicked = false;
							
							console.log('start move: ', isMoved,isPicked);
							
							allPages[page*2].style.transition = 'transform 0s linear';
							allPages[page*2].style.visibility = 'visible';
							allPages[page*2].append(activeSide.firstElementChild);
							allPages[(page-1)*2+1].style.transition = 'transform 0s linear';
							allPages[(page-1)*2+1].style.transform='rotateY(-90deg)';
							
							activeSide.prepend(allPages[(page-1)*2].firstElementChild);
							allPages[page*2].style.zIndex=2;
							
							rotated.onpointercancel = function(event) {
								//console.log(event);
								rotated.onpointermove = null;
								rotated.onpointerup = null;
								rotated.onpointercancel = null;
								
								rotatesLeft++;
								
								console.log('move cancel in left', isMoved, isPicked);
								
								
								allPages[page*2].style.transition = 'transform 1ms linear';
								allPages[page*2].style.transform='rotateY(0deg)';
								allPages[(page-1)*2+1].style.transform='rotateY(0deg)';
								
								setTimeout(endLeftMove, 1);
							};
							rotated.onpointerup = function(event) {
								var ms = Math.floor(((event.pageX-rect.left)-clickX)*(500/pageWidth));
								rotated.onpointermove = null;
								rotated.onpointerup = null;
								rotated.onpointercancel = null;
								rotatesLeft++;
								
								console.log('mouse up in left', isMoved, isPicked);
								
								allPages[page*2].style.transition = 'transform '+ms+'ms linear';
								allPages[page*2].style.transform='rotateY(0deg)';
								allPages[(page-1)*2+1].style.transform='rotateY(0deg)';
								
								setTimeout(endLeftMove, ms);
							};
						}
						
						var mouseX = event.pageX-rect.left;
						var deg = (mouseX-clickX)*(90/pageWidth);
						if (deg < 0) {deg = 0;}
						console.log('move',mouseX, deg);
						
						if (deg > 90) {
							rotated.onpointermove = null;
							rotated.onpointerup = null;
							rotated.onpointercancel = null;
							isMoved = false;
							
							allPages[(page-1)*2+1].style.transition = 'transform .5s linear';
							
							movesLeft++;
							page--;
							
							if (page == 0) {strlLeft.style.filter = 'grayscale(1)';}
							strlRight.style.filter = 'grayscale(0)';
							
							closeLeftPage(allPages, page, activeSide, true);
						} else {
						
							allPages[page*2].style.transform='rotateY('+deg+'deg)';
						}
					};
					
					
				} else if (!rotatesRight&&!rotatesLeft && page < maxPage && !movesLeft && event.isPrimary && event.button === 0) {
					// схвачена правая страница
					console.log('pick up right', isMoved, isPicked);
					rotated.onpointermove = function(event) {
						if (!isMoved) {
							isMoved = true;
							isPicked = false;
							console.log('start move');
							
							allPages[page*2+1].style.transition = 'transform 0s linear';
							allPages[page*2+1].style.visibility = 'visible';
							allPages[page*2+1].append(activeSide.lastElementChild);
							allPages[(page+1)*2].style.transition = 'transform 0s linear';
							allPages[(page+1)*2].style.transform='rotateY(90deg)';
							
							activeSide.append(allPages[(page+1)*2+1].firstElementChild);
							allPages[page*2+1].style.zIndex=2;
							
							rotated.onpointercancel = function(event) {
								//console.log(event);
								rotated.onpointermove = null;
								rotated.onpointerup = null;
								rotated.onpointercancel = null;
								
								rotatesRight++;
								
								console.log('move cancel in right', isMoved, isPicked);
								
								allPages[page*2+1].style.transition = 'transform 1ms linear';
								allPages[page*2+1].style.transform='rotateY(0deg)';
								allPages[(page+1)*2].style.transform='rotateY(0deg)';
								
								setTimeout(endRightMove, 1);
							};
							
							rotated.onpointerup = function(event) {
								var ms = Math.floor((clickX-(event.pageX-rect.left))*(500/pageWidth));
								rotated.onpointermove = null;
								rotated.onpointerup = null;
								rotated.onpointercancel = null;
								rotatesRight++;
								
								console.log('mouse up in right', isMoved, isPicked);
								
								allPages[page*2+1].style.transition = 'transform '+ms+'ms linear';
								allPages[page*2+1].style.transform='rotateY(0deg)';
								allPages[(page+1)*2].style.transform='rotateY(0deg)';
								
								setTimeout(endRightMove, ms);
							};
						}
						
						var mouseX = event.pageX-rect.left;
						var deg = -((clickX-mouseX)*(90/pageWidth));
						if (deg > 0) {deg = 0;}
						//console.log(mouseX, deg);
						
						if (deg < -90) {
							rotated.onpointermove = null;
							rotated.onpointerup = null;
							rotated.onpointercancel = null;
							isMoved = false;
							
							allPages[(page+1)*2].style.transition = 'transform .5s linear';
							
							movesRight++;
							page++;
							
							strlLeft.style.filter = 'grayscale(0)';
							if (page == maxPage) {strlRight.style.filter = 'grayscale(1)';}
								
							closeRightPage(allPages, page, activeSide, true);
						} else {
						
							allPages[page*2+1].style.transform='rotateY('+deg+'deg)';
						}
					};
				}
				rotated.onpointerup = function(event){
					rotated.onpointermove = null;
					rotated.onpointerup = null;
					rotated.onpointercancel = null;
					
					isPicked = false;
					
					console.log('mouse up', isMoved, isPicked);
				};
				rotated.onpointercancel = function(event){
					rotated.onpointermove = null;
					rotated.onpointerup = null;
					rotated.onpointercancel = null;
					
					isPicked = false;
					
					console.log('pointer cancel', isMoved, isPicked);
				};
			}
		};
	
		document.addEventListener('keydown', function(event){
			//console.log('pressed', event.key, page, allPages.length, isMouse);
			if (event.key=='ArrowRight' && page < maxPage && isMouse && !rotatesLeft && !isMoved && !movesLeft && !isPicked) {
				startRightPage();
			}
			if (event.key=='ArrowLeft' && page > 0 && isMouse && !rotatesRight && !isMoved && !movesRight && !isPicked) {
				startLeftPage();
			}
		});
		
		strlLeft.addEventListener("click", function(){
			if (page > 0 && !rotatesRight && !isMoved && !movesRight && !isPicked) {
				startLeftPage();
			}
		});
		strlRight.addEventListener("click", function(){
			if (page < maxPage && !rotatesLeft && !isMoved && !movesLeft && !isPicked) {
				startRightPage();
			}
		});
		
		/* функции */
		function startRightPage(){
			allPages[page*2+1].style.visibility = 'visible';
			
			allPages[page*2+1].append(activeSide.lastElementChild);
			activeSide.append(allPages[(page+1)*2+1].firstElementChild);
			
			allPages[page*2+1].style.transform='rotateY(-90deg)';
			allPages[page*2+1].style.zIndex=100-page;
			allPages[(page+1)*2].style.transform='rotateY(90deg)';
			page++;
			rotatesRight++;
			
			strlLeft.style.filter = 'grayscale(0)';
			if (page == maxPage) {strlRight.style.filter = 'grayscale(1)';}
			
			
			setTimeout(closeRightPage, 500, allPages, page, activeSide, false);
		}
		function startLeftPage(){
			allPages[page*2].style.visibility = 'visible';
			
			allPages[page*2].append(activeSide.firstElementChild);
			activeSide.prepend(allPages[(page-1)*2].firstElementChild);
			
			allPages[page*2].style.transform='rotateY(90deg)';
			allPages[page*2].style.zIndex=2+page;
			allPages[(page-1)*2+1].style.transform='rotateY(-90deg)';
			page--;
			rotatesLeft++;
			
			if (page == 0) {strlLeft.style.filter = 'grayscale(1)';}
			strlRight.style.filter = 'grayscale(0)';
			
			setTimeout(closeLeftPage, 500, allPages, page, activeSide, false);
		}
		function closeRightPage(pages, page, activeSide, moved){
			pages[(page-1)*2+1].style.zIndex=0;
			pages[(page-1)*2+1].style.transform='rotateY(0deg)';
			pages[(page-1)*2+1].style.visibility='hidden';
			pages[page*2].style.visibility='visible';
			pages[page*2].style.transform='rotateY(0deg)';
			pages[page*2].style.zIndex=1+page;
			setTimeout(endRightPage, 500, pages, page, activeSide, moved);
		}
		function closeLeftPage(pages, page, activeSide, moved){
			pages[(page+1)*2].style.zIndex=0;
			pages[(page+1)*2].style.transform='rotateY(0deg)';
			pages[(page+1)*2].style.visibility='hidden';
			pages[page*2+1].style.visibility='visible';
			pages[page*2+1].style.transform='rotateY(0deg)';
			pages[page*2+1].style.zIndex=100-page;
			setTimeout(endLeftPage, 500, pages, page, activeSide, moved);
		}
		function endRightPage(pages, page, activeSide, moved){
			pages[page*2].style.zIndex=0;
			
			pages[(page-1)*2].append(activeSide.firstElementChild);
			activeSide.prepend(pages[page*2].firstElementChild);
			
			pages[page*2].style.visibility='hidden';
			if (!moved) {rotatesRight--;} else {movesRight--;allPages[(page-1)*2+1].style.transition = 'transform .5s linear';}
		}
		function endLeftPage(pages, page, activeSide, moved){
			pages[page*2+1].style.zIndex=0;
			
			pages[(page+1)*2+1].append(activeSide.lastElementChild);
			activeSide.append(pages[page*2+1].firstElementChild);
			
			pages[page*2+1].style.visibility='hidden';
			if (!moved) {rotatesLeft--;} else {movesLeft--;allPages[(page+1)*2].style.transition = 'transform .5s linear';}}
		function endRightMove(){
			isMoved = false;
			rotatesRight--;
			allPages[page*2+1].style.visibility = 'hidden';
			allPages[(page+1)*2].style.transition = 'transform .5s linear';
			allPages[page*2+1].style.transition = 'transform .5s linear';
			allPages[(page+1)*2+1].append(activeSide.lastElementChild);
			activeSide.append(allPages[page*2+1].firstElementChild);
			allPages[page*2+1].style.zIndex=0;
		}
		function endLeftMove(){
			isMoved = false;
			rotatesLeft--;
			allPages[page*2].style.visibility = 'hidden';
			allPages[(page-1)*2+1].style.transition = 'transform .5s linear';
			allPages[page*2].style.transition = 'transform .5s linear';
			allPages[(page-1)*2].append(activeSide.firstElementChild);
			activeSide.prepend(allPages[page*2].firstElementChild);
			allPages[page*2].style.zIndex=0;
		}
	});

}

//интересные факты заглавная
var facts = document.querySelectorAll(".mainpage-fact");
if (facts.length>0) {
	var factError = document.querySelector(".mainpage-fact-error");
	factError.style.display = "none";
	var randIndx=Math.floor(Math.random()*facts.length);
	console.log(randIndx);
	facts[randIndx].style.display="block";
	setTimeout(updateFact, 15000, facts, randIndx);
	
	/* функции */
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
		var roadPolosaBorder = road.querySelector(".polosa-border");
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
			roadPolosaBorder.style.width=(mouseX-3)+"px";
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
			roadPolosaBorder.style.width="calc(100% - 3px)";
			nowPointText.textContent = "0";
			nowPoint.style.left = "-50px";
		});
	});
}

//код за этими фигурными скобками не должен вызывать элементы страницы, так как может не сработать
}}

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
window.pPreview.RegExp.iimages = ['Часы.png', 'Помогите.gif', 'Кричащая_курица_в_групповом_запросе.gif'];
window.pPreview.RegExp.ilinks = [/.*HayDay[_ ]вики.*/];
window.pPreview.nonstandard = {'Уровни': 'Текущий уровень.png', 'Продукты':'Хлеб.png', 'Список товаров': 'Товары.png', 'Валюты': 'Монета.png', 'Список продуктов': 'Хлеб.png', 'Список культур': 'Пшеница.png'};