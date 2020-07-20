/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

// Auto-refresh

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
// ** Recent Wiki Activity and Recent changes auto refresh ** //
AjaxRCRefreshText = 'Авто-обновление';
AjaxRCRefreshHoverText = 'Автоматически обновляет страницу';
ajaxPages = ["Служебная:RecentChanges","Служебная:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

// - end - Auto-refresh

// Reference popups
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

// - end - Reference popups

// Spoiler and Not Final Alert
SpoilerAlert = {
    question: 'ОСТОРОЖНО! На этой странице могут быть НЕВЕРОЯТНЫЕ СПОЙЛЕРЫ или<br />информация которую вы может не хотите видеть. Вы уверены что хотите продолжить?.',
    yes: 'Да, пожалуйста',
    no: 'Нет, еще нет',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Спойлеры');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');
 
// - end -  Spoiler and Not Final Alert

// User tags
window.UserTagsJS = {
	modules: {
			inactive: 45,
			mwGroups: ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
			autoconfirmed: true,
			metafilter: {
				sysop: ['bureaucrat'],
				chatmoderator: ['sysop'],
				rollback: ['sysop'],
			},
			newuser: true,},
	tags: {
		bureaucrat: { u:'Консул', link:'Project:Администраторы', color:'white', title:'Bureaucrat' },
		sysop: { u:'Член Совета', link:'Project:Администраторы', color:'white', title:'Admin' },
		patroller: { u:'Инквизитор', link:'Project:Администраторы', color:'white', title:'Rollback' },
		rollback: { u:'Сумеречный Охотник', link:'Project:Администраторы', color:'white', title:'Rollback' },
			}
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

// -end - User tags

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