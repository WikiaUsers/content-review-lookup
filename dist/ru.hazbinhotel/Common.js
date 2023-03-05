/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

/* HazbinHotel exts */
window.hzbn = $.extend(true, window.hzbn, {});
window.hzbn.mwHtmlLinkFabric = function (classNames) {
  return function (pageName, text) {
    return $('<a>', {
      class: classNames,
      href: mw.util.getUrl(pageName),
      text: text
    }).prop('outerHTML');
  };
};

/* User Tags */

const staff = [
    {name: 'Swit4er', className: 'bur'},
    {name: 'Voidan Dether', className: 'bur'},
    {name: 'Terabait24', className: 'admin'},
    {name: 'Никитин Арсений', className: 'admin'},
    {name: 'P4kaidu', className: 'admin'},
    {name: 'Merzlyak', className: 'discordMod'},
    {name: 'Kostinger', className: 'discordMod'},
    {name: 'TimurKhan', className: 'discordMod'},
    {name: 'Владыка Аларак', className: 'intern'},
    {name: 'IamNotFreddy', className: 'discordAdmin'},
    {name: 'LeraBE', className: 'discordMod'},
    {name: 'Lubitel obnimashek', className: 'intern'},
    {name: 'JustAccount', className: 'intern'},
    {name: 'Fleshka5856', className: 'intern'},
    {name: 'Fadri Gold', className: 'intern'},
    {name: 'Creepy Owl', className: 'contMod'},
    {name: 'Lich night', className: 'threadMod'},
];

window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { link:"Hazbin_Hotel_Вики:Бюрократы" },
		sysop: { link:"Hazbin_Hotel_Вики:Администраторы" },
		'content-moderator': { link:"Hazbin_Hotel_Вики:Модераторы_контента" },
		threadmoderator: { link:"Hazbin_Hotel_Вики:Модераторы_сообщества" },
		bot: { link:"Hazbin_Hotel_Вики:Боты" },
		
		technician: { u: 'Техник' },
		founder: { u: 'Основатель' },
		intern: { u: 'Стажёр', link:"Hazbin_Hotel_Вики:Стажёры" },
		discordMod: { u: 'Модератор Discord', link:"Hazbin_Hotel_Вики:Модераторы_Discord" },
		discordAdmin: { u: 'Администратор Discord', link:"Hazbin_Hotel_Вики:Администраторы_Discord" },
		translator: { u: 'Переводчик' }
	},
	getNameByTag: function (tag) {
        return this.tags[tag].u;
    }
};

UserTagsJS.modules.custom = {
	'Voidan Dether': ['founder'],
	'Terabait24': ['technician'],
	'Никитин Арсений': ['technician'],
	'P4kaidu': ['technician'],
	'Merzlyak': ['discordMod'],
	'Kostinger': ['discordMod'],
	'TimurKhan': ['discordMod'],
	'Владыка Аларак': ['intern'],
	'IamNotFreddy': ['discordAdmin'],
	'LeraBE': ['discordMod'],
	'Lubitel obnimashek': ['intern'],
	'JustAccount': ['intern'],
	'Swit4er': ['translator'],
	'Fleshka5856': ['intern'],
	'Fadri Gold': ['intern']
}

/* Выделение комментариев */
setInterval(function (user) {
	staff.forEach(function (user) {
	  $('.wds-avatar a[href$="' + window.encodeURIComponent(user.name) + '"]').closest('.Reply, .Reply_body__PM9kM').addClass('Reply--role-' + user.className)
	})
}, 500)

