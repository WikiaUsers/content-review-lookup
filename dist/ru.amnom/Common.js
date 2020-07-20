importScriptPage( 'AjaxRC/code.js', 'dev' ); // AJAX-обновление некоторых страниц
var ajaxPages = ["Служебная:Watchlist","Служебная:Contributions","Служебная:WikiActivity","Служебная:RecentChanges"]; // AJAX-обновление некоторых страниц(выбор страниц)
var AjaxRCRefreshText = 'Автообновление'; //Отображаемое название
var AjaxRCRefreshHoverText = 'Автоматически обновлять страницу'; //Отображаемое подсказку
 
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
/* Сворачивающиеся блоки */
// Смотри: http://ru.wikipedia.org/wiki/Википедия:Сворачивающиеся_блоки 
NavigationBarShowDefault = 2 //максимальное количество автосворачиваемых блоков 
 //(div'ы и таблицы считаются отдельно), после которого они будут изначально свёрнуты
var NavigationBarHide = '[скрыть]' //ссылка-переключатель на развёрнутом блоке
var NavigationBarShow = '[показать]' //ссылка-переключатель на свёрнутом блоке
/* Конец скрипта */
 
importScriptPage( 'MediaWiki:PurgeButton/code.js' ); // Кнопка очистки кеша страницы
var PurgeButtonText = 'Обновить';
var PurgeHoverText = 'обновить страницу';
 
//A script that adds a "Back To Top" option in the footer of the Oasis theme.
//I don't like scrolling back to top on long pages neither do you :)
//Created by Noemon from Dead Space Wiki
 
 
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
		$('<li id="backtotop" style="position: absolute; right:20px; top:-25px; border:none;"><button style=" font-size: 100%; height: 35px; line-height: 34px; width: 100px;" type="button" value="Наверх" onClick="goToTop();">Наверх</button></li>').appendTo('#WikiaFooter > .toolbar > .tools');	
		hideFade ();
	}	
}
 
var ButtonStart = 800;
var ScrollSpeed = 600;
 
if( !window.BackToTop  ) {
	$( document ).ready( addBackToTop );
}
 
var BackToTop = true; // prevent duplication
 
if( typeof Start == "number" ) {
	ButtonStart = Start;
}
 
if( typeof Speed == "number" ) {
	ScrollSpeed = Speed;
}	
//
 
importScriptPage('ShowHide/code.js', 'dev');

// Изменение описания чата
importScript('MediaWiki:Chat-headline');
 
function changeChatDesc() {
try {
if ($('section.ChatModule').size() > 0 && $('p.chat-name').html() != chatDesc){
$('p.chat-name').html(''+chatDesc+'');
setTimeout("changeChatDesc()", 200);
}
 
}catch (err){
setTimeout("changeChatDesc()", 200);
}
};
 
$(document).ready(function (){changeChatDesc()});
//A script that adds a "Вверх" option in the footer of the Oasis theme.
importScriptPage('MediaWiki:BackToTopButton/code.js');
//Конец скрипта
//Другое
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
 
var ButtonStart = 500;
var ScrollSpeed = 700;
 
if( !window.BackToTop  ) {
	$( document ).ready( function () { 
		addBackToTop (); 
	});
}
var BackToTop = true; // prevent duplication
 
 
if (wgUserName != 'null') {
	$('.insertusername').text(wgUserName);
}
importScriptPage('ShowHide/code.js', 'dev');
 

/* remove layout selection in create page dialog - 5/17/11 */
function killLayoutSelection() {
	if (wgPageQuery.match(/(?=%26useFormat)/)) {
		document.getElementById('wpTextbox1').innerHTML='';
	}
}
addOnloadHook(killLayoutSelection);
 
/* Information template */
function InformationTemplate() {
	if (wgPageName != ('Special:Upload' || 'Special:MultipleUpload')) { return; }
	if (wgPageQuery.match(/(?=wpForReUpload%3D1)/)) { return; }
	document.getElementById('wpUploadDescription').innerHTML = '{{Information\n|attention=\n|description=\n|source=\n|author=\n|filespecs=\n|licensing=\n|other versions=\n|cat artist=\n|cat subject=\n|cat type=\n}}';
	document.getElementsByClassName('mw-htmlform-field-Licenses')[0].style.display='none';
	document.getElementById('mw-license-preview').style.display='none';
}
addOnloadHook(InformationTemplate);

function moveTip(e) {
    var newTop = e.clientY + ((e.clientY > ($(window).height() / 2)) ? -($tfb.not(".hidden").innerHeight() + 20) : 20);
    var newLeft = e.clientX + ((e.clientX > ($(window).width() / 2)) ? -($tfb.not(".hidden").innerWidth() + 20) : 20);
    $tfb.not(".hidden").css({
        "position": "fixed",
        "top": newTop + "px",
        "left": newLeft + "px"
    });
}
//КОД НАХАЛЬНО СВОРОВАН С http://ru.elderscrolls.wikia.com/wiki/MediaWiki:Common.js
 
/* ######################################################################## */
/* ######################################################################## */
 
function infoboxToggle() {
	var page = window.pageName.replace(/\W/g, '_');
	var nowShown;
 
	if(document.getElementById('infoboxtoggle').innerHTML == '[Hide]') {
		document.getElementById('infoboxinternal').style.display = 'none';
		document.getElementById('infoboxtoggle').innerHTML = '[Show]';
		nowShown = false;
	} else {
		document.getElementById('infoboxinternal').style.display = 'block';
		document.getElementById('infoboxtoggle').innerHTML = '[Hide]';
		nowShown = true;
	}
 
	if(window.storagePresent) {
		var storage = globalStorage[window.location.hostname];
		storage.setItem('infoboxshow-' + page, nowShown);
	}
}
 

//Должность администрации
importScript("MediaWiki:Common.js/masthead.js");

//Кнопочки
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
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/3/3b/Button_template_alt.png",
     "speedTip": "Шаблон",
     "tagOpen": "{{",
     "tagClose": "}}",
     "sampleText": "Название шаблона"};
	};
}

importScriptPage('SocialIcons/code.js', 'dev');