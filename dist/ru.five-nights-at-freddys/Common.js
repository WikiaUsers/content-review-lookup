/* -----Меню-----

=> ImportJS — список импортируемых скриптов
=> Fandomdesktop.js — скрипты к скину Fandomdesktop
=> OldComments.js — блокировка ответов к старым комментариям
=> Common.js — вы здесь
=> ProfileTags — плашки в профиле
=> Project:Medals — награды в профиле

*/

/* ========== DiscussionTemplates ========== */
window.DiscussionTemplates = {
    templates: {
        'Оффтоп': {
            name: 'Шаблон:Предупреждение/оффтоп',
            title: 'Предупреждение'
        },
        'Агрессия': {
            name: 'Шаблон:Предупреждение/агрессия',
            title: 'Предупреждение'
        },
        'Оскорбление': {
            name: 'Шаблон:Предупреждение/оскорбление',
            title: 'Предупреждение'
        },
        'Флуд': {
            name: 'Шаблон:Предупреждение/флуд',
            title: 'Предупреждение'
        },
        'Капс': {
            name: 'Шаблон:Предупреждение/капс',
            title: 'Предупреждение'
        },
        'Троллинг': {
            name: 'Шаблон:Предупреждение/троллинг',
            title: 'Предупреждение'
        },
        'Провокация': {
            name: 'Шаблон:Предупреждение/провокация',
            title: 'Предупреждение'
        },
        'Бессмыслица': {
            name: 'Шаблон:Предупреждение/бессмыслица',
            title: 'Предупреждение'
        },
        'Вандализм': {
            name: 'Шаблон:Предупреждение/вандализм',
            title: 'Предупреждение'
        },
        'Правки': {
            name: 'Шаблон:Предупреждение/правки',
            title: 'Предупреждение'
        },
        'Война правок': {
            name: 'Шаблон:Предупреждение/войнаправок',
            title: 'Предупреждение'
        },
        'Конфликт': {
            name: 'Шаблон:Предупреждение/конфликт',
            title: 'Предупреждение'
        },
        'Лексика': {
            name: 'Шаблон:Предупреждение/лексика',
            title: 'Предупреждение'
        },
        'Реклама': {
            name: 'Шаблон:Предупреждение/реклама',
            title: 'Предупреждение'
        },
        'Спам': {
            name: 'Шаблон:Предупреждение/спам',
            title: 'Предупреждение'
        },
        'Фанконтент': {
            name: 'Шаблон:Предупреждение/фанконтент',
            title: 'Предупреждение'
        },
        'Мультипостинг': {
            name: 'Шаблон:Предупреждение/мультипостинг',
            title: 'Предупреждение'
        },
        'Блоги': {
            name: 'Шаблон:Предупреждение/блоги',
            title: 'Предупреждение'
        },
        'Удаление предов': {
            name: 'Шаблон:Предупреждение/удалениепредов',
            title: 'Предупреждение'
        },
        'Фанрендеры': {
            name: 'Шаблон:Предупреждение/фанрендеры',
            title: 'Предупреждение'
        },
        'Неуважение': {
            name: 'Шаблон:Предупреждение/неуважение',
            title: 'Предупреждение'
        },
        'Клевета': {
            name: 'Шаблон:Предупреждение/клевета',
            title: 'Предупреждение'
        },
        'Критика': {
            name: 'Шаблон:Предупреждение/критика',
            title: 'Предупреждение'
        },
        'Статпад': {
            name: 'Шаблон:Предупреждение/статпад',
            title: 'Предупреждение'
        },
        'Помехи': {
            name: 'Шаблон:Предупреждение/помехи',
            title: 'Предупреждение'
        },
        'Рознь': {
            name: 'Шаблон:Предупреждение/рознь',
            title: 'Предупреждение'
        },
        'Блокировка': {
            name: 'Шаблон:Блокировка',
            title: 'Блокировка'
        },
    },
    allowedGroups: ['bureaucrat', 'sysop', 'content-moderator', 'threadmoderator']
};

/* ========== FastDelete ========== */
window.fdButtons = [
    {
        summary: 'Вандализм',
        label: 'Вандал'
    },
    {
        summary: 'Мусор',
        label: 'Мусор'
    },
    {
        summary: 'Дубликат',
        label: 'Дубликат'
    }
];

/* ========== AddRailModule ========== */
window.AddRailModule = ['Шаблон:СМР'];

/* ========== LockOldComments ========== */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 180;

/* ========== Выделение комментариев статусников ========== */
setInterval(function () {
    $('.wds-avatar a[href$="Cyberpunk%20Ginger"]').closest('.Reply, .Reply_body__PM9kM').addClass('Bur2');
    $('.wds-avatar a[href$="Cyberpunk_Ginger"]').closest('.Reply, .Reply_body__PM9kM').addClass('Bur2');
    $('.wds-avatar a[href$="Luchezze"]').closest('.Reply, .Reply_body__PM9kM').addClass('Admin');
    $('.wds-avatar a[href$="Stal0ker"]').closest('.Reply, .Reply_body__PM9kM').addClass('Admin');
    $('.wds-avatar a[href$="Amr%20User"]').closest('.Reply, .Reply_body__PM9kM').addClass('Contmod');
    $('.wds-avatar a[href$="%D0%95%D0%BB%D0%B5%D0%BD%D0%B0%20%D0%A1%D0%BE%D0%BD"]').closest('.Reply, .Reply_body__PM9kM').addClass('Dismod');
    $('.wds-avatar a[href$="%D0%95%D0%BB%D0%B5%D0%BD%D0%B0_%D0%A1%D0%BE%D0%BD"]').closest('.Reply, .Reply_body__PM9kM').addClass('Dismod');
    $('.wds-avatar a[href$="%D0%95%D0%BB%D0%B5%D0%BD%D0%B0_%D0%A1%D0%BE%D0%BD"]').closest('.Reply, .Reply_body__PM9kM').addClass('Dismod');
    $('.wds-avatar a[href$="%D0%95%D0%BB%D0%B5%D0%BD%D0%B0_%D0%A1%D0%BE%D0%BD"]').closest('.Reply, .Reply_body__PM9kM').addClass('Dismod');
$('.wds-avatar a[href$="SuperSadCat"]').closest('.Reply, .Reply_body__PM9kM').addClass('Dismod'); 
$('.wds-avatar a[href$="Makeins"]').closest('.Reply, .Reply_body__PM9kM').addClass('Dismod');
}, 500 );

/* ========== Анимированный логотип ========== */
{
    function startAnimationInterval() {
	    return setInterval(function () {
	        var frameOffset = (++frame % frames) * -frameHeight;
	        element.style.backgroundPosition = "0px " + frameOffset + "px";
	    }, 500);
	}
	
	var element = document.getElementById("animated_logo");
		if (element) {
		    var animationIntervalHandle = null;
		    var frameHeight = element.offsetHeight;
		    var frames = 2;
		    var frame = 0;
		    var stopped = false;
		    element.style.backgroundSize = "auto " + frameHeight*2 + "px";
		    animationIntervalHandle = startAnimationInterval();
		    
		    element.onclick = function() {
		        if (!stopped) {
		            clearInterval(animationIntervalHandle);
		            stopped = true;
		        } else {
		            animationIntervalHandle = startAnimationInterval();
		            stopped = false;
		        }
		    }
	}
}

/* ========== MessageBlock ========== */
window.MessageBlock = {
	title: 'Блокировка',
	message: 'Вы были заблокированы на $2 по причине $1.'
};