/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
importScriptPage('SocialIcons/code.js', 'dev');
/*Конец*/
/*=========================Плашки====================*/
/* Изменение плашек (отсутствует)*/
importScript('MediaWiki:Common.js/masthead.js');
 /*Конец*/
/* Автоматическая выдача плашек по числу правок участника */
$(function () {
    if ($(".tally > em").length && $('#UserProfileMasthead').length && mw.config.get('wgAction') === 'view') {
        var editCount = $(".tally > em").text();
        var title = '';
        if (editCount <= 10) {
            title = "Заинтригованный";
        } else if (editCount > 10 && editCount <= 100) {
            title = "Маг";
        } else if (editCount > 100 && editCount <= 1000) {
            title = "Высший маг";
        } else {
            title = "Старейший";
        }
        $('<span />', {
            class: 'tag',
            text: title
        }).appendTo('.masthead-info hgroup');
    }
});
/*Конец*/
/*=========================конец==================*/
/* Статусы */
function addMastheadTags() {
    var rights = {};
 
    rights["Орлогрив"] = ["Почётный маг, открывший magia.wiki"];
 
    if (wgCanonicalSpecialPageName == "Contributions") {
        var user = wgPageName.substring(wgPageName.lastIndexOf("/") + 1).replace(/_/g, " ");
    } else {
        var user = wgTitle;
    }
 
    if (typeof rights[user] != "undefined") {
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for(var i = 0, len = rights[user].length; i < len; i++) {
            $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] + '</span>').appendTo('.masthead-info hgroup');
        }
    } 
};
 
$(function() {
    if ($('#UserProfileMasthead')) {
        addMastheadTags();
    }
});
 
var SocialMediaButtonsNamespaces = [0, 6, 14, 500];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "35px",
	wikiTwitterAccount: "default"
};
/*Статусы-конец*/
/*Таймер*/
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
   var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
   // catch bad date strings
   if(isNaN(diff)) { 
     timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
     return;
   }
 
   // determine plus/minus
   if(diff<0) {
     diff = -diff;
     var tpm = '';''
   } else {
     var tpm = '';''
   }
 
   // Calculate the diff - Modified by Eladkse
  if ((diff%60) == 1) {
    left = (diff%60) + ' секунды';
  } else {
    left = (diff%60) + ' секунда';
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%60) == 1) {
      left = (diff%60) + ' минута, и ' + left;
    } else {
      left = (diff%60) + ' минут, и ' + left;
    }
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%24) == 1) {
      left = (diff%24) + ' час, ' + left;
    } else {
      left = (diff%24) + ' часов, ' + left;
    }
  }
    diff=Math.floor(diff/24);
  if(diff > 0) {
    if (diff == 1) {
      left = diff + ' день, ' + left;
    } else {
      left = diff + ' дней, ' + left;
    }
  }
  timers[i].firstChild.nodeValue = tpm + left;
 
   // a setInterval() is more efficient, but calling setTimeout()
   // makes errors break the script rather than infinitely recurse
   timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
 }
 
 function checktimers() {
   //hide 'nocountdown' and show 'countdown'
   var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
   for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
   var countdowns = getElementsByClassName(document, 'span', 'countdown');
   for(var i in countdowns) countdowns[i].style.display = 'inline'
 
   //set up global objects timers and timeouts.
   timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
   timeouts = new Array(); // generic holder for the timeouts, global
   if(timers.length == 0) return;
   for(var i in timers) {
     timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
     updatetimer(i);  //start it up
   }
 }
 addOnloadHook(checktimers);
 
 // **************************************************
 //  - end -  Experimental javascript countdown timer
 // **************************************************
/*Таймеов конец*/
//Кнопки быстрого описания правки
 
//список кнопок
function SummaryButtons(){
 var wpSummary = document.getElementById('wpSummary')
 if (!wpSummary || (wpSummary.form.wpSection && wpSummary.form.wpSection.value == 'new')) return
 wpSummaryBtn = document.createElement('span') //global var
 wpSummaryBtn.id = 'userSummaryButtonsA'

/*Добавляет варианты описания изменений на страницу редактирования под окошко предпросмотра*/
// +Рекомендация
 var wpSummaryBtnRec = document.createElement('i');
 wpSummaryBtnRec.appendChild(document.createTextNode('Пожалуйста, если вы не торопитесь, опишите вашу правку:'));
 wpSummaryBtnRec.appendChild(document.createElement('br'));
 wpSummaryBtn.appendChild(wpSummaryBtnRec);
 
 wpSummary.parentNode.insertBefore(wpSummaryBtn, wpSummary.nextSibling);
 wpSummary.parentNode.insertBefore(document.createElement('br'), wpSummary.nextSibling);
 addSumButton('новости', 'новости', 'новости');
 addSumButton('правила', 'правила', 'Согласно правилам Магия вики');
 addSumButton('оформление', 'оформление', 'Оформление');
 addSumButton('шаблон', 'добавлен шаблон', 'Добавлен шаблон');
 addSumButton('грамматика', 'грамматика', 'Орфография');
 addSumButton('категоризация', 'категоризация', 'Изменены категории');
 addSumButton('дополнение', 'дополнение', 'Добавлены новые сведения');
 addSumButton('уточнение', 'уточнение', 'Уточнение');
 addSumButton('обновление', 'обновление сведений', 'Обновлены устаревшие сведения');
 addSumButton('разметка', 'правка разметки', 'Изменение разметки');
 addSumButton('лишнее', 'лишнее', 'Действительно лишнее');
 addSumButton('интервики', 'интервики', 'Интервики тоже нужны');
 addSumButton('замена изображения', 'замена изображения', 'Замена изображения');
 addSumButton('шаблонофикация', 'шаблонофикация', 'шаблонофикация');
 addSumButton('ошибки', 'ошибки', 'Обнаружены ошибки');
 addSumButton('сомнения', 'сомнения', 'Сомнения по статье');
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
 
//вызов функции вставки кнопок быстрого описания правки при загрузке страницы
addOnloadHook(SummaryButtons)
 
//наверх
function goToTop (){
	// scroll body to 0px on click
	$( 'body,html' ).animate ({
		scrollTop: 0
	}, ScrollSpeed );
	return false;
}
 
function addBackToTop () {
	if( skin == 'oasis' ) {
		$('#WikiaBarWrapper .arrow').before('<button id="backtotop" type="button" value="Лететь в небеса" onClick="goToTop();" style="position:absolute; right:25px; top:2px; z-index:200;">Лететь в небеса</button>');
	}	
}
 
var ButtonStart = 800;
var ScrollSpeed = 600;
 
if( !window.BackToTop  ) {
	$( document ).ready( function () { 
		addBackToTop (); 
	});
}
var BackToTop = true;

/*добавляет часы, отображающие текущее время в часовом поясе UTC, в заголовок Oasis. (Уже для личного пользования) на dev UTCClock */
// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';
importArticles({
	type: 'script',
	articles: [
		'u:dev:DisplayClock/code.js'
	]
});
 
importArticles( {
    type: 'script',
    articles: [
        "u:dev:SpellingBee/startup.js"
    ]
} );
importScript('MediaWiki:Common.js/WordFilter/code.js');
//Game
importScript('MediaWiki:Minigame.js');
if ( mwCustomEditButtons ) {
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/magia/images/f/fe/Stub.png/revision/latest?cb=20150806114801&path-prefix=ru",
		"speedTip": "Stub",
		"tagOpen": "{{",
		"tagClose": "}}",
		"sampleText": "Stub"
	};
 
}