/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

window.InactiveUsers = { 
    months: 1,
    text: 'НЕАКТИВНЫЙ УЧАСТНИК'
};

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
 

/*************************************************/
/****************** Прокрутка ********************/
/*************************************************/

$('.GamesArrowLeft').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll-284},100);
});
$('.GamesArrowRight').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll+284},100);
});

/*************************************************/
/* spoilers by User:Tierrie from Dragon Age Wiki */
/*************************************************/

var showSpoiler = [];
function showSpoilers(splrType) {
  var Divs= document.getElementsByTagName("div");
  for (i=0;i<Divs.length;i++) {
    // allows the child to be something besides a div (a table for example)
    if ($(Divs[i]).hasClass('splr') && $(Divs[i].childNodes[0]).hasClass('splr_'+splrType)) {
      var warning = Divs[i].childNodes[0].childNodes[1];
      warning.className = warning.className.replace('show_warning','hide_warning');
 
      var spoiler = Divs[i].childNodes[1];
      spoiler.className = spoiler.className.replace('hide_spoiler','show_spoiler');
    }
  }
  document.cookie='showspoiler_'+splrType+'=1; path=/';
}
 
function hideSpoilers(splrType) {
  var Divs= document.getElementsByTagName("div");
  for (i=0;i<Divs.length;i++) {
 
    // allows the child to be something besides a div (a table for example)
    if ($(Divs[i]).hasClass('splr') && $(Divs[i].childNodes[0]).hasClass('splr_'+splrType)) {
      var warning = Divs[i].childNodes[0].childNodes[1];
      warning.className = warning.className.replace('hide_warning','show_warning');
 
      var spoiler = Divs[i].childNodes[1];
      spoiler.className = spoiler.className.replace('show_spoiler','hide_spoiler');
    }
  }
  document.cookie='showspoiler_'+splrType+'=0; path=/';
}
 
function toggleSpoilers(ev) {
  var splrType=this.className.split('_')[1];
  showSpoiler[splrType] = showSpoiler[splrType]?0:1;
  if(showSpoiler[splrType])
    showSpoilers(splrType);
  else 
    hideSpoilers(splrType);
  //ev.target.focus(); /* focus back on the element because large spoilers tend to move the page around */
}
 
function initSpoilers() {
  var Divs= document.getElementsByTagName("div");
  for (i=0;i<Divs.length;i++) {
    if ($(Divs[i]).hasClass('splr')) {
      Divs[i].childNodes[0].onclick = toggleSpoilers;
 
      var warning = Divs[i].childNodes[0].childNodes[1];
      warning.className = warning.className.replace('hide_warning','show_warning');
 
      var spoiler = Divs[i].childNodes[1];
      spoiler.className = spoiler.className.replace('show_spoiler','hide_spoiler');
    }
  }
 
  var cookies = document.cookie.split("; ");
  for (var i=0; i < cookies.length; i++) {
    // a name/value pair (a crumb) is separated by an equal sign
    if(cookies[i].indexOf('showspoiler')!=-1) {
      var crumbs = cookies[i].split("=");
      var splrType = crumbs[0].split('_')[1]; /* cookie="showspoiler_dao=1", crumbs[0] = "showspoiler_dao", splrType="dao" */
      var splrValue = parseInt(crumbs[1]);
 
      showSpoiler[splrType]=splrValue;
      if(splrValue)
        showSpoilers(splrType);
      else
        hideSpoilers(splrType);
    }
  }
}
 
var spoilers = true;
function loadSpoilers() {
  if ( mw.config.get( 'wgAction' ) == 'edit' ) return;
  if(spoilers) initSpoilers();
}
$(loadSpoilers);

// *****************************************************
// * Experimental javascript countdown timer (Splarka) *
// *****************************************************
 //
 // Usage example:
 //  <span class="countdown" style="display:none;">
 //  <span class="countdowndate">March 30 2015 00:00:00 PST</span>
 //  </span>
 //  <span class="nocountdown">Javascript disabled.</span>
 /*
 function updatetimer(i) {
   var now = new Date();
   var then = timers[i].eventdate;
   var diff = Math.floor((then.getTime()-now.getTime())/1000);
 
   // catch bad date strings
   if(isNaN(diff)) { 
     timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
     return;
   }
 
   // determine plus/minus
   if(diff<0) {
     diff = -diff;
     var tpm = '';'';
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
$(checktimers);
*/
 
// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

/* Случайный фон */
$(function(){
if (mw.config.get('wgPageName') == "Участник:R256S") {
        var imgs = [
        'https://vignette.wikia.nocookie.net/divinity/images/b/b8/R2_%D1%84%D0%BE%D0%BD.png/revision/latest?cb=20150712182256&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/divinity/images/2/25/Divinity_Dragon_Commander_Background.jpg/revision/latest?cb=20150130203919&path-prefix=ru'
        ];
        $('body').css('background-image','url(' + imgs[Math.floor((imgs.length) * Math.random())] + ') no-repeat center center fixed #000000');
    }
});