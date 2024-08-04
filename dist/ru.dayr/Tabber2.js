document.addEventListener("DOMContentLoaded", function() {
    var tabbers = document.querySelectorAll('.wds-tabber');

    tabbers.forEach(function(tabber) {
        var tabs = tabber.querySelectorAll('.wds-tabs__tab');
        var contents = tabber.querySelectorAll('.wds-tab__content');

        tabs.forEach(function(tab, index) {
            tab.addEventListener('click', function() {
                // Убираем активные классы у всех вкладок и содержимого
                tabs.forEach(function(t) { t.classList.remove('wds-is-current'); });
                contents.forEach(function(c) { c.classList.remove('wds-is-current'); });

                // Добавляем активный класс выбранной вкладке и соответствующему содержимому
                tab.classList.add('wds-is-current');
                contents[index].classList.add('wds-is-current');
            });
        });
    })
});