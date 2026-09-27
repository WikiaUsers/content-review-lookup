/*---------------------------- LockOldComments -----------------------*/
    window.lockOldComments = (window.lockOldComments || {});
    window.lockOldComments.limit = 90;
        /** translation fix **/
        window.dev = window.dev || {};
        window.dev.i18n = window.dev.i18n || {};
        window.dev.i18n.overrides = window.dev.i18n.overrides || {};
        window.dev.i18n.overrides['LockOldComments'] = window.dev.i18n.overrides['LockOldComments'] || {};
        window.dev.i18n.overrides['LockOldComments']['locked-reply-box'] = "🔒 Этой ветке комментариев более " + window.lockOldComments.limit + " " + (window.lockOldComments.limit > 1 ? 'дней.' : 'дня.') + " Нет необходимости отвечать.";
     
/*---------------------------- Кнопка "Новая страница" -----------------------*/
// Основа
$(".wiki-tools__theme-switch").before('<a href="https://zlodei.fandom.com/ru/wiki/Служебная:CreatePage" class="wds-button wds-is-secondary" title="Новая страница"><svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-page-small"></use></svg></a>');

// Блок правой панели. Всзято с вики "Убежище"
function addNewPages(){
	$('<section class="rail-module"></section>')
		.appendTo('#WikiaRail')
		.load('/ru/index.php?title=Template:RailModuleNewPages&action=render');
}

/*---------------------------- Окно при наведении на ссылку -----------------------*/
// Основа
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });

// Параметры
window.pPreview.noimage = 'https://zlodei.fandom.com/ru/wiki/Special:FilePath/Изображение_отсутствует.jpg';
window.pPreview.delay = 500;
window.pPreview.apid = true;
window.pPreview.mline = 5;
window.pPreview.textAlign = 'left';

// Исключение ссылок на пространства имён
window.pPreview.RegExp.ilinks = [
    /(%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F|%D0%A8%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD|%D0%A3%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA|%D0%97%D0%BB%D0%BE%D0%B4%D0%B5%D0%B8[ _]%D0%B2%D0%B8%D0%BA%D0%B8|%D0%A4%D0%B0%D0%B9%D0%BB)(:|%3A)/i,
    /(Категория|Шаблон|Участник|Злодеи[ _]вики|Файл|MediaWiki)(:|%3A)/i
];

/* Bang Search (русская версия) */
(function bang(window, mw, $) {
    if (window.bangLoaded) return;
    window.bangLoaded = true;

// Селекторы поиска
    var searchInputSelectors = [
        '#searchInput',
        '.mw-searchInput',
        'input[name="search"]',
        '#searchform input[type="text"]',
        '.search-app input'
    ].join(', ');

    var ns = mw.config.get('wgFormattedNamespaces');

// Кириллица и латиница
    var namespaces = {
        'ш':  ns[10],    // Шаблон
        'мв': ns[8],     // MediaWiki
        'с':  ns[-1],    // Служебная
        'сп': ns[12],    // Справка
        'мо': ns[828],   // Модуль
        'ф':  ns[6],     // Файл
        'у':  ns[2],     // Участник
        'оу': ns[3],     // Обсуждение участника
        'ст': ns[1200],  // Стена обсуждения
        'бу': ns[500],   // Блог участника
        'п':  ns[4],     // Проект
        'к':  ns[14],    // Категория
        'фо': ns[110],   // Форум

        't':  ns[10],    // Template
        'mw': ns[8],     // MediaWiki
        's':  ns[-1],    // Special
        'h':  ns[12],    // Help
        'm':  ns[828],   // Module
        'f':  ns[6],     // File
        'u':  ns[2],     // User
        'ut': ns[3],     // User talk
        'w':  ns[1200],  // Message Wall
        'ub': ns[500],   // User blog
        'p':  ns[4],     // Project
        'c':  ns[14],    // Category
        'fo': ns[110]    // Forum
    };

// Для удаления отсутствующих ключей
    Object.keys(namespaces).forEach(function(k) {
        if (namespaces[k] === undefined || namespaces[k] === null || namespaces[k] === '') {
            delete namespaces[k];
        }
    });
    $(document).on('keyup', searchInputSelectors, function() {
        var old = $(this).val(),
            txt,
// !ключ + пробел и всё готово
            m = old.match(/^\!([a-zа-яё]+)\s+/i);
        if (!m) return;
        var key = m[1].toLowerCase();
        if (!namespaces.hasOwnProperty(key)) return;
        txt = namespaces[key] + ':' + old.substr(m[0].length);

// Нативный сеттер, в протиыном случае React откатит значение обратно
        var setter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            'value'
        ).set;
        if (setter) {
            setter.call(this, txt);
        } else {
            this.value = txt;
        }
        this.dispatchEvent(new Event('input', { bubbles: true }));
    });
})(window, mediaWiki, jQuery);