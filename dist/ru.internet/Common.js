/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

//Импорты страниц для работы скриптов

importScriptPage('Standard_Edit_Summary/code.js', 'dev');

importScriptPage('SocialIcons/code.js','dev');

importScriptPage('InactiveUsers/code.js', 'dev');

/*Добавляет дополнительные статусы участников. Однако прав не дает.*/
// rights[""] = [""];
// Код написан: Rappy_4187 для работы табличек на страницах участников.
$(function () {
    var rights = {};

    //Изображение на профайле участника

    var img = {};
    img["500Чак"] = ['<img src="https://images.wikia.nocookie.net/__cb20140706072912/nuikiepedia/ru/images/thumb/3/3e/%D0%92%D0%BE%D0%BF%D1%80%D0%BE%D1%81_%D0%BD%D0%B0%D1%80%D0%B8%D1%81%D0%BE%D0%B2%D0%B0%D0%BD2.png/212px-%D0%92%D0%BE%D0%BF%D1%80%D0%BE%D1%81_%D0%BD%D0%B0%D1%80%D0%B8%D1%81%D0%BE%D0%B2%D0%B0%D0%BD2.png" width="170px" height="170px">'];
    if (typeof img[wgTitle] != "undefined") {
        $('<div style="position:absolute; left:587px; top:-15;">' + img[wgTitle] + '</div>').appendTo('.masthead-info');
    }

    //Участники имеющие потемные статусы этой вики:
    rights["Yaroslav269"] = ["ОТВЕТЧИК"];
    rights["Kirillboro25"] = ["НЕАКТИВНЫЙ АДМИНИСТРАТОР"];
    rights["AngryGlebird"] = ["ЗАБЛОКИРОВАН","ВАНДАЛ"];
    rights["Cvbh"] = ["Volunteer for Combating vandals"];
    if (typeof rights[wgTitle] != "undefined") {

        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();

        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {

            // add new rights
            $('<span class="tag">' + rights[wgTitle][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }
    }

});

//вызов функции вставки кнопок быстрого описания правки при загрузке страницы
addOnloadHook(SummaryButtons)

//Кнопка обновления

importScriptPage( 'PurgeButton/code.js', 'dev' ); // Кнопка очистки кэша страницы
var PurgeButtonText = 'Обновить';

//Неактивные пользователи

InactiveUsers = { 
    months: 2,
    text: 'НЕАКТИВЕН'
};

//Снег эффект

/*Снег

importArticle({
 type: "script",
 articles: [
 "MediaWiki:Snow.js"
],
});
*/

//Участник

if (wgUserName != 'null') {
    $('.insertusername').text(wgUserName);
}

//Сложный таймер

importArticles({
    type: "script",
    articles: ["w:c:ru.sword-art-online:MediaWiki:RepeatableTimer.js"]
});

/* Наведение на стрелку заставляет её открыться */
 
window.AutoEditDropdownConfig = {
expandedAreaContribute: true,
expandedAreaEdit: false
};
 
importArticles({
type: 'script',
articles: [
'w:c:dev:AutoEditDropdown/code.js'
]
});

/* Добавляет 4-й и 5-й уровни навигации */
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});

/* Иконки социальных сетей */
$('.WikiaRail').prepend('<div style="right:-1px; top:108px; position: absolute;"><div style="position: absolute;" class="SocialIcon"><div style="float:right;"><a href="https://vk.com/answertothequestion"><img src="https://images.wikia.nocookie.net/__cb20140425100139/callofduty/ru/images/3/30/Vkontakte_logo.png"></a></div></div><div style="position: absolute; margin-top:42px" class="SocialIcon"><div style="float:right;"><a href="https://www.facebook.com/profile.php?id=100006713569199"><img src="https://images.wikia.nocookie.net/__cb20140709111614/nuikiepedia/ru/images/thumb/6/6f/%D0%A4%D0%B5%D0%B9%D0%B1%D1%83%D0%BA.png/35px-%D0%A4%D0%B5%D0%B9%D0%B1%D1%83%D0%BA.png"></a></div></div><div style="position: absolute; margin-top:84px" class="SocialIcon"><div style="float:right;"><a href="https://plus.google.com/u/1/118339507949919165023/posts"><img src="https://images.wikia.nocookie.net/__cb20140425100145/callofduty/ru/images/4/47/Yt_logo.png"></a></div></div><div style="position: absolute; margin-top:126px" class="SocialIcon"><div style="float:right;"><a href="https://twitter.com/Internet_wiki"><img src="https://images.wikia.nocookie.net/__cb20140713151533/nuikiepedia/ru/images/thumb/f/f7/Twitter.png/32px-Twitter.png"></a></div></div><div style="position: absolute; margin-top:160px" class="Birthday"><div style="float:right;"><a href="Блог участника:500Чак/С днём рождения, вики!"><img src=""></a></div></div>');
 



