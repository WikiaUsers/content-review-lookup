// Навигация по сайту в правой колонке
;(function($) {
    if (!$('#WikiaRail').length) return;
    
    $('#WikiaRail').append(
        '<section class="NavRail module" style="padding:0; border-radius:5px;">' +
            '<div class="NavHeader" style="position:relative; background-color:#c9f2c9; border-top: 1px solid #008000; border-bottom: 2px solid #008000; border-radius: 5px; width:100%; text-align:center; font-weight:bold; font-size:18px; padding:3px 0">' +
                'Навигация по сайту' +
            '</div>' +
            '<div class="NavBody" style="-moz-column-count: 2; -moz-column-gap:50px; -webkit-column-count: 2; -webkit-column-gap:50px; column-count: 2; column-gap:50px; font-size:16px; padding:10px; margin-left:20px;">' +
                '<ul style="list-style: square;">' +
                    // Книги
                    '<li>' +
                        '<a href="/wiki/%D0%9A%D0%BD%D0%B8%D0%B3%D0%B8" title="Книги">Книги</a>' +
                    '</li>' +
                    // Авторы
                    '<li>' +
                        '<a href="/wiki/%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F:%D0%90%D0%B2%D1%82%D0%BE%D1%80%D1%8B" title="Категория:Авторы">Авторы</a>' +
                    '</li>' +
                    // Серии
                    '<li>' +
                        '<a href="/wiki/%D0%A6%D0%B8%D0%BA%D0%BB,_%D1%81%D0%B5%D1%80%D0%B8%D1%8F_%D0%BA%D0%BD%D0%B8%D0%B3" title="Цикл, серия книг">Серии</a>' +
                    '</li>' + 
                    // Циклы
                    '<li>' +
                        '<a href="/wiki/%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F:%D0%A6%D0%B8%D0%BA%D0%BB,_%D1%81%D0%B5%D1%80%D0%B8%D1%8F" title="Категория:Цикл, серия">Циклы</a>' +
                    '</li>' +
                    // Жанры
                    '<li>' +
                        '<a href="/wiki/%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F:%D0%96%D0%B0%D0%BD%D1%80%D1%8B" title="Категория:Жанры">Жанры</a>' +
                    '</li>' +
                    // Сюжеты
                    '<li>' +
                        '<a href="/wiki/%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F:%D0%A1%D1%8E%D0%B6%D0%B5%D1%82%D1%8B" title="Категория:Сюжеты">Сюжеты</a>' +
                    '</li>' +
                    // Поиск
                    '<li>' +
                        '<a href="/wiki/%D0%A1%D1%8E%D0%B6%D0%B5%D1%82%D1%8B" title="Сюжеты">Поиск</a>' +
                    '</li>' +
                    // Почитать
                    '<li>' +
                        '<a href="/wiki/%D0%A7%D1%82%D0%BE_%D0%BF%D0%BE%D1%87%D0%B8%D1%82%D0%B0%D1%82%D1%8C%3F" title="Что почитать?">Почитать</a>' +
                    '</li>' +
                '</ul>' +
            '</div>' +
        '</section>'
    );
})(this.jQuery);