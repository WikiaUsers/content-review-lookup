/* Участник! */
window.onload = function () {
if (wgUserName !== 'null') {
        $('.insertusername').html(wgUserName);
    }
}

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

/* Выноски */
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:dev:ReferencePopups/code.js',
        // ...
    ]
});

/* Переключение таббера */
$(function () {
    $('.tabbernav li').mouseenter(function () {
        $(this).find('a').click();
    });
});

/* Флаги */
$(function() {
 var rights = {};
 
 rights["Новак"]                     = ["Бюрократ"];
 
 if (typeof rights[wgTitle] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[wgTitle].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag">' + rights[wgTitle][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
});

/* Спойлеры */
SpoilerAlert = {
    question: 'Эта статья содержит спойлеры. Вы действительно хотите её прочитать?',
    yes: 'Да, конечно',
    no: 'Нет, не сейчас',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Страницы со спойлерами');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');