//Кнопки-вставлялки

if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/sims/ru/images/4/44/Knopka_Tire.png",
        "speedTip": "Тире",
        "tagOpen": "—",
        "tagClose": "",
        "sampleText": ""
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
        "speedTip": "На другую строку",
        "tagOpen": "<br />",
        "tagClose": "",
        "sampleText": ""
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
        "speedTip": "Зачеркнуть",
        "tagOpen": "<s>",
        "tagClose": "</s>",
        "sampleText": "Зачеркнутый текст"
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/4/47/Button_redir.png",
        "speedTip": "Перенаправление",
        "tagOpen": "#перенаправление [[",
        "tagClose": "]]",
        "sampleText": "Ведите текст"
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20110312002753/es.starwars/images/4/44/Button_comillas_latinas.png",
        "speedTip": "Кавычки",
        "tagOpen": "«",
        "tagClose": "»",
        "sampleText": "Текст"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/3/3b/Button_template_alt.png",
        "speedTip": "Шаблон",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Название шаблона"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "",
        "speedTip": "Тег",
        "tagOpen": "<",
        "tagClose": ">",
        "sampleText": "Название тега"
    };


    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20140529054149/nuikiepedia/ru/images/9/90/-.png",
        "speedTip": "Решетка",
        "tagOpen": "#",
        "tagClose": "",
        "sampleText": ""

    };
};

 
//A script that adds a "Back To Top" option in the footer of the Oasis theme.
//I don't like scrolling back to top on long pages neither do you :)
//
 
 
function hideFade () {
	// hide #backtotop first
	$( "#backtotop" ).hide ();
	// fade in #backtotop
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollTop () > ButtonStart ) {
				$( '#backtotop' ).fadeIn ();
			} else {
				$( '#backtotop' ).fadeOut ();
			}
		});
	});
}
 
//A script that adds a "Back To Top" option in the footer of the Oasis theme.
//Created by Noemon from Dead Space Wiki, translate from ru.elderscrolls.wikia
 
function hideFade () {
	// hide #backtotop first
	$( "#backtotop" ).hide ();
	// fade in #backtotop
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollTop () > ButtonStart ) {
				$( '#backtotop' ).fadeIn ();
			} else {
				$( '#backtotop' ).fadeOut ();
			}
		});
	});
}
 
function goToTop (){
	// scroll body to 0px on click
	$( 'body,html' ).animate ({
		scrollTop: 0
	}, ScrollSpeed );
	return false;
}
 
function addBackToTop () {
	if( skin == 'oasis' ) {
		$('<li id="backtotop" style="position: absolute; right:20px; top:0px; border:none;"><button type="button" value="Наверх" onClick="goToTop();">Наверх</button></li>').appendTo('#WikiaBarWrapper .toolbar > .tools');	
		hideFade ();
	}	
}
 
var ButtonStart = 800;
var ScrollSpeed = 600;
 
if( !window.BackToTop  ) {
	$( document ).ready( function () { 
		addBackToTop (); 
	});
}
var BackToTop = true; // prevent duplication
 
 
function addWikifButton() {
        var toolbar = document.getElementById('toolbar')
        if (!toolbar) return
        var i = document.createElement('img')
        i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png'
        i.alt = i.title = 'викификатор'
        i.onclick = Wikify
        i.style.cursor = 'pointer'
        toolbar.appendChild(i)
}
if (wgAction == 'edit' || wgAction == 'submit') {
        importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript')
        addOnloadHook(addWikifButton)
}

// Таймер

// *****************************************************
// * Experimental javascript countdown timer (Splarka) *
// * Version 0.0.3                                     *
// *****************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>

