 
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
window.AjaxRCRefreshText = 'Автообновление';
window.AjaxRCRefreshHoverText = 'Автоматически обновлять страницу';
window.ajaxPages = ["Служебная:RecentChanges", "Служебная:WikiActivity"];

//Кнопка «Наверх»
function goToTop (){
	// scroll body to 0px on click
	$( 'body,html' ).animate ({
		scrollTop: 0
	}, ScrollSpeed );
	return false;
}
 
function addBackToTop () {
	if( skin == 'oasis' ) {
		$('#WikiaBarWrapper .arrow').before('<button id="backtotop" type="button" value="Наверх" onClick="goToTop();" style="position:absolute; right:25px; top:2px; z-index:200;">Наверх</button>');
		// hideFade ();
	}	
}
 
var ButtonStart = 800;
var ScrollSpeed = 600;
 
if( !window.BackToTop  ) {
	$(function () { 
		addBackToTop (); 
	});
}
var BackToTop = true;

/*Начало конфигурации Зиптэгов*/
window.UserTagsJS = {
    tags: {
        bureaucrat: { link: 'Special:ListUsers/bureaucrat' },
        bot: { link: 'Special:Listusers/bot' },
        chatmoderator: { link: 'Special:ListUsers/chatmoderator' },
        threadmoderator: { link: 'Special:ListUsers/threadmoderator' }, 
        patroller: { link: 'Special:ListUsers/patroller' },
        sysop: { link: 'Special:ListUsers/sysop' },
        newuser: { u: 'НОВЫЙ УЧАСТНИК' },
        inactive: { u: 'НЕ АКТИВЕН' }
    },
    modules: {
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'chatmoderator',
            'threadmoderator',
            'sysop',
            'patroller',
            'bot'
        ],
        newuser: true
    }
};
/*Конец конфигурации Зиптэгов*/

// Infobox-Control by  
function infoboxControl(){
var color = $(".infobox-control").attr("data-bg-color");
var shadow = $(".infobox-control").attr("data-shadow-color");
if (color) {
    $('.portable-infobox').find('h2,caption').css('background-color', '#' + color);
    if (shadow) {
    $('.portable-infobox').css('box-shadow', '0 0 5px #' + shadow);   
    } else {
        $('.portable-infobox').css('box-shadow', 'none');   
    }
}
}
addOnloadHook(infoboxControl);

/* Авто-выдача плашек по числу правок участника */
$(function () {
    if ($(".tally > em").length && $('#UserProfileMasthead').length && mw.config.get('wgAction') === 'view') {
        var editCount = $(".tally > em").text();
        var title = '';
        if (editCount <= 100) {
            title = "Новичок";
        } else if (editCount > 100 && editCount <= 500) {
            title = "Мастер дела";
        } else if (editCount > 500 && editCount <= 1000) {
            title = "Профи";
        } else {
            title = "Избранный";
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