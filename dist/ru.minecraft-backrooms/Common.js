// Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице

// Константы

var CONFIG = mw.config.get();
var userName = CONFIG.wgUserName;
var userEdits = CONFIG.wgUserEditCount;
var userGroups = CONFIG.wgUserGroups;
var pageName = CONFIG.wgPageName;
var IsUserAdmin = ArrayIncludesAny(userGroups,['sysop','bureaucrat','interface-admin']);
var IsUserMod = IsUserAdmin || ArrayIncludesAny(userGroups,['content-moderator']);

var RATING = {
	StoringPage: "Закулисье_Майнкрафта_вики:Оценки_статей",
	MinEdits: 50,
	NeededGroups: ["autoconfirmed","emailconfirmed"],
	TimeDelaySeconds: 120,
	Err: 0
};

RATING.UserHasNeededGroups = ArrayIncludesAll(userGroups,RATING.NeededGroups);

if (!userName) {
	RATING.Err = "Войдите в аккаунт, чтобы ставить оценки";
} else if (userEdits < RATING.MinEdits && !RATING.UserHasNeededGroups ) {
	RATING.Err = `У вас должно быть хотя бы ${RATING.MinEdits} правок и должна быть подтверждена почта, чтобы ставить оценки`;
} else if (userEdits < RATING.MinEdits) {
	RATING.Err = `У вас должно быть хотя бы ${RATING.MinEdits} правок, чтобы ставить оценки`;
} else if (!RATING.UserHasNeededGroups) {
	RATING.Err = "У вас должна быть подтверждена почта, чтобы ставить оценки";
}

RATING.UserCanVote = RATING.Err === 0;

// Прочие глобальные переменные

var Inits = {
	LogoModule: 0,
	RatingModule: 0,
	ListModule: 0
};

// Для [[Шаблон:CSS]]

mw.hook("wikipage.content").add(function () {
    $("span.import-css").each(function () {
    	mw.util.addCSS($(this).attr("data-css"));
    });
});

// Функции

function post_article(pagename,content,summar,Type) {
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
                format: (Type != null && Type != '' && Type || 'json')
            },
            success: function() {
                window.location.reload();
            }
        });
}
function get_article(pagename,Type) {
	return $.ajax({
                url: mw.util.wikiScript(),
                type: 'GET',
                data: {
                    title: pagename,
                    action: 'raw',
                    cb: Math.ceil(new Date().getTime() / 1000),
                    dataType: (Type != null && Type != '' && Type || 'text')
                },
                error: function () {
                	return 0;
                }
	});
}

function RemoveElementFromArray(arr, elem) {
    if (arr != undefined) {
		for (var i = 0; i < arr.length; i++) {
       		if (arr[i] === elem) arr.splice(i,1);
        }
    }
}

function ArrayIncludesAll(arr, included) {
	var result = 0;
	for (var i = 0; i < included.length;i++) {
		var value = included[i];
		if (!arr.includes(value)) {
			result = 1;
			break;
		}
	}
	return result == 0;
}

function ArrayIncludesAny(arr, included) {
	for (var i = 0; i < included.length;i++) {
		var value = included[i];
		if (arr.includes(value)) {
			return true;
		}
	}
	return false;
}

// Кастомные лого и заголовок вики
mw.hook("wikipage.content").add( () => {
	if (Inits.LogoModule !== 0) return;
	Inits.LogoModule = parseInt(Inits.LogoModule) + 1;
	var customCommunityName = $('#customCommunityName')[0];
	var customCommunityLogo = $('#customCommunityLogo')[0];
	if (customCommunityName != null) {
		$('.fandom-community-header__community-name').html(customCommunityName.innerHTML);
	}
	if (customCommunityLogo != null && customCommunityLogo.firstElementChild != null) {
		var $e = $('.fandom-community-header__image');
		if ($e[0] != null && $e[0].hasChildNodes()) {
			var imgToSet = customCommunityLogo.firstElementChild.getAttribute('src');
			var img = $e[0].firstElementChild;
			img.setAttribute("src",imgToSet);
		}
	}
});