function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);

    // catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }

    // determine plus/minus
    if (diff < 0) {
        diff = -diff;
        var tpm = '';
        ''
    } else {
        var tpm = '';
        ''
    }

    // Calculate the diff - Modified by Eladkse
    if ((diff % 60) == 1) {
        left = (diff % 60) + ' секунды';
    } else {
        left = (diff % 60) + ' секунда';
    }
    diff = Math.floor(diff / 60);
    if (diff > 0) {
        if ((diff % 60) == 1) {
            left = (diff % 60) + ' минута, и ' + left;
        } else {
            left = (diff % 60) + ' минут, и ' + left;
        }
    }
    diff = Math.floor(diff / 60);
    if (diff > 0) {
        if ((diff % 24) == 1) {
            left = (diff % 24) + ' час, ' + left;
        } else {
            left = (diff % 24) + ' часов, ' + left;
        }
    }
    diff = Math.floor(diff / 24);
    if (diff > 0) {
        if (diff == 1) {
            left = diff + ' день, ' + left;
        } else {
            left = diff + ' дней, ' + left;
        }
    }
    timers[i].firstChild.nodeValue = tpm + left;

    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}

function checktimers() {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none'
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline'

    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length == 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
}
addOnloadHook(checktimers);

 
//список кнопок
function SummaryButtons(){
 var wpSummary = document.getElementById('wpSummary')
 if (!wpSummary || (wpSummary.form.wpSection && wpSummary.form.wpSection.value == 'new')) return
 wpSummaryBtn = document.createElement('span') //global var
 wpSummaryBtn.id = 'userSummaryButtonsA'
 
// +Рекомендация
 var wpSummaryBtnRec = document.createElement('i');
 wpSummaryBtnRec.appendChild(document.createTextNode('Пожалуйста, если вы не торопитесь, опишите вашу правку. Вы можете выбрать описание кликнув по ссылке ниже или выбрав описание в контекстном меню'));
 wpSummaryBtnRec.appendChild(document.createElement('br'));
 wpSummaryBtn.appendChild(wpSummaryBtnRec);
 
 wpSummary.parentNode.insertBefore(wpSummaryBtn, wpSummary.nextSibling);
 wpSummary.parentNode.insertBefore(document.createElement('br'), wpSummary.nextSibling);
 addSumButton('новости', 'новости', 'Учтены последние новости');
 addSumButton('викификация', 'викификация', 'Произведена викификация');
 addSumButton('частичная викификация', 'частичная викификация', 'Была нажата одна кнопочка');
 addSumButton('правила', 'правила', 'Согласно правил');
 addSumButton('оформление', 'оформление', 'Оформление');
 addSumButton('стиль', 'стилевые правки', 'Стилевые правки');
 addSumButton('грамматика', 'грамматика', 'Поправлена орфография/пунктуация');
 addSumButton('категоризация', 'категоризация', 'Изменены/добавлены категории');
 addSumButton('шаблон', 'шаблон', 'Добавлен/изменён шаблон');
 addSumButton('дополнение', 'дополнение', 'Добавлены новые сведения');
 addSumButton('уточнение', 'уточнение', 'Уточнение');
 addSumButton('иллюстрирование', 'иллюстрирование', 'Размещена/изменена иллюстрация');
 addSumButton('обновление', 'обновление сведений', 'Обновлены устаревшие сведения');
 addSumButton('разметка', 'правка разметки', 'Изменение разметки');
 addSumButton('лишнее', 'лишнее', 'Действительно лишнее');
 addSumButton('интервики', 'интервики', 'Интервики тоже нужны');
 addSumButton('замена изображения', 'замена изображения', 'Замена изображения');
 addSumButton('шаблонофикация', 'шаблонофикация', 'шаблонофикация');
 addSumButton('ашыпки', 'ашыпки', 'Обнаружены ошибки');
 addSumButton('сомнения', 'сомнения', 'Сомнения по статье');
 addSumButton('другая ссылка', 'другая ссылка', 'Замена ссылки');
}

//код вставки кнопок быстрого описания
function addSumButton(name, text, title) {
 var btn = document.createElement('a');
 btn.appendChild(document.createTextNode(name));
 btn.title = title;
 btn.onclick = function(){insertSummary(text)};
 wpSummaryBtn.appendChild(btn);
 wpSummaryBtn.appendChild(document.createTextNode(' '));
}
 
