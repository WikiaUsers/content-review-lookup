/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/*Отображение ника на странице с соответствующим шаблоном*/
(function($, mw) {
    if (!$('.insertusername').length) {
        return;
    }

    if (wgUserName !== null) {
        $('.insertusername').html(wgUserName);   
    } else {
        $('.insertusername').text('Анонимный участник');
    }
})(this.jQuery, this.mediaWiki);

/*BackToTop button*/
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
 
var ButtonStart = 800;
var ScrollSpeed = 600;

if( !window.BackToTop  ) {
	$( document ).ready( function () { 
		addBackToTop (); 
	});
}
var BackToTop = true; // prevent duplication

/*Псевдослайдер-ультранавигация*/
mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", "") );
        $(window).scroll();                     //Костыль, который имитирует прокрутку
        setTimeout($(window).scroll(), 1000);   // окна, чтобы загрузились картинки
    return false;
  });
});
});

/*---*/