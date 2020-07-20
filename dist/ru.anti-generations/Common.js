/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
importScriptPage('SocialIcons/code.js', 'dev');

/* Автоматическая выдача плашек по числу правок участника */
$(function () {
    if ($(".tally > em").length && $('#UserProfileMasthead').length && mw.config.get('wgAction') === 'view') {
        var editCount = $(".tally > em").text();
        var title = '';
        if (editCount <= 100) {
            title = "Котёнок/Волчонок";
        } else if (editCount > 100 && editCount <= 1000) {
            title = "Оруженосец";
        } else if (editCount > 1000 && editCount <= 3000) {
            title = "Воитель";
        } else if (editCount > 3000 && editCount <= 6000) {
            title = "Старший Воитель";
        } else if (editCount > 6000 && editCount <= 10000) {
            title = "Глашатай";
        } else {
            title = "Старейшина";
        }
        $('<span />', {
            class: 'tag',
            text: title
        }).appendTo('.masthead-info hgroup');
    }
});

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