//код вставки описания
function insertSummary(text) {
 var wpSummary = document.getElementById('wpSummary')
 if (wpSummary.value.indexOf(text) != -1) return 
 if (wpSummary.value.match(/[^,; \/]$/)) wpSummary.value += ','
 if (wpSummary.value.match(/[^ ]$/)) wpSummary.value += ' '
 wpSummary.value += text
}

var _tt=function(){
	var id = 'tt';
	var top = 3;
	var left = 3;
	var maxw = 300;
	var speed = 8;
	var timer = 10;
	var endalpha = 95;
	var alpha = 0;
	var tt,t,/*c,b,*/h;
	var ie = document.all ? true : false;
	return{
		show:function(e,v,w){
			var t=getEventTarget(e);addEvent(t,'mouseout',this.hide); t.style.cursor='help';
			if(tt==null){
				tt=document.createElement('div');
				tt.setAttribute('id',id);
				document.body.appendChild(tt);
				tt.style.opacity=0;
				if(ie)tt.style.filter = 'alpha(opacity=0)';
			}
			tt.style.display = 'block';
			tt.innerHTML = v;
			tt.style.width = w ? w + 'px' : 'auto';
			if(tt.offsetWidth > maxw){tt.style.width=maxw+'px'}
			h = parseInt(tt.offsetHeight) + top;
			clearInterval(tt.timer);
			tt.timer=setInterval(function(){_tt.fade(1)},timer);
		   dd=getOffset(t);
		   tt.style.top = (dd.top-h+4) + "px";
		   tt.style.left = (dd.left+13) + "px";

		},
		pos:function(e){
			var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
			var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
			tt.style.top = (u - h) + 'px';
			tt.style.left = (l + left) + 'px';
		},
		fade:function(d){
			var a = alpha;
			if((a != endalpha && d == 1) || (a != 0 && d == -1)){
				var i = speed;
				if(endalpha - a < speed && d == 1){i = endalpha - a;
				}else if(alpha < speed && d == -1){i = a;}
				alpha = a + (i * d);
				tt.style.opacity = alpha * .01;
				if(ie)tt.style.filter='alpha(opacity=' + alpha + ')';
			}else{
				clearInterval(tt.timer);
				if(d == -1){tt.style.display = 'none'}
			}
		},
		hide:function(e){
			clearInterval(tt.timer);
			tt.timer = setInterval(function(){_tt.fade(-1)},timer);
		}
	};
}();

/* вспомогательная функция получения координат элемента */

function getOffset(elem) {
if(elem.getBoundingClientRect){
    var box = elem.getBoundingClientRect();
    var body = document.body;
    var docElem = document.documentElement;
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;
    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;
    return { top: Math.round(top), left: Math.round(left) }
}else{
    var top=0, left=0;
    while(elem) {
        top = top + parseInt(elem.offsetTop);
        left = left + parseInt(elem.offsetLeft);
        elem = elem.offsetParent;
    }
    return {top: top, left: left}
}
}

/* вспомогательная функция получения объекта, на котором возникло событие */

function getEventTarget(e) {
  var e = e || window.event;
  var target=e.target || e.srcElement;
  if(typeof target == "undefined")return e; // передали this, а не event
  if (target.nodeType==3) target=target.parentNode;// боремся с Safari
  return target;
}

/* стандартная вспомогательная функция назначения обработчика событий */

var addEvent = (function(){
	if (document.addEventListener){
        	return function(obj, type, fn, useCapture){
                	obj.addEventListener(type, fn, useCapture);
	}
	} else if (document.attachEvent){ // для Internet Explorer
	return function(obj, type, fn, useCapture){
	        obj.attachEvent("on"+type, fn);
	}
	} else {
	return function(obj, type, fn, useCapture){
	        obj["on"+type] = fn;
	}
	}
})();


// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************
/**
 *Script for hiding and showing hidden text when hovering certain elements
 */
$('.hover-text').hover(function () {
    $(this).prepend('<div class="hover-hidden-text">' + $(this).data('text') + '</div>');
}, function () {
    $(this).find('.hover-hidden-text').remove();
});