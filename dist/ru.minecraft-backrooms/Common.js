/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
// Для [[Шаблон:CSS]]

mw.hook("wikipage.content").add(function () {
    $("span.import-css").each(function () {
    	mw.util.addCSS($(this).attr("data-css"));
    });
});

// Функции

function post_article(pagename,content,summar) {
	$.ajax({
            url: mw.util.wikiScript('api'),
            type: 'POST',
            data: {
                action: 'edit',
                title: pagename,
                summary: summar,
                text: content,
                bot: 1,
                token: mw.user.tokens.get('csrfToken'),
                format: 'json'
            },
            success: function() {
                window.location.reload();
            }
        });
}
function get_article(pagename) {
	return $.ajax({
                url: mw.util.wikiScript(),
                type: 'GET',
                data: {
                    title: pagename,
                    action: 'raw',
                    cb: Math.ceil(new Date().getTime() / 1000),
                    dataType:'text'
                },
                error: function () {
                	return 0;
                }
	});
}

// Кастомные лого и заголовок вики
;(function ($,mw) {
	var customCommunityName = document.getElementById('customCommunityName');
	var customCommunityLogo = document.getElementById('customCommunityLogo');
	if (customCommunityName != null) {
		$('.fandom-community-header__community-name').html(customCommunityName.innerHTML);
	}
	if (customCommunityLogo != null && customCommunityLogo.firstElementChild != null) {
		var e = document.getElementsByClassName('fandom-community-header__image');
		if (e[0] != null && e[0].hasChildNodes()) {
			var imgToSet = customCommunityLogo.firstElementChild.getAttribute('src');
			var img = e[0].firstElementChild;
			img.setAttribute("src",imgToSet);
		}
	}
})(this.jQuery,this.mediaWiki);

// Шаблон оценки
;(function ($,mw) {
	if ($('.pageRate')[0] == null) {return;}
	
	var section = document.createElement('section');
	var header = document.createElement('h2');
	
	header.classList.add('activity-heading');
	$(header).html("Оценка статьи");
	
	section.classList.add('rail-module');
	section.classList.add('PageRatingModule');
	$(header).appendTo(section);
	$(section).appendTo($("#WikiaRail"));
	
	$('.pageRate').appendTo($(".PageRatingModule"));
	
	document.getElementById("pageRate").style.setProperty("display","");
    
	function init() {
		var minEdits = 10;
			// получаем текущие оценки всех статей
		get_article('Закулисье_Майнкрафта_вики:Оценки_статей').done(function(data) {
            var userName = mw.config.get('wgUserName');
            var allRates = JSON.parse(data);
            var myRate;
            // проверяем есть ли данные о текущей статье, если нет, то создаём пустой шаблон для заполнения
            myRate = allRates.articles[mw.config.get('wgPageName')] || [{"plus":[]},{"minus":[]}];
            function getUserRate() {
				if (myRate[0].plus.indexOf(userName) !== -1) {
					return "+";
				} else if (myRate[1].minus.indexOf(userName) !== -1) {
					return "-";
				} else {
					return 0;
				}
			}
			var userRate = getUserRate();
            // вычисляем рейтинг по формуле: положительные_голоса - негативные_голоса
            var calculatedRating = myRate[0].plus.length - myRate[1].minus.length;
            var rateColor = calculatedRating > 0 && 'lime' || calculatedRating < 0 && 'red' || 'var(--theme-page-text-color)';
            // процент положительных голосов
            if (document.getElementById("pageRatingPercentage") != null) document.getElementById("pageRatingPercentage").innerHTML = Math.round((myRate[0].plus.length * 100) / (myRate[0].plus.length + myRate[1].minus.length)).toString();
            // всего голосов
            if (document.getElementById("pageRatingTotalVotes") != null) document.getElementById("pageRatingTotalVotes").innerHTML = (myRate[0].plus.length + myRate[1].minus.length).toString();
            // отдельная запись количества положительных и отрицательных голосов
            if (document.getElementById("get_plus_rating") != null) document.getElementById("get_plus_rating").innerHTML = (myRate[0].plus.length).toString();
            if (document.getElementById("get_minus_rating") != null) document.getElementById("get_minus_rating").innerHTML = (myRate[1].minus.length).toString();
            if (document.getElementById("current_rate") != null && userRate !== 0) {
            	document.getElementById("current_rate").style.setProperty("display","");
            	$("#current_rate").html("Ваша текущая оценка: " + userRate);
            }
            
            // записываем полученный рейтинг в элемент
            // устанавливаем цвет текста в зависимости от числа
            if (document.getElementById("pageRating") != null) {
                	document.getElementById("pageRating").innerHTML = ( calculatedRating > 0 && '+' || '' ) + calculatedRating.toString();
                	document.getElementById("pageRating").setAttribute("style","color:" + rateColor + ";font-size:30px");
            }
                    
            // удаление элемента из массива
            function resetVote(arr, elem) {
                if (arr != undefined) {
    	    		for (var i = 0; i < arr.length; i++) {
                		if (arr[i] === elem) arr.splice(i,1);
                   	}
              	}
            }
            // положительная оценка статьи
            $('#rate_page_plus').click(function () {
                // если у чела меньше десяти правок, то он не может ставить оценку
    			if (mw.config.get("wgUserEditCount") < minEdits) {
					alert("Меньше " + minEdits + " правок");
					return;
				}
            	// mw.log.warn("Плюс");
            	resetVote(myRate[0].plus,userName);
            	resetVote(myRate[1].minus,userName);
            	     	
           		myRate[0].plus[myRate[0].plus.length] = userName;
            	        	
            	allRates.articles[mw.config.get('wgPageName')] = myRate;
        		var to_save = JSON.stringify(allRates);
            	post_article('Закулисье_Майнкрафта_вики:Оценки_статей',to_save,'Поставлена оценка (+) для ' + mw.config.get('wgPageName'));
            });
            
            // отрицательная оценка статьи
        	$('#rate_page_minus').click(function () {
            	// если у чела меньше десяти правок, то он не может ставить оценку
                if (mw.config.get("wgUserEditCount") < minEdits) {
					alert("Меньше " + minEdits + " правок");
					return;
				}
                // mw.log.warn("Минус");
                
               	resetVote(myRate[0].plus,userName);
             	resetVote(myRate[1].minus,userName);
             	
                myRate[1].minus[myRate[1].minus.length] = userName;
                    	
                allRates.articles[mw.config.get('wgPageName')] = myRate;
                var to_save = JSON.stringify(allRates);
                    	
                post_article('Закулисье_Майнкрафта_вики:Оценки_статей',to_save,'Поставлена оценка (-) для ' + mw.config.get('wgPageName'));
            });
            // удаление оценки
            $('#remove_rate').click(function () {
                // если у чела меньше десяти правок, то он не может ставить оценку
                if (mw.config.get("wgUserEditCount") < minEdits) {
					alert("Меньше " + minEdits + " правок");
					return;
				}
            	resetVote(myRate[0].plus,userName);
            	resetVote(myRate[1].minus,userName);
                    	
            	allRates.articles[mw.config.get('wgPageName')] = myRate;
            	var to_save = JSON.stringify(allRates);
                    	
            	post_article('Закулисье_Майнкрафта_вики:Оценки_статей',to_save,'Убрана оценка для ' + mw.config.get('wgPageName'));
            });
        });
	}
    init();
})(this.jQuery,this.mediaWiki);

// Список страниц по их оценкам
;(function ($,mw) {
	var conf = mw.config.values;
	if (conf.wgPageName !== 'Служебная:Список_страниц_по_оценкам') {return;}
	$(document.getElementsByTagName('title')[0]).html('Служебная:Список страниц по оценкам | Закулисье Майнкрафта вики | Fandom');
	$('.mw-body-content').html('');
	$('.page-header__title').html('Служебная:Список страниц по оценкам');
	
	get_article('Закулисье_Майнкрафта_вики:Оценки_статей')
        .done(function (data) {
        	var rates = JSON.parse(data);
			var clRates = [];
			Object.keys(rates.articles).forEach(function (key) {
				var p = rates.articles[key][0].plus.length;
				var n = rates.articles[key][1].minus.length;
				var to_add = [key, parseInt(p) - parseInt(n)];
				clRates.push(to_add);
			});
					
			clRates.sort(function (a,b) {
				if (a[1] < b[1]) return 1;
				if (a[1] > b[1]) return -1;
				return 0;
			});
					
			var ul = document.createElement('ul');
					
			Object.keys(clRates).forEach(function (index) {
				var self = clRates[index];
				var pageName = self[0];
				var pageRate = self[1];
				var rateColor = pageRate > 0 && 'lime' || pageRate < 0 && 'red' || 'var(--theme-page-text-color)';
				
				var str = '<a href="/ru/wiki/' + pageName + '">' + pageName.replaceAll('_',' ') + '</a>' + ' — ' + '<span style="color:' + rateColor + ';">' + pageRate.toString() + '</span>';
						
				var li = document.createElement('li');
				$(li).html(str);
				$(li).appendTo(ul);
			});
			
			$(ul).appendTo($('.mw-body-content'));
        }).fail(function () {
            var e = document.createElement('p');
            $(e).html('<big class="error">Не удалось создать список</big>');
            $(e).appendTo($('.mw-body-content'));
        });
	
})(this.jQuery,this.mediaWiki);

// ;(function ($,mw) {
	
// })(this.jQuery,this.mediaWiki);

// ууупс это было не лекарство