// == Настройка гаджетов == //
nkch_gst_gadgets = [{
    name: "RWA", // название гаджета с MediaWiki:Gadget-Название; обязательно
    title: "Недавняя вики-деятельность", // Название в меню
    description: "Недавняя вики-деятельность" // Описание гаджета в меню при наведении
},  {
    name: "RemoveCatSpoiler",
    title: "Прежние Категории",
    description: "Прежние Категории"
}, {
    name: "UCXSearch",
    title: "Быстрый поиск",
    description: "Поисковая строка в локальном меню без модального окна"
}, {
    name: "ThemeToggler",
    title: "Переключатель темы",
    description: "Иконка в левой части страницы для переключения темы"
}, {
    name: "NkchToggler",
    title: "Быстрая смена темы",
    description: "Меню в правой верхней части страницы для быстрой смены темы"
}, {
	name: "Font",
    title: "Системный шрифт",
    description: "Заменяет шрифт на сайте"
}, {
    name: "Cursor",
    title: "Тематический курсор",
    description: "Добавляет тематический курсор"
}, {
    name: "Weather",
    title: "Погода",
    description: "Атмосферные осадки для аутентичности"
}];



/* Фиксы достижений */
$().ready(function () {
function fixAchievements(){
    setInterval(function () {
        document.querySelectorAll('.badge-icon').forEach(function (badgeIcon) {
            $(badgeIcon).data('bs.popover').config.content = $(badgeIcon).prev('.profile-hover').prop("outerHTML")
                .replace('categoryselect-addcategory-button', 'Добавить категорию')
                .replace('rte-ck-image-add', 'Добавить изображение')
                .replaceAll(/([\u0400-\u04FF\s]*)?\s(\d*)?\s(изображений[в<br>]*\s)?[статьи|статей]*/g, function(match, p1, p2, p3) {
                        const number = parseInt(p2)
                    
                        if (Number.isNaN(number)) return match;
                        if (!p1 || !p2 || !p3) return match;
                        if (number % 10 === 1) return [p1,p2, 'изображение в статью'].join(' ');
                        if (number % 10 > 1 && number % 10 < 5) return [p1,p2, 'изображения в статьи'].join(' ');
                        if (number % 10 === 0 || number % 10 > 4) return [p1,p2,p3, 'статьи'].join(' ');
                })
                .replaceAll(/⧼|⧽/g, '')
                .trim()
        })
    }, 1000)
}
	
  fixAchievements();
  
/* Анимация в рейле */
  var currentPageNamespace = mw.config.get('wgCanonicalNamespace');
  var hasPhotoModule = currentPageNamespace !== 'Special' && currentPageNamespace !== 'MediaWiki';
  var waitForEl = function waitForEl(selector, blockElement) {
    return new Promise(function (resolve, reject) {
      var targetNode = document.querySelector(selector);
      var timeoutId;
      new MutationObserver(function (_, observer) {
        clearInterval(timeoutId);
        timeoutId = setTimeout(function () {
          if (blockElement && !targetNode.querySelectorAll(blockElement).length) {
            clearInterval(timeoutId);
            return;
          }

          observer.disconnect();
          return resolve();
        }, 500);
      }).observe(targetNode, {
        childList: true,
        subtree: true
      });  

    });
  };
  waitForEl('.right-rail-wrapper', hasPhotoModule ? '.photo-module' : null).then(function () {
  
    var railHeadings = document.querySelectorAll('.UserProfileAchievementsModule h2, .rail-module h2');
    railHeadings.forEach(function (rail) {
      return rail.insertAdjacentHTML('afterend', '<div class="rail-module__lines"></div>');
    });
  });
 

	
	/* Кнопка скролла */
	function handleScrollTo(e) {
			const breakY = ($(document).height() - $(window).height()) * 50 / 100;
		
	        e.preventDefault();
	        const reachHalf = $(window).scrollTop() > breakY
	        $('html').animate({scrollTop: reachHalf ? 0 : $(document).height()}, '10');
	}
	
	const wdsSecondScroll = $('<a>', {
	    class: 'wds-button wds-is-secondary',
	    html: '<svg class="wds-icon wds-icon-small" viewBox="0 0 284.929 284.929"><g><path d="M282.082,195.285L149.028,62.24c-1.901-1.903-4.088-2.856-6.562-2.856s-4.665,0.953-6.567,2.856L2.856,195.285 C0.95,197.191,0,199.378,0,201.853c0,2.474,0.953,4.664,2.856,6.566l14.272,14.271c1.903,1.903,4.093,2.854,6.567,2.854 c2.474,0,4.664-0.951,6.567-2.854l112.204-112.202l112.208,112.209c1.902,1.903,4.093,2.848,6.563,2.848 c2.478,0,4.668-0.951,6.57-2.848l14.274-14.277c1.902-1.902,2.847-4.093,2.847-6.566 C284.929,199.378,283.984,197.188,282.082,195.285z"/></g></svg>'
	})
	    .prependTo('.fandom-sticky-header > .wiki-tools')
	    .on('click', handleScrollTo)
	    
	
	const wdsSecondScrollIcon = wdsSecondScroll.children();
	wdsSecondScrollIcon.css({
		transition: 'transform .3s',
		transform: 'rotate(360deg)'
	})
	
	
	const scrollBottomButtonIcon = $('<a>', {
	    class: 'scroll-button scroll-button--bottom',
	})
	    .appendTo('#WikiaBar')
	    .on('click', handleScrollTo)
	
	$(window).scroll(function () {
		const breakY = ($(document).height() - $(window).height()) * 50 / 100;
		
	    const reachHalf = $(window).scrollTop() > breakY;
	    wdsSecondScrollIcon.css('transform', 'rotate(' + (reachHalf ? 360 : 180) + 'deg)');
	    scrollBottomButtonIcon.attr('class', 'scroll-button scroll-button--' + (reachHalf ? 'top' : 'bottom'));
	})
});

