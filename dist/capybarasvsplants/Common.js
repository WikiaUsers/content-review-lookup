(function () {
    function rand(min, max) { return Math.random() * (max - min) + min; }

    function spawn(container, className, count, styleFn) {
        for (var i = 0; i < count; i++) {
            var el = document.createElement('div');
            el.className = className;
            styleFn(el, i);
            container.appendChild(el);
        }
    }

    function initWeatherFX() {
        var cards = document.querySelectorAll('.cvp-weather-card');
        if (!cards.length) return;

        cards.forEach(function (card) {
            var fx = card.querySelector('.cvp-weather-fx');
            if (!fx) return;

            if (card.classList.contains('cvp-weather-rain')) {
                spawn(fx, 'cvp-rain-drop', 16, function (el, i) {
                    el.style.left = rand(0, 100) + '%';
                    el.style.animationDuration = rand(0.5, 0.9) + 's';
                    el.style.animationDelay = rand(0, 1) + 's';
                });
            }

            if (card.classList.contains('cvp-weather-snowy')) {
                spawn(fx, 'cvp-snow-flake', 14, function (el, i) {
                    el.style.left = rand(0, 100) + '%';
                    el.style.animationDuration = rand(3, 5) + 's';
                    el.style.animationDelay = rand(0, 3) + 's';
                });
            }

            if (card.classList.contains('cvp-weather-blizzard')) {
                spawn(fx, 'cvp-blizzard-flake', 18, function (el, i) {
                    el.style.left = rand(0, 60) + '%';
                    el.style.animationDuration = rand(0.7, 1.2) + 's';
                    el.style.animationDelay = rand(0, 1) + 's';
                });
            }

            if (card.classList.contains('cvp-weather-meteor')) {
                spawn(fx, 'cvp-meteor-streak', 6, function (el, i) {
                    el.style.top = rand(0, 40) + '%';
                    el.style.left = rand(0, 60) + '%';
                    el.style.height = rand(18, 34) + 'px';
                    el.style.animationDuration = rand(1.1, 1.8) + 's';
                    el.style.animationDelay = rand(0, 1.6) + 's';
                });
            }

            if (card.classList.contains('cvp-weather-tacorain')) {
                spawn(fx, 'cvp-taco-drop', 8, function (el, i) {
                    el.textContent = '\uD83C\uDF2E';
                    el.style.left = rand(5, 90) + '%';
                    el.style.fontSize = rand(12, 20) + 'px';
                    el.style.animationDuration = rand(1.8, 3) + 's';
                    el.style.animationDelay = rand(0, 2.5) + 's';
                });
            }

            if (card.classList.contains('cvp-weather-heatwave')) {
                spawn(fx, 'cvp-ember', 9, function (el, i) {
                    el.style.left = rand(5, 95) + '%';
                    el.style.animationDuration = rand(1.6, 2.6) + 's';
                    el.style.animationDelay = rand(0, 2) + 's';
                });
            }

            if (card.classList.contains('cvp-weather-redsun')) {
                spawn(fx, 'cvp-flame', 6, function (el, i) {
                    el.style.left = rand(10, 85) + '%';
                    el.style.animationDuration = rand(0.5, 0.9) + 's';
                    el.style.animationDelay = rand(0, 0.6) + 's';
                });
            }

            if (card.classList.contains('cvp-weather-reversesun')) {
                spawn(fx, 'cvp-flame-reverse', 6, function (el, i) {
                    el.style.left = rand(10, 85) + '%';
                    el.style.animationDuration = rand(0.5, 0.9) + 's';
                    el.style.animationDelay = rand(0, 0.6) + 's';
                });
            }

            if (card.classList.contains('cvp-weather-glitched')) {
                var colors = ['#4dffea', '#ff4dd8', '#ffffff', '#000000', '#2effff'];
                var blocks = [];
                spawn(fx, 'cvp-glitch-block', 10, function (el, i) {
                    blocks.push(el);
                });
                function reshuffle() {
                    blocks.forEach(function (el) {
                        el.style.left = rand(0, 85) + '%';
                        el.style.top = rand(0, 85) + '%';
                        el.style.width = rand(10, 40) + 'px';
                        el.style.height = rand(3, 10) + 'px';
                        el.style.background = colors[Math.floor(rand(0, colors.length))];
                        el.style.opacity = rand(0.3, 0.8);
                    });
                }
                reshuffle();
                setInterval(reshuffle, 150);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWeatherFX);
    } else {
        initWeatherFX();
    }
    mw.hook('wikipage.content').add(initWeatherFX);
})();

/* Copy Code Button */
mw.hook('wikipage.content').add(function ($content) {
    $content.on('click', '.cvp-copy-btn', function () {
        var btn = $(this);
        if (btn.hasClass('cvp-copied')) return;
        var code = btn.attr('data-code');

        function onSuccess() {
            btn.text('Copied!').addClass('cvp-copied');
            setTimeout(function () {
                btn.text('Copy').removeClass('cvp-copied');
            }, 2000);
        }

        function onFail() {
            btn.text('Failed!');
            setTimeout(function () { btn.text('Copy'); }, 2000);
        }

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(code).then(onSuccess).catch(function () {
                fallbackCopy(code, onSuccess, onFail);
            });
        } else {
            fallbackCopy(code, onSuccess, onFail);
        }
    });

    function fallbackCopy(code, onSuccess, onFail) {
        var temp = $('<textarea>').css({
            position: 'fixed', top: 0, left: 0,
            opacity: 0, pointerEvents: 'none'
        });
        $('body').append(temp);
        temp.val(code).focus().select();
        try {
            document.execCommand('copy');
            onSuccess();
        } catch (e) {
            onFail();
        }
        temp.remove();
    }
});

/* Expired Codes dropdown */
mw.hook('wikipage.content').add(function ($content) {
    $content.on('click', '.cvp-expired-header', function () {
        var $header = $(this);
        $header.toggleClass('cvp-expired-open');
        $header.next('.cvp-expired-body').toggleClass('cvp-expired-open');
    });
});

/* Capybara Index hover tooltip */
(function () {
    var capyTooltipInitialized = false;

    function initCapyTooltip() {
        if (capyTooltipInitialized) return;

        var cards = document.querySelectorAll('.cvp-item-card');
        if (!cards.length) return;

        capyTooltipInitialized = true;

        var tooltip = document.createElement('div');
        tooltip.className = 'cvp-item-tooltip';
        tooltip.innerHTML =
            '<div class="cvp-tooltip-header"></div>' +
            '<div class="cvp-tooltip-stats"></div>' +
            '<div class="cvp-tooltip-obtainment"></div>';
        document.body.appendChild(tooltip);

        var headerEl = tooltip.querySelector('.cvp-tooltip-header');
        var statsEl = tooltip.querySelector('.cvp-tooltip-stats');
        var obtainEl = tooltip.querySelector('.cvp-tooltip-obtainment');

        function showTooltip(card) {
            var d = card.dataset;
            headerEl.textContent = d.name || '';
            statsEl.textContent = d.dmg || '';
            obtainEl.textContent = d.obtainment || '';

            var rect = card.getBoundingClientRect();
            var tooltipWidth = 190;
            var gap = 12;
            var left = rect.right + gap;

            if (left + tooltipWidth > window.innerWidth) {
                left = rect.left - tooltipWidth - gap;
            }
            if (left < 5) left = 5;

            tooltip.style.left = left + 'px';
            tooltip.style.top = rect.top + 'px';
            tooltip.classList.add('cvp-active');

            var tooltipRect = tooltip.getBoundingClientRect();
            var top = rect.top;
            if (tooltipRect.bottom > window.innerHeight) {
                top = window.innerHeight - tooltipRect.height - 10;
            }
            if (top < 5) top = 5;
            tooltip.style.top = top + 'px';
        }

        function hideTooltip() {
            tooltip.classList.remove('cvp-active');
        }

        cards.forEach(function (card) {
            card.addEventListener('mouseenter', function () { showTooltip(card); });
            card.addEventListener('mouseleave', hideTooltip);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCapyTooltip);
    } else {
        initCapyTooltip();
    }
    mw.hook('wikipage.content').add(initCapyTooltip);
})();

(function () {
    var scrollTooltipInitialized = false;

    function initScrollTooltip() {
        if (scrollTooltipInitialized) return;

        var cards = document.querySelectorAll('.cvp-scroll-card');
        if (!cards.length) return;

        scrollTooltipInitialized = true;

        var rarityColors = {
            Rare: '#3b82f6',
            Legendary: '#eab308',
            Mythic: '#ec4899',
            Divine: '#f97316',
            Secret: '#4a4a4a',
            Godly: '#a04dff'
        };

        var tooltip = document.createElement('div');
        tooltip.className = 'cvp-scroll-tooltip';
        tooltip.innerHTML =
            '<div class="cvp-scroll-tooltip-name"></div>' +
            '<div class="cvp-scroll-tooltip-rarity"></div>' +
            '<div class="cvp-scroll-tooltip-cost"></div>' +
            '<div class="cvp-scroll-tooltip-stock"></div>' +
            '<div class="cvp-scroll-tooltip-grants"></div>';
        document.body.appendChild(tooltip);

        var nameEl = tooltip.querySelector('.cvp-scroll-tooltip-name');
        var rarityEl = tooltip.querySelector('.cvp-scroll-tooltip-rarity');
        var costEl = tooltip.querySelector('.cvp-scroll-tooltip-cost');
        var stockEl = tooltip.querySelector('.cvp-scroll-tooltip-stock');
        var grantsEl = tooltip.querySelector('.cvp-scroll-tooltip-grants');

        function showTooltip(card) {
            var d = card.dataset;
            nameEl.textContent = d.name || '';
            rarityEl.textContent = d.rarity || '';
            rarityEl.style.color = rarityColors[d.rarity] || '#1c1917';
            costEl.textContent = d.cost || '';
            stockEl.textContent = d.stock || '';
            grantsEl.textContent = d.grants ? 'Grants: ' + d.grants : '';

            var rect = card.getBoundingClientRect();
            var tooltipWidth = 190;
            var gap = 12;
            var left = rect.right + gap;

            if (left + tooltipWidth > window.innerWidth) {
                left = rect.left - tooltipWidth - gap;
            }
            if (left < 5) left = 5;

            tooltip.style.left = left + 'px';
            tooltip.style.top = rect.top + 'px';
            tooltip.classList.add('cvp-active');

            var tooltipRect = tooltip.getBoundingClientRect();
            var top = rect.top;
            if (tooltipRect.bottom > window.innerHeight) {
                top = window.innerHeight - tooltipRect.height - 10;
            }
            if (top < 5) top = 5;
            tooltip.style.top = top + 'px';
        }

        function hideTooltip() {
            tooltip.classList.remove('cvp-active');
        }

        cards.forEach(function (card) {
            card.addEventListener('mouseenter', function () { showTooltip(card); });
            card.addEventListener('mouseleave', hideTooltip);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollTooltip);
    } else {
        initScrollTooltip();
    }
    mw.hook('wikipage.content').add(initScrollTooltip);
})();

(function () {
    var mutTooltipInitialized = false;

    function initMutTooltip() {
        if (mutTooltipInitialized) return;

        var cards = document.querySelectorAll('.cvp-mut-card');
        if (!cards.length) return;

        mutTooltipInitialized = true;

        var tierColors = {
            'Tier S': '#ffd23f',
            'Tier A': '#a855f7',
            'Tier B': '#38bdf8'
        };

        var tooltip = document.createElement('div');
        tooltip.className = 'cvp-scroll-tooltip';
        tooltip.innerHTML =
            '<div class="cvp-scroll-tooltip-name"></div>' +
            '<div class="cvp-scroll-tooltip-rarity"></div>' +
            '<div class="cvp-scroll-tooltip-cost"></div>';
        document.body.appendChild(tooltip);

        var nameEl = tooltip.querySelector('.cvp-scroll-tooltip-name');
        var rarityEl = tooltip.querySelector('.cvp-scroll-tooltip-rarity');
        var costEl = tooltip.querySelector('.cvp-scroll-tooltip-cost');

        function showTooltip(card) {
            var d = card.dataset;
            nameEl.textContent = d.name || '';
            rarityEl.textContent = d.rarity || '';
            rarityEl.style.color = tierColors[d.rarity] || '#1c1917';
            costEl.textContent = d.cost || '';

            var rect = card.getBoundingClientRect();
            var tooltipWidth = 190;
            var gap = 12;
            var left = rect.right + gap;

            if (left + tooltipWidth > window.innerWidth) {
                left = rect.left - tooltipWidth - gap;
            }
            if (left < 5) left = 5;

            tooltip.style.left = left + 'px';
            tooltip.style.top = rect.top + 'px';
            tooltip.classList.add('cvp-active');

            var tooltipRect = tooltip.getBoundingClientRect();
            var top = rect.top;
            if (tooltipRect.bottom > window.innerHeight) {
                top = window.innerHeight - tooltipRect.height - 10;
            }
            if (top < 5) top = 5;
            tooltip.style.top = top + 'px';
        }

        function hideTooltip() {
            tooltip.classList.remove('cvp-active');
        }

        cards.forEach(function (card) {
            card.addEventListener('mouseenter', function () { showTooltip(card); });
            card.addEventListener('mouseleave', hideTooltip);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMutTooltip);
    } else {
        initMutTooltip();
    }
    mw.hook('wikipage.content').add(initMutTooltip);
})();

/* Totems hover tooltip */
(function () {
    var totemTooltipInitialized = false;

    function initTotemTooltip() {
        if (totemTooltipInitialized) return;

        var cards = document.querySelectorAll('.cvp-totem-card');
        if (!cards.length) return;

        totemTooltipInitialized = true;

        var rarityColors = {
            Common: '#9ca3af',
            Rare: '#38bdf8',
            Epic: '#a855f7',
            Legendary: '#eab308',
            Mythic: '#ec4899',
            Divine: '#f97316',
            Godly: '#eab308',
            Secret: '#57534e'
        };

        var tooltip = document.createElement('div');
        tooltip.className = 'cvp-totem-tooltip';
        tooltip.innerHTML =
            '<div class="cvp-totem-tooltip-name"></div>' +
            '<div class="cvp-totem-tooltip-rarity"></div>' +
            '<div class="cvp-totem-tooltip-cost"></div>' +
            '<div class="cvp-totem-tooltip-bounty"></div>' +
            '<div class="cvp-totem-tooltip-duration"></div>' +
            '<div class="cvp-totem-tooltip-desc"></div>';
        document.body.appendChild(tooltip);

        var nameEl = tooltip.querySelector('.cvp-totem-tooltip-name');
        var rarityEl = tooltip.querySelector('.cvp-totem-tooltip-rarity');
        var costEl = tooltip.querySelector('.cvp-totem-tooltip-cost');
        var bountyEl = tooltip.querySelector('.cvp-totem-tooltip-bounty');
        var durationEl = tooltip.querySelector('.cvp-totem-tooltip-duration');
        var descEl = tooltip.querySelector('.cvp-totem-tooltip-desc');

        function showTooltip(card) {
            var d = card.dataset;
            var nameDiv = card.querySelector('.cvp-totem-name');

            nameEl.textContent = nameDiv ? nameDiv.textContent : '';
            rarityEl.textContent = d.rarity || '';
            rarityEl.style.color = rarityColors[d.rarity] || '#1c1917';
            costEl.textContent = d.cost || '';

            if (d.bounty) {
                bountyEl.textContent = d.bounty + ' Bounty Tokens';
                bountyEl.style.display = '';
            } else {
                bountyEl.textContent = '';
                bountyEl.style.display = 'none';
            }

            durationEl.textContent = d.duration || '';
            descEl.textContent = d.desc || '';

            var rect = card.getBoundingClientRect();
            var tooltipWidth = 200;
            var gap = 12;
            var left = rect.right + gap;

            if (left + tooltipWidth > window.innerWidth) {
                left = rect.left - tooltipWidth - gap;
            }
            if (left < 5) left = 5;

            tooltip.style.left = left + 'px';
            tooltip.style.top = rect.top + 'px';
            tooltip.classList.add('cvp-active');

            var tooltipRect = tooltip.getBoundingClientRect();
            var top = rect.top;
            if (tooltipRect.bottom > window.innerHeight) {
                top = window.innerHeight - tooltipRect.height - 10;
            }
            if (top < 5) top = 5;
            tooltip.style.top = top + 'px';
        }

        function hideTooltip() {
            tooltip.classList.remove('cvp-active');
        }

        cards.forEach(function (card) {
            card.addEventListener('mouseenter', function () { showTooltip(card); });
            card.addEventListener('mouseleave', hideTooltip);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTotemTooltip);
    } else {
        initTotemTooltip();
    }
    mw.hook('wikipage.content').add(initTotemTooltip);
})();

/* Plants hover tooltip */
(function () {
    var plantTooltipInitialized = false;

    function initPlantTooltip() {
        if (plantTooltipInitialized) return;

        var cards = document.querySelectorAll('.cvp-plant-card');
        if (!cards.length) return;

        plantTooltipInitialized = true;

        var rarityColors = {
            Common: '#9ca3af',
            Rare: '#38bdf8',
            Epic: '#a855f7',
            Legendary: '#eab308',
            Mythic: '#ec4899',
            Divine: '#f97316',
            Godly: '#eab308',
            Secret: '#57534e',
            Boss: '#dc2626'
        };

        var tooltip = document.createElement('div');
        tooltip.className = 'cvp-plant-tooltip';
        tooltip.innerHTML =
            '<div class="cvp-plant-tooltip-name"></div>' +
            '<div class="cvp-plant-tooltip-rarity"></div>' +
            '<div class="cvp-plant-tooltip-mps"></div>' +
            '<div class="cvp-plant-tooltip-health"></div>';
        document.body.appendChild(tooltip);

        var nameEl = tooltip.querySelector('.cvp-plant-tooltip-name');
        var rarityEl = tooltip.querySelector('.cvp-plant-tooltip-rarity');
        var mpsEl = tooltip.querySelector('.cvp-plant-tooltip-mps');
        var healthEl = tooltip.querySelector('.cvp-plant-tooltip-health');

        function showTooltip(card) {
            var d = card.dataset;
            nameEl.textContent = d.name || '';
            rarityEl.textContent = d.rarity || '';
            rarityEl.style.color = rarityColors[d.rarity] || '#1c1917';
            mpsEl.textContent = 'Money/Sec: ' + (d.mps || '');
            healthEl.textContent = 'Max Health: ' + (d.health || '');

            var rect = card.getBoundingClientRect();
            var tooltipWidth = 200;
            var gap = 12;
            var left = rect.right + gap;

            if (left + tooltipWidth > window.innerWidth) {
                left = rect.left - tooltipWidth - gap;
            }
            if (left < 5) left = 5;

            tooltip.style.left = left + 'px';
            tooltip.style.top = rect.top + 'px';
            tooltip.classList.add('cvp-active');

            var tooltipRect = tooltip.getBoundingClientRect();
            var top = rect.top;
            if (tooltipRect.bottom > window.innerHeight) {
                top = window.innerHeight - tooltipRect.height - 10;
            }
            if (top < 5) top = 5;
            tooltip.style.top = top + 'px';
        }

        function hideTooltip() {
            tooltip.classList.remove('cvp-active');
        }

        cards.forEach(function (card) {
            card.addEventListener('mouseenter', function () { showTooltip(card); });
            card.addEventListener('mouseleave', hideTooltip);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPlantTooltip);
    } else {
        initPlantTooltip();
    }
    mw.hook('wikipage.content').add(initPlantTooltip);
})();

/* Mutation card effects (no images — pure CSS/JS generated) */
(function () {
    function rand(min, max) { return Math.random() * (max - min) + min; }

    function spawn(container, className, count, styleFn) {
        for (var i = 0; i < count; i++) {
            var el = document.createElement('div');
            el.className = className;
            styleFn(el, i);
            container.appendChild(el);
        }
    }

    function initMutationFX() {
        var cards = document.querySelectorAll('.cvp-mut-card');
        if (!cards.length) return;

        cards.forEach(function (card) {
            var fx = card.querySelector('.cvp-mut-fx');
            if (!fx || fx.dataset.fxReady) return;
            fx.dataset.fxReady = '1';

            if (card.classList.contains('cvp-mut-taco')) {
                spawn(fx, 'cvp-mut-taco-drop', 6, function (el) {
                    el.textContent = '\uD83C\uDF2E';
                    el.style.left = rand(5, 85) + '%';
                    el.style.fontSize = rand(14, 20) + 'px';
                    el.style.animationDuration = rand(1.8, 3) + 's';
                    el.style.animationDelay = rand(0, 2.5) + 's';
                });
            }

            if (card.classList.contains('cvp-mut-gold')) {
                spawn(fx, 'cvp-mut-sparkle', 8, function (el) {
                    el.style.left = rand(10, 90) + '%';
                    el.style.top = rand(10, 90) + '%';
                    el.style.animationDuration = rand(1.2, 2.2) + 's';
                    el.style.animationDelay = rand(0, 2) + 's';
                });
            }

            if (card.classList.contains('cvp-mut-glitched')) {
                var colors = ['#4dffea', '#ff4dd8', '#ffffff', '#000000', '#2effff'];
                var blocks = [];
                spawn(fx, 'cvp-mut-glitch-block', 10, function (el) {
                    blocks.push(el);
                });
                function reshuffle() {
                    blocks.forEach(function (el) {
                        el.style.left = rand(0, 85) + '%';
                        el.style.top = rand(0, 85) + '%';
                        el.style.width = rand(10, 32) + 'px';
                        el.style.height = rand(3, 8) + 'px';
                        el.style.background = colors[Math.floor(rand(0, colors.length))];
                        el.style.opacity = rand(0.3, 0.8);
                    });
                }
                reshuffle();
                setInterval(reshuffle, 150);
            }

            if (card.classList.contains('cvp-mut-scorched')) {
                spawn(fx, 'cvp-mut-ember-dark', 8, function (el) {
                    el.style.left = rand(15, 85) + '%';
                    el.style.animationDuration = rand(1.4, 2.2) + 's';
                    el.style.animationDelay = rand(0, 2) + 's';
                });
            }

            if (card.classList.contains('cvp-mut-toasty')) {
                spawn(fx, 'cvp-mut-ember-orange', 8, function (el) {
                    el.style.left = rand(15, 85) + '%';
                    el.style.animationDuration = rand(1.4, 2.2) + 's';
                    el.style.animationDelay = rand(0, 2) + 's';
                });
            }

            if (card.classList.contains('cvp-mut-chilly')) {
                spawn(fx, 'cvp-mut-snow-flake', 10, function (el) {
                    el.style.left = rand(5, 95) + '%';
                    el.style.animationDuration = rand(2, 3.5) + 's';
                    el.style.animationDelay = rand(0, 3) + 's';
                });
            }

            if (card.classList.contains('cvp-mut-shocked')) {
                var bolt = document.createElement('div');
                bolt.className = 'cvp-mut-bolt';
                fx.appendChild(bolt);
            }

            if (card.classList.contains('cvp-mut-moonlit')) {
                var moon = document.createElement('div');
                moon.className = 'cvp-mut-moon';
                fx.appendChild(moon);
            }

            if (card.classList.contains('cvp-mut-mega')) {
                spawn(fx, 'cvp-mut-mega-bolt', 4, function (el, i) {
                    el.style.left = 50 + rand(-18, 18) + '%';
                    el.style.transform = 'rotate(' + (i * 90) + 'deg)';
                    el.style.animationDelay = rand(0, 1.2) + 's';
                });
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMutationFX);
    } else {
        initMutationFX();
    }
    mw.hook('wikipage.content').add(initMutationFX);
})();

/* News tab switching */
(function () {
    var newsInitialized = false;

    function initNews() {
        if (newsInitialized) return;

        var panel = document.querySelector('.cvp-news-panel');
        if (!panel) return;

        var items = panel.querySelectorAll('.cvp-news-item');
        var articles = panel.querySelectorAll('.cvp-news-article');
        if (!items.length) return;

        newsInitialized = true;

        items.forEach(function (item) {
            item.addEventListener('click', function () {
                var target = item.getAttribute('data-news');

                items.forEach(function (i) { i.classList.remove('cvp-news-item-active'); });
                item.classList.add('cvp-news-item-active');

                articles.forEach(function (a) {
                    a.classList.toggle('cvp-news-active', a.getAttribute('data-news') === target);
                });
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNews);
    } else {
        initNews();
    }
    mw.hook('wikipage.content').add(initNews);
})();