/**
 * Скрипт добавляет служебную страницу PagesInfo, которая выдает информацию по выбранной в списке статье
 * Version: 1.0
 * Author: Kofirs2634
 */

mw.loader.using('mediawiki.api', function() {
    // Основная подготовка
    var config = mw.config.get(['wgTitle', 'wgNamespaceNumber', 'wgSiteName']),
        content = $('#mw-content-text');
    if (config.wgTitle == 'PagesInfo' && config.wgNamespaceNumber == -1) {
        $('title').text('Информация о статьях | ' + config.wgSiteName + ' | FANDOM Powered by Wikia');
        $('.page-header__title').text('Информация о статьях');
        content.empty().append('На этой странице можно получить информацию о любой статье ' + config.wgSiteName + '. Выберите интересующую вас страницу в выпадающем списке ниже и нажмите на кнопку.<br><select name="pages" id="pages-drop"></select> <input type="button" class="button normal primary" id="get-btn" value="Получить" onclick="getInfo()" /><div id="icontainer"></div>');
        $.ajax({
            type: 'get',
            url: '../api.php?action=query&format=json&list=allpages&apfrom=&aplimit=500&apfilterredir=nonredirects',
            success: function(data) {
                data.query.allpages.forEach(function callback(a, n) {
                    $('#pages-drop').append('<option>' + a.title + '</option>')
                });
                $('#pages-drop option:first-child').attr('selected', 'selected')
            }
        });
    }
    
    // Обеспечение работоспособности кнопки
    window.getInfo = function() {
        $('#icontainer').empty(); // Очистка предыдущего результата
        $.ajax({
            type: 'get',
            url: '../api.php?action=query&format=json&titles=' + $('#pages-drop').val() + '&inprop=protection&tllimit=500&rvprop=flags|size|userid|user|ids|comment|timestamp&rvlimit=2&prop=info|extlinks|categories|links|revisions|templates',
            success: function(data) {
                // Обработка
                var dir = data.query.pages[(Object.keys(data.query.pages)[0])],
                    cats = [], links = [];
                if (dir.categories) {
                    dir.categories.forEach(function callback(c, n) {
                        cats[n] = c.title.substring(10)
                    });
                }
                if (dir.links) {
                    dir.links.forEach(function callback(l, n) {
                        links[n] = l.title
                    });
                }
 
                // Вывод основной информации
                $('#icontainer').append('<h2>Информация о странице</h2>');
                $('#icontainer').append('<b>Название:</b> ' + dir.title + '<br>');                
                $('#icontainer').append('<b>ID:</b> ' + dir.pageid + '<br>');
                $('#icontainer').append('<b>Размер:</b> ' + dir.length + ' байт<br>');
                $('#icontainer').append('<b>Категории (' + cats.length + '):</b> ' + cats.join(', ') + '<br>');
                $('#icontainer').append('<b>Внутренние ссылки (' + links.length + '):</b> ' + links.join(', ') + '<br>');
                if (dir.extlinks) $('#icontainer').append('<b>Количество внешних ссылок:</b> ' + dir.extlinks.length);
 
                // Вывод информации о защите
                if (dir.protection.length == 0) $('#icontainer').append('<h2>Защита страницы</h2><i>Страница не защищена.</i>')
                else {
                    $('#icontainer').append('<h2>Защита страницы</h2>');
                    $('#icontainer').append('<b>Правки:</b> уровень ' + dir.protection[0].level + ', заканчивается ' + dir.protection[0].expiry + '<br>');
                    $('#icontainer').append('<b>Переименование:</b> уровень ' + dir.protection[1].level + ', заканчивается ' + dir.protection[1].expiry + '<br>');
                }
 
                // Информация по последней правке
                $('#icontainer').append('<h2>Последняя правка</h2>');
                // Обработка
                if (dir.revisions[0].minor) var minor = 'Отмечена как малая'
                else var minor = '';
                if (dir.revisions[1]) {
                    var size = dir.revisions[0].size - dir.revisions[1].size,
                        sizeText = '';
                    if (Math.abs(size) >= 500) {
                        if (size > 0) sizeText = ' байт <b class="mw-plusminus-pos">(+' + size + ')</b>'
                        else if (size < 0) sizeText = ' байт <b class="mw-plusminus-neg">(' + size + ')</b>'
                    } else {
                        if (size > 0) sizeText = ' байт <span class="mw-plusminus-pos">(+' + size + ')</span>'
                        else if (size < 0) sizeText = ' байт <span class="mw-plusminus-neg">(' + size + ')</span>'
                        else sizeText = ' байт <span class="mw-plusminus-null">(0)</span>'
                    }
                } else {
                    if (Math.abs(dir.revisions[0].size) >= 500) sizeText = ' байт <b class="mw-plusminus-pos">(+' + dir.revisions[0].size + ')</b>'
                    else sizeText = ' байт <span class="mw-plusminus-pos">(+' + dir.revisions[0].size + ')</span>'
                }
                // Вывод
                $('#icontainer').append('<b>ID:</b> ' + dir.revisions[0].revid + '<br>');
                $('#icontainer').append('Совершил <a href="/ru/wiki/User:' + dir.revisions[0].user + '">' + dir.revisions[0].user + '</a> (ID: ' + dir.revisions[0].userid + ') ' + new Date(dir.revisions[0].timestamp).toUTCString().substring(4) + '. Размер страницы: ' + dir.length + sizeText + '. ' + minor + '<br>');
                $('#icontainer').append('<b>Комментарий:</b> ' + dir.revisions[0].comment + '<br>');
                $('#icontainer').append('<b>Полезные ссылки:</b> <a href="/ru/wiki/Special:Diff/' + dir.revisions[0].revid + '">Правка</a> | <a href="/ru/wiki/' + dir.title + '?action=edit">Править</a> | <a href="/ru/wiki/' + dir.title + '?action=raw">Исходный код</a> | <a href="/ru/wiki/' + dir.title + '?action=history">История</a>')
            }
        })
    }
})