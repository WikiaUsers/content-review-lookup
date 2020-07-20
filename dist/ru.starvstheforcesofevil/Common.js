/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

//Кнопка «Наверх» Источник: http://ru.community.wikia.com/wiki/%D0%A2%D0%B5%D0%BC%D0%B0:52936
//Будет работать также для анонимов
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
/* Конец кнопки «Наверх» */

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

/*Countdown: Конфигурация DEV'овского таймера*/
window.countdownTimer = {
    showText: function () {
        var $this = $(this), text = $this.data("text");
        if ( text ) {
            $this.text(text);
        } else {
            $this
                .css("opacity", "0")
                .css("pointer-events", "none");
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
        patroller: { link: 'Special:ListUsers/patroller', u: 'ПАТРУЛЬ' },
        sysop: { link: 'Special:ListUsers/sysop' },
        rollback: { u: 'ОТКАТЧИК', link: 'Special:ListUsers/rollback' },
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
            'rollback',
            'sysop',
            'patroller',
            'bot'
        ],
        newuser: true
    }
};
/*Конец конфигурации Юзертэгов*/

//  Конфигурация AjaxRC
var	ajaxIndicator = 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif',
	ajaxTimer,
	ajaxRefresh = 60000,
	ajaxPages = ["Служебная:WikiActivity","Служебная:RecentChanges","Служебная:Watchlist","Служебная:Log","Служебная:Contributions"],
	refreshText = 'Авто-Обновление',
	refreshHover = 'Включить авто-обновление страницы',
	doRefresh = true;
// RailWAM
window.railWAM = {
    logPage:"Стар_против_Сил_Зла_Вики:WAM"
};

/**
 * Добавляет кнопочку копирования текста в буфер к документации шаблонов
 **/
!function() {
    $('.tmpl-doc').each(function(){
        var $this = $(this),
            tmplName = $this.find('.tmpl-name').text(),
            args = [],
            text = "";
        $this.children('.hl').not(':first, :last').each(function() {
            var $hl = $(this),
                $key = $hl.children('.key');
            args.push($key.text().trim());
        });
        var maxLength = Math.max.apply(Math, args.map(function(i){return i.length;}));
        text += "{{" + tmplName + "\n";
        args.forEach(function(arg){
            text += "|" + arg + ' '.repeat(maxLength-arg.length) + " = \n";
        });
        text += "}}";
        $this.data('tmplText', text);
        
        var $copyBtn = $('<div>').css({
            width: '20px',
            height: '20px',
            position: 'absolute',
            top: '4px',
            right: '4px',
            background: 'rgba(255,255,255,.5)',
            border: '1px solid #aaa',
            cursor: 'pointer'
        });
        $copyBtn.html('<svg style="width: 20px;height: 20px;" viewBox="-2 -2 26 26"><path fill="#449" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg>');
        $copyBtn.click(function(){
            var $this = $(this),
                pos = $this.position(),
                $parent = $this.parent(),
                text = $parent.data('tmplText');
                
            var $temp = $("<textarea>");
            $("body").append($temp);
            $temp.val(text).select();
            document.execCommand("copy");
            $temp.remove();
                        
            var $done = $('<div>Скопировано в буфер обмена</div>').css({
                position: 'absolute',
                background: 'black',
                'border-radius': '10px',
                margin: 'auto',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100px',
                height: '50px',
                'font-size': '12px',
                'text-align': 'center',
                color: 'white',
                opacity: 0.3,
                display: 'none'
            });
            $parent.append($done);
            $done.fadeIn(500).delay(1500).fadeOut(500);
            setTimeout(function(){$done.remove()}, 2510);

        });
        $this.append($copyBtn);
    });
}();