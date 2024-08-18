 // *****************************************************
 // * Экспериментальный таймер (Splarka) *
 // * Version 0.0.3                                     *
 // *****************************************************
 //
 // пример:
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
 //  конец Экспериментального таймера (скрипт)
 // **************************************************

/*Неактивные пользователи*/
//Inactive users
InactiveUsers = { 
    months: 3,
    text: 'НЕАКТИВЕН'
};
 
importScriptPage('InactiveUsers/code.js', 'dev');

//================================================================
// Иконки в [[Template:Игры]]; автор: [[:en:User:Porter21]]
function addTitleIcons() {
	if (skin == 'monaco' || skin == 'monobook' || skin == 'oasis') {
		var insertTarget;
 
		switch (skin) {
			case 'monobook':
				insertTarget = $('#firstHeading');
				break;
			case 'oasis':
				if (wgAction != 'submit' && wgNamespaceNumber != 112) {
					insertTarget = $('#WikiaArticle');
				}
				break;
		}
		if (insertTarget) {
			$('#va-titleicons').css('display', 'block').prependTo(insertTarget);
		}
	}
}
jQuery(function($) {
	addTitleIcons();
});

//================================================================
// Простой генератор списка заголовков на [[Special:AchievementsCustomize]]
var wgPageName;
if(wgPageName=='Служебная:AchievementsCustomize'||'Special:AchievementsCustomize') {
	$('.article-sidebar #AchievList').remove();
	$('<section class="module" id="AchievList" style="float: left;"><h2>Существующие треки</h2><ol></ol></section>').appendTo('.article-sidebar');
 
	var AchievHeaders = $('.customize-section h2');
	var AchievList = $('.customize-section h2');
 
	for (var n = AchievHeaders.length-1; n>=0; n--) {
		AchievList[n] = $(AchievHeaders[n]).text().replace(" трек изменён", "");
		$(AchievHeaders[n]).replaceWith('<h2>' + AchievList[n] + '</h2>');
	}
 
	AchievList.sort();
 
	for (var n = AchievList.length-1; n>=0; n--)
		$('<li>' + AchievList[n] + '</li>').prependTo('#AchievList ol');
}

/*ToolTips*/
window.tooltips_config = {
    noCSS: true
};

/*OggPlayer*/
var oggPlayerButtonOnly = true;

/*----------------------------- Блок "Новые страницы" ------------------------*/
// Блок правой панели. Взято с вики "Убежище"
$(function(){
	if (
		$('#WikiaRail').length
		&& mw.config.values.wgCanonicalNamespace != 'Special'
		&& mw.config.values.wgCanonicalNamespace != 'MediaWiki'
	)
	$('<section class="rail-module"></section>')
		.appendTo('#WikiaRail')
		.load('/ru/index.php?title=Template:RailModuleNewPages&action=render');
});

window.AddRailModule = [
    { page: 'Template:RailModule', prepend: true },
];