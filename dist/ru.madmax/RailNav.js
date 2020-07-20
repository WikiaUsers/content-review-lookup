;(function($) {
    if (!$('#WikiaRail').length) return;
    
    $('#WikiaRail').prepend(
        '<section class="NavRail module" style="padding:0; border-radius:5px 5px 0 0;">' +
            '<div class="NavHeader" style="position:relative; background-color:black; border-top: 2px solid #f15b34; border-bottom: 2px solid #f15b34; border-radius: 4px; width:100%; text-align:center; font-weight:bold; font-size:18px; padding:3px 0;">' +
                'Навигация по сайту' +
            '</div>' +
            '<div class="NavBody" style="-moz-column-count: 2; -moz-column-gap:50px; -webkit-column-count: 2; -webkit-column-gap:50px; column-count: 2; column-gap:50px; font-size:16px; padding:10px; margin-left:20px;">' +
                '<ul style="list-style: square;">' +
                    // Персонажи
                    '<li>' +
                        '<a href="/wiki/%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F:%D0%9F%D0%B5%D1%80%D1%81%D0%BE%D0%BD%D0%B0%D0%B6%D0%B8" title="Категория:Персонажи">Персонажи</a>' +
                    '</li>' +
                    // Группировки
                    '<li>' +
                        '<a href="/wiki/%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F:%D0%93%D1%80%D1%83%D0%BF%D0%BF%D0%B8%D1%80%D0%BE%D0%B2%D0%BA%D0%B8" title="Категория:Группировки">Группировки</a>' +
                    '</li>' +
                    // Места
                    '<li>' +
                        '<a href="/wiki/%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F:%D0%9C%D0%B5%D1%81%D1%82%D0%B0" title="Категория:Места">Места</a>' +
                    '</li>' + 
                    // Автомобили
                    '<li>' +
                        '<a href="/wiki/%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F:%D0%90%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D0%B8" title="Категория:Автомобили">Автомобили</a>' +
                    '</li>' +
                    // Фильмы
                    '<li>' +
                        '<a href="/wiki/%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F:%D0%A4%D0%B8%D0%BB%D1%8C%D0%BC%D1%8B" title="Категория:Фильмы">Фильмы</a>' +
                    '</li>' +
                    // Комиксы
                    '<li>' +
                        '<a href="/wiki/%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F:%D0%9A%D0%BE%D0%BC%D0%B8%D0%BA%D1%81%D1%8B" title="Категория:Комиксы">Комиксы</a>' +
                    '</li>' +
                    // Игры
                    '<li>' +
                        '<a href="/wiki/%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F:%D0%98%D0%B3%D1%80%D1%8B" title="Категория:Игры">Игры</a>' +
                    '</li>' +
                    // Актёры
                    '<li>' +
                        '<a href="/wiki/%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F:%D0%90%D0%BA%D1%82%D0%B5%D1%80%D1%8B" title="Категория:Актеры" class="newcategory">Актеры</a>' +
                    '</li>' +
                '</ul>' +
            '</div>' +
        '</section>'
    );
})(this.jQuery);