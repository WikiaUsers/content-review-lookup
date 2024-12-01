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
/************ Sliders на jqueryUI ****************/
/*************************************************/

//  var slideTime = 15000; // Время показа слайда (+1-3 секунды чтобы слайдеры не делали это одновременно)
mw.loader.using( ['oojs-ui-windows'], function() {
	$(document).ready(function() {
		$(".portal_slider").each(function(index, portal_slider) {
			$(portal_slider).tabs({ fx: {opacity:'toggle', duration:100} } );
			$("[class^=portal_sliderlink]").click(function() {
				$(portal_slider).tabs('select', this.className.replace("portal_sliderlink_", ""));
				return false;
			});
			$(portal_slider).find('#portal_next').click(function() {
				$(portal_slider).tabs('select', ($(portal_slider).tabs('option', 'selected') == ($(portal_slider).tabs('length'))-1) ? 0 : $(portal_slider).tabs('option', 'selected') + 1 );
				return false;
			});
			$(portal_slider).find('#portal_prev').click(function() {
				$(portal_slider).tabs('select', ($(portal_slider).tabs('option', 'selected') === 0) ? ($(portal_slider).tabs('length')-1) : $(portal_slider).tabs('option', 'selected') - 1 );
				return false;
			});
/*			var timerId = setTimeout(function tick() {
				$(portal_slider).tabs('select', ($(portal_slider).tabs('option', 'selected') == ($(portal_slider).tabs('length'))-1) ? 0 : $(portal_slider).tabs('option', 'selected') + 1 );
				timerId = setTimeout(tick, slideTime + Math.floor(Math.random() * 3000));
			}, slideTime + Math.floor(Math.random() * 3000));
*/
		}); 
	});
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