/*Перенёс с Dust: An Elysian Tail Вики*/
/*** НАСТРОЙСКИ СКРИПТОВ ***/
/*Добавляет плашку "НЕАКТИВЕН" для неактивных участников*/
InactiveUsers = { 
    months: 1,
    text: 'НЕАКТИВЕН'
};
 
/*** ИМПОРТЫ ***/
importArticles({
    type: 'script',
    articles: [
        'u:dev:InactiveUsers/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:PurgeButton/code.js',
        'u:dev:FloatingToc/code.js',
        'u:dev:MediaWiki:GlobalEditcount/code.js',
        'u:dev:MediaWiki:AjaxRC/code.js'
    ]
});
var ajaxPages = ["Служебная:Watchlist","Служебная:Contributions","Служебная:WikiActivity","Служебная:RecentChanges"];
var AjaxRCRefreshText = 'Автообновление';
var AjaxRCRefreshHoverText = 'Автоматически обновлять страницу';
 
/*Скрипт для работы тега <span class="insertusername"></span>*/
/**Подставляет ник читающего статью, или заданое слово если аноним\не прогрузился**/
(function () {
    if ( !wgUserName ) return;
    $("span.insertusername").html(wgUserName); 
})();
 
/*Добавление к внешним ссылкам автоматическое открытие в новой вкладке*/
/**Спёр со стены Kopcap94**/
$(function() {
    if ($('.external').length) {
        $('.external').attr('target','_blank');
    }
});

// Переключение на следующую/предыдущую страницу
(function( $, mw ) {
    if ( !$( '#page-switcher').length ) return;

    var pageNumber = parseInt( mw.config.get( 'wgPageName' ).replace( /^[^\d]+(\d+)$/, '$1' ), 10 );

    $( '.switcher-button' ).click( function() {
        var type = $( this ).attr( 'data-type' ),
            to_page;

        switch( type ) {
            case 'next':
                to_page = pageNumber + 1;
                break;
            case 'prev':
                to_page = pageNumber - 1;
                break;
            default:
                break;
        }

        if ( to_page <= 0 || to_page >= 1001 ) {
            alert( 'Кажется, вы дошли до конца/начала :)' );
            return;
        }

        window.location = 'Страница ' + to_page;
    });
})( this.jQuery, this.mediaWiki );

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