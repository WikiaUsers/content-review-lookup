/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

//Кнопка «Наверх» Источник: http://ru.community.wikia.com/wiki/%D0%A2%D0%B5%D0%BC%D0%B0:52936 Будет работать также для анонимов (или нет?)
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

/*Countdown: Конфигурация DEV'овского таймера*/
window.countdownTimer = {
    showText: function () {
        var $this = $(this);
        if ( $this.attr("data-text") ) {
            $this.text($(this).attr("data-text"));
        } else {
            $this
                .css("opacity","0")
                .css("pointer-events","none");
        }
    }
};
/*Конец конфигурации таймера*/

/*Начало конфигурации Юзертэгов*/
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
/*Конец конфигурации Юзертэгов*/

/* Для интервиков */
/** Возможны проблемы **/
function appendLanguageDropdown() {
	var borderColor = $('.WikiaPageHeader .comments').css('border-top-color');
	var server = wgServer.replace("http://","");
	var html = '<nav style="border: 1px solid '+borderColor+';" class="wikia-menu-button secondary combined chooselanguage"><span class="drop"><img style="margin-top: 3px; margin-left: 2px; margin-right: 4px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></span><ul style="min-width: 42px; margin-top: 1px; border: 1px solid '+borderColor+'; border-top: none; text-align:center;" class="WikiaMenuElement" style="min-width:20px;"></ul></nav>';
	flags = {};
	flags['en'] = '<img class="en-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/a/a4/Flag_of_the_United_States.svg" alt="Английский">';
	flags['de'] = '<img class="de-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/b/ba/Flag_of_Germany.svg" alt="Немецкий">';
	flags['es'] = '<img class="es-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/9/9a/Flag_of_Spain.svg" alt="Испанский">';
	flags['fr'] = '<img class="fr-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/c/c3/Flag_of_France.svg" alt="Французский">';
	flags['it'] = '<img class="it-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/0/03/Flag_of_Italy.svg" alt="Italian">';
	flags['ja'] = '<img class="ja-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/9/9e/Flag_of_Japan.svg" alt="Японский">';
	flags['nl'] = '<img class="nl-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/2/20/Flag_of_the_Netherlands.svg" alt="Немецкий">';
	flags['pl'] = '<img class="pl-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/1/12/Flag_of_Poland.svg" alt="Польский">';
	flags['pt'] = '<img class="pt-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/5/5c/Flag_of_Portugal.svg" alt="Португальский">';
	flags['pt-br'] = '<img class="pt-br-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/0/05/Flag_of_Brazil.svg" alt="Португальский (Бразилия)">';
	flags['ru'] = '<img class="ru-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/f/f3/Flag_of_Russia.svg" alt="Русский">';
	flags['zh'] = '<img class="zh-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/f/fa/Flag_of_the_People%27s_Republic_of_China.svg" alt="Китайский">';
	flags['vi'] = '<img class="vi-image" width="22" height="16" src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" alt="Вьетнамский">';
 
 
	$('.WikiaPageHeader .comments').after(html);
 
	languages = {};
	$('.WikiaArticleInterlang ul li a').each(function() {
		var languageFull = $(this).text();
		var href = $(this).attr('href');
		var pageNameArray = href.split('/')
		var pageName = pageNameArray[pageNameArray.length - 1];
		switch (languageFull) {
			case "English":
				languages['en'] = href;
				break;
			case "Deutsch":
				languages['de'] = href;
				break;
			case "Español":
				languages['es'] = href;
				break;
			case "Français":
				languages['fr'] = href;
				break;
			case "Italiano":
				languages['it'] = href;
				break;
			case "日本語":
				languages['ja'] = href;
				break;
			case "Nederlands":
				languages['nl'] = href;
				break;
			case "Polski":
				languages['pl'] = href;
				break;
			case "Português":
				languages['pt'] = href;
				break;
			case "Português do Brasil":
				languages['pt-br'] = href;
				break;
			case "Русский":
				languages['ru'] = href;
				break;
			case "中文":
				languages['zh'] = href;
				break;
			case "Tiếng Việt":
				languages['vi'] = href;
				break;
		}
	});
 
	var language = wgContentLanguage;
	$.each(flags, function (key, value) {
		if (key === language) {
			$('.WikiaPageHeader .chooselanguage').prepend(flags[key]);
		} 
		else {
			if (languages[key]) {
				$('.WikiaPageHeader .chooselanguage ul').append('<a style="display: inline; padding: 0; height: 0; line-height: 0;" class="'+ key +'-link" href="' + languages[key] + '"><li style="border-top: 1px solid '+ borderColor +'; padding-top: 3px; padding-bottom: 3px;" class="' + key + '">' + flags[key] + '</li></a>');
			}
		}
	});
 
	$('.WikiaPageHeader .chooselanguage').on('click', function () {
		if ($(this).hasClass('active') === false) {
			$(this).addClass('active');
		} 
		else {
			$(this).removeClass('active');
		}
	});
 
	$('.WikiaPageHeader .chooselanguage').on('mouseleave', function () {
		var that = this;
		var timeOut = setTimeout(function () { $(that).removeClass('active'); }, 500);
 
		$('.chooselanguage').on('mouseenter', function () {
			clearTimeout(timeOut);
		});
	});
}
if( $('.WikiaArticleInterlang').length > 0 ) {
	addOnloadHook(appendLanguageDropdown);
}

