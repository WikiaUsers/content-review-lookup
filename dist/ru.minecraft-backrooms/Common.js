// Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице

// Константы

var userName = mw.config.get('wgUserName');
var userEdits = mw.config.get("wgUserEditCount");
var userGroups = mw.config.get("wgUserGroups");
var NeededGroups = ["autoconfirmed","emailconfirmed"];
var IsUserAdmin = ArrayIncludesAny(userGroups,['sysop','bureaucrat','interface-admin']);
var IsUserMod = IsUserAdmin || ArrayIncludesAny(userGroups,['content-moderator']);

var RATING = {
	StoringPage: "Закулисье_Майнкрафта_вики:Оценки_статей",
	MinEdits: 50,
	UserHasNeededGroups: ArrayIncludesAll(userGroups,NeededGroups),
	Err: 0
};

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
mw.hook("wikipage.content").add(function () {
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
mw.hook("wikipage.content").add(function () {
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
    
	get_article(RATING.StoringPage).done(function(data) { // получаем текущие оценки всех статей
        try {
        	data = JSON.parse(data);
        } catch (err) { // если происходит ошибка парсинга, то код показывает сообщение о ней в блоке шаблона оценки и выдаёт ошибку в консоль
        	if (!IsUserMod) { // шаблон прячется от обычных пользователей при ошибке
        		section.style.setProperty("display","none");
        	} else {
        		RatingModuleElements.body.style.setProperty("display","none");
        		$("<p>",{class:"error",html:"Ошибка парсинга JSON",style:"font-weight:bold;text-align:center;font-size:150%"}).appendTo($(section));
        	}
        	throw err; // код не выполняется дальше
        }
        var myRate = data[mw.config.get('wgPageName')] || [[],[]]; // проверяем есть ли данные о текущей статье, если нет, то создаём пустой шаблон для заполнения
		var userRate = myRate[0].includes(userName) ? "+" : myRate[1].includes(userName) ? "-" : 0; // оценка текущего участника
		
		var p = myRate[0].length;
		var n = myRate[1].length;
        var calculatedRating = p - n; // вычисляем рейтинг по формуле: положительные_голоса - негативные_голоса
        var totalRating = p + n; // всего голосов
        
        if (RatingModuleElements.percentage != null) RatingModuleElements.percentage.innerHTML = Math.round((p * 100) / totalRating).toString(); // процент положительных голосов
        
        if (RatingModuleElements.total != null) RatingModuleElements.total.innerHTML = (totalRating).toString(); // всего голосов
        
        // отдельная запись количества положительных и отрицательных голосов
        if (RatingModuleElements.positive != null) RatingModuleElements.positive.innerHTML = (p).toString();
        if (RatingModuleElements.negative != null) RatingModuleElements.negative.innerHTML = (n).toString();
        
        if (RatingModuleElements.current_rate != null && userRate !== 0) {
           	RatingModuleElements.current_rate.style.setProperty("display","");
           	$(RatingModuleElements.current_rate).html("Ваша текущая оценка: " + userRate);
        }
        RatingModuleElements.rating.innerHTML = ( calculatedRating > 0 && '+' || '' ) + calculatedRating.toString(); // записываем полученный рейтинг в элемент
        RatingModuleElements.rating.setAttribute("style","color:" + (calculatedRating > 0 && 'var(--theme-positive-rating-text-color)' || calculatedRating < 0 && 'var(--theme-negative-rating-text-color)' || 'var(--theme-page-text-color)') + ";font-size:30px"); // устанавливаем цвет текста в зависимости от рейтинга
        
        if (RATING.UserCanVote && userRate) {
			RatingModuleElements.remove_rate.style.setProperty("display","");
		}
        
        $(RatingModuleElements.add_plus).click(function () { // положительная оценка статьи
            // если у чела меньше десяти правок, то он не может ставить оценку
  			if (!RATING.UserCanVote) {
				alert(RATING.Err);
				return;
			}
           	RemoveElementFromArray(myRate[0],userName);
           	RemoveElementFromArray(myRate[1],userName);
			    	     	
        	myRate[0][p] = userName;
        	
           	data[mw.config.get('wgPageName')] = myRate;
        	var to_save = JSON.stringify(data);
           	post_article(RATING.StoringPage,to_save,'Поставлена оценка (+) для ' + mw.config.get('wgPageName'));
        });
       	$(RatingModuleElements.add_minus).click(function () { // отрицательная оценка статьи
           	// если у чела меньше десяти правок, то он не может ставить оценку
            if (!RATING.UserCanVote) {
				alert(RATING.Err);
				return;
			}
           	RemoveElementFromArray(myRate[0],userName);
          	RemoveElementFromArray(myRate[1],userName);
             	
            myRate[1][n] = userName;
                    	
            data[mw.config.get('wgPageName')] = myRate;
            var to_save = JSON.stringify(data);
                    	
            post_article(RATING.StoringPage,to_save,'Поставлена оценка (-) для ' + mw.config.get('wgPageName'));
        });
        $(RatingModuleElements.remove_rate).click(function () { // удаление оценки
        	if (!RATING.UserCanVote) {
				alert(RATING.Err);
				return;
			}
        	RemoveElementFromArray(myRate[0],userName);
           	RemoveElementFromArray(myRate[1],userName);
            	
           	data[mw.config.get('wgPageName')] = myRate;
           	var to_save = JSON.stringify(data);
           	
           	post_article(RATING.StoringPage,to_save,'Убрана оценка для ' + mw.config.get('wgPageName'));
        });
    }).fail(function (jqXHR, textStatus, errorThrown) {
    	console.log("%cОценки статей не были получены!","color:red;");
    	console.log("textStatus:",textStatus, "\nerrorThrown:",errorThrown,"\njqXHR:",jqXHR);
    });
});

;(function ($,mw) {
	var $e;
	if ( $("span[aria-labelledby='ooui-php-1']").length > 0 ) { // удаление
		$e = $("span[aria-labelledby='ooui-php-1']");
		
		$e[0].addEventListener("click",function () {
			get_article(RATING.StoringPage).done( function (data) {
				data = JSON.parse(data);
				delete data[config.wgPageName];
				post_article(RATING.StoringPage, JSON.stringify(data),"Удалены оценки " + config.wgPageName);
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
mw.hook("wikipage.content").add(function () {
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

// ;(function ($,mw) {
	
// })(this.jQuery,this.mediaWiki);

// ууупс это было не лекарство