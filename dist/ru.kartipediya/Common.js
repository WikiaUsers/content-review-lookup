window.DiscordBannerSettings = {
bannerStyle: '2',
inviteLink: 'MgX63FceCf',
prependToRail: false
};



(function () {
 
    /* -------------------------------------------------------------
       Параллакс от курсора: отдельный слой .kp-hero-parallax двигает
       И карту (через transform), И маскота — на разных элементах,
       поэтому не конфликтует с CSS-анимацией вращения карты.
       ------------------------------------------------------------- */
    function initHero(hero) {
        if (!hero || hero.dataset.heroInit) return;
        hero.dataset.heroInit = '1';
 
        var parallax = hero.querySelector('.kp-hero-parallax');
        var mascot = hero.querySelector('.kp-hero-mascot');
 
        hero.addEventListener('mousemove', function (e) {
            var rect = hero.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width - 0.5;
            var y = (e.clientY - rect.top) / rect.height - 0.5;
 
            if (parallax) {
                parallax.style.transform = 'translate(' + (x * 14) + 'px,' + (y * 8) + 'px)';
            }
            if (mascot) {
                mascot.style.transform = 'translate(' + (x * 12) + 'px,' + (y * 8) + 'px)';
            }
        });
 
        hero.addEventListener('mouseleave', function () {
            if (parallax) parallax.style.transform = 'translate(0,0)';
            if (mascot) mascot.style.transform = 'translate(0,0)';
        });
    }
 
    /* -------------------------------------------------------------
       Рандомайзер кантрибола
       ------------------------------------------------------------- */
    function initRandomGroups() {
        document.querySelectorAll('.kp-random-group').forEach(function (group) {
            if (group.dataset.randomInit) return;
            group.dataset.randomInit = '1';
 
            var items = group.querySelectorAll('.kp-random-item');
            if (!items.length) return;
 
            var pick = items[Math.floor(Math.random() * items.length)];
            pick.classList.add('kp-random-active');
 
            applyDominantColor(pick);
        });
    }
 
    /* -------------------------------------------------------------
       Цвет карточки берётся из data-color на выбранном варианте
       (CDN Fandom не отдаёт CORS-заголовок, поэтому считать цвет
       из пикселей картинки браузер не позволяет — это ограничение
       безопасности браузера, не наше). Если атрибута нет — остаётся
       цвет по умолчанию (зелёный) из CSS.
       ------------------------------------------------------------- */
    function applyDominantColor(item) {
        var card = item.closest('.kp-feature-card');
        var color = item.getAttribute('data-color');
        if (!card || !color) return;
        card.style.setProperty('--kp-dynamic-rgb', color);
    }
 
    function tryInit() {
        var hero = document.querySelector('.kp-hero');
        if (hero) initHero(hero);
        initRandomGroups();
    }
 
    tryInit();
    window.addEventListener('load', tryInit);
    var observer = new MutationObserver(tryInit);
    observer.observe(document.body, { childList: true, subtree: true });
})();