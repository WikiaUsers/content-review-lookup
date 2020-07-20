importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:YoutubePlayer/code.js'
    ]
});

/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/* Дада мы знаем это сообщение спасибо*/

//Кнопка «Наверх» Источник: http://ru.community.wikia.com/wiki/%D0%A2%D0%B5%D0%BC%D0%B0:52936 Будет работать также для анонимов
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
	$( function () { 
		addBackToTop (); 
	});
}
var BackToTop = true;

//Викификатор, источник http://ru.community.wikia.com/wiki/%D0%A2%D0%B5%D0%BC%D0%B0:71801
//Выпилен, никакого толка для редактора в исходном коде.

//Викификатор с ГФ вики, источник: http://ru.gravityfalls.wikia.com/wiki/MediaWiki:Common.js
/* Добавляет удобные кнопки редактирования
Смотреть больше http://help.wikia.com/wiki/Help:Custom_edit_buttons */
if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/sims/ru/images/4/44/Knopka_Tire.png",
            "speedTip": "Тире",
            "tagOpen": "—",
            "tagClose": "",
            "sampleText": ""
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/4/47/Button_redir.png",
            "speedTip": "Перенаправление",
            "tagOpen": "#перенаправление [[",
            "tagClose": "]]",
            "sampleText": "Ведите текст"
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20110312002753/es.starwars/images/4/44/Button_comillas_latinas.png",
            "speedTip": "Кавычки",
            "tagOpen": "«",
            "tagClose": "»",
            "sampleText": "Текст"
    };
}
/* Конец */