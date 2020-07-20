/* 0. Сворачивающиеся таблицы */
/* 1. Определитель юзернейма */
/* 2. Неактивные пользователи — более 3 месяцев */
/* 3. Викификатор */
/* 4. Динамичный фон */
/* 5. Великолепная кнопка, вздымающая вверх */
/* 6. Автоматическое обновление */
/* 7. Горизонтальные списки */
/* 8. Активный таб */

/* 0. Сворачивающиеся таблицы */
importScriptPage('MediaWiki:ShowHide/code.js', 'dev');

/* 1. Определитель юзернейма */
$(function () {
    if (!wgUserName) return;
    $('span.insertusername').text(wgUserName);
});

/* 2. Неактивные пользователи — более 3 месяцев */
//Inactive users
InactiveUsers = { 
    months: 3,
    text: 'НЕАКТИВЕН'
};
 
importScriptPage('InactiveUsers/code.js', 'dev');

/* 3. WikiEditor/Викификатор */
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

/* 4. Динамичный фон */
var refreshDate;

/* 5. Великолепная кнопка, вздымающая вверх */
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

// 6. Автоматическое обновление
// **************************************************
importScriptPage( 'AjaxRC/code.js', 'dev' ); // AJAX-обновление некоторых страниц
var ajaxPages = ["Служебная:Watchlist","Служебная:Contributions","Служебная:WikiActivity","Служебная:RecentChanges"]; // AJAX-обновление некоторых страниц (выбор страниц)
var AjaxRCRefreshText = 'Автообновление'; // Отображаемое название
var AjaxRCRefreshHoverText = 'Автоматически обновлять страницу'; // Отображаемое подсказку

/* 7. Горизонтальные списки */
/**
 * Helper script for the .hlist class in [[MediaWiki:Common.css]] and [[MediaWiki:Wikia.css]]
 * Add pseudo-selector class to last-child list items in IE8
 * @source mediawiki.org/wiki/Snippets/Horizontal_lists
 * @revision 6 (2014-08-23)
 * @author [[User:Edokter]]
 */
(function(mw, $) {
    var profile = $.client.profile();
    if (profile.name === 'msie' && profile.versionNumber === 8) {
        mw.hook('wikipage.content').add(function($content) {
            $content.find('.hlist').find('dd:last-child, dt:last-child, li:last-child')
                .addClass('hlist-last-child');
        });
    }
}(mediaWiki, jQuery));


/* 8. Активный таб */
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