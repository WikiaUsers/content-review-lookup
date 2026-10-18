/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

window.UTCClockConfig = {
    offset: 420,
    format: '%2H:%2M:%2S %d %b %Y (UTC+7)',
    hoverText: 'Обновить страницу'
};

(function () {
    function place() {
        var clock = document.getElementById('UTCClock');
        var counter = document.querySelector('.fandom-community-header .page-counter');
        if (!clock || !counter) return false;
        var stack = counter.parentNode.querySelector(':scope > .sttd-counter-stack');
        if (!stack) {
            stack = document.createElement('div');
            stack.className = 'sttd-counter-stack';
            counter.parentNode.insertBefore(stack, counter);
            stack.appendChild(counter);
        }
        if (clock.parentNode !== stack) stack.appendChild(clock);
        return true;
    }
    var tries = 0;
    var timer = setInterval(function () {
        if (place() || ++tries > 50) clearInterval(timer);
    }, 200);
})();

(function () {
    var parts = [
        'Избранные_статьи',
        'Хорошие_статьи',
        'Статьи,_требующие_доработки',
        'Служебные_статьи',
        '%D0%98%D0%B7%D0%B1%D1%80%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5_%D1%81%D1%82%D0%B0%D1%82%D1%8C%D0%B8',
        '%D0%A5%D0%BE%D1%80%D0%BE%D1%88%D0%B8%D0%B5_%D1%81%D1%82%D0%B0%D1%82%D1%8C%D0%B8',
        '%D0%A1%D1%82%D0%B0%D1%82%D1%8C%D0%B8,_%D1%82%D1%80%D0%B5%D0%B1%D1%83%D1%8E%D1%89%D0%B8%D0%B5_%D0%B4%D0%BE%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8',
        '%D0%A1%D0%BB%D1%83%D0%B6%D0%B5%D0%B1%D0%BD%D1%8B%D0%B5_%D1%81%D1%82%D0%B0%D1%82%D1%8C%D0%B8'
    ];
    function isQ(href) {
        return !!href && parts.some(function (p) { return href.indexOf(p) !== -1; });
    }
    function move(root, itemSel) {
        if (!root) return;
        var dropdown = root.querySelector(':scope > .wds-dropdown');
        Array.prototype.slice.call(root.querySelectorAll(itemSel)).forEach(function (el) {
            var a = el.matches('a') ? el : el.querySelector('a');
            if (!a || !isQ(a.getAttribute('href'))) return;
            if (dropdown && dropdown.parentNode === root) root.insertBefore(el, dropdown);
            else root.appendChild(el);
        });
    }
    function run() {
        move(document.querySelector('.page-header__categories'), ':scope > a');
        document.querySelectorAll('.page-footer__categories ul, #catlinks ul, .catlinks ul, .article-categories ul').forEach(function (ul) {
            move(ul, ':scope > li');
        });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
    else run();
})();

/* Новые статьи в правой колонке */
window.AddRailModule = [
    'Template:NavRail',
    'Template:RailModuleNewPages'
];

mw.hook('AddRailModule.module').add(function () {
    function place() {
        var rail = document.querySelector('.right-rail-wrapper, .page__right-rail');
        if (!rail) return;
        var photos = rail.querySelector(
            '[class*="recent-images"], [class*="RecentImages"], .LatestPhotosModule, .rail-recentImages-module, #ph-recentImages-container'
        );
        var nav = rail.querySelector('[data-add-rail-module-page="Template:NavRail"]');
        var articles = rail.querySelector('[data-add-rail-module-page="Template:RailModuleNewPages"]');
        if (!photos) return;
        if (nav) photos.insertAdjacentElement('afterend', nav);
        if (articles) (nav || photos).insertAdjacentElement('afterend', articles);
    }
    place();
    setTimeout(place, 400);
    setTimeout(place, 1200);
});