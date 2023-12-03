/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
/* Для Шаблон:CSS */
mw.hook("wikipage.content").add(function () {
    $("span.import-css").each(function () {
    	mw.util.addCSS($(this).attr("data-css"));
    });
});
;(function ($,mw) {
	
	var ratingFunctions = {
	
	saveRating: function (rates) {
		// запись оценок на страницу сохранения для дальнейшего использования
            $.ajax({
                url: mw.util.wikiScript('api'),
                type: 'POST',
                data: {
                    action: 'edit',
                    title: 'User:ViolStar/Песочница/Тесты',
                    summary: 'Поставлена оценка для ' + mw.config.get('wgPageName'),
                    text: rates,
                    bot: 1,
                    token: mw.user.tokens.get('csrfToken'),
                    format: 'json'
                },
                success: function(d) {
                	if (d.error && d.error.info) {
                		alert(d.error.info);
                	} else if (d.edit && d.edit.result == 'Success') {
                        medalFunctions.quickPurge();
                    }
                },
                error: function() {
                	mw.lod.warn("АШИПКА");
                }
            });
        },
    
	init: function () {
		var minEdits = 10;
			// получаем текущие оценки всех статей
		$.ajax({
                url: mw.util.wikiScript(),
                type: 'GET',
                data: {
                    title: 'User:ViolStar/Песочница/Тесты',
                    action: 'raw',
                    cb: Math.ceil(new Date().getTime() / 1000),
                    dataType:'text'
                },
                success: function(data) {
                	var userName = mw.config.get('wgUserName');
                    var allRates = JSON.parse(data);
                    // mw.log.warn(allRates);
                    var myRate;
                    // проверяем есть ли данные о текущей статье, если нет, то создаём пустой шаблон для заполнения
                    if (allRates.articles[mw.config.get('wgPageName')] !== undefined) {
                    	myRate = allRates.articles[mw.config.get('wgPageName')];
                    } else {
                    	myRate = [{"plus":[]},{"minus":[]}];
                    }
                    if (myRate !== undefined) {
                    	// mw.log.warn(myRate);
                    	// вычисляем рейтинг по формуле: положительные_голоса - негативные_голоса
                    	var calculatedRating = myRate[0].plus.length - myRate[1].minus.length;
                    	// процент положительных голосов
                    	if (document.getElementById("pageRatingPercentage") !== null) document.getElementById("pageRatingPercentage").innerHTML = Math.round((myRate[0].plus.length * 100) / (myRate[0].plus.length + myRate[1].minus.length)).toString();
                    	// всего голосов
                    	if (document.getElementById("pageRatingTotalVotes") !== null) document.getElementById("pageRatingTotalVotes").innerHTML = (myRate[0].plus.length + myRate[1].minus.length).toString();
                    	// отдельная записать количества положительных и отрицательных голосов
                    	if (document.getElementById("get_plus_rating") !== null) document.getElementById("get_plus_rating").innerHTML = (myRate[0].plus.length).toString();
                    	if (document.getElementById("get_minus_rating") !== null) document.getElementById("get_minus_rating").innerHTML = (myRate[1].minus.length).toString();
                    	// записываем полученный рейтинг в элемент
                    	// устанавливаем цвет текста в зависимости от числа
                    	if (calculatedRating > 0) {
                    		if (document.getElementById("pageRating") !== null) document.getElementById("pageRating").innerHTML = '+' + calculatedRating.toString();
                    		if (document.getElementById("pageRating") !== null) document.getElementById("pageRating").setAttribute("style","color:lime;font-size:30px");
                    	} else {
                    		if (document.getElementById("pageRating") !== null) document.getElementById("pageRating").innerHTML = calculatedRating.toString();
                    		if (document.getElementById("pageRating") !== null) document.getElementById("pageRating").setAttribute("style","font-size:30px");
                    		if (calculatedRating < 0) {
                    			if (document.getElementById("pageRating") !== null) document.getElementById("pageRating").setAttribute("style","color:red;font-size:30px");
                    		}
                    	}
                    }
                    else {
                    	//if (ratingFunctions.namespaceCheck()) {
                    		myRate = [{"minus":[]},{"plus":[]}];
                    	//}
                    }
                    
                    // удаление элемента из массива
                    function resetVote(arr, elem) {
                    	if (arr !== undefined) {
                    		for (var i = 0; i < arr.length; i++) {
                    		if (arr[i] === elem) {
                    			arr.splice(i,1);
                    		}
                    	}
                    	}
                    }
                    // положительная оценка статьи
                    $('#rate_page_plus').click(function () {
                    	// если у чела меньше десяти правок, то он не может ставить оценку
                    		if (!(mw.config.get("wgUserEditCount") >= minEdits)) {
								alert("Меньше " + minEdits + " правок");
								return;
							}
                    	// mw.log.warn("Плюс");
                    	resetVote(myRate[0].plus,userName);
                    	resetVote(myRate[1].minus,userName);
                    	
                    	myRate[0].plus[myRate[0].plus.length] = userName;
                    	
                    	allRates.articles[mw.config.get('wgPageName')] = myRate;
                    	var to_save = JSON.stringify(allRates);
                    	
                    	ratingFunctions.saveRating(to_save);
                    });
                    // отрицательная оценка статьи
                    $('#rate_page_minus').click(function () {
                    	// если у чела меньше десяти правок, то он не может ставить оценку
                    		if (!(mw.config.get("wgUserEditCount") >= minEdits)) {
								alert("Меньше " + minEdits + " правок");
								return;
							}
                    	// mw.log.warn("Минус");
                    	
                    	resetVote(myRate[0].plus,userName);
                    	resetVote(myRate[1].minus,userName);
                    	
                    	myRate[1].minus[myRate[1].minus.length] = userName;
                    	
                    	allRates.articles[mw.config.get('wgPageName')] = myRate;
                    	var to_save = JSON.stringify(allRates);
                    	
                    	ratingFunctions.saveRating(to_save);
                    });
                    // удаление оценки
                    $('#remove_rate').click(function () {
                    	// если у чела меньше десяти правок, то он не может ставить оценку
                    		if (!(mw.config.get("wgUserEditCount") >= minEdits)) {
								alert("Меньше " + minEdits + " правок");
								return;
							}
                    	resetVote(myRate[0].plus,userName);
                    	resetVote(myRate[1].minus,userName);
                    	
                    	allRates.articles[mw.config.get('wgPageName')] = myRate;
                    	var to_save = JSON.stringify(allRates);
                    	
                    	ratingFunctions.saveRating(to_save);
                    });
                },
                error: function() {
                    mw.lod.warn("АШИПКА");
                }
            });
        },
        // namespaceCheck: function () {
        // 	var ns = mw.config.get('wgNamespaceNumber');
        // 	if (ns !== 2 && ns !== 5 && ns !== 6 && ns !== -1 && ns !== -2 && ns !== 6 && ns !== 7 && ns !== 8 && ns !== 9 && ns !== 10 && ns !== 11 && ns !== 13 && ns !== 14 && ns !== 15) return true;
        // 	else return false;
        // }
	};
	// запуск чудо-механизма
	ratingFunctions.init();
})(this.jQuery,this.mediaWiki); // какая-то цыганская магия