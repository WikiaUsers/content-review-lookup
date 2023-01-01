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
	'Merzlyak': ['discordMod'],
	'Kostinger': ['discordMod'],
	'TimurKhan': ['discordMod'],
	'Владыка Аларак': ['intern'],
	'IamNotFreddy': ['discordAdmin'],
	'LeraBE': ['discordMod'],
	'Lubitel obnimashek': ['intern'],
	'JustAccount': ['intern'],
	'Swit4er': ['translator'],
	'Fleshka5856': ['intern']
}

/* Выделение комментариев */
setInterval(function () {
    $('.wds-avatar a[href$="Voidan%20Dether"]').closest('.Reply, .Reply_body__PM9kM').addClass('bur');
    $('.wds-avatar a[href$="Swit4er"]').closest('.Reply, .Reply_body__PM9kM').addClass('bur');
    $('.wds-avatar a[href$="Terabait24"]').closest('.Reply, .Reply_body__PM9kM').addClass('admin');
    $('.wds-avatar a[href$="%D0%9D%D0%B8%D0%BA%D0%B8%D1%82%D0%B8%D0%BD%20%D0%90%D1%80%D1%81%D0%B5%D0%BD%D0%B8%D0%B9"]').closest('.Reply, .Reply_body__PM9kM').addClass('admin');
    $('.wds-avatar a[href$="Merzlyak"]').closest('.Reply, .Reply_body__PM9kM').addClass('discordMod');
    $('.wds-avatar a[href$="Kostinger"]').closest('.Reply, .Reply_body__PM9kM').addClass('discordMod');
    $('.wds-avatar a[href$="TimurKhan"]').closest('.Reply, .Reply_body__PM9kM').addClass('discordMod');
    $('.wds-avatar a[href$="%D0%92%D0%BB%D0%B0%D0%B4%D1%8B%D0%BA%D0%B0%20%D0%90%D0%BB%D0%B0%D1%80%D0%B0%D0%BA"]').closest('.Reply, .Reply_body__PM9kM').addClass('intern');
    $('.wds-avatar a[href$="IamNotFreddy"]').closest('.Reply, .Reply_body__PM9kM').addClass('discordAdmin');
    $('.wds-avatar a[href$="LeraBE"]').closest('.Reply, .Reply_body__PM9kM').addClass('discordMod');
    $('.wds-avatar a[href$="Lubitel%20obnimashek"]').closest('.Reply, .Reply_body__PM9kM').addClass('intern');
    $('.wds-avatar a[href$="JustAccount"]').closest('.Reply, .Reply_body__PM9kM').addClass('intern');
    $('.wds-avatar a[href$="Fleshka5856"]').closest('.Reply, .Reply_body__PM9kM').addClass('intern');
    $('.wds-avatar a[href$="Creepy%20Owl "]').closest('.Reply, .Reply_body__PM9kM').addClass('contMod');
    $('.wds-avatar a[href$="Lefsy"]').closest('.Reply, .Reply_body__PM9kM').addClass('contMod');
    $('.wds-avatar a[href$="Lich%20night"]').closest('.Reply, .Reply_body__PM9kM').addClass('threadmod');
}, 500 );


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
    name: "NeonRain",
    title: "Неоновый дождь",
    description: "Капающие с неба разноцветные капли"
}];

/* Анимация в рейле */
$().ready(function () {
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
  
  /* Фиксы достижений */
	  document.querySelectorAll('.badge-icon').forEach(function (badgeIcon) {
	    $(badgeIcon).data('bs.popover').config.content = $(badgeIcon).prev('.profile-hover').prop("outerHTML")
	        .replace('categoryselect-addcategory-button', 'Добавить категорию')
	        .replace('rte-ck-image-add', 'Добавить изображение')
	        .replace('статей', 'статьи')
	        .replaceAll(/⧼|⧽/g, '');
	})
});

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