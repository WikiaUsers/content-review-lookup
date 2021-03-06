/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/* Код написан участником Freddy's Defender */
/* Код дополнен участником Vanaros */
$(function() {
    var rights = {};
 
    //Создатели
    rights["Freddy's Defender"] = ["Умерший", "WikiHelper"];
    rights["Vanaros"]      = ["Главный Создатель", "VFGS"];
 
    //Администраторы
    rights["Frolkin02"]            = ["Администратор", "Первый участник", "VFGS"];
 
    //Студенты
    rights["Спринги"]         = ["Студент вики"];
 
    if (typeof rights[wgTitle] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
            $('<span class="tag">' + rights[wgTitle][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }
    }
 
});

function updatetimer(i) {
   var now 
= new Date();
   var then 
= timers[i].eventdate;
   var diff 
= count
=Math.floor((then.getTime()-now.getTime())/1000);
 
   // catch bad date strings
   if(isNaN(diff)) { 
     timers[i].firstChild.nodeValue 
= '** ' + timers[i].eventdate + ' **' ;
     return;
   }
 
   // determine plus/minus
   if(diff<0) {
     diff 
= -diff;
     var tpm 
= []
   } else {
     var tpm 
= []
   }
 
   // Calculate the diff - Modified by Eladkse
  if ((diff%60) 
== 1) {
    left 
= (diff%60) + ' секунды';
  } else {
    left 
= (diff%60) + ' секунда';
  }
    diff
=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%60) 
== 1) {
      left 
= (diff%60) + ' минута, и ' + left;
    } else {
      left 
= (diff%60) + ' минут, и ' + left;
    }
  }
    diff
=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%24) 
== 1) {
      left 
= (diff%24) + ' час, ' + left;
    } else {
      left 
= (diff%24) + ' часов, ' + left;
    }
  }
    diff
=Math.floor(diff/24);
  if(diff > 0) {
    if (diff 
== 1) {
      left 
= diff + ' день, ' + left;
    } else {
      left 
= diff + ' дней, ' + left;
    }
  }
  timers[i].firstChild.nodeValue 
= tpm + left;
 
   // a setInterval() is more efficient, but calling setTimeout()
   // makes errors break the script rather than infinitely recurse
   timeouts[i] 
= setTimeout('updatetimer(' + i + ')',1000);
 }
 
 function checktimers() {
   //hide 'nocountdown' and show 'countdown'
   var nocountdowns 
= getElementsByClassName(document, 'span', 'nocountdown');
   for(var i in nocountdowns) nocountdowns[i].style.display 
= 'none'
   var countdowns 
= getElementsByClassName(document, 'span', 'countdown');
   for(var i in countdowns) countdowns[i].style.display 
= 'inline'
 
   //set up global objects timers and timeouts.
   timers 
= getElementsByClassName(document, 'span', 'countdowndate');  //global
   timeouts 
= new Array(); // generic holder for the timeouts, global
   if(timers.length 
== 0) return;
   for(var i in timers) {
     timers[i].eventdate 
= new Date(timers[i].firstChild.nodeValue);
     updatetimer(i);  //start it up
   }
 }
 addOnloadHook(checktimers);
 
 importArticles({
    type: 'script',
    articles: [
        'w:dev:AjaxRC/code.js',
    ]
});
 
var ajaxPages 
= ["Служебная:WikiActivity","Служебная:RecentChanges"];
var AjaxRCRefreshText 
= 'Автообновление';