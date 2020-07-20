/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

importScriptPage('MediaWiki:Skills.js');

// Фикс стрелки перенаправления
if ($('img[alt="#REDIRECT"]').length) {
    $('img[alt="#REDIRECT"]').attr('src','https://images.wikia.nocookie.net/dyinglight/ru/images/e/e1/Redirect_white.png');
}

/* R. Kenni */

/* 1. Сворачивающиеся таблицы */
/* 2. Определитель юзернейма */
/* 3. Неактивные пользователи — более 3 месяцев */
/* 4. Викификатор */
/* 5. Динамичный фон */
/* 6. Великолепная кнопка, вздымающая вверх */
/* 7. Автоматическое обновление */
/* 8. Шаблон PortalTransformer */
/* 9. Активный таб */

/* 1. Сворачивающиеся таблицы */
importScriptPage('MediaWiki:ShowHide/code.js', 'dev');

/* 2. Определитель юзернейма */
$(function () {
    if (!wgUserName) return;
    $('span.insertusername').text(wgUserName);
});

/* 3. Неактивные пользователи — более 3 месяцев */
//Inactive users
InactiveUsers = { 
    months: 3,
    text: 'НЕАКТИВЕН'
};
 
importScriptPage('InactiveUsers/code.js', 'dev');

/* 4. WikiEditor/Викификатор */
function addWikifButton() {
	var toolbar = document.getElementById('toolbar')
	if (!toolbar) return
	var i = document.createElement('img')
	i.src = '//upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png'
	i.alt = i.title = 'викификатор'
	i.onclick = Wikify
	i.style.cursor = 'pointer'
	toolbar.appendChild(i)
}
if (wgAction == 'edit' || wgAction == 'submit') {
	importScriptURI('//ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript')
	addOnloadHook(addWikifButton)
}

/* 5. Динамичный фон */
var refreshDate;

$(function () {
 var d = new Date();
 if (d.getHours() < 5) {
 document.body.className += ' BG4';
 }
 else if (d.getHours() < 10) {
 document.body.className += ' BG1';
 }
 else if (d.getHours() < 17) {
 document.body.className += ' BG2';
 }
 else if (d.getHours() < 22) {
 document.body.className += ' BG3';
 }
 else if (d.getHours() < 24) {
 document.body.className += ' BG4';
 }
});

/* 6. Великолепная кнопка, вздымающая вверх */
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
		$('<li id="backtotop" style="position: absolute; right:20px; top:0px; border:none;"><button type="button" value="Back to top" onClick="goToTop();">Наверх</button></li>').appendTo('#WikiaBarWrapper .toolbar > .tools');	
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

// 7. Автоматическое обновление
// **************************************************
importScriptPage( 'AjaxRC/code.js', 'dev' ); // AJAX-обновление некоторых страниц
var ajaxPages = ["Служебная:Watchlist","Служебная:Contributions","Служебная:WikiActivity","Служебная:RecentChanges"]; // AJAX-обновление некоторых страниц (выбор страниц)
var AjaxRCRefreshText = 'Автообновление'; // Отображаемое название
var AjaxRCRefreshHoverText = 'Автоматически обновлять страницу'; // Отображаемое подсказку

/* 8. Шаблон PortalTransformer */

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.cookie']);
 
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://dragonage.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
mw.loader.using( ['jquery.ui.tabs'], function() {
  $( "[class^=portal_vtab]" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "[class^=portal_vtab] li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
 
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class*=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.match(/portal_sliderlink-(\d+)/)[1]);
    console.log("Sliding to " + this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});

/* 9. Активный таб */
//<tabber> extension req
//set active tab: https://wikia.wikia.com/page#activeTab
//v2.0, 2017, user:fngplg.
(function ($){
    var nstarget = window.location.hash.replace('#', '');
    if (nstarget === '') return;
    //convert wiki-utf 2 ansi
    nstarget = nstarget.replace(/\./g, '%');
    nstarget = decodeURIComponent(nstarget).replace(/_/g, ' ');
    //console.log('trgt:'+nstarget);
    $(function(){
        setTimeout(function() {
            var $nt2a = $('.tabberlive>.tabbernav>Li>a[title="' + nstarget + '"]');
            $nt2a.click();
        }, 100);//settimeout
    });//doc.rdy    
})(jQuery);