/* Конфигурация для dev:DiscussionTemplates */
window.DiscussionTemplates = {
    templates: {
        'Предупреждение (1 уровень)': {
            name: 'Шаблон:Предупреждение_1',
            title: 'Предупреждение'
        },
        'Предупреждение (2 уровень)': {
            name: 'Шаблон:Предупреждение_2',
            title: 'Предупреждение'
        },
        'Блокировка (1 уровень)': {
            name: 'Шаблон:Блокировка_1',
            title: 'Блокировка'
        },
        'Блокировка (Смертный грех)': {
            name: 'Шаблон:Блокировка_2',
            title: 'Блокировка'
        },
    },
    allowedGroups: ['bureaucrat', 'sysop', 'content-moderator', 'threadmoderator', 'rollback']
};


/* Конфигурация для dev:LinkPreview */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });

window.pPreview.wholepage = true;

/* Конфигурация для dev:LockOldComments */
window.lockOldComments = window.lockOldComments || {};
window.lockOldComments.limit = 90;

window.dev = window.dev || {};
window.dev.i18n = window.dev.i18n || {};
window.dev.i18n.overrides = window.dev.i18n.overrides || {};
window.dev.i18n.overrides['LockOldComments'] = window.dev.i18n.overrides['LockOldComments'] || {};
window.dev.i18n.overrides['LockOldComments']['locked-reply-box'] = "🔒 Этой ветке комментариев более " + window.lockOldComments.limit + " " + (window.lockOldComments.limit > 1 ? 'дней.' : 'дня.') + " Нет необходимости отвечать.";

/* Конфигурация для dev:AddRailModule */
 window.AddRailModule = [
 	{page: 'Template:NewPagesModule', maxAge: 0}
 ];

// slider
document.addEventListener('click', function (e) {
  var target = e.target;
  if (!target.dataset) return;
  if (!target.dataset.action) return;
  var action = target.dataset.action;
  var parent = target.closest('.js-min-slider');
  var slides = parent.querySelectorAll('.min-slider__slide');
  if (!parent) return;
  slides.forEach(function (slide) {
    var rotate = parseInt(slide.style.transform.replace('rotate(', '').replace('deg)', ''));
    if (Number.isNaN(rotate)) throw new Error('Rotate cant be none');
    var newRotate = action === 'prev' ? rotate - 90 : rotate + 90;
    slide.style.transform = "rotate(" + newRotate + "deg)";
  });
});