/****************************************/
/* Sliders using jquery by User:Tierrie (это используется?) */
/****************************************/
mw.loader.using( ['jquery.ui.tabs'], function() {
    $(document).ready(function() {
        var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
    });
});

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

// Infobox-Control by [[User:Manka-Manka]] 
/* Спасибо за идею EN Su Wiki
(function(){
    function isHex(c) { return (/(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i).test(c); }
    var $iControl = $(".infobox-control"),
        $infobox = $(".portable-infobox"),
        $childs = $infobox.find('h2,caption'),
        color = $iControl.data("bg-color"),
        shadow = $iControl.data("shadow-color"),
        textColor = $iControl.data("text-color");
    
    console.log("[Infobox-Control] Найдено " +  $infobox.length + " инфобоксов");
    console.log("[Infobox-Control] Значение data-bg-color: " + color); 
    console.log("[Infobox-Control] Значение data-shadow-color: " + shadow); 
    console.log("[Infobox-Control] Значение data-text-color: " + textColor); 
    
    if (color) {
        if (isHex(color)) {
            color = "#" + color;
        }
        console.log("[Infobox-Control] Цвет заднего фона...");
        $childs.css('background-color', color);
    }
    
    if (textColor) {
        if (isHex(textColor)) {
            textColor = "#" + textColor;
        }
        console.log("[Infobox-Control] Цвет текста...");
        $childs.css('color', textColor);
    }
    
    if (shadow) {
        if (isHex(shadow)) {
            shadow = "#" + shadow;
        }
        console.log("[Infobox-Control] Цвет тени...");
        $infobox.css('box-shadow', '0 0 5px ' + shadow);   
    } else {
        console.log("[Infobox-Control] Цвет тени...");
        $infobox.css('box-shadow', 'none');   
    }
})();
*/

//Скрытие элементов FixImage
$( ".rcmMenu" ).on( "contextmenu", function(event) {
    $( "#customContextMenu" )
        .css("display", "block")
        .css("top", event.pageY - window.pageYOffset + "px")
        .css("left", event.pageX - window.pageXOffset + "px");
    $( "#customContextMenu" ).on( "contextmenu", function() {
        return false;
    });
    $(document).click(function(event) {
        if ($(event.target).closest("#customContextMenu").length) return;
            $("#customContextMenu").hide("slow");
            event.stopPropagation();
        }
    );
    return false;
});
$(".WikiaBarWrapper .toolbar").after("<ul id='customContextMenu' class='hideFixImage'><li><a>Скрыть все фиксированные изображения</a></li></ul>");
$(".hideFixImage").click(function(){
    $(".FixImage").hide();
});

//  Конфигурация AjaxRC

var	ajaxIndicator = 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif',
	ajaxTimer,
	ajaxRefresh = 60000,
	ajaxPages = ["Служебная:WikiActivity","Служебная:RecentChanges","Служебная:Watchlist","Служебная:Log","Служебная:Contributions"],
	refreshText = 'Авто-Обновление',
	refreshHover = 'Включить авто-обновление страницы',
	doRefresh = true;

/*# Смена класса для <body> в зависимости от времени #*/
(function($) {
    'use strict';
    var d = new Date(),
    h = d.getHours(),
    s = (h >= 21 || h <= 6) ? 'night' : 'day';
    $('body.skin-oasis').addClass(s);
})(this.jQuery);




/*#################################################################*/
/* Все прочие скрипты импортируются через [[MediaWiki:ImportJS]]      */
/*#################################################################*/