// Шаблон оценки
mw.hook("wikipage.content").add( () => {
	if ( Inits.RatingModule !== 0 || $(".pageRate").length <= 0 ) return;
	Inits.RatingModule = parseInt(Inits.RatingModule) + 1;
	
	var section = document.createElement('section');
	var header = document.createElement('h2');
	
	header.classList.add('activity-heading');
	$(header).html("Оценка статьи");
	
	section.classList.add('rail-module');
	section.classList.add('PageRatingModule');
	$(header).appendTo(section);
	$(section).appendTo($("#WikiaRail"));
	
	var RatingModuleElements = {
		body: $(".pageRate")[0],
		percentage: $("#pageRatingPercentage")[0],
		total: $("#pageRatingTotalVotes")[0],
		positive: $("#get_plus_rating")[0],
		negative: $("#get_minus_rating")[0],
		current_rate: $("#current_rate")[0],
		rating: $("#pageRating")[0],
		add_plus: $("#rate_page_plus")[0],
		add_minus: $("#rate_page_minus")[0],
		remove_rate: $("#remove_rate")[0]
	};
	
	$(RatingModuleElements.body).appendTo($(".PageRatingModule"));
	RatingModuleElements.body.style.setProperty("display","");
    
	get_article(RATING.StoringPage).done( (data) => { // получаем текущие оценки всех статей
        try {
        	data = JSON.parse(data);
        } catch (err) { // если происходит ошибка парсинга, то код показывает сообщение о ней в блоке шаблона оценки и выдаёт ошибку в консоль
        	RatingModuleElements.body.style.setProperty("display","none");
        	$("<p>",{class:"error",html:"Ошибка парсинга JSON",style:"font-weight:bold;text-align:center;font-size:150%"}).appendTo($(section));
        	throw err; // код не выполняется дальше
        }
        var currentPageRate = data[pageName] || [[],[]]; // проверяем есть ли данные о текущей статье, если нет, то создаём пустой шаблон для заполнения
		var userRate = currentPageRate[0].includes(userName) ? 1 : currentPageRate[1].includes(userName) ? -1 : 0; // оценка текущего участника
		var SYSTEM = data.$SYSTEM;
		var lastTimeUserRate = SYSTEM.LAST_EDIT_TIME[userName];
		function CheckTime() {
        	if ( lastTimeUserRate != undefined ) {
        		var DeltaTime = Math.floor( (Date.now() - parseInt(lastTimeUserRate) ) / 1000 );
        		if ( DeltaTime < RATING.TimeDelaySeconds ) {
        			RATING.Err = `Подождите ещё ${RATING.TimeDelaySeconds - DeltaTime} сек., прежде чем ставить оценки`;
        			RATING.UserCanVote = false;
        		}
        	}
        }
		
		var p = currentPageRate[0].length;
		var n = currentPageRate[1].length;
        var calculatedRating = p - n; // вычисляем рейтинг по формуле: положительные_голоса - негативные_голоса
        var totalRating = p + n; // всего голосов
        
        if (RatingModuleElements.percentage != null) RatingModuleElements.percentage.innerHTML = Math.round((p * 100) / totalRating).toString(); // процент положительных голосов
        
        if (RatingModuleElements.total != null) RatingModuleElements.total.innerHTML = (totalRating).toString(); // всего голосов
        
        // отдельная запись количества положительных и отрицательных голосов
        if (RatingModuleElements.positive != null) RatingModuleElements.positive.innerHTML = (p).toString();
        if (RatingModuleElements.negative != null) RatingModuleElements.negative.innerHTML = (n).toString();
        
        if (RatingModuleElements.current_rate != null && userRate) {
           	RatingModuleElements.current_rate.style.setProperty("display","");
           	$(RatingModuleElements.current_rate).html(`Ваша текущая оценка: ${userRate == 1 ? "+" : "-"}`);
        }
        RatingModuleElements.rating.innerHTML = `${calculatedRating > 0 ? '+' : ''}${calculatedRating.toString()}`; // записываем полученный рейтинг в элемент
        RatingModuleElements.rating.setAttribute("style",`color:${ calculatedRating > 0 ? 'var(--theme-positive-rating-text-color)' : calculatedRating < 0 ? 'var(--theme-negative-rating-text-color)' : 'var(--theme-page-text-color)' };font-size:30px`); // устанавливаем цвет текста в зависимости от рейтинга
        
        if (RATING.UserCanVote && userRate) {
			RatingModuleElements.remove_rate.style.setProperty("display","");
		}
		if (userRate == 1) {
			RatingModuleElements.add_plus.title = "";
			RatingModuleElements.add_plus.classList.add("pageRate-button-inactive");
		} else if (userRate == -1) {
			RatingModuleElements.add_minus.title = "";
			RatingModuleElements.add_minus.classList.add("pageRate-button-inactive");
		}
		
		function ClearTimes() {
			var NOW = Date.now();
			Object.keys(SYSTEM.LAST_EDIT_TIME).forEach( (user) => {
				if ( Math.floor( (NOW - SYSTEM.LAST_EDIT_TIME[user]) / 1000 ) >= RATING.TimeDelaySeconds ) {
					delete SYSTEM.LAST_EDIT_TIME[user];
				}
			});
		}
        
        $(RatingModuleElements.add_plus).click( () => { // положительная оценка статьи
        	if (userRate == 1) {
				return;
			}
            CheckTime();
  			if (!RATING.UserCanVote) {
				alert(RATING.Err);
				return;
			}
           	RemoveElementFromArray(currentPageRate[1],userName);
			    	     	
        	currentPageRate[0][p] = userName;
        	
           	data[pageName] = currentPageRate;
           	ClearTimes();
           	SYSTEM.LAST_EDIT_TIME[userName] = Date.now();
        	var to_save = JSON.stringify(data);
        	
           	post_article(RATING.StoringPage,to_save,'Поставлена оценка (+) для ' + pageName);
        });
       	$(RatingModuleElements.add_minus).click(function () { // отрицательная оценка статьи
       		if (userRate == -1) {
				return;
			}
           	CheckTime();
            if (!RATING.UserCanVote) {
				alert(RATING.Err);
				return;
			}
           	RemoveElementFromArray(currentPageRate[0],userName);
             	
            currentPageRate[1][n] = userName;
                    	
            data[pageName] = currentPageRate;
            ClearTimes();
            SYSTEM.LAST_EDIT_TIME[userName] = Date.now();
            var to_save = JSON.stringify(data);
            
            post_article(RATING.StoringPage,to_save,'Поставлена оценка (-) для ' + pageName);
        });
        $(RatingModuleElements.remove_rate).click(function () { // удаление оценки
        	if (userRate == 0) { // на случай если кому-то захочется сделать кнопку видимой через изменение элемента
				return;
			}
			CheckTime();
        	if (!RATING.UserCanVote) {
				alert(RATING.Err);
				return;
			}
        	RemoveElementFromArray(currentPageRate[0],userName);
           	RemoveElementFromArray(currentPageRate[1],userName);
            	
           	data[pageName] = currentPageRate;
           	ClearTimes();
           	SYSTEM.LAST_EDIT_TIME[userName] = Date.now() - 60*1000;
           	var to_save = JSON.stringify(data);
           	
           	post_article(RATING.StoringPage,to_save,'Убрана оценка для ' + pageName);
        });
    }).fail(function (jqXHR, textStatus, errorThrown) {
    	console.log("%cОценки статей не были получены!","color:red;");
    	console.log("textStatus:",textStatus, "\nerrorThrown:",errorThrown,"\njqXHR:",jqXHR);
    });
});

