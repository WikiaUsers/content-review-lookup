/**
 * @desc    Реализует систему оценки сообщений в пространстве имен "Тема", добавляя кнопку лайка на стены обсуждения участников. Предназначен для википроектов с отсутствующим форумом
 * @author  Kofirs2634
 * @version 1.0
 * @scope   Site-wide
 * @docs    [[WallThreadLikes]]
 */
mw.loader.using('mediawiki.api', function() { // ожидаем API
    // антидубликат
    if (window.WallThreadLikes) return;
    window.WallThreadLikes = true;

    // требуемые константы и переменные
    const c = mw.config.get(['wgNamespaceNumber', 'wgUserId', 'wgScriptPath']),
          tId = mw.config.get('wgTitle'),
          api = new mw.Api(),
          CT = '-- WallThreadLikes storage. Please, do not edit this page if you don\'t realize consequences of your actions.\n-- ';
    var d, modal;

    // запрещаем работу при некоторых условиях
    if (!c.wgUserId || c.wgNamespaceNumber != 1201 || !$('.speech-bubble-message').length) return;

    /**
     * Ищет массив с проголосовавшими для определенного сообщения втури объекта темы
     * @param {Number} mId ID сообщения
     * @returns {Boolean} true, если массив найден
     */
    function exist(mId) {
        if (d[tId]) { if (d[tId][mId]) { if (d[tId][mId].length) return true } }
    }

    /**
     * Обновляет данные на странице во избежание конфликтов правок в хранилище
     */
    function update() {
        $.get(c.wgScriptPath + '/wiki/Module:WallThreadLikes', { cache: false, action: 'raw' })
            .done(function(r) {
                d = JSON.parse(r.substr(r.split('\n')[0].length + 4));
                $('li.message').each(function(n, e) {
                    e = $(e);
                    var mId = e.attr('id');
                    e.find('.wl-button').eq(0).removeClass('wl-pushed');
                    if (exist(mId)) {
                        if (d[tId][mId].includes(c.wgUserId)) e.find('.wl-button').eq(0).addClass('wl-pushed')
                        e.find('.wl-counter').eq(0).text(d[tId][mId].length)
                    } else e.find('.wl-counter').eq(0).text('0')
                })
            })
            .error(function() {
                d = {};
                $('li.message').each(function(n, e) {
                    e = $(e);
                    e.find('.wl-button').eq(0).removeClass('wl-pushed');
                    e.find('.wl-counter').eq(0).text('0')
                })
            })
    }

    /**
     * Изменяет данные, добавляя или исключая ID проголосовавшего, а затем запускает запись изменений
     * @param e Объект события клика по кнопке голоса
     */
    function rate(e) {
        e = $(e.target);
        e.attr('disabled', 'true').toggleClass('wl-pushed');
        var mId = e.parents().eq(2).attr('id');
        
        // создание объекта темы и массива оценок сообщения
        if (!d[tId]) d[tId] = {};
        if (!d[tId][mId]) d[tId][mId] = [];

        if (!d[tId][mId].includes(c.wgUserId)) { // добавляем голос
            d[tId][mId].push(c.wgUserId)
        } else { // убираем голос
            d[tId][mId] = d[tId][mId].filter(function(f) { return f != c.wgUserId });
        }
        write(e) // запись
    }

    /**
     * Записывает изменения в данных, вызванные нажатием кнопки голоса, с помощью API
     * @param e Объект события клика по кнопке голоса
     */
    function write(e) {
        api.post({
            action: 'edit',
            title: 'Module:WallThreadLikes',
            minor: true,
            text: CT + JSON.stringify(d),
            starttimestamp: new Date().getTime(),
            recreate: true,
            token: mw.user.tokens.get('editToken')
        }).then(function(r) {
            if (r.error) {
                var notify = new BannerNotification().setType('error').setContent('Произошла ошибка: ' + r.error.info + '. Перезагрузите страницу и попробуйте снова.')
                notify.timeout = 10000;
                notify.show();

                e.toggleClass('wl-pushed').removeAttr('disabled').toggleClass('wl-error');
                setTimeout(function() { e.toggleClass('wl-error') }, 5000);

                console.error(r)
            } else {
                var mId = e.parents().eq(2).attr('id');
                e.removeAttr('disabled');
                e.siblings().eq(0).text(d[tId][mId].length)
            }
        })
    }
    
    /**
     * Формирует и показывает во всплывающем окне список проголосовавших
     * @param e Объект нажатой ссылки
     */
    function list(e) {
        e = $(e.target);
        if (e.text() == '0') return;
        var mId = e.parents().eq(2).attr('id');
        if (exist(mId)) {
            $('#wl-modal-wrap').append($('<p>', { text: 'Это список всех участников, которым понравилось это сообщение.' }))
            .append($('<ul>', { id: 'wl-modal-list' }))

            // собираем данные по проголосовавшим
            // юзаем не MediaWiki'йный API, потому что он бесполезен
            $.get(c.wgScriptPath + '/api/v1/User/Details?size=30&ids=' + d[tId][mId].join(','), function(r) {
                r.items.forEach(function(e) {
                    $('#wl-modal-list').append(
                        $('<li>', { 'class': 'wl-modal-list-item' })
                        .append($('<img>', { src: e.avatar, 'class': 'avatar' }))
                        .append($('<a>', { href: e.url, text: e.name }))
                    )
                })
                modal.show() // выводим окно
            })
        }
    }

    /**
     * Функция инициализации всплывающего окна со списком голосов
     */
    function createModal() {
        modal = new window.dev.modal.Modal({
            content: '<div id="wl-modal-wrap"></div>',
            id: 'wl-modal',
            size: 'small',
            title: 'Кому понравилось?'
        })
        modal.create()
    }

    /**
     * Инициализация элементов на странице
     */
    function init() {
        // управление для топик-стартера (костыль)
        $('.follow').after(
            $('<div>', { 'class': 'wallLike' })
            .append($('<a>', {
                'class': 'wl-counter',
                title: 'Кому нравится',
                text: 0
            }))
            .append($('<input>', {
                type: 'button',
                title: 'Мне нравится',
                'class': 'wl-button'
            }))
        )
        // для остальных сообщений тоже
        for (i = 1; i < $('.speech-bubble-message').length - 1; i++) {
            var e = $('.speech-bubble-message').eq(i);
            e.prepend(
                $('<div>', { 'class': 'wallLike' })
                .append($('<a>', {
                    'class': 'wl-counter',
                    title: 'Кому нравится',
                    text: 0
                }))
                .append($('<input>', {
                    type: 'button',
                    title: 'Мне нравится',
                    'class': 'wl-button'
                }))
            )
        }

        // обновляем счетчики и активируем уже нажатые кнопки
        $('li.message').each(function(n, e) {
            e = $(e);
            var mId = e.attr('id');
            if (exist(mId)) {
                if (d[tId][mId].includes(c.wgUserId)) e.find('.wl-button').eq(0).toggleClass('wl-pushed')
                e.find('.wl-counter').eq(0).text(d[tId][mId].length)
            }
        })

        // перехват клика по кнопке голоса
        $('.wl-button').click(function(e) { rate(e) })

        // перехват клика по счетчику
        $('.wl-counter').click(function(e) { list(e) })

        // ставим данные обновляться раз в 60 секунд
        setInterval(update, 60000)
    }

    // импорт вспомогательных страниц
    importArticles(
        { type: 'style', articles: 'u:ru.koffee:MediaWiki:WallThreadLikes.css' },
        { type: 'script', articles: 'u:dev:MediaWiki:Modal.js' }
    )

    // ждем загрузки DOM
    $(function() {
        mw.hook('dev.modal').add(function() { // подключаем всплывающее окно
            createModal(); // создаем его
                
            // получаем текущие данные
            $.get(c.wgScriptPath + '/wiki/Module:WallThreadLikes', { cache: false, action: 'raw' })
                .done(function(r) { // если хранилище есть
                    d = JSON.parse(r.substr(r.split('\n')[0].length + 4));
                    init()
                })
                .error(function() { d = {}; init() }) // или если нет
        })
    })
})