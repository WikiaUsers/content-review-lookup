/**
 * Скрипт добавляет служебную страницу PagesInfo, которая выдает информацию по выбранной в списке статье
 * Version: 2.0
 * Author: Kofirs2634
 */
mw.loader.using('mediawiki.api', function() {
    if (window.PagesInfo) return;
    window.PagesInfo = true;

    const c = mw.config.get(['wgTitle', 'wgNamespaceNumber', 'wgSiteName', 'wgArticlePath', 'wgServer', 'wgUserLanguage']),
          api = new mw.Api(), link = '<a href="$1">$2</a>',
          datePattern = {
              year: 'numeric', month: 'long', day: 'numeric',
              hour: 'numeric', minute: 'numeric', second: 'numeric'
          }

    if (c.wgTitle != 'PagesInfo' || c.wgNamespaceNumber != -1) return;

    /**
     * Осуществляет первичный поиск страниц по префиксу иначе оповещает об отсутствии таких страниц
     */
    function prefixSearch() {
        // чистим предыдущий ответ
        $('#pi-results').empty();
        // запрягаем API
        api.get({
            action: 'query',
            list: 'allpages',
            aplimit: 'max',
            apprefix: $('#pi-search-box').val()
        }, function(r) {
            // если ничего нет
            if (!r.query.allpages.length) return $('#pi-results').append($('<div>', { text: 'Ничего не найдено' }))
            // выводим дропдаун со списком страниц
            $('#pi-results').append($('<select>', { id: 'pi-selection' })).append($('<input>', {
                id: 'pi-get',
                value: 'Получить',
                type: 'button'
            }))
            r.query.allpages.forEach(function(e) {
                $('#pi-selection').append($('<option>', {
                    id: 'article-' + e.pageid,
                    text: e.title
                }))
            })
            // кнопочка для получения данных
            $('#pi-get').click(getInfo)
        })
    }

    /**
     * Получает информацию по выбранной странице
     */
    function getInfo() {
        // список всех пропов для запроса
        var props = [
            ['info', 'categories', 'extlinks', 'langlinks', 'templates', 'links', 'images', 'revisions'],
            ['ids', 'flags', 'timestamp', 'user', 'parsedcomment', 'size']
        ];
        // формируем запрос
        api.get({
            action: 'query',
            prop: props[0].join('|'),
            titles: $('#pi-selection').val(),
            rvlimit: 2,
            rvprop: props[1].join('|'),
            inprop: 'protection',
            imlimit: 'max', cllimit: 'max', ellimit: 'max', iwlimit: 'max',
            lllimit: 'max', tllimit: 'max', pllimit: 'max'
        }, function(r) {
            // создаем ссылку для повторного поиска
            $('.page-header__main').append($('<div>', { 'class': 'page-header__page-subtitle', id: 'pi-back' }).append($('<a>', {
                href: '#',
                text: 'Выбрать другую страницу'
            }).click(function() { // заставляем ее работать
                $('#pi-choose').css('display', 'block');
                $('#pi-info').empty();
                $('#pi-back').remove();
                $('.page-header__title').text('Информация о статьях')
            })))
            // изменяем заголовок служебки
            $('.page-header__title').text('Информация: ' + $('#pi-selection').val())
            // скрываем поиск
            $('#pi-choose').css('display', 'none');
            // вызываем вывод данных
            makeInfo(r.query.pages[Object.keys(r.query.pages)[0]])
        })
    }

    /**
     * Оформляет полученный от сервера ответ в виде списка данных
     * @param data {{}} Данные сервера
     */
    function makeInfo(data) {
        $('#pi-info').append($('<div>', { id: 'pi-useful' })) // полезные ссылки пойдут сюда
        // раздел ОСНОВНОЕ
        .append($('<h3>', { text: 'Основное' }))
        .append($('<ul>', { id: 'pi-info-main' }) // список информации
            .append($('<li>', { text: data.pageid }).prepend($('<b>', { text: 'Системный идентификатор: ' })))
            .append($('<li>', { text: data.length + ' байт' }).prepend($('<b>', { text: 'Размер: ' })))
        )
        // раздел СВЯЗЬ С ДРУГИМИ СТРАНИЦАМИ
        .append($('<h3>', { text: 'Связь с другими страницами' }))
        .append($('<ul>', { id: 'pi-info-links' })) // список связей
        // раздел ПАРАМЕТРЫ ЗАЩИТЫ
        .append($('<h3>', { text: 'Параметры защиты' }))
        .append($('<ul>', { id: 'pi-info-protection' })) // список параметров
        // раздел ПОСЛЕДНЯЯ ПРАВКА
        .append($('<h3>', { text: 'Последняя правка' }))
        .append($('<ul>', { id: 'pi-info-revision' }));

        // оформляем ссылки в некоторых пунктах
        var cats = [], links = [], langs = [];
        if (data.links) {
            // упаковываем в ссылки
            data.links.forEach(function(e) {
                links.push(link.replace('$1', c.wgArticlePath.replace('$1', e.title)).replace('$2', e.title))
            })
        }
        if (data.categories) {
            // дополнительный запрос для названия пространства имен
            // сделано для того, чтобы отчекрыжить слово "Категория:"
            api.get({
                action: 'query',
                meta: 'siteinfo',
                siprop: 'namespaces'
            }, function(ns) {
                // упаковываем в ссылки
                data.categories.forEach(function(e) {
                    cats.push(link.replace('$1', c.wgArticlePath.replace('$1', e.title)).replace('$2', e.title.substr(ns.query.namespaces[14]['*'].length + 1)))
                })
                $('#pi-info-main').append($('<li>', { html: cats.join(', ') }).prepend($('<b>', { text: 'Включена в ' + data.categories.length + ' категорий: ' })))
            })
        } else $('#pi-info-main').append($('<li>', { text: 'Не включена в категории' }))
        if (data.langlinks) {
            // запрос для названий языков
            // нужен для преобразования сырых кодов в названия
            api.get({
                action: 'query',
                meta: 'siteinfo',
                siprop: 'languages'
            }, function(ls) {
                // упаковываем в ссылки
                data.langlinks.forEach(function(e) {
                    langs.push(link.replace('$1', c.wgServer + '/' + e.lang + '/wiki/' + e['*']).replace('$2', ls.query.languages.find(function(l) { return l.code == e.lang })['*']))
                })
                $('#pi-info-links').append($('<li>', { html: langs.join(', ') }).prepend($('<b>', { text: 'Содержит ' + data.langlinks.length + ' межъязыковых ссылок: ' })))
            })
        } else $('#pi-info-links').append($('<li>', { text: 'Межъязыковые ссылки отсутствуют' }))

        // отдельным номером заливаем данные по связям (могут быть, а могут и не быть)
        if (data.links) $('#pi-info-links').append($('<li>', { html: links.join(', ') }).prepend($('<b>', { text: 'Ссылается на ' + data.links.length + ' страниц: ' })))
        else $('#pi-info-links').append($('<li>', { text: 'Не ссылается на другие страницы проекта' }))

        if (data.extlinks) $('#pi-info-links').append($('<li>', { text: 'Содержит ' + data.extlinks.length + ' ссылок на внешние ресурсы' }))
        else $('#pi-info-links').append($('<li>', { text: 'На внешние ресурсы ссылок нет' }))

        $('#pi-info-links').append($('<li>', { text: 'Использует ' + (data.images ? data.images.length : 0) + ' медиафайлов и ' + (data.templates ? data.templates.length : 0) + ' шаблонов' }))

        // про защиту
        if (data.protection.length) {
            // задаем варианты текста, так будет проще
            var decrypt = {
                edit: 'Редактирование:', move: 'Переименование:',
                sysop: 'всем, кроме администраторов и модераторов контента,',
                autoconfirmed: 'новым и незарегистрированным участникам'
            };
            // выводим список
            data.protection.forEach(function(e) {
                $('#pi-info-protection').append($('<li>', { html: '<b>' + decrypt[e.type] + '</b> запрещено ' + decrypt[e.level] + ' ' + (e.expiry == 'infinity' ? 'на неограниченный срок' : 'до ' + new Date(e.expiry).toLocaleDateString(c.wgUserLanguage, datePattern)) }))
            })
        } else $('#pi-info-protection').append($('<li>', { text: 'Защита не установлена' }))

        // последняя правка
        var rvpath = data.revisions;
        $('#pi-info-revision').append($('<li>', { html: (rvpath[0].minor == '' ? 'Малая п' : 'П') + 'равка №' + rvpath[0].revid + ' от ' + new Date(rvpath[0].timestamp).toLocaleDateString(c.wgUserLanguage, datePattern) })
            .append($('<span>', { html: ' (' + link.replace('$1', c.wgArticlePath.replace('$1', 'Special:Diff/' + rvpath[0].revid)).replace('$2', 'просмотр') + ')' }))
        )
        .append($('<li>', { html: link.replace('$1', c.wgArticlePath.replace('$1', 'User:' + rvpath[0].user)).replace('$2', rvpath[0].user) }).prepend($('<b>', { text: 'Автор: ' })))
        .append($('<li>', { html: rvpath[0].parsedcomment ? rvpath[0].parsedcomment : 'не предоставлен' }).prepend($('<b>', { text: 'Комментарий: ' })));

        // счетчик байт
        if (rvpath.length > 1) {
            var diff = rvpath[1].size - rvpath[0].size;
            $('#pi-info-revision li:nth-child(2)').after($('<li>').append($('<span>', {
                text: '(' + (diff > 0 ? '+' + diff : diff) + ')',
                style: 'font-weight: ' + (Math.abs(diff) >= 500 ? 'bold' : 'normal'),
                'class': 'mw-plusminus-' + (diff > 0 ? 'pos' : diff < 0 ? 'neg' : 'null')
            })).prepend($('<b>', { text: 'Изменение размера: ' })))
            // добавляем кнопку отмены
            $('#pi-info-revision li span a').after($('<span>', { html: ' | ' + link.replace('$1', c.wgArticlePath.replace('$1', data.title + '?action=edit&undoafter=' + rvpath[1].revid + '&undo=' + rvpath[0].revid)).replace('$2', 'отменить') }))
        } else {
            $('#pi-info-revision li:nth-child(2)').after($('<li>').append($('<span>', {
                text: '(+' + rvpath[0].size + ')',
                style: 'font-weight: ' + (Math.abs(rvpath[0].size) >= 500 ? 'bold' : 'normal'),
                'class': 'mw-plusminus-pos'
            })).prepend($('<b>', { text: 'Изменение размера: ' })))
        }

        // получаем автора страницы, вышел костыль
        api.get({
            action: 'query',
            titles: data.title,
            prop: 'revisions',
            rvlimit: 1,
            rvdir: 'newer'
        }, function(r) {
            var rvpath = r.query.pages[data.pageid].revisions[0];
            $('#pi-info-main').append($('<li>', { html: 'участником ' + link.replace('$1', c.wgArticlePath.replace('$1', 'User:' + rvpath.user)).replace('$2', rvpath.user) + ' ' + new Date(rvpath.timestamp).toLocaleDateString(c.wgUserLanguage, datePattern) + ' (' + link.replace('$1', c.wgArticlePath.replace('$1', 'Special:Diff/' + rvpath.revid)).replace('$2', 'просмотр') + ')' }).prepend($('<b>', { text: 'Создана ' })));
        });

        // добавляем полезные ссылки
        var actions = [
            { type: 'view', name: 'Просмотреть' }, { type: 'edit', name: 'Редактировать' },
            { type: 'raw', name: 'Исходный код' }, { type: 'history', name: 'История' },
            { type: 'protect', name: 'Защитить' }, { type: 'delete', name: 'Удалить' },
        ], useful = [];
        actions.forEach(function(e) {
            useful.push(link.replace('$1', c.wgArticlePath.replace('$1', data.title + '?action=' + e.type)).replace('$2', e.name));
        })
        $('#pi-useful').html(useful.join(' | '))
        $('#pi-info').append($('#pi-useful').clone()) // дублируем полезные ссылки в конец
    }

    // заменяем название вкладки и служебки на нужное нам
    $('title').text('Информация о статьях | ' + c.wgSiteName + ' | Fandom');
    $('.page-header__title').text('Информация о статьях');
    // чистим дефолтный контент с ошибкой
    $('#mw-content-text').empty()
        // а затем создаем разметку
        .append($('<div>', { id: 'pi-choose' })
            .append($('<p>', {
                text: 'Здесь вы можете получить основную информацию по любой статье на $1, воспользовавшись полем для поиска ниже.',
                id: 'pi-desc'
            }))
            .append($('<input>', {
                id: 'pi-search-box',
                placeholder: 'Поиск'
            }))
            .append($('<input>', {
                id: 'pi-search',
                type: 'button',
                value: 'Найти'
            }))
            .append($('<div>', { id: 'pi-results' })))
        .append($('<div>', { id: 'pi-info' }))
    $('#pi-desc').html($('#pi-desc').html().replace('$1', link.replace('$1', c.wgArticlePath.replace('$1', '')).replace('$2', c.wgSiteName)));

    // задаем функции кнопки поиска
    $('#pi-search').click(prefixSearch);
})