;( ($,mw) => {
	var $e;
	if ( $("span[aria-labelledby='ooui-php-1']").length > 0 ) { // удаление
		$e = $("span[aria-labelledby='ooui-php-1']");
		
		$e[0].addEventListener("click",function () {
			get_article(RATING.StoringPage).done( function (data) {
				data = JSON.parse(data);
				delete data[pageName];
				post_article(RATING.StoringPage, JSON.stringify(data),"Удалены оценки " + pageName);
			});
		});
	} else if ($("span[aria-labelledby='ooui-php-5']").length > 0 || $("span[aria-labelledby='ooui-php-7']").length > 0) { // переименование
		$e = $("span[aria-labelledby='ooui-php-5']").length > 0 && $("span[aria-labelledby='ooui-php-5']") || $("span[aria-labelledby='ooui-php-7']");
		
		$e[0].addEventListener("click", function () {
			get_article(RATING.StoringPage).done( function (data) {
				var name = mw.config.get("wgRelevantPageName");
				var namespace = ( $("span[id='ooui-1']")[0].innerHTML ).toString();
				data = JSON.parse(data);
				var new_name = ( (namespace == '(Основное)' ? '' : (namespace + ":") ) + ( $("input[name='wpNewTitleMain']")[0].value ).toString() ).replaceAll(" ","_");
				var data_to_copy = data[name];
				if ( data_to_copy != null && new_name != null && new_name != name ) {
					delete data[name];
					data[new_name] = data_to_copy;
					post_article(RATING.StoringPage,JSON.stringify( data ),"Перенос оценок с " + (namespace == '(Основное)' ? '' : (namespace + ":") ) + name + " на " + new_name);	
				}
			});
		});
	}
})(this.jQuery,this.mediaWiki);

// Список страниц по их оценкам
mw.hook("wikipage.content").add( () => {
	if ( Inits.ListModule !== 0 ) return;
	Inits.ListModule = parseInt(Inits.ListModule) + 1;
	
	var conf = mw.config.values;
	if (conf.wgPageName !== 'Служебная:Список_страниц_по_оценкам') {return;}
	$('title').html('Служебная:Список страниц по оценкам | Закулисье Майнкрафта вики | Fandom');
	$('.mw-body-content').html('');
	$('.page-header__title').html('Служебная:Список страниц по оценкам');
	
	get_article(RATING.StoringPage)
        .done(function (data) {
        	var rates = JSON.parse(data);
			var clRates = [];
			Object.keys(rates).forEach(function (key) {
				var p = rates[key][0].length;
				var n = rates[key][1].length;
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
				var rateColor = pageRate > 0 && 'var(--theme-positive-rating-text-color)' || pageRate < 0 && 'var(--theme-negative-rating-text-color)' || 'var(--theme-page-text-color)';
				
				var str = `<a href="/ru/wiki/${pageName}">${pageName.replaceAll('_',' ')}</a> — <span style="color:${rateColor};">${pageRate > 0 ? '+' : ''}${pageRate}</span>`;
						
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
	
});

// ;( () => {
	
// })(this.jQuery,this.mediaWiki);

// ууупс